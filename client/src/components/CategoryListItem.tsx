import { Link } from 'react-router-dom'

interface CategoryListProps {
  name: string;
  changeGenre: Function;
  isSelected: boolean;
}

const CategoryListItem: React.FC<CategoryListProps> = ({
  name,
  changeGenre,
  isSelected
}) => {
  return (
    <Link to={`/categories/${name}`}>
      <span className={`hover:text-white ${isSelected ? "text-white" : "text-slate-300"}  font-bold text-xl`} style={{ cursor: "pointer" }} onClick={() => {
        changeGenre(0)
      }}>{name}</span>
    </Link>
  )
};

export default CategoryListItem;