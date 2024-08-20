import { Union } from "../@types/union.types";

export const THEME = {
  DEFAULT: "#FAFAFA",
  WHITE: "#FFFFFF",
} as const;

export type ThemeType = Union<typeof THEME>;
