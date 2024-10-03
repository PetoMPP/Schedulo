import { OwnerServicesData } from "../data/owner";
import OwnerServicesCard from "./owner-services-card";

export default function SearchResults(props: { query?: string }) {
  const osds: OwnerServicesData[] = [
    {
      owner: {
        name: "Barber shop",
        summary: "The number 1 barber on this page!",
        new: true,
      },
      services: [
        {
          name: "Haircut",
          price: 20,
          duration: 30,
        },
        {
          name: "Beard trim",
          price: 10,
          duration: 15,
        },
        {
          name: "Shave",
          price: 15,
          duration: 20,
        },
      ],
    },
    {
      owner: {
        name: "Beauty salon",
        summary: "You're already beatiful, but wait until you visit us!",
      },
      services: [
        {
          name: "Manicure",
          price: 15,
          duration: 30,
        },
        {
          name: "Pedicure",
          price: 20,
          duration: 45,
        },
        {
          name: "Facial",
          price: 30,
          duration: 60,
        },
      ],
    },
    {
      owner: {
        name: "Boberly shop",
        summary: "The second best barber on this page!",
      },
      services: [
        {
          name: "Haircut",
          price: 15,
          duration: 30,
        },
        {
          name: "Beard trim",
          price: 10,
          duration: 15,
        },
        {
          name: "Shave",
          price: 10,
          duration: 20,
        },
      ],
    },
    {
      owner: {
        name: "Nail salon",
        summary: "We'll make your nails shine!",
      },
      services: [
        {
          name: "Manicure",
          price: 10,
          duration: 30,
        },
        {
          name: "Pedicure",
          price: 15,
          duration: 45,
        },
      ],
    },
    {
      owner: {
        name: "Hair salon",
        summary: "We'll make your hair shine!",
      },
      services: [
        {
          name: "Haircut",
          price: 20,
          duration: 30,
        },
        {
          name: "Hair coloring",
          price: 30,
          duration: 60,
        },
        {
          name: "Hair styling",
          price: 15,
          duration: 30,
        },
      ],
    },
    {
      owner: {
        name: "Tattoo parlor",
        summary: "We'll make your skin different!",
        new: true,
      },
      services: [
        {
          name: "Small tattoo",
          price: 50,
          duration: 60,
        },
        {
          name: "Medium tattoo",
          price: 100,
          duration: 120,
        },
        {
          name: "Large tattoo",
          price: 200,
          duration: 180,
        },
      ],
    },
  ];
  const filtered = osds.filter(
    (osd: OwnerServicesData) =>
      osd.owner.name.toLowerCase().includes(props.query!) ||
      osd.owner.summary?.toLowerCase().includes(props.query!)
  );

  return (
    <div className="flex flex-col gap-4 py-4">
      {props.query ? (
        <h3>
          Search results for: <span className="font-mono">{props.query}</span>
        </h3>
      ) : (
        <p>Please search for something to see the results</p>
      )}
      {props.query ? (
        filtered.length > 0 ? (
          filtered.map((osd, i) => <OwnerServicesCard key={i} {...osd} />)
        ) : (
          <p>No results found</p>
        )
      ) : null}
    </div>
  );
}
