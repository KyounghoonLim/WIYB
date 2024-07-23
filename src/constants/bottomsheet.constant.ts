import { Union } from "src/interfaces/union.types";

export const BOTTOMSHEET_ANIMATION = {
  CLOSE: 0,
  OPEN: 1,
} as const;

export type BottomsheetAnimationType = Union<typeof BOTTOMSHEET_ANIMATION>;
