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
}

const CategoryRoute: React.FC<CategoryProp> = ({ changeMovieId, categoryName }) => {

  const [genre, setGenre] = useState(Number);

  const changeGenre = (newGenre:number ) => {
    setGenre(newGenre)
  };

  console.log(genre);
  

  let categoryComponent = null;

  switch (categoryName) {
    case 'Popular':
      categoryComponent = <PopularList changeMovieId={changeMovieId} genre={genre}/>;
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
      <GenreList changeGenre={changeGenre}/>
      {categoryComponent}
    </>
  )
}

export default CategoryRoute;