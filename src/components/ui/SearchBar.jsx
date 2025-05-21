import PropTypes from "prop-types";

import { TextInput } from "flowbite-react";
import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search...", onSearch, className }) => {

  return (
    <div className={`relative w-full ${className}`}>
      <TextInput
        type="text"
        placeholder={placeholder}
        onChange={(e)=> onSearch(e.target.value)}
        icon={Search}
        className={className}
        color="success"
      />
    </div>
  );
};

export default SearchBar;
// SearchBar Property types
SearchBar.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func,
    className: PropTypes.string,
};