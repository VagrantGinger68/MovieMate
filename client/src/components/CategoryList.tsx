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
    "Upcoming",
    "Top Rated",
    "Popular",
    "Now Playing"
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