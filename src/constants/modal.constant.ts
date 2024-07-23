import { Union } from "src/interfaces/union.types";

export const MODAL_TYPE = {
  ALERT: 0,
  CONFIRM: 1,
  __MANUAL__: 2,
} as const;

export type ModalType = Union<typeof MODAL_TYPE>;
