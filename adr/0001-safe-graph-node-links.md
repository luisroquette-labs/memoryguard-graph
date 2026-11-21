# Safe graph node links

## Context

Graph node IDs and labels can come from source documents or scraped URLs. A prior inline `onclick` string placed IDs inside a quoted HTML attribute without escaping; a quote could break the link or inject an event handler (Graphify issue #1838).

## Decision

Escape node data before assigning it to `innerHTML`, store the ID in `data-nid`, and handle clicks through a listener on `document`. The document listener survives rebuilding the neighbor list. Track hovered nodes separately because the click event's node parameter was unreliable for this interaction.

## Consequences

Both published HTML copies must keep the same escaping and delegated click behavior. Regeneration must preserve the behavior and must not reintroduce code comments.
