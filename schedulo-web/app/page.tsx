import React from "react";
import Link from "next/link";
import Search from "./components/search";
import RecommendedOwners from "./components/recommended-owners";
import DiscoverAreas from "./components/discover-areas";

export default function App() {
  return (
    <>
      <h1 className="font-semibold text-3xl pb-4">Welcome to Schedulo!</h1>
      <p className="pb-8">
        Here you can schedule your boberly appointments and many more!
      </p>
      <Search />
      <p className="font-mono pt-4">
        This service is free for first 20 business owners that register{" "}
        <Link className="text-blue-500 underline" href="#">
          here
        </Link>
        !
      </p>
      <RecommendedOwners />
      <DiscoverAreas />
    </>
  );
}
