import { SearchResult } from "../../search.types";

export { SearchSection_Before_Props, SearchSection_After_Props };

interface SearchSection_Before_Props {
  search: (searchKeyword: string) => Promise<any> | any;
  searchHistory: string[];
  removeSearchHistory: (val: string) => any;
  removeAllSearchHistory: () => any;
}

interface SearchSection_After_Props {
  searchKeyword: string;
  searchResult: SearchResult;
}
