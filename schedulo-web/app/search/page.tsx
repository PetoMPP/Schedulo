"use client";

import Search from "../components/search";
import SearchResults from "../components/search-results";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const query = useSearchParams().get("q") ?? undefined;
  return (
    <>
      <h2 className="font-semibold text-2xl pb-2">Browse available places</h2>
      <Search query={query} />
      <SearchResults query={query} />
    </>
  );
}
