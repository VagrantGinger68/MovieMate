import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import YouTube, { YouTubeProps } from "react-youtube";
import Chat from "../components/Chat";

interface MovieIdProps {
  id: number;
  changeMovieId: Function;
  cookies: object;
}

const MovieRoute: React.FC<MovieIdProps> = ({ id, changeMovieId, cookies }) => {
  console.log(id);
  const [movie, setMovie] = useState({
    original_title: "",
    poster_path: "",
    release_date: "",
    tagline: "",
    overview: "",
    runtime: 0,
    vote_average: 0,
    genres: [{ name: "" }],
    backdrop_path: "",
    id: 0,
  });
  const [cast, setCast] = useState([
    {
      profile_path: "",
      name: "",
      character: "",
    },
  ]);

  const [crew, setCrew] = useState([{ job: "", name: "" }]);

  const [similarMovies, setSimilarMovies] = useState([]);

  const [trailer, setTrailer] = useState([{ type: "", site: "", key: "" }]);

  const getMovie = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovie(json))
      .catch((err) => console.error("error:" + err));
  };

  const getCast = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setCast(json.cast);
        setCrew(json.crew);
      })
      .catch((err) => console.error("error:" + err));
  };

  const getSimilarMovies = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setSimilarMovies(json.results))
      .catch((err) => console.error("error:" + err));
  };

  const getTrailer = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setTrailer(json.results))
      .catch((err) => console.error("error:" + err));
  };

  useEffect(() => {
    getMovie();
    getCast();
    getSimilarMovies();
    getTrailer();
  }, [id]);

  // console.log(movie);
  // console.log(cast);
  // console.log(crew);
  // console.log(similarMovies);
  // console.log(trailer);

  const director = crew.filter(
    (crewDirector) => crewDirector.job === "Director"
  );
  const firstTrailer = trailer.find(
    (trailer) => trailer.type === "Trailer" && trailer.site === "YouTube"
  );

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "490",
    width: "840",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleLike = (movieId, userId) => {
    const data = {
      user_id: userId,
      movie_id: movieId,
    };

    fetch('http://localhost:3000/liked_movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log('Like created successfully');
        } else {
          console.error('Failed to create a like');
        }
      })
      .catch((error) => {
        console.error('Request failed:', error);
      });
  };

  const handleMovie = (movieId) => {

    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({movieId: movieId})
    });
  }

  const handleClick = (movieId, userId) => {
    handleMovie(movieId);
    handleLike(movieId,userId);
  }

  return (
    <div className="bg-black py-4">
      <div
        className="flex items-center justify-center mb-4 mt-16"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/original/${movie.backdrop_path})`,
        }}
      >
        <YouTube
          key={firstTrailer?.key}
          videoId={firstTrailer?.key}
          opts={opts}
          onReady={onPlayerReady}
          className="my-20"
        />
      </div>
      <div className="w-full max-w-screen-xl mx-auto pt-10">
        <div className="flex items-center justify-center mb-4 text-white">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.original_title}
            className="w-48 h-72 rounded-lg shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{movie.original_title}</h1>
            <h4 className="text-sm text-gray-600">{movie.release_date}</h4>
            <p className="text-2xl font-bold">
              {(movie.vote_average * 10).toFixed(0)}%
            </p>
            <h4 className="text-lg font-semibold">{movie.tagline}</h4>
            <p className="text-lg">{movie.overview}</p>
            <div className="flex flex-wrap space-x-2">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div>
              <button
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => handleClick(movie.id,1)}
              >
                Like
              </button>
            </div>
            <h2 className="text-xl font-bold mt-2">Director(s):</h2>
            <div className="space-x-2">
              {director.map((headCrew, index) => (
                <span key={index} className="text-sm">
                  {headCrew.name}
                </span>
              ))}
            </div>
            <p className="text-lg mt-2">Runtime: {movie.runtime} minutes</p>
          </div>
        </div>
        <div>
          <Chat movieId={movie.id} cookies={cookies}/>
        </div>
        <h1 className="text-3xl font-bold mt-4 text-white">Cast</h1>
        <div className="flex overflow-x-auto space-x-4 pb-5">
          {cast.slice(0, 10).map((castMember, index) => (
            <div
              key={index}
              className="dark:bg-slate-900 dark:text-white shadow-lg border-gray-100  border sm:rounded-3xl p-4 flex space-x-8"
            >
              <div className="h-100 overflow-visible w-48 ">
                {castMember.profile_path ? (
                  <img
                    className="rounded-2xl shadow-lg"
                    src={`https://image.tmdb.org/t/p/original/${castMember.profile_path}`}
                  />
                ) : (
                  <img
                    className="rounded-2x1 shadow-lg"
                    src={
                      "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"
                    }
                  />
                )}
                <h2 className="text-3xl font-bold pt-2">{castMember.name}</h2>
                <h2 className="text-2xl pt-2">{castMember.character}</h2>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-white">Similar Movies</h1>
        <MovieList movies={similarMovies} changeMovieId={changeMovieId} />
      </div>
    </div>
  );
};

export default MovieRoute;
