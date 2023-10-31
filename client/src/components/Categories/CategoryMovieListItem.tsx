import React from "react";
import { Link } from "react-router-dom";

interface CategoryMovieListProps {
  id: number;
  title: string;
  poster_path: string;
  changeMovieId: Function;
  release_date: string;
  vote_average: number;
}

const CategoryMovieListItem: React.FC<CategoryMovieListProps> = ({
  id,
  title,
  poster_path,
  changeMovieId,
  release_date,
  vote_average
}) => {
  return (
    <Link to="/movie">
      <div onClick={() => changeMovieId(id)}>
        <img className="w-full h-50 object-cover" src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          loading="lazy" />
        <h1><strong>{title}</strong></h1>
        <h1>{(release_date).slice(0, 4)}</h1>
      </div>
    </Link>
  );
};

export default CategoryMovieListItem;