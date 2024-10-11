"use client";

import { useState } from "react";
import Input from "./input";
import SvgSearch from "./svg/search";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShopSearch(props: { query?: string }) {
  const [query, setQuery] = useState(props.query);
  const router = useRouter();
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(getSearchHref(query));
    }
  };
  return (
    <Input
      svg={<SvgSearch />}
      placeholder="Search for your next appointment!"
      joinElements={<SearchElements query={query} />}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}

function SearchElements(props: { query?: string }) {
  const href = getSearchHref(props.query);
  return (
    <Link href={href} className="btn btn-primary join-item">
      Search
    </Link>
  );
}

function getSearchHref(query: string | undefined) {
  return `/search?q=${query ?? ""}`;
}
