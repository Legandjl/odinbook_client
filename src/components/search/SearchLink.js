import { Link } from "react-router-dom";
import "./search.css";

const SearchLink = (props) => {
  const { firstName, lastName } = { ...props.info._id };
  return (
    <div className="searchLink" data-menu={true}>
      <Link to={`/search/${firstName}+${lastName}`} data-menu={true}>
        {firstName + " " + lastName}
      </Link>
    </div>
  );
};
export default SearchLink;
