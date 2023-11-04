import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import YouTube, { YouTubeProps } from "react-youtube";
import Chat from "../components/Chat";
import { useParams } from "react-router-dom";
import LikeIcon from "../components/LikeIcon";

interface MovieIdProps {
  cookies: {
    name?: string;
  }
}

const MovieRoute: React.FC<MovieIdProps> = ({ cookies }) => {
  const { id } = useParams();

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

  return (
    <div className="bg-[#282828] py-4">
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
      <div className="w-full max-w-[75%] mx-auto pt-10">
        <div className="flex justify-center mb-4 text-white">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.original_title}
            className="rounded-lg shadow-lg"
          />
          <div className="ml-6">
            <h1 className="text-4xl font-bold">{movie.original_title} <LikeIcon movieId={movie.id} /></h1> 
            <h4 className="text-lg text-[#DDDDDD]">{movie.release_date}</h4>
            <p className="text-2xl font-bold py-4">
            {((movie.vote_average) * 10) >= 80 &&
              <span className="bg-[#4E9F3D] font-bold rounded-xl p-2 w-10 text-center">{((movie.vote_average) * 10).toFixed(0)}</span>
            }
            {((movie.vote_average) * 10) < 80 && ((movie.vote_average) * 10) >= 50 &&
              <span className="bg-[#D89216] font-bold rounded-xl p-2 w-10 text-center">{((movie.vote_average) * 10).toFixed(0)}</span>
            }
            {((movie.vote_average) * 10) < 50 && ((movie.vote_average) * 10) > 0 &&
              <span className="bg-[#950101] font-bold rounded-xl p-2 w-10 text-center">{((movie.vote_average) * 10).toFixed(0)}</span>
            }
            {((movie.vote_average) * 10) === 0 &&
              <span className="bg-[#2B2B2B] font-bold rounded-xl p-2 w-10 text-center">NR</span>
            }
            </p>
            <h4 className="text-2xl font-semibold pb-1">{movie.tagline}</h4>
            <p className="text-xl pb-4">{movie.overview}</p>
            <div className="flex flex-wrap space-x-2">
              {movie.genres.map((genre, index) => (
                <span
                  key={index}
                  className="bg-[#4477CE] text-white text-lg px-2 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h2 className="text-xl font-bold mt-2 pt-2">Director(s):</h2>
            <div className="space-x-2">
              {director.map((headCrew, index) => (
                <span key={index} className="text-sm">
                  {headCrew.name}
                </span>
              ))}
            </div>
            <p className="text-lg mt-4">Runtime: {movie.runtime} minutes</p>
          </div>
        </div>
        <div>
          <Chat movieId={movie.id} cookies={cookies} />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">Cast</h1>
        <div className="flex overflow-x-auto space-x-4 pb-5">
          {cast.slice(0, 10).map((castMember, index) => (
            <div
              key={index}
              className="bg-[#3f3f3f] dark:text-white shadow-lg border-gray-100  border sm:rounded-3xl p-4 flex space-x-8"
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
        <h1 className="text-3xl font-bold text-white mt-4">Similar Movies</h1>
        <MovieList movies={similarMovies} />
      </div>
    </div>
  );
};

export default MovieRoute;
