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
} as const;

export type KeyCode = (typeof Key)[keyof typeof Key];

export interface Input {
  held(key: KeyCode): boolean;
}

export function createInput(): Input {
  const heldKeys = new Set<string>();

  window.addEventListener("keydown", (e) => {
    heldKeys.add(e.code);
  });

  window.addEventListener("keyup", (e) => {
    heldKeys.delete(e.code);
  });

  return {
    held: (key) => heldKeys.has(key),
  };
}
