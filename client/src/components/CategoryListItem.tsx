import React from "react";
import { Link } from 'react-router-dom'

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
    <Link to="/categories">
      <span style={{ cursor: "pointer" }} onClick={() => {
        changeCategoryName(name);
        changeGenre(0)
      }}>{name}</span>
    </Link>
  )
};

export default CategoryListItem;