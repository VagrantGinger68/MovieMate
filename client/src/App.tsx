import { useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';

const App = () => {

  const [movieId, setMovieId] = useState(0);

  console.log(movieId);

  const changeMovieId = (newId: number) => {
    setMovieId(newId);
  };

  return (
    <div>
      <TopNavBar />
      {!movieId &&
        <HomeRoute changeMovieId={changeMovieId} />
      }
      {movieId &&
        <MovieRoute id={movieId} changeMovieId={changeMovieId} />
      }
      <Footer />
    </div>
  )
}

export default App
