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
    const container = document.getElementById("recommended-owners-container");
    if (!container) {
      return;
    }
    const width = container.getElementsByTagName("div").item(0)?.offsetWidth;
    if (!width) {
      return;
    }
    if (backwards && container.scrollLeft === 0) {
      container.scrollTo({
        left: container.scrollWidth,
        behavior: "smooth",
      });
    } else if (
      !backwards &&
      container.scrollLeft + container.offsetWidth === container.scrollWidth
    ) {
      container.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      container.scrollBy({
        left: width * (backwards ? -1 : 1),
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h2 className="font-semibold text-2xl pt-8 pb-2">Recommended</h2>
      <div className="relative">
        <div className="absolute left-5 right-5 top-1/2 flex justify-between z-10">
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
