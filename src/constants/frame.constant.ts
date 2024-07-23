import { Union } from "src/interfaces/union.types";

export const FPS = {
  "24fps": 41.7,
  "30fps": 33.3,
  "60fps": 16.7,
} as const;

export type FpsType = Union<typeof FPS>;
