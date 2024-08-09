import { SearchResult } from "../../search.types";

export { SearchSection_Before_Props, SearchSection_After_Props };

interface SearchSection_Before_Props {
  popularSearchKeywords: string[];
  searchHistory: string[];
  search: (searchKeyword: string) => Promise<any> | any;
  removeSearchHistory: (val: string) => any;
  removeAllSearchHistory: () => any;
}

interface SearchSection_After_Props {
  searchKeyword: string;
  searchResult: SearchResult;
}
