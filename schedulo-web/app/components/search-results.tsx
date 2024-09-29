import OwnerCard, { OwnerCardProps } from "./owner-card";

export default function SearchResults(props: { query?: string }) {
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
  const filtered = owners.filter(
    (o: OwnerCardProps) =>
      o.name.toLowerCase().includes(props.query!) ||
      o.summary?.toLowerCase().includes(props.query!)
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      {props.query ? (
        <h3>
          Search results for: <span className="font-mono">{props.query}</span>
        </h3>
      ) : (
        <p>Please search for something to see the results</p>
      )}
      {props.query ? (
        filtered.length > 0 ? (
          filtered.map((owner, i) => <OwnerCard key={i} wide {...owner} />)
        ) : (
          <p>No results found</p>
        )
      ) : null}
    </div>
  );
}
