import React from "react";

interface CategoryListProps {
  name: string;
}

const CategoryListItem: React.FC<CategoryListProps> = ({ name }) => {
  return (
    <span>{name}</span>
  )
};

export default CategoryListItem;