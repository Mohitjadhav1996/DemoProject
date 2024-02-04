import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

const SearchProduct = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = debounce((term) => {
    onSearch(term);
  }, 300);

  useEffect(() => {
    // debounce on searchteam
    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  // clear function to clear search input
  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleClearSearch}>Clear</button>
    </div>
  );
};

export default SearchProduct;
