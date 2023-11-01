import React from "react";
import { Link } from "react-router-dom";

interface CategoryMovieListProps {
  id: number;
  title: string;
  poster_path: string;
  changeMovieId: Function;
  release_date: string;
  vote_average: number;
}

const CategoryMovieListItem: React.FC<CategoryMovieListProps> = ({
  id,
  title,
  poster_path,
  changeMovieId,
  release_date,
  vote_average
}) => {
  return (
    <Link to="/movie">
      <section>
        <div>
          <div className="py-3 sm:max-w-xl sm:mx-auto" onClick={() => changeMovieId(id)}>
            <div className="dark:bg-slate-800 shadow-lg border-gray-100 max-h-90	 border sm:rounded-3xl p-2 flex space-x-1">
              <div className="h-100 overflow-visible w-48">
                {poster_path ? (<img
                  className="rounded-2xl shadow-lg"
                  src={`https://www.themoviedb.org/t/p/w780/${poster_path}`}
                />) : (<img className="rounded-2xl shadow-lg" src={"https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg"} />)}
              </div>

              <div className="flex flex-col w-48 space-y-4">
                <div className="flex justify-between items-start">
                  {title.length > 30 &&
                    <h2 className="text-3xl font-bold">{(title).slice(0, 30)}...</h2>
                  }
                  {title.length <= 30 &&
                    <h2 className="text-3xl font-bold">{(title).slice(0, 30)}</h2>
                  }
                </div>
                <div>
                  <div className="dark:text-slate-400">
                    {release_date.slice(0, 4)}
                  </div>
                </div>
                {((vote_average) * 10) >= 80 &&
                  <div className="bg-green-400 font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
                }
                {((vote_average) * 10) < 80 && ((vote_average) * 10) >= 50 &&
                  <div className="bg-yellow-400 font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
                }
                {((vote_average) * 10) < 50 && ((vote_average) * 10) > 0 &&
                  <div className="bg-red-400 font-bold rounded-xl p-2 w-10 text-center">{((vote_average) * 10).toFixed(0)}</div>
                }
                {((vote_average) * 10) === 0 &&
                  <div className="bg-gray-400 font-bold rounded-xl p-2 w-10 text-center">NR</div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </Link >
  );
};

export default CategoryMovieListItem;