import { useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';

const App = () => {

  const [movieId, setMovieId] = useState(238);

  console.log(movieId);

  const changeMovieId = (newId: number) => {
    setMovieId(newId);
  };

  return (
    <div>
      <TopNavBar />
      <HomeRoute changeMovieId={changeMovieId} />
      <MovieRoute id={movieId} changeMovieId={changeMovieId} />
      <Footer />
    </div>
  )
}

export default App
