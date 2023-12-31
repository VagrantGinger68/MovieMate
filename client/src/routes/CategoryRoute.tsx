import { useParams } from "react-router-dom";
import NowPlayingList from "../components/Categories/NowPlayingList";
import PopularList from "../components/Categories/PopularList";
import TopRatedList from "../components/Categories/TopRatedList";
import UpcomingList from "../components/Categories/UpcomingList";
import GenreList from "../components/GenreList";
import { useEffect, useState } from "react";

interface CategoryProp {
  genre: number;
  changeGenre: Function;
  changeDisplayList: Function;
  displayList: boolean;
}

const CategoryRoute: React.FC<CategoryProp> = ({
  changeGenre,
  genre,
  changeDisplayList,
  displayList
}) => {
  changeDisplayList(false);
  const [selectedGenre, setSelectedGenre] = useState(0);

  useEffect(() => {
    setSelectedGenre(genre);
  }, [genre])

  const { categoryName } = useParams();

  let categoryComponent = null;

  switch (categoryName) {
    case 'Popular':
      categoryComponent = <PopularList
        genre={genre}
        displayHomepage={displayList} />;
      break;
    case 'Upcoming':
      categoryComponent = <UpcomingList
        genre={genre}
        displayHomepage={displayList} />;
      break;
    case 'Now Playing':
      categoryComponent = <NowPlayingList
        genre={genre}
        displayHomepage={displayList} />;
      break;
    case 'Top Rated':
      categoryComponent = <TopRatedList
        genre={genre}
        displayHomepage={displayList} />;
      break;
  }

  return (
    <>
      <div className="bg-[#282828] dark:text-white flex flex-row min-h-screen">
        <div className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 pl-7 bg-[#282828] fixed z-5">
          <GenreList changeGenre={changeGenre} selectedGenre={selectedGenre} />
        </div>
        <div className="pl-[14em] pt-[7em]">
          {categoryComponent}
        </div>
      </div>
    </>
  )
}

export default CategoryRoute;