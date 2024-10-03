"use client";

import React from "react";
import ShopSearch from "../components/shop-search";
import ShopSearchResults from "../components/shop-search-results";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const query = useSearchParams().get("q") ?? undefined;
  return (
    <>
      <h2 className="font-semibold text-2xl pb-2">Browse available places</h2>
      <ShopSearch query={query} />
      <ShopSearchResults query={query} />
    </>
  );
}
