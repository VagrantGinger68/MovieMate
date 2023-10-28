import CategoryListItem from "./CategoryListItem";

const CategoryList = () => {
  const categories: string[] = ["Upcoming", "Top Rated", "Popular", "Now Playing"];

  return (
    <>
      {categories.map((category, index) => {
        return (
          <CategoryListItem key={index} name={category} />
        )
      })}
    </>
  );
};

export default CategoryList;