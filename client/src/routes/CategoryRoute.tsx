import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";
import GenreList from "../components/GenreList";

interface CategoryProp {
  changeMovieId: Function;
  categoryName: string;
  genre: number;
  changeGenre: Function;
  changeDisplayList: Function;
  displayList: boolean;
}

const CategoryRoute: React.FC<CategoryProp> = ({ changeMovieId, categoryName, changeGenre, genre, changeDisplayList, displayList }) => {
  changeDisplayList(false);

  let categoryComponent = null;

  switch (categoryName) {
    case 'Popular':
      categoryComponent = <PopularList changeMovieId={changeMovieId} genre={genre} displayHomepage={displayList} />;
      break;
    case 'Upcoming':
      categoryComponent = <UpcomingList changeMovieId={changeMovieId} genre={genre} displayHomepage={displayList} />;
      break;
    case 'Now Playing':
      categoryComponent = <NowPlayingList changeMovieId={changeMovieId} genre={genre} displayHomepage={displayList} />;
      break;
    case 'Top Rated':
      categoryComponent = <TopRatedList changeMovieId={changeMovieId} genre={genre} displayHomepage={displayList} />;
      break;
  }

  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white flex flex-row">
      <div className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 dark:bg-slate-900 shadow sm:items-baseline fixed z-5">
      <GenreList changeGenre={changeGenre} />
      </div>
      {categoryComponent}
    </div>
    </>
  )
}

export default CategoryRoute;