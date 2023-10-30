import { useEffect, useState } from "react";

const MovieRoute = () => {
  const [movie, setMovie] = useState({
    original_title: '',
    poster_path: '',
    release_date: '',
    tagline: '',
    overview: '',
    runtime: 0,
    vote_average: 0,
    genres: [{name: ''}],
  });
  const [cast, setCast] = useState([{
    profile_path: '', 
    name: '', 
    character: ''
  }]);

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
  console.log(cast);
  

  return (
    <>
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
      <h1>{movie.original_title}</h1>
      <h4>{movie.release_date}</h4>
      <p>{movie.vote_average * 10}%</p>
      <h4>{movie.tagline}</h4>
      <p>{movie.overview}</p>
      {movie.genres.map((genre, index) => {
        return (
          <h2 key={index}>{genre.name}</h2>
        )
      })}
      <p>Runtime: {movie.runtime} minutes</p>
      {cast.map((castMember, index) => {
        return (
          <div key={index}>
          <img src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`} />
          <h1>{castMember.name}</h1>
          <h2>as {castMember.character}</h2>
          </div>
        )
      }).slice(0,9)}

    </>
  )
}

export default MovieRoute;