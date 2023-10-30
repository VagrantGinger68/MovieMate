import { useEffect, useState } from "react";

const MovieRoute = () => {

  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([{}]);

  const getMovie = () => {
    const url = 'https://api.themoviedb.org/3/movie/575264?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setMovie(json))
      .catch(err => console.error('error:' + err));
  }

  const getCast = () => {
    const url = 'https://api.themoviedb.org/3/movie/575264/credits?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setCast(json.cast))
      .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getMovie()
    getCast()
  }, [])

  console.log(movie);
  

  return (
    <>
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
      <h1>{movie.original_title}</h1>
      <h4>{movie.release_date}</h4>
      <h4>{movie.tagline}</h4>
      <p>{movie.overview}</p>
      {/* {movie.genres.map((genre) => {
        return (
          <h2>{genre.name}</h2>
        )
      })} */}
      <p>Runtime: {movie.runtime} minutes</p>
      {cast.map((castMember) => {
        return (
          <>
          <img src={`https://image.tmdb.org/t/p/w200/${castMember.profile_path}`} />
          <h1>{castMember.name}</h1>
          </>
        )
      }).slice(0,9)}

    </>
  )
}

export default MovieRoute;