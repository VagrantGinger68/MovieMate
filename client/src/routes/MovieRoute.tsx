import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import YouTube, { YouTubeProps } from 'react-youtube';

interface MovieIdProps {
  id: number,
  changeMovieId: Function;
}

const MovieRoute: React.FC<MovieIdProps> = ({ id, changeMovieId }) => {
  console.log(id);
  const [movie, setMovie] = useState({
    original_title: '',
    poster_path: '',
    release_date: '',
    tagline: '',
    overview: '',
    runtime: 0,
    vote_average: 0,
    genres: [{ name: '' }],
  });
  const [cast, setCast] = useState([{
    profile_path: '',
    name: '',
    character: ''
  }]);

  const [crew, setCrew] = useState([{ job: '', name: '' }]);

  const [similarMovies, setSimilarMovies] = useState([]);

  const [trailer, setTrailer] = useState([{ type: '', site: '', key: '' }]);

  const getMovie = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
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
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
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

  const getTrailer = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_TMDB_API_KEY
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setTrailer(json.results))
      .catch(err => console.error('error:' + err));
  }

  useEffect(() => {
    getMovie()
    getCast()
    getSimilarMovies()
    getTrailer()
  }, [id])

  // console.log(movie);
  // console.log(cast);
  // console.log(crew);
  // console.log(similarMovies);
  // console.log(trailer);

  const director = crew.filter((crewDirector) => crewDirector.job === 'Director');
  const firstTrailer = trailer.find((trailer) => trailer.type === "Trailer" && trailer.site === "YouTube");

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  return (
    <>
      <YouTube key={firstTrailer?.key} videoId={firstTrailer?.key} opts={opts} onReady={onPlayerReady}/>
      <img src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />
      <h1>{movie.original_title}</h1>
      <h4>{movie.release_date}</h4>
      <p>{(movie.vote_average * 10).toFixed(0)}%</p>
      <h4>{movie.tagline}</h4>
      <p>{movie.overview}</p>
      {movie.genres.map((genre, index) => {
        return (
          <h2 key={index}>{genre.name}</h2>
        )
      })}
      <h2>Director(s):</h2>
      {director.map((headCrew, index) => {
        return (
          <h3 key={index}>{headCrew.name}</h3>
        )
      })}
      <p>Runtime: {movie.runtime} minutes</p>

      
      <h1 className="text-3xl font-bold">Cast</h1>
      <div className="flex overflow-x-auto space-x-10 pt-2 pb-5">
      {cast.map((castMember, index) => {
        return (
          <div key={index} className="py-3 sm:max-w-xl sm:mx-auto">
            <div className="bg-white shadow-lg border-gray-100 h-100	 border sm:rounded-3xl p-4 flex space-x-8">
              <div className="h-100 overflow-visible w-48 ">
                {castMember.profile_path ? (<img className="rounded-2xl shadow-lg" src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`} />) : (<img className="rounded-2x1 shadow-lg" src={"https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"} />)}
                  <h2 className="text-3xl font-bold pt-2">{castMember.name}</h2>
                  <h2 className="text-2xl pt-2">{castMember.character}</h2>
              </div>
            </div>
          </div>
        )
      }).slice(0, 10)}
      </div>

      <h1 className="text-3xl font-bold">Similar Movies</h1>
      <MovieList movies={similarMovies} changeMovieId={changeMovieId} />
    </>
  )
}

export default MovieRoute;