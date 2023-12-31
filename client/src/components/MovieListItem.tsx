import { Link } from "react-router-dom";

interface MovieListProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const MovieListItem: React.FC<MovieListProps> = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-[#3f3f3f] shadow-lg border-gray-100 max-h-90	 border sm:rounded-3xl p-8 flex space-x-8 dark:text-white">
          <div className="h-100 overflow-visible w-48">
            {poster_path ? (<img
              className="rounded-2xl shadow-lg"
              src={`https://www.themoviedb.org/t/p/w780/${poster_path}`}
            />) : (<img className="rounded-2x1 shadow-lg" src={"https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"} />)}
          </div>
          <div className="flex flex-col w-48 space-y-4">
            <div className="flex justify-between items-start">
              {title.length > 30 &&
                <h2 className="text-3xl font-bold ">{(title).slice(0, 30)}...</h2>
              }
              {title.length <= 30 &&
                <h2 className="text-3xl font-bold">{(title).slice(0, 30)}</h2>
              }
            </div>
            <div>
              <div className="text-1xl dark:text-slate-400">
                <h3>{release_date.slice(0, 4)}</h3>
              </div>
            </div>
            {((vote_average) * 10) >= 80 &&
              <div className="bg-[#4E9F3D] font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
            }
            {((vote_average) * 10) < 80 && ((vote_average) * 10) >= 50 &&
              <div className="bg-[#D89216] font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
            }
            {((vote_average) * 10) < 50 && ((vote_average) * 10) > 0 &&
              <div className="bg-[#950101] font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
            }
            {((vote_average) * 10) === 0 &&
              <div className="bg-[#2B2B2B] font-bold rounded-xl p-2 w-10 text-center">NR</div>
            }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieListItem;
