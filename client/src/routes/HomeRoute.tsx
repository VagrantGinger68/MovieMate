import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

interface IdStateProp {
  changeDisplayList: Function;
  displayList: boolean;
}

const HomeRoute: React.FC<IdStateProp> = ({ changeDisplayList, displayList }) => {
  document.title="MovieMate"

  changeDisplayList(true);

  return (
    <div className="bg-[#282828] dark:text-white px-8">
      <h1 className="text-3xl font-bold">Popular</h1>
      <PopularList genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <UpcomingList genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Now Playing</h1>
      <NowPlayingList genre={0} displayHomepage={displayList} />
      <h1 className="text-3xl font-bold">Top Rated</h1>
      <TopRatedList genre={0} displayHomepage={displayList} />
    </div>
  )
}

export default HomeRoute;