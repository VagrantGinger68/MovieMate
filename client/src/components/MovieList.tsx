import MovieListItem from "./MovieListItem";

interface Movies {
  title: string,
  id: number,
  poster_path: string
}

interface CategoryProps {
  movies: Movies[]
}

const MovieList: React.FC<CategoryProps> = ({ movies }) => {
  return (
    <>
      {movies.map(({ title, id, poster_path }) => {
        return (
          <MovieListItem key={id} title={title} poster_path={poster_path} />
        )
      })}
    </>
  )
}

export default MovieList;
