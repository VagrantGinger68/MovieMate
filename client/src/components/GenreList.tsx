import React from 'react';
import { useEffect, useState } from "react";
import GenreListItem from "./GenreListItem";

interface GenreProp {
  changeGenre: Function;
}

const GenreList: React.FC<GenreProp> = ({ changeGenre }) => {

  const [genres, setGenres] = useState([]);

  const getGenres = () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setGenres(json.genres))
      .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getGenres()
  }, [])

  console.log(genres);

  return (
    <>
      {genres.map(({ name, id }) => {
        return (
          <GenreListItem key={id} name={name} changeGenre={changeGenre} id={id}/>
        )
      })}
    </>
  );
};

export default GenreList;