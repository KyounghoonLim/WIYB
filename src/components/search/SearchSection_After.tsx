import React, { SyntheticEvent, useCallback, useMemo, useState } from "react";
import ListItem_Search from "../list/listItem/ListItem_SearchHistory";
import List from "../list/List";
import Bedge from "../bedge/Bedge";
import { SEARCH_CATEGORY, SearchCategoryType } from "@/src/constants/search.constant";
import Category from "../category/Category";
import { SearchResult } from "@/src/@types/search.types";
import ListItem_Equipment from "../list/listItem/ListItem_Equipment";
import { SearchSection_After_Props } from "@/src/@types/components/search/searchSection.interface";
import ListItem_User from "../list/listItem/ListItem_User";

export default function SearchSection_After({ searchKeyword, searchResult }: SearchSection_After_Props) {
  const [category, setCategory] = useState<SearchCategoryType>(SEARCH_CATEGORY.EQUIP);

  const searchListSwitch = useMemo(() => {
    switch (category) {
      case SEARCH_CATEGORY.EQUIP: {
        return <List items={searchResult.equipments} Component={ListItem_Equipment} />;
      }
      case SEARCH_CATEGORY.USER: {
        return <List items={searchResult.users} Component={ListItem_User} />;
      }
    }
  }, [category, searchResult]);

  return (
    <>
      <Category value={category} items={Object.values(SEARCH_CATEGORY)} onChange={(value) => setCategory(value as SearchCategoryType)} className="px-2" />
      <section className="h-full flex flex-col px-2 mt-6">
        {
          <span className="flex typograph-16">
            <h3 className="font-bold">{searchKeyword}</h3>
            {searchResult[category].length ? " 검색결과" : " 에 대한 검색 결과가 없습니다."}
          </span>
        }
        {searchListSwitch}
      </section>
    </>
  );
}
