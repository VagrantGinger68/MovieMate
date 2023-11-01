import { useEffect, useState } from "react";
import CategoryMovieList from "../components/Categories/CategoryMovieList";

interface SearchProp {
  search: string;
  changeMovieId: Function;
}

const SearchRoute: React.FC<SearchProp> = ({ search, changeMovieId }) => {
  console.log("Search", search);
  const [movies, setMovies] = useState([]);

  const getMovies = () => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&region=CA`;
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
  }, [search])

  // console.log(movies);

  return (
    <>
      <CategoryMovieList movies={movies} changeMovieId={changeMovieId} />
    </>
  )
}

export default SearchRoute;
