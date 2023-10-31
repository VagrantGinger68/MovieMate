import { useEffect, useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
// import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';

const App = () => {

  const [movieId, setMovieId] = useState(238);

  const changeMovieId = (newId: number) => {
    setMovieId(newId);
  };

  return (
    <div>
      <button onClick={() => changeMovieId(278)}>Change Movie</button>
      <TopNavBar />
      {/* <HomeRoute /> */}
      <MovieRoute id={movieId} />
      <Footer />
    </div>
  )
}

export default App
