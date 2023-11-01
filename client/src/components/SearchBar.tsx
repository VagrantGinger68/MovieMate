import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <form action={`search/${searchQuery}`}>
      <input id="search" type="text" placeholder="Search for a movie" onChange={(e) => { setSearchQuery(e.target.value) }} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar;