"use client";

import { easeOutCuaic, scrollToLeft } from "../utils/scroll";
import OwnerCard, { OwnerCardProps } from "./owner-card";

export default function RecommendedOwners() {
  const owners: OwnerCardProps[] = [
    {
      name: "Barber shop",
      summary: "The number 1 barber on this page!",
      new: true,
    },
    {
      name: "Beauty salon",
      summary: "You're already beatiful, but wait until you visit us!",
    },
    {
      name: "Boberly shop",
      summary: "The second best barber on this page!",
    },
    {
      name: "Nail salon",
      summary: "We'll make your nails shine!",
    },
    {
      name: "Hair salon",
      summary: "We'll make your hair shine!",
    },
    {
      name: "Tattoo parlor",
      summary: "We'll make your skin different!",
      new: true,
    },
  ];

  const scroll = (backwards: boolean) => {
    const scrollDuration = 200;
    const container = document.getElementById("recommended-owners-container");
    if (!container) {
      return;
    }
    const width = container.getElementsByTagName("div").item(0)?.offsetWidth;
    if (!width) {
      return;
    }
    const navButtons = document
      .getElementById("recommended-owners-nav")
      ?.getElementsByTagName("a");
    if (!navButtons) {
      return;
    }
    for (let i = 0; i < navButtons.length; i++) {
      navButtons[i].classList.add("btn-disabled");
    }
    const onScrollEnd = () => {
      for (let i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove("btn-disabled");
      }
    };
    if (backwards && container.scrollLeft === 0) {
      scrollToLeft(
        container,
        container.scrollWidth,
        scrollDuration,
        easeOutCuaic,
        onScrollEnd
      );
    } else if (
      !backwards &&
      container.scrollLeft + container.offsetWidth === container.scrollWidth
    ) {
      scrollToLeft(container, 0, scrollDuration, easeOutCuaic, onScrollEnd);
    } else {
      scrollToLeft(
        container,
        container.scrollLeft + width * (backwards ? -1 : 1),
        scrollDuration,
        easeOutCuaic,
        onScrollEnd
      );
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl pt-8 pb-2">Recommended</h2>
      <div className="relative">
        <div
          id="recommended-owners-nav"
          className="absolute left-0 right-0 top-1/3 flex justify-between z-10 opacity-50"
        >
          <a
            className="btn btn-circle btn-neutral"
            onClick={() => scroll(true)}
          >
            ❮
          </a>
          <a
            className="btn btn-circle btn-neutral"
            onClick={() => scroll(false)}
          >
            ❯
          </a>
        </div>
        <div
          id="recommended-owners-container"
          className="p-4 overflow-x-hidden flex"
        >
          {owners.map((owner, index) => (
            <div key={index} className="p-2">
              <OwnerCard {...owner} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
