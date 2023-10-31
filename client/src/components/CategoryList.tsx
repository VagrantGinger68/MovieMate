import CategoryListItem from "./CategoryListItem";

interface CategoryStateProp {
  changeCategoryName: Function;
}

const CategoryList: React.FC<CategoryStateProp> = ({ changeCategoryName }) => {
  const categories: string[] = ["Upcoming", "Top Rated", "Popular", "Now Playing"];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CategoryListItem key={index} name={category} changeCategoryName={changeCategoryName} />
        )
      })}
    </>
  );
};

export default CategoryList;