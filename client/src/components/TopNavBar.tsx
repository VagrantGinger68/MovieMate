import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";

interface CategoryStateProp {
  changeGenre: Function;
  cookies: { name?: "" };
}

const TopNavBar: React.FC<CategoryStateProp> = ({
  changeGenre,
  cookies
}) => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-[#1f1f1f] sm:items-baseline w-full fixed z-10">
      <div className="mb-2 sm:mb-0">
        <a
          href="/"
          className="text-2xl no-underline text-[#dfdfdf] hover:text-white"
        >
          MovieMate
        </a>
      </div>
      <CategoryList changeGenre={changeGenre} />
      <SearchBar inNavBar={true} />
      {!cookies.name &&
        <div>
          <a
            href="/login"
            className="text-lg no-underline hover:text-[white] text-[#dfdfdf] ml-2 font-bold"
          >
            Log In
          </a>
          <a
            href="#"
            className="text-lg no-underline hover:text-white text-[#dfdfdf] ml-2 font-bold"
          >
            Register
          </a>
        </div>
      }
      {cookies.name &&
        <div>
          <span className="text-white pr-4">Logged in as: {cookies.name}</span>
          <a
            href="/logout"
            className="text-lg no-underline hover:text-white text-[#dfdfdf] ml-2 font-bold"
          >
            Log Out
          </a>
        </div>
      }
    </nav>
  );
};

export default TopNavBar;
