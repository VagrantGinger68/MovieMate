import React from "react";

interface CategoryListProps {
  name: string;
}

const CategoryListItem: React.FC<CategoryListProps> = ({ name }) => {
  return (
    <p>{name}</p>
  )
};

export default CategoryListItem;