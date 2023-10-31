import { useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';
import CategoryRoute from './routes/CategoryRoute';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'

const App = () => {

  const [movieId, setMovieId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [genre, setGenre] = useState(0);

  const changeGenre = (newGenre: number) => {
    setGenre(newGenre)
  };

  console.log(movieId);

  const changeMovieId = (newId: number) => {
    setMovieId(newId);
  };

  const changeCategoryName = (newName: string) => {
    setCategoryName(newName);
  }

  return (
    <div>
      {/* <TopNavBar changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
      {/* {!movieId &&
        <HomeRoute changeMovieId={changeMovieId} />
      }
      {movieId &&
        <MovieRoute id={movieId} changeMovieId={changeMovieId} />
      } */}
      {/* <CategoryRoute changeMovieId={changeMovieId} categoryName={categoryName} changeGenre={changeGenre} genre={genre}/>
      <Footer /> */}
      <Router>
      <Routes>
            <Route path="/" element={<HomeRoute changeMovieId={changeMovieId}/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App
