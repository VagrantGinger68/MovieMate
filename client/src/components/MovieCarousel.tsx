import { useEffect, useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CCarousel,
  CCarouselItem,
  CImage,
  CCarouselCaption,
} from "@coreui/react";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

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

  console.log(shortMovieArray);

  // {shortMovieArray.map((movie) => {
  //   return (
  //     <>
  //       <img src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`}/>
  //       <h1>{movie.title}</h1>
  //     </>
  //   )
  // })}

  return (
    <CCarousel controls indicators className="pt-20">
      {shortMovieArray.map((movie) => {
        return (
          <CCarouselItem key={movie.id}>
            <CImage
              className="d-block w-100"
              src={`https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`}
            />
            <CCarouselCaption className="d-none d-md-block">
              <h1>{movie.title}</h1>
              <h3>
                {(movie.release_date).slice(0,4)}
              </h3>
            </CCarouselCaption>
          </CCarouselItem>
        );
      })}
    </CCarousel>
  );
};

export default MovieCarousel;
