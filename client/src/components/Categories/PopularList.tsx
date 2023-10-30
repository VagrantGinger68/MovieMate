import { useEffect, useState } from "react";
import MovieList from "../MovieList";

const PopularList = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovies(json.results))
      .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getMovies()
  }, [])

  console.log(movies);

  return (
    <>
      <MovieList movies={movies} />
    </>
  )
}

export default PopularList;
