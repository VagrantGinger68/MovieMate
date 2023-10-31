import React from "react";
import { Link } from "react-router-dom";

interface MovieListProps {
  id: number;
  title: string;
  poster_path: string;
  changeMovieId: Function;
  release_date: string;
  vote_average: number;
}

const MovieListItem: React.FC<MovieListProps> = ({
  id,
  title,
  poster_path,
  changeMovieId,
  release_date,
  vote_average
}) => {
  return (
    <Link to="/movie">
      {/* <div onClick={() => changeMovieId(id)}>
        <img className="w-full h-50 object-cover" src={`https://image.tmdb.org/t/p/original/${poster_path}`} loading="lazy"/>
        <h1><strong>{title}</strong></h1>
        <h1>{(release_date).slice(0,4)}</h1>
      </div> */}

      <div className="py-3 sm:max-w-xl sm:mx-auto" onClick={() => changeMovieId(id)}>
        <div className="bg-white shadow-lg border-gray-100 max-h-90	 border sm:rounded-3xl p-8 flex space-x-8">
          <div className="h-100 overflow-visible w-48">
            <img
              className="rounded-2xl shadow-lg"
              src={`https://www.themoviedb.org/t/p/w780/${poster_path}`}
              alt=""
            />
          </div>
          <div className="flex flex-col w-48 space-y-4">
            <div className="flex justify-between items-start">
              { title.length > 30 && 
              <h2 className="text-3xl font-bold">{(title).slice(0,30)}...</h2>
              }
              { title.length < 30 && 
              <h2 className="text-3xl font-bold">{(title).slice(0,30)}</h2>
              }
            </div>
            <div>
              <div className="text-lg text-gray-800">
                {release_date.slice(0, 4)}
              </div>
            </div>
              {((vote_average) * 10) >= 80 &&
              <div className="bg-green-400 font-bold rounded-xl p-2 w-10 text-center">{(vote_average) * 10}</div>
              }
              {((vote_average) * 10) < 80 && ((vote_average) * 10) >=50 &&
              <div className="bg-yellow-400 font-bold rounded-xl p-2 w-10 text-center">{(vote_average) * 10}</div>
              }
              {((vote_average) * 10) < 50 && ((vote_average) * 10) > 0 &&
              <div className="bg-red-400 font-bold rounded-xl p-2 w-10 text-center">{(vote_average) * 10}</div>
              }
              {((vote_average) * 10) === 0 &&
              <div className="bg-gray-400 font-bold rounded-xl p-2 w-10 text-center">NR</div>
              }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieListItem;
