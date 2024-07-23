import { Union } from "src/interfaces/union.types";

export const THEME = {
  DEFAULT: 0,
  DARK: 1,
} as const;

export type ThemeType = Union<typeof THEME>;
