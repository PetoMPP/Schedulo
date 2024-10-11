import React, { Suspense } from "react";
import ShopSearch from "../components/shop-search";
import ShopSearchResults from "../components/shop-search-results";
import { searchShops } from "../api";

export default async function SearchPage(props: {
  searchParams?: {
    [key: string]: string | undefined;
  };
}) {
  const query = props.searchParams?.q;
  return (
    <>
      <h2 className="font-semibold text-2xl pb-2">Browse available places</h2>
      <ShopSearch query={query} />
      <Suspense
        key={query}
        fallback={<div className="py-4">Loading search results...</div>}
      >
        <ShopSearchResults query={query} searchShops={searchShops(query)} />
      </Suspense>
    </>
  );
}
