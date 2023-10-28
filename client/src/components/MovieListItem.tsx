import React from "react";

interface MovieListProps {
  title: string;
  poster_path: string;
}

const MovieListItem: React.FC<MovieListProps> = ({ title, poster_path }) => {
  return (
    <>
      <h1>Title: {title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} />
    </>
  )
};

export default MovieListItem;