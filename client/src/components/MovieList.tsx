import MovieListItem from "./MovieListItem";

interface CategoryProps {
  movies: Movies[]
}
interface Movies {
  title: string,
  id: number,
  poster_path: string,
  release_date: string,
  vote_average: number
}

const MovieList: React.FC<CategoryProps> = ({ movies }) => {
  return (
    <div className="flex overflow-x-auto space-x-10 pt-2 pb-4 ">
      {movies.map(({ title, id, poster_path, release_date, vote_average }) => {
        return (
          <MovieListItem key={id} title={title} poster_path={poster_path} id={id} release_date={release_date} vote_average={vote_average} />
        )
      })}
    </div>
  )
}

export default MovieList;
