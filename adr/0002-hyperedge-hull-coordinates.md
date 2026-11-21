# Hyperedge hull coordinates

## Context

The `afterDrawing` callback receives a canvas context already transformed into network coordinates. Rendering a hyperedge by visiting its member nodes in arbitrary order can create a crossed polygon.

## Decision

Use node positions without another pan, zoom, or pixel-ratio transform. Compute a monotone-chain convex hull, expand its ordered points around the centroid, and trace that order. Collinear and duplicate points collapse to the extremes so a small member set becomes a segment instead of a crossed region.

## Consequences

Do not trace the original member order when changing the graph renderer. Keep `graph.html` and `index.html` identical after regeneration.
