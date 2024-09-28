import Link from "next/link";

export default function DiscoverAreas() {
  const areas = [
    "London",
    "New York",
    "Los Angeles",
    "Paris",
    "Berlin",
    "Tokyo",
    "Sydney",
    "Toronto",
    "San Francisco",
    "Chicago",
    "Miami",
    "Dubai",
    "Barcelona",
    "Rome",
  ];
  return (
    <>
      <h2 className="font-semibold text-2xl pt-8 pb-2">
        Discover in your area
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {areas.map((area, index) => {
          return (
            <Link key={index} href="#" className="btn glass">
              {area}
            </Link>
          );
        })}
      </div>
    </>
  );
}
