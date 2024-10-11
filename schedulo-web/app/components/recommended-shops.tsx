"use client";

import React, { use } from "react";
import { easeOutCuaic, scrollToLeft } from "../utils/scroll";
import { ShopData } from "../types";
import ShopCard from "./shop-card";

export default function RecommendedShops({
  getShops,
}: {
  getShops: Promise<ShopData[] | null>;
}) {
  const scroll = (backwards: boolean) => {
    const scrollDuration = 200;
    const containerData = getContainerData();

    if (!containerData) {
      return;
    }

    const { container, width, navButtons } = containerData;

    navButtons.forEach((button) => button.classList.add("btn-disabled"));

    const onScrollEnd = () =>
      navButtons.forEach((button) => button.classList.remove("btn-disabled"));
    const scrollContainer = (width: number) =>
      scrollToLeft(container, width, scrollDuration, easeOutCuaic, onScrollEnd);

    if (backwards && container.scrollLeft === 0) {
      scrollContainer(container.scrollWidth);
      return;
    }

    if (
      !backwards &&
      container.scrollLeft + container.offsetWidth === container.scrollWidth
    ) {
      scrollContainer(0);
      return;
    }

    scrollContainer(width * (backwards ? -1 : 1));
  };

  const shops = use(getShops);

  if (shops === null || shops.length === 0) {
    return <div>No recommendations found</div>;
  }

  return (
    <div className="relative">
      <div
        id="recommended-owners-nav"
        className="absolute left-0 right-0 top-1/3 flex justify-between z-10 opacity-50"
      >
        <a className="btn btn-circle btn-neutral" onClick={() => scroll(true)}>
          ❮
        </a>
        <a className="btn btn-circle btn-neutral" onClick={() => scroll(false)}>
          ❯
        </a>
      </div>
      <div
        id="recommended-owners-container"
        className="p-4 overflow-x-hidden flex"
      >
        {shops.map((owner, index) => (
          <div key={index} className="p-2">
            <ShopCard {...owner} />
          </div>
        ))}
      </div>
    </div>
  );
}

function getContainerData(): {
  container: HTMLElement;
  width: number;
  navButtons: HTMLElement[];
} | null {
  const container = document.getElementById("recommended-owners-container");
  if (!container) {
    return null;
  }
  const width = container.getElementsByTagName("div").item(0)?.offsetWidth;
  if (!width) {
    return null;
  }
  const navButtons = document
    .getElementById("recommended-owners-nav")
    ?.getElementsByTagName("a");
  if (!navButtons) {
    return null;
  }

  return { container, width, navButtons: Array.from(navButtons) };
}
