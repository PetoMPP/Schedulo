import React, { Suspense } from "react";
import Link from "next/link";
import ShopSearch from "./components/shop-search";
import RecommendedShops from "./components/recommended-shops";
import DiscoverAreas from "./components/discover-areas";
import { getShops } from "./api";

export default async function App() {
  return (
    <>
      <h1 className="font-semibold text-3xl pb-4">Welcome to Schedulo!</h1>
      <p className="pb-8">
        Here you can schedule your boberly appointments and many more!
      </p>
      <ShopSearch />
      <p className="font-mono pt-4">
        This service is free for first 20 business owners that register{" "}
        <Link className="text-blue-500 underline" href="#">
          here
        </Link>
        !
      </p>
      <h2 className="font-semibold text-2xl pt-8 pb-2">Recommended</h2>
      <Suspense fallback={<div>Loading recommendations...</div>}>
        <RecommendedShops getShops={getShops()}/>
      </Suspense>
      <DiscoverAreas />
    </>
  );
}
