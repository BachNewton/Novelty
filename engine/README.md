# @novelty/engine

## Quick Start

```typescript
import { Novelty } from "@novelty/engine";

const engine = await Novelty.Engine();

engine.add(Novelty.Light);
engine.add(Novelty.Box, { size: { x: 3, y: 1, z: 3 } });
engine.add(Novelty.Sphere, { radius: 1 });

engine.start();
```

## API

### `Novelty.Engine()`

Creates an engine instance.

```typescript
const engine = await Novelty.Engine();
```

### `engine.add(token, options?)`

Adds a game object to the scene. All options are optional.

```typescript
const box = engine.add(Novelty.Box, { size: { x: 2, y: 1, z: 2 } });
const sphere = engine.add(Novelty.Sphere, { radius: 0.5 });
const light = engine.add(Novelty.Light);
```

### `engine.start()`

Starts the engine.

## Game Objects

Every game object has a `move()` method and accepts an optional `position`:

```typescript
// Set position at creation
const box = engine.add(Novelty.Box, { position: { x: 0, y: 3, z: 0 } });

// Move after creation
box.move(0, 5, 0);
```

### `Novelty.Box`

| Option | Type | Default |
|--------|------|---------|
| `size` | `{ x, y, z }` | `{ x: 1, y: 1, z: 1 }` |
| `position` | `{ x, y, z }` | `{ x: 0, y: 0, z: 0 }` |

### `Novelty.Sphere`

| Option | Type | Default |
|--------|------|---------|
| `radius` | `number` | `0.5` |
| `position` | `{ x, y, z }` | `{ x: 0, y: 0, z: 0 }` |

### `Novelty.Light`

| Option | Type | Default |
|--------|------|---------|
| `position` | `{ x, y, z }` | `{ x: 5, y: 10, z: 5 }` |
