import Search from "./components/search";

export default function App() {
  return (
    <>
      <h1 className="font-semibold text-2xl pb-4">
        Welcome to Schedulo!
      </h1>
      <p className="pb-8">Here you can schedule your barber appointments and many more!</p>
      <Search />
      <p className="font-mono pt-4">This service is free for first 20 business owners that register <a className="text-blue-500 underline" href="#">here</a>!</p>
    </>
  );
}
