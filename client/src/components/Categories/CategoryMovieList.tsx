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
}

const CategoryMovieList: React.FC<CategoryProps> = ({ movies }) => {
  return (
    <div className="flex flex-row justify-evenly flex-wrap">
      {
        movies.map(({ title, id, poster_path, release_date, vote_average }) => {
          return (
            <CategoryMovieListItem key={id} title={title} poster_path={poster_path} id={id} release_date={release_date} vote_average={vote_average} />
          )
        })
      }
    </div>
  )
}

export default CategoryMovieList;
