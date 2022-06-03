import SearchLink from "./SearchLink";
import "./search.css";

const SearchBox = (props) => {
  const searchLinks = props.results.map((item) => {
    return <SearchLink info={item} />;
  });
  return (
    <div className={"searchRes"}>
      {!props.loading && searchLinks}
      {props.results.length === 0 && <p>No suggestions </p>}
    </div>
  );
};

export default SearchBox;
