import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

interface CategoryProp {
  changeMovieId: Function;
  categoryName: string;
}

const CategoryRoute: React.FC<CategoryProp> = ({ changeMovieId, categoryName }) => {
  let categoryComponent = null;

  switch (categoryName) {
    case 'Popular':
      categoryComponent = <PopularList changeMovieId={changeMovieId} />;
      break;
    case 'Upcoming':
      categoryComponent = <UpcomingList changeMovieId={changeMovieId} />;
      break;
    case 'Now Playing':
      categoryComponent = <NowPlayingList changeMovieId={changeMovieId} />;
      break;
    case 'Top Rated':
      categoryComponent = <TopRatedList changeMovieId={changeMovieId} />;
      break;
  }

  return (
    <>
      {categoryComponent}
    </>
  )
}

export default CategoryRoute;