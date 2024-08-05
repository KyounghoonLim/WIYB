import { SearchResult } from "../@types/search.types";
import { SERVICE_PATH } from "../constants/path.constant";
import myAxios from "../utils/axios/myAxios";

export { searchApi };

function searchApi(keyword: string): Promise<SearchResult> {
  return myAxios.get(SERVICE_PATH.SEARCH, {
    params: {
      keyword,
    },
  });
}
