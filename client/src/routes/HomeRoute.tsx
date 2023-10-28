import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";
import GenreList from "../components/GenreList";


const HomeRoute = () => {
  return (
    <>
      <TopNavBar />
      <GenreList />
      <MovieList />
      <Footer />
    </>
    )
}

export default HomeRoute;