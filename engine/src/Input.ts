export const Key = {
  W: "KeyW",
  A: "KeyA",
  S: "KeyS",
  D: "KeyD",
  Space: "Space",
  ShiftLeft: "ShiftLeft",
  ShiftRight: "ShiftRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Backtick: "Backquote",
} as const;

export type KeyCode = (typeof Key)[keyof typeof Key];

export interface Input {
  held(key: KeyCode): boolean;
  pressed(key: KeyCode): boolean;
}

export function createInput(): Input & { flush(): void } {
  const heldKeys = new Set<string>();
  const pressedKeys = new Set<string>();

  window.addEventListener("keydown", (e) => {
    if (!heldKeys.has(e.code)) {
      pressedKeys.add(e.code);
    }
    heldKeys.add(e.code);
  });

  window.addEventListener("keyup", (e) => {
    heldKeys.delete(e.code);
  });

  return {
    held: (key) => heldKeys.has(key),
    pressed: (key) => pressedKeys.has(key),
    flush: () => pressedKeys.clear(),
  };
}
