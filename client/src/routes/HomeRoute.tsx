import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

interface IdStateProp {
  changeMovieId: Function;
}


const HomeRoute: React.FC<IdStateProp> = ({ changeMovieId }) => {
  return (
    <>
      <h1>Popular</h1>
      <PopularList changeMovieId={changeMovieId} />
      <h1>Upcoming</h1>
      <UpcomingList changeMovieId={changeMovieId} />
      <h1>Now Playing</h1>
      <NowPlayingList changeMovieId={changeMovieId} />
      <h1>Top Rated</h1>
      <TopRatedList changeMovieId={changeMovieId} />
    </>
  )
}

export default HomeRoute;