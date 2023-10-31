import MovieListItem from "./MovieListItem";

interface Movies {
  title: string,
  id: number,
  poster_path: string
}
interface CategoryProps {
  movies: Movies[]
  changeMovieId: Function;
}

const MovieList: React.FC<CategoryProps> = ({ movies, changeMovieId }) => {
  return (
    <>
      {movies.map(({ title, id, poster_path }) => {
        return (
          <MovieListItem key={id} title={title} poster_path={poster_path} changeMovieId={changeMovieId} id={id} />
        )
      })}
    </>
  )
}

export default MovieList;
