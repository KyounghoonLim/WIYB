import { Union } from "../@types/union.types";

export { SEARCH_PROGRESS, SEARCH_CATEGORY };

const SEARCH_PROGRESS = {
  HIDDEN: "hidden",
  BEFORE_SEARCH: "before",
  LOADING: "loading",
  AFTER_SEARCH: "after",
} as const;

const SEARCH_CATEGORY = {
  EQUIP: "equipments",
  USER: "users",
} as const;

export type SearchCategoryType = Union<typeof SEARCH_CATEGORY>;
