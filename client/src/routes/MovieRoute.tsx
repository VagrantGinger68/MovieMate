import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";

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

  const [crew, setCrew] = useState([{job: '', name: ''}]);

  const [similarMovies, setSimilarMovies] = useState([]);

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
      .then(json => {
        setCast(json.cast);
        setCrew(json.crew);
      })
      .catch(err => console.error('error:' + err));
  }

  const getSimilarMovies = () => {
    const url = 'https://api.themoviedb.org/3/movie/575264/similar?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => setSimilarMovies(json.results))
    .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getMovie()
    getCast()
    getSimilarMovies()
  }, [])

  console.log(movie);
  console.log(cast);
  console.log(crew);
  console.log(similarMovies);
  
  const director = crew.filter((crewDirector) => crewDirector.job === 'Director');
  const writer = crew.filter(crewWriter => crewWriter.job === "Writer");

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
      <h2>Director(s):</h2>
      {director.map(headCrew => {
        return (
          <h3>{headCrew.name}</h3>
        )
      })}
          <h2>Writer(s):</h2>
      {writer.map(headCrew => {
        return (
          <h3>{headCrew.name}</h3>
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

      <MovieList movies={similarMovies} />

    </>
  )
}

export default MovieRoute;