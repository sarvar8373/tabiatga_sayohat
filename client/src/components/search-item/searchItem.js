// SearchItem.js
import React from "react";

const SearchItem = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  placeholder,
  style,
}) => {
  return (
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      style={style}
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        handleSearch(); // Trigger search as user types
      }}
    />
  );
};

export default SearchItem;
