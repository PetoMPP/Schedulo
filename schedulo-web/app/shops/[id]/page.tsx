export default async function ShopPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  return (
    <div>
      <h1>Shop Page</h1>
      <p>Current shop id: {id}</p>
    </div>
  );
}
