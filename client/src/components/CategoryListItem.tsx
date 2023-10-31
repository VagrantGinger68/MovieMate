import React from "react";

interface CategoryListProps {
  name: string;
  changeCategoryName: Function;
}

const CategoryListItem: React.FC<CategoryListProps> = ({ name, changeCategoryName }) => {
  return (
    <span style={{cursor:"pointer"}} onClick={() => changeCategoryName(name)}>{name}</span>
  )
};

export default CategoryListItem;