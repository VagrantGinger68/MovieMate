import { useEffect, useState } from "react";
import CategoryMovieList from "./CategoryMovieList";
import MovieList from "../MovieList";

interface IdStateProp {
  genre: number;
  displayHomepage: boolean;
}

const UpcomingList: React.FC<IdStateProp> = ({ genre, displayHomepage }) => {
  const [movies, setMovies] = useState([]);

  let tempURL = "";
  if (genre) {
    tempURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-11-01&release_date.lte=2023-12-01&region=CA&with_genres=${genre}`
  } else {
    tempURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2023-11-01&release_date.lte=2023-12-01&region=CA'
  }

  const getMovies = () => {
    const url = tempURL;
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
  }, [genre]);

  return (
    <>
      {!displayHomepage &&
        <CategoryMovieList movies={movies} />
      }
      {displayHomepage &&
        <MovieList movies={movies} />
      }
    </>
  )
}

export default UpcomingList;
