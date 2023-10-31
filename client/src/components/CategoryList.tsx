import CategoryListItem from "./CategoryListItem";

interface CategoryStateProp {
  changeCategoryName: Function;
  changeGenre: Function;
}

const CategoryList: React.FC<CategoryStateProp> = ({ 
  changeCategoryName, 
  changeGenre 
}) => {
  const categories: string[] = ["Upcoming", "Top Rated", "Popular", "Now Playing"];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CategoryListItem key={index} name={category} changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
        )
      })}
    </>
  );
};

export default CategoryList;