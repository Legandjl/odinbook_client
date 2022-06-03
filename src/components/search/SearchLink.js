import { Link } from "react-router-dom";
import "./search.css";

const SearchLink = (props) => {
  console.log(props.info);
  const { firstName, lastName } = { ...props.info._id };
  return (
    <div className="searchLink">
      <Link to={`/search/${firstName}+${lastName}`}>
        {firstName + " " + lastName}
      </Link>
    </div>
  );
};
export default SearchLink;
