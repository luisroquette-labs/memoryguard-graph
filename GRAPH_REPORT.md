# Graph Report - MemoryGuard  (2026-08-14)

## Corpus Check
- Corpus is ~7,958 words - fits in a single context window. You may not need a graph.

## Summary
- 359 nodes · 724 edges · 13 communities (11 shown, 2 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 96 edges (avg confidence: 0.8)
- Token cost: 248 input · 1,783 output

## Community Hubs (Navigation)
- Product Interface
- App Lifecycle and Model
- Native macOS Shell
- Analysis and Protection Policy
- User Preferences
- Memory Domain Models
- SwiftUI Components
- Local Event History
- System Sampling
- Safety and Product Concepts
- Build Process Watchdog
- App Packaging
- Swift Package Definition

## God Nodes (most connected - your core abstractions)
1. `MemoryGuardProductModel` - 59 edges
2. `MemoryGuardApplicationController` - 34 edges
3. `MemorySnapshot` - 21 edges
4. `GuardEvent` - 19 edges
5. `BuildGroup` - 18 edges
6. `ProtectionProfile` - 16 edges
7. `ReliefPolicy` - 16 edges
8. `MemoryGuardCoreTests` - 15 edges
9. `MGCard` - 14 edges
10. `ProcessRecord` - 14 edges

## Surprising Connections (you probably didn't know these)
- `.body` --references--> `GuardEvent`  [INFERRED]
  Sources/MemoryGuard/ProductTheme.swift → Sources/MemoryGuard/GuardEvent.swift
- `.detailView` --calls--> `PreferencesView`  [INFERRED]
  Sources/MemoryGuard/AppShellView.swift → Sources/MemoryGuard/PreferencesView.swift
- `MemoryGuardProductModel` --calls--> `BuildController`  [INFERRED]
  Sources/MemoryGuard/MemoryGuardProductModel.swift → Sources/MemoryGuard/BuildController.swift
- `MemoryGuardApplicationController` --calls--> `MemoryGuardProductModel`  [INFERRED]
  Sources/MemoryGuard/MemoryGuardApp.swift → Sources/MemoryGuard/MemoryGuardProductModel.swift
- `MemoryGuardProductModel` --calls--> `MemorySnapshot`  [INFERRED]
  Sources/MemoryGuard/MemoryGuardProductModel.swift → Sources/MemoryGuardCore/Models.swift

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Automated Memory Safety Flow** — readme_memory_pressure_evaluation, readme_automatic_relief, readme_heavy_build_group_pause, readme_two_sample_recovery, readme_watchdog_recovery [EXTRACTED 1.00]

## Communities (13 total, 2 thin omitted)

### Community 0 - "Product Interface"
Cohesion: 0.07
Nodes (42): Content, MemoryGuardCore, ServiceManagement, AboutView, .body, String, ActivityView, .body (+34 more)

### Community 1 - "App Lifecycle and Model"
Cohesion: 0.07
Nodes (33): Never, ObservableObject, AppShellView, .body, .sidebarStatus, .statusBadge, LaunchAtLoginResult, failure (+25 more)

### Community 2 - "Native macOS Shell"
Cohesion: 0.07
Nodes (27): AnyCancellable, AnyObject, AnyView, Notification, NSApplication, NSApplicationDelegate, NSEvent, NSImage (+19 more)

### Community 3 - "Analysis and Protection Policy"
Cohesion: 0.09
Nodes (13): Foundation, MemoryGuard, ProcessAnalyzer, Int, String, ReliefPolicy, Bool, Int (+5 more)

### Community 4 - "User Preferences"
Cohesion: 0.06
Nodes (36): CaseIterable, ColorScheme, Identifiable, Int, AppAppearance, .colorScheme, dark, .icon (+28 more)

### Community 5 - "Memory Domain Models"
Cohesion: 0.14
Nodes (26): Equatable, Sendable, .color, .icon, .title, Action, none, pause (+18 more)

### Community 6 - "SwiftUI Components"
Cohesion: 0.09
Nodes (16): AppKit, Combine, MainActor, ProtectionProfileCard, .body, .cardBackground, .cardStroke, .icon (+8 more)

### Community 7 - "Local Event History"
Cohesion: 0.16
Nodes (13): Codable, GuardEvent, GuardEventKind, error, information, intervention, recovery, settings (+5 more)

### Community 8 - "System Sampling"
Cohesion: 0.16
Nodes (12): LocalizedError, String, SystemSample, SystemSampler, SystemSamplerError, commandFailed, .errorDescription, invalidMemoryOutput (+4 more)

### Community 9 - "Safety and Product Concepts"
Cohesion: 0.19
Nodes (13): Automatic Relief, Heavy Build Group Pause, Launch at Login, Local 100-Event Audit History, Memory Pressure Evaluation, MemoryGuard, Native macOS Window and Menu-Bar App, Non-Destructive Safety Contract (+5 more)

### Community 10 - "Build Process Watchdog"
Cohesion: 0.26
Nodes (7): Darwin, Process, BuildController, .pausedGroupIDs, Int, Int32, Set

## Knowledge Gaps
- **78 isolated node(s):** `PackageDescription`, `make-app.sh script`, `system`, `light`, `dark` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `MemoryGuardProductModel` connect `App Lifecycle and Model` to `Product Interface`, `Native macOS Shell`, `Analysis and Protection Policy`, `User Preferences`, `Memory Domain Models`, `SwiftUI Components`, `Local Event History`, `Build Process Watchdog`?**
  _High betweenness centrality (0.475) - this node is a cross-community bridge._
- **Why does `MemoryGuardApplicationController` connect `Native macOS Shell` to `App Lifecycle and Model`, `SwiftUI Components`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `MemorySnapshot` connect `Memory Domain Models` to `System Sampling`, `App Lifecycle and Model`, `Analysis and Protection Policy`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Are the 8 inferred relationships involving `MemoryGuardProductModel` (e.g. with `MemoryGuardApplicationController` and `.observeModel()`) actually correct?**
  _`MemoryGuardProductModel` has 8 INFERRED edges - model-reasoned connections that need verification._
- **Are the 7 inferred relationships involving `MemorySnapshot` (e.g. with `MemoryGuardProductModel` and `.criticalPressurePausesNewestOfTwoBuilds()`) actually correct?**
  _`MemorySnapshot` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `make-app.sh script`, `system` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Product Interface` be split into smaller, more focused modules?**
  _Cohesion score 0.06936026936026936 - nodes in this community are weakly interconnected._