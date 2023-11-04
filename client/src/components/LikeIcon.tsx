import { useState, useEffect } from "react";

interface MovieIdProp {
  movieId: number;
}

const LikeIcon: React.FC<MovieIdProp> = ({ movieId }) => {
  const [like, setLike] = useState(false);
  const [likedMoviesId, setLikedMoviesId] = useState({});
  const [currentColor, setCurrentColor] = useState('#FFD700');

  const toggleLike = (movieId, userId) => {
    const data = {
      user_id: userId,
      movie_id: movieId,
    };

    // Update the like state and store it in local storage
    setLike(!like);
    localStorage.setItem(`like-${movieId}`, !like ? "true" : "false");

    if (!like) {
      fetch("http://localhost:3000/liked_movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 201) {
            console.log("Like created successfully");
          } else {
            console.error("Failed to create a like");
          }
        })
        .catch((error) => {
          console.error("Request failed:", error);
        });
    } else {
      const urlLiked = `http://localhost:3000/liked_movies/find_by_movie_and_user/${movieId}/${1}`;
      const optionsLiked = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(urlLiked, optionsLiked)
        .then((res) => res.json())
        .then((json) => setLikedMoviesId(json))
        .catch((err) => console.error("error:" + err));
    }
  };

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

  useEffect(() => {
    // Retrieve the like state from local storage when the component mounts
    const storedLike = localStorage.getItem(`like-${movieId}`);
    if (storedLike === "true" || storedLike === "false") {
      setLike(storedLike === "true");
    }
  }, [movieId]);

  const handleMovie = (movieId) => {
    fetch("http://localhost:3000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId: movieId }),
    });
  };

  const handleClick = (movieId, userId) => {
    handleMovie(movieId);
    toggleLike(movieId, userId);
  };

  const changeColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColor(randomColor);
  };

  useEffect(() => {
    if (like) {
      const colorInterval = setInterval(changeColor, 100); // Change color every 1 second

      return () => {
        clearInterval(colorInterval); // Clear the interval when `like` becomes false
      };
    }
  }, [like]);

  return (
    <>
      {(like === true && movieId === 502356) ? (<button
        type="button"
        onClick={() => handleClick(movieId, 1)}>
        <svg className="w-6 h-6 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill={currentColor} viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </button>) : ""}
      {(like === true && movieId !== 502356) ? (<button
        type="button"
        onClick={() => handleClick(movieId, 1)}>
          <svg className="w-6 h-6 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </button>) : (like === false &&
      <button type="button" onClick={() => handleClick(movieId, 1)}>
        <svg className="w-6 h-6 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      </button>
      )}
    </>
  );
};

export default LikeIcon;
