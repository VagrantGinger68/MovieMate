import React from "react";

interface CategoryListProps {
  name: string;
  changeCategoryName: Function;
  changeGenre: Function;
}

const CategoryListItem: React.FC<CategoryListProps> = ({ 
  name, 
  changeCategoryName,
  changeGenre 
}) => {
  return (
    <span style={{cursor:"pointer"}} onClick={() => {changeCategoryName(name);
      changeGenre(0)}}>{name}</span>
  )
};

export default CategoryListItem;