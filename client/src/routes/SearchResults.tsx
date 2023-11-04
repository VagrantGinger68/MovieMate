import { useEffect, useState } from "react";
import CategoryMovieList from "../components/Categories/CategoryMovieList";
import { useParams } from 'react-router-dom';

const SearchRoute = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&region=CA`;
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
    getMovies();
  }, [query]);

  return (
    <>
      <div className="bg-black text-white pt-20">
        <h1 className="pt-10 pl-20 font-bold text-3xl">
          Search Results for {query}. Found {movies.length} Results!</h1>
      </div>
      <div className="bg-black text-white">
        <CategoryMovieList movies={movies} />
      </div>
    </>
  )
}

export default SearchRoute;
