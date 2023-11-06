import CategoryListItem from "./CategoryListItem";

interface CategoryStateProp {
  changeGenre: Function;
  currentCategory: string;
}

const CategoryList: React.FC<CategoryStateProp> = ({
  changeGenre,
  currentCategory
}) => {
  const categories: string[] = [
    "Popular",
    "Upcoming",
    "Now Playing",
    "Top Rated"
  ];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CategoryListItem
            key={index}
            name={category}
            changeGenre={changeGenre}
            isSelected={currentCategory === category}
          />
        )
      })}
    </>
  );
};

export default CategoryList;