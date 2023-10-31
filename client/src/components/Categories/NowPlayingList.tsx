import { useEffect, useState } from "react";
import MovieList from "../MovieList";

interface IdStateProp {
  changeMovieId: Function;
  genre: number;
}

const NowPlayingList: React.FC<IdStateProp> = ({ changeMovieId, genre }) => {
  const [movies, setMovies] = useState([]);

  let tempURL = "";
  if (genre) {
    tempURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-31&release_date.lte=2023-11-01&sort_by=popularity.desc&region=CA&with_genres=${genre}`
  } else {
    tempURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=2023-10-01&release_date.lte=2023-10-31&sort_by=popularity.desc&region=CA'
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
    getMovies()
  }, [genre])

  console.log(movies);

  return (
    <>
      <MovieList movies={movies} changeMovieId={changeMovieId} />
    </>
  )
}

export default NowPlayingList;
