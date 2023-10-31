import CategoryList from "./CategoryList";

interface CategoryStateProp {
  changeCategoryName: Function;
  changeGenre: Function;
}

const TopNavBar: React.FC<CategoryStateProp> = ({ 
  changeCategoryName, 
  changeGenre 
}) => {
  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <a
          href="#"
          className="text-2xl no-underline text-grey-darkest hover:text-blue-dark"
        >
          Rotten Potatoes
        </a>
      </div>
      <CategoryList changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
      <div>
        <a
          href="#"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
        >
          Log In
        </a>
        <a
          href="#"
          className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2"
        >
          Register
        </a>
      </div>
    </nav>
  );
};

export default TopNavBar;
