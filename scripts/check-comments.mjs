import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { parse } from 'parse5';
import { tokenizer } from 'acorn';
import { Parser as YamlParser } from 'yaml';
import { tokenize as tokenizeCss, tokenTypes as cssTokenTypes } from 'css-tree';
import { SaxesParser } from 'saxes';

function javascriptComments(source) {
  const lines = [];
  const tokens = tokenizer(source, {
    ecmaVersion: 'latest',
    locations: true,
    onComment: (_block, _text, _start, _end, location) => {
      if (!(location.line === 1 && source.startsWith('#!'))) lines.push(location.line);
    },
  });
  while (tokens.getToken().type.label !== 'eof') {}
  return lines;
}

function cssComments(source) {
  const lines = [];
  tokenizeCss(source, (type, start) => {
    if (type === cssTokenTypes.Comment) lines.push(source.slice(0, start).split('\n').length);
  });
  return lines;
}

function xmlComments(source) {
  const lines = [];
  const parser = new SaxesParser({ xmlns: false });
  const tags = [];
  parser.on('opentag', tag => tags.push(tag.name.toLowerCase()));
  parser.on('closetag', () => tags.pop());
  parser.on('comment', value => lines.push(parser.line - value.split('\n').length + 1));
  function inspectText(value) {
    const tag = tags.at(-1);
    if (tag === 'script' || tag === 'style') {
      const scan = tag === 'script' ? javascriptComments : cssComments;
      const start = parser.line - value.split('\n').length + 1;
      lines.push(...scan(value).map(line => start + line - 1));
    }
  }
  parser.on('text', inspectText);
  parser.on('cdata', inspectText);
  parser.write(source).close();
  return lines;
}

function htmlComments(source) {
  const lines = [];
  function visit(node) {
    if (node.nodeName === '#comment') lines.push(node.sourceCodeLocation.startLine);
    if (node.nodeName === 'script' || node.nodeName === 'style') {
      const content = node.childNodes?.find(child => child.nodeName === '#text');
      if (content) {
        const scan = node.nodeName === 'script' ? javascriptComments : cssComments;
        lines.push(...scan(content.value).map(line => content.sourceCodeLocation.startLine + line - 1));
      }
    }
    for (const child of node.childNodes || []) visit(child);
    if (node.content) visit(node.content);
  }
  visit(parse(source, { sourceCodeLocationInfo: true }));
  return lines;
}

function yamlComments(source) {
  const lines = [];
  function visit(token) {
    if (!token || typeof token !== 'object') return;
    if (token.type === 'comment') lines.push(source.slice(0, token.offset).split('\n').length);
    for (const value of Object.values(token)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object') visit(value);
    }
  }
  for (const token of new YamlParser().parse(source)) visit(token);
  return lines;
}

function inspect(file, source) {
  if (/\.html$/i.test(file)) return htmlComments(source);
  if (/\.(?:svg|xml)$/i.test(file)) return xmlComments(source);
  if (/\.(?:js|mjs|cjs)$/i.test(file)) return javascriptComments(source);
  if (/\.css$/i.test(file)) return cssComments(source);
  if (/\.ya?ml$/i.test(file)) return yamlComments(source);
  if (file.endsWith('robots.txt')) {
    return source.split('\n').flatMap((line, index) => line.includes('#') ? [index + 1] : []);
  }
  if (file === '.gitignore' || file === '.gitattributes') {
    return source.split('\n').flatMap((line, index) => line.startsWith('#') ? [index + 1] : []);
  }
  return [];
}

if (process.argv.includes('--self-test')) {
  assert.deepEqual(inspect('x.js', 'const r = /[//]/; const x = `${1 /* why */}`;'), [1]);
  assert.deepEqual(inspect('x.css', 'a{content:"/* literal */"} /* why */'), [1]);
  assert.deepEqual(inspect('x.css', 'a{background:url(https://host/a/*b)}'), []);
  assert.deepEqual(inspect('x.html', '<p title="<!-- literal -->">x</p>\n<!-- why -->'), [2]);
  assert.deepEqual(inspect('x.html', '<template><!-- why --></template>'), [1]);
  assert.deepEqual(inspect('x.xml', '<root><![CDATA[<!-- literal -->]]><!-- why --></root>'), [1]);
  assert.deepEqual(inspect('x.svg', '<svg><style>a{/* css */}</style><script>const x=1; // js\n</script></svg>'), [1, 1]);
  assert.deepEqual(inspect('robots.txt', 'User-agent: *\n# why'), [2]);
  assert.deepEqual(inspect('x.yml', 'run: |\n  echo "# literal"\nname: CI # why'), [3]);
  console.log('Comment syntax checks passed.');
} else {
  const files = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  const failures = files.filter(existsSync).flatMap(file => inspect(file, readFileSync(file, 'utf8')).map(line => `${file}:${line}`));
  if (failures.length) {
    console.error(`Comments forbidden (${failures.length}):\n${failures.join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log('Comment ratchet: zero comments in tracked source and config files.');
  }
}
