import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";

const HomeRoute = () => {
  return (
    <>
      <h1>Popular</h1>
      <PopularList />
      <h1>Upcoming</h1>
      <UpcomingList />
      <h1>Now Playing</h1>
      <NowPlayingList />
      <h1>Top Rated</h1>
      <TopRatedList />
    </>
  )
}

export default HomeRoute;