import { useEffect, useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";
import { Link } from "react-router-dom";

interface Movies {
  title: string,
  id: number,
  poster_path: string,
  release_date: string,
  vote_average: number,
  backdrop_path: string,
}


const MovieCarousel = () => {
  const [movies, setMovies] = useState<Movies[]>([]);

  const getMovies = () => {
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=CA&sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_TMDB_API_KEY,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  const shortMovieArray = movies.slice(0, 5);

  return (
    <CCarousel controls indicators className="pt-[5em] bg-[#282828]">
      {shortMovieArray.map((movie) => {
        return (
          <CCarouselItem key={movie.id} className="h-[35em]">
            <Link to={`/movie/${movie.id}`}>
              <CImage
                className="d-block w-100 overflow-hidden"
                src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`}
              />
              <CCarouselCaption className="d-none d-md-block">
                <div>
                  <h1 className="text-7xl font-bold text-white drop-shadow-lg shadow-black">{movie.title}</h1>
                  <p className="text-3xl font-bold text-white drop-shadow-lg shadow-black">
                    {(movie.release_date).slice(0, 4)}
                  </p>
                </div>
              </CCarouselCaption>
            </Link>
          </CCarouselItem>
        );
      })}
    </CCarousel>
  );
};

export default MovieCarousel;
