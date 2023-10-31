import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

interface IdStateProp {
  changeMovieId: Function;
}


const HomeRoute: React.FC<IdStateProp> = ({ changeMovieId }) => {
  return (
    <div className="pt-24 px-8">
      <h1 className="text-3xl font-bold">Popular</h1>
      <PopularList changeMovieId={changeMovieId} />
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <UpcomingList changeMovieId={changeMovieId} />
      <h1 className="text-3xl font-bold">Now Playing</h1>
      <NowPlayingList changeMovieId={changeMovieId} />
      <h1 className="text-3xl font-bold">Top Rated</h1>
      <TopRatedList changeMovieId={changeMovieId} />
    </div>
  )
}

export default HomeRoute;