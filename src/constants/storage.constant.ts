import { Union } from "../@types/union.types";

export const STORAGE_TYPE = {
  LOCAL: "localStorage",
  SESSION: "sessionStorage",
} as const;

export type StorageType = Union<typeof STORAGE_TYPE>;

/// browser storage keys ///
export const STORAGE_KEY = {
  AUTH: {
    SUCCESS_KEY: "KKZ-AUTH-SUCCESS",
    FAILURE_KEY: "KKZ-AUTH-FAILURE",
  },
  USER_KEY: "KKZ-USER",
} as const;
