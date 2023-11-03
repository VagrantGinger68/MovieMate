import { useState, useEffect } from "react"

interface MovieIdProp {
  movieId: number;
}

const LikeIcon: React.FC<MovieIdProp> = ({ movieId }) => {
  const [like, setLike] = useState(false);
  const [likedMoviesId, setLikedMoviesId] = useState({});

  const toggleLike = (movieId, userId) => {
    const data = {
      user_id: userId,
      movie_id: movieId,
    };
    setLike(!like)
    if (!like === true) {

      fetch('http://localhost:3000/liked_movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log('Like created successfully');
          } else {
            console.error('Failed to create a like');
          }
        })
        .catch((error) => {
          console.error('Request failed:', error);
        });
    } else {
      const urlLiked = `http://localhost:3000/liked_movies/find_by_movie_and_user/${movieId}/${1}`;
      const optionsLiked = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      };

      fetch(urlLiked, optionsLiked)
        .then(res => res.json())
        .then(json => setLikedMoviesId(json))
        .catch(err => console.error('error:' + err));
    }
  }

  useEffect(() => {
    if (likedMoviesId.id) {
      const url = `http://localhost:3000/liked_movies/${likedMoviesId.id}`;
      const options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((err) => console.error("error:" + err));
    }
  }, [likedMoviesId.id]);

  const handleMovie = (movieId) => {
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ movieId: movieId })
    });
  }

  const handleClick = (movieId, userId) => {
    handleMovie(movieId);
    toggleLike(movieId, userId);
  }

  return (
    <button
      type="button"
      className={`
      hover:text-blue-700 border border-blue-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center
      ${like && 'bg-blue-700 text-white dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500'}
    `}
      onClick={() => handleClick(movieId, 1)}
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 18"
      >
        <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
      </svg>

    </button>
  )
}

export default LikeIcon