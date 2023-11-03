import CategoryListItem from "./CategoryListItem";

interface CategoryStateProp {
  changeGenre: Function;
}

const CategoryList: React.FC<CategoryStateProp> = ({
  changeGenre
}) => {
  const categories: string[] = ["Upcoming", "Top Rated", "Popular", "Now Playing"];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CategoryListItem key={index} name={category} changeGenre={changeGenre} />
        )
      })}
    </>
  );
};

export default CategoryList;