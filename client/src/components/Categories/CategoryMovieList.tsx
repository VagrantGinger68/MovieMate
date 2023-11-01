import CategoryMovieListItem from "./CategoryMovieListItem";

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

const CategoryMovieList: React.FC<CategoryProps> = ({ movies, changeMovieId }) => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap pt-20">
      {
        movies.map(({ title, id, poster_path, release_date, vote_average }) => {
          return (
            <CategoryMovieListItem key={id} title={title} poster_path={poster_path} changeMovieId={changeMovieId} id={id} release_date={release_date} vote_average={vote_average} />
          )
        })
      }
    </div>
  )
}

export default CategoryMovieList;
