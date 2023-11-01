import CategoryList from "./CategoryList";
import SearchBar from "./SearchBar";

interface CategoryStateProp {
  changeCategoryName: Function;
  changeGenre: Function;
}

const TopNavBar: React.FC<CategoryStateProp> = ({ 
  changeCategoryName, 
  changeGenre 
}) => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 dark:bg-slate-900 sm:items-baseline w-full fixed z-10">
      <div className="mb-2 sm:mb-0">
        <a
          href="/"
          className="text-2xl no-underline text-slate-300 hover:text-white"
        >
          Rotten Potatoes
        </a>
      </div>
      <CategoryList changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
      <SearchBar inNavBar={true}/>
      <div>
        <a
          href="#"
          className="text-lg no-underline hover:text-white text-slate-300 ml-2 font-bold"
        >
          Log In
        </a>
        <a
          href="#"
          className="text-lg no-underline hover:text-white text-slate-300 ml-2 font-bold"
        >
          Register
        </a>
      </div>
    </nav>
  );
};

export default TopNavBar;
