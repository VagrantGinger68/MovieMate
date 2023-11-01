import MovieListItem from "./MovieListItem";

interface Movies {
  title: string,
  id: number,
  poster_path: string,
  release_date: string,
  vote_average: number
}
interface CategoryProps {
  movies: Movies[]
  changeMovieId: Function;
}

const MovieList: React.FC<CategoryProps> = ({ movies, changeMovieId }) => {
  return (
    <div className="flex overflow-x-auto space-x-10 pt-2 pb-5">
      {movies.map(({ title, id, poster_path, release_date, vote_average }) => {
        return (
          <MovieListItem key={id} title={title} poster_path={poster_path} changeMovieId={changeMovieId} id={id} release_date={release_date} vote_average={vote_average}/>
        )
      })}
    </div>
  )
}

export default MovieList;
