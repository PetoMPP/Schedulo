import Input from "./input";
import SvgSearch from "./svg/search";

export default function Search() {
  return (
    <Input svg={<SvgSearch />} placeholder="Search for your next appointment!" joinElements={<SearchElements />} />
  );
}

function SearchElements() {
  return (
    <button className="btn btn-primary join-item">Search</button>
  );
}