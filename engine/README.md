# @novelty/engine

## Quick Start

```typescript
import { Novelty } from "@novelty/engine";

const engine = await Novelty.Engine();

engine.add(Novelty.Light);

const floor = engine.add(Novelty.Box, { fixed: true, size: { x: 10, y: 0.5, z: 10 }, position: { x: 0, y: -2, z: 0 } });
const player = engine.add(Novelty.Box, { fixed: true, color: 0xff0000 });

engine.onUpdate((input) => {
  if (input.held(Novelty.Key.W)) player.move(0, 0, -5);
  if (input.held(Novelty.Key.S)) player.move(0, 0, 5);
  if (input.held(Novelty.Key.A)) player.move(-5, 0, 0);
  if (input.held(Novelty.Key.D)) player.move(5, 0, 0);
});

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

### `engine.onUpdate(callback)`

Registers a function that runs every frame. Receives an `Input` object for reading keyboard state.

```typescript
engine.onUpdate((input) => {
  if (input.held(Novelty.Key.W)) player.move(0, 0, -5);
});
```

### `engine.start()`

Starts the engine.

## Game Objects

Every game object has a `move()` method and accepts an optional `position`:

```typescript
// Set position at creation
const box = engine.add(Novelty.Box, { position: { x: 0, y: 3, z: 0 } });

// Move relative to current position (units per second, dt-scaled internally)
box.move(0, 5, 0);
```

## Input

`input.held(key)` returns `true` while a key is held down. Use `Novelty.Key` for key codes:

| Key | Code |
|-----|------|
| `Novelty.Key.W` | `KeyW` |
| `Novelty.Key.A` | `KeyA` |
| `Novelty.Key.S` | `KeyS` |
| `Novelty.Key.D` | `KeyD` |
| `Novelty.Key.Space` | `Space` |
| `Novelty.Key.ShiftLeft` | `ShiftLeft` |
| `Novelty.Key.ShiftRight` | `ShiftRight` |
| `Novelty.Key.ArrowUp` | `ArrowUp` |
| `Novelty.Key.ArrowDown` | `ArrowDown` |
| `Novelty.Key.ArrowLeft` | `ArrowLeft` |
| `Novelty.Key.ArrowRight` | `ArrowRight` |

### `Novelty.Box`

| Option | Type | Default |
|--------|------|---------|
| `size` | `{ x, y, z }` | `{ x: 1, y: 1, z: 1 }` |
| `position` | `{ x, y, z }` | `{ x: 0, y: 0, z: 0 }` |
| `color` | `string \| number` | `0xffffff` |
| `fixed` | `boolean` | `false` |

### `Novelty.Sphere`

| Option | Type | Default |
|--------|------|---------|
| `radius` | `number` | `0.5` |
| `position` | `{ x, y, z }` | `{ x: 0, y: 0, z: 0 }` |
| `color` | `string \| number` | `0xffffff` |
| `fixed` | `boolean` | `false` |

### `Novelty.Capsule`

| Option | Type | Default |
|--------|------|---------|
| `radius` | `number` | `0.5` |
| `length` | `number` | `1` |
| `position` | `{ x, y, z }` | `{ x: 0, y: 0, z: 0 }` |
| `color` | `string \| number` | `0xffffff` |
| `fixed` | `boolean` | `false` |

### `Novelty.Light`

| Option | Type | Default |
|--------|------|---------|
| `position` | `{ x, y, z }` | `{ x: 5, y: 10, z: 5 }` |
