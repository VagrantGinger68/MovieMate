import { useState } from "react";

interface SearchBarProps {
  inNavBar: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ inNavBar }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchURL = `/search/${searchQuery}`;

    window.location.replace(`${searchURL}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={inNavBar ? "rounded-2xl bg-[#282828]" : "pt-8 pb-2 bg-[#282828]"}
    >
      {inNavBar && (
        <div className="mx-auto flex items-center border border-gray-300 rounded-2xl">
          <input
            className="w-3/4 p-2 rounded-l-2xl focus:outline-none focus:border-blue-500"
            id="search"
            type="text"
            placeholder="Search for a movie"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            className="p-2 bg-[#4477CE] text-white rounded-r-2xl hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      )}
      {!inNavBar && (
        <div className="w-3/5 mx-auto flex items-center border border-gray-300 rounded-2xl">
          <input
            className="w-full p-2 rounded-l-2xl focus:outline-none focus:border-blue-500"
            id="search"
            type="text"
            placeholder="Search for a movie"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            className="p-2 bg-[#4477CE] text-white rounded-r-2xl hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
