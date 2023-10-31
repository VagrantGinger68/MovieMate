import React from "react";

interface MovieListProps {
  id: number;
  title: string;
  poster_path: string;
  changeMovieId: Function;
}

const MovieListItem: React.FC<MovieListProps> = ({ id, title, poster_path, changeMovieId }) => {
  return (
    <div onClick={() => changeMovieId(id)}>
      <h1>Title: {title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
    </div>
  )
};

export default MovieListItem;