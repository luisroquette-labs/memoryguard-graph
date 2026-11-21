import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

assert.equal(readFileSync('graph.html', 'utf8'), readFileSync('index.html', 'utf8'));
const graph = JSON.parse(readFileSync('graph.json', 'utf8'));
assert.ok(graph.nodes?.length > 0);
assert.ok(graph.links?.length > 0);
console.log('Graph copies and data verified.');
