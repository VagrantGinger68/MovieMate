import React from "react";

interface CategoryListProps {
  name: string;
  changeCategoryName: Function;
}

const CategoryListItem: React.FC<CategoryListProps> = ({ name, changeCategoryName }) => {
  return (
    <span onClick={() => changeCategoryName(name)}>{name}</span>
  )
};

export default CategoryListItem;