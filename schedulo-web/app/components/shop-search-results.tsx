import { use } from "react";
import { ShopServicesData } from "../types";
import OwnerServicesCard from "./shop-services-card";
import React from "react";

export default function ShopSearchResults(props: {
  query?: string;
  searchShops: Promise<ShopServicesData[] | null>;
}) {
  const shops = use(props.searchShops);

  let inner = undefined;

  if (!props.query) {
    inner = <p>Please search for something to see the results</p>;
  } else if (shops === null || shops.length === 0) {
    inner = <p>No results found</p>;
  } else {
    inner = (
      <>
        <h3>
          Search results for: <span className="font-mono">{props.query}</span>
        </h3>
        {shops.map((osd, i) => (
          <OwnerServicesCard key={i} {...osd} />
        ))}
      </>
    );
  }

  return <div className="flex flex-col gap-4 py-4">{inner}</div>;
}
