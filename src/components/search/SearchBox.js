import SearchLink from "./SearchLink";
import "./search.css";

const SearchBox = (props) => {
  const searchLinks = props.results.map((item) => {
    return <SearchLink key={item._id} info={item} />;
  });
  return (
    <div className={"searchRes"} data-menu={true}>
      {!props.loading && searchLinks}
      {props.results.length === 0 && <p>No suggestions </p>}
    </div>
  );
};

export default SearchBox;
