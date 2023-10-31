import { useState } from "react";
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
}

const CategoryRoute: React.FC<CategoryProp> = ({ changeMovieId, categoryName, changeGenre, genre }) => {

  // const [genre, setGenre] = useState(0);

  // const changeGenre = (newGenre:number ) => {
  //   setGenre(newGenre)
  // };
  
  let categoryComponent = null;

  switch (categoryName) {
    case 'Popular':
      categoryComponent = <PopularList changeMovieId={changeMovieId} genre={genre}/>;
      break;
    case 'Upcoming':
      categoryComponent = <UpcomingList changeMovieId={changeMovieId} genre={genre}/>;
      break;
    case 'Now Playing':
      categoryComponent = <NowPlayingList changeMovieId={changeMovieId} genre={genre}/>;
      break;
    case 'Top Rated':
      categoryComponent = <TopRatedList changeMovieId={changeMovieId} genre={genre}/>;
      break;
  }

  return (
    <>
      <GenreList changeGenre={changeGenre}/>
      {categoryComponent}
    </>
  )
}

export default CategoryRoute;