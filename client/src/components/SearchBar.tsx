import { useState } from "react";

interface SearchProps {
  handleSearch: Function;
}

const SearchBar: React.FC<SearchProps> = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    handleSearch(searchQuery);
  };


  return (
    <form onSubmit={() => handleSubmit} action="/search">
      <input id="search" type="text" placeholder="Search for a movie" onChange={(e) => setSearchQuery(e.target.value)} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar;