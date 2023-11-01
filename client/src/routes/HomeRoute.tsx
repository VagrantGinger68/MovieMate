import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

interface IdStateProp {
  changeMovieId: Function;
  changeDisplayList: Function;
  displayList: boolean;
}


const HomeRoute: React.FC<IdStateProp> = ({ changeMovieId, changeDisplayList, displayList }) => {
  changeDisplayList(true);

  return (
    <div className="px-8">
      <h1 className="text-3xl font-bold">Popular</h1>
      <PopularList changeMovieId={changeMovieId} genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <UpcomingList changeMovieId={changeMovieId} genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Now Playing</h1>
      <NowPlayingList changeMovieId={changeMovieId} genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Top Rated</h1>
      <TopRatedList changeMovieId={changeMovieId} genre={0} displayHomepage={displayList} />
    </div>
  )
}

export default HomeRoute;