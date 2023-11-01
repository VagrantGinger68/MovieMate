import { useEffect, useState } from "react";
import CategoryMovieList from "../components/Categories/CategoryMovieList";
import { useParams } from 'react-router-dom';

interface SearchProp {
  changeMovieId: Function;
}

const SearchRoute: React.FC<SearchProp> = ({ changeMovieId }) => {
  const { query } = useParams();

  console.log("query", query);
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
    getMovies()
  }, [query])


  // console.log(movies);

  return (
    <>
      <CategoryMovieList movies={movies} changeMovieId={changeMovieId} />
    </>
  )
}

export default SearchRoute;
