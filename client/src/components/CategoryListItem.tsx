import { Link } from 'react-router-dom'

interface CategoryListProps {
  name: string;
  changeGenre: Function;
}

const CategoryListItem: React.FC<CategoryListProps> = ({
  name,
  changeGenre
}) => {
  return (
    <Link to={`/categories/${name}`}>
      <span className="hover:text-white text-slate-300 font-bold" style={{ cursor: "pointer" }} onClick={() => {
        changeGenre(0)
      }}>{name}</span>
    </Link>
  )
};

export default CategoryListItem;