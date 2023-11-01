import { useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';
import CategoryRoute from './routes/CategoryRoute';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MovieCarousel from './components/MovieCarousel';
import SearchBar from './components/SearchBar';
import SearchRoute from './routes/SearchResults';

const App = () => {

  const [movieId, setMovieId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [genre, setGenre] = useState(0);
  const [displayList, setDisplayList] = useState(true);
  const [search, setSearch] = useState("");

  const changeGenre = (newGenre: number) => {
    setGenre(newGenre)
  };

  const changeMovieId = (newId: number) => {
    setMovieId(newId);
  };

  const changeCategoryName = (newName: string) => {
    setCategoryName(newName);
  }

  const changeDisplayList = (newList: boolean) => {
    setDisplayList(newList);
  }

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
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
          <Route path="/" element={
            <>
              <TopNavBar changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
              <MovieCarousel changeMovieId={changeMovieId} />
              <SearchBar handleSearch={handleSearch} />
              <HomeRoute changeMovieId={changeMovieId} displayList={displayList} changeDisplayList={changeDisplayList} />
              <Footer />
            </>
          } />
          <Route path="/categories" element={
            <>
              <TopNavBar changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
              <CategoryRoute changeMovieId={changeMovieId} categoryName={categoryName} changeGenre={changeGenre} genre={genre} displayList={displayList} changeDisplayList={changeDisplayList} />
              <Footer />
            </>
          } />
          <Route path="/movie" element={
            <>
              <TopNavBar changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
              {movieId &&
                <MovieRoute id={movieId} changeMovieId={changeMovieId} />
              }
              <Footer />
            </>
          } />
          <Route path="/search" element={
            <>
              <TopNavBar changeCategoryName={changeCategoryName} changeGenre={changeGenre} />
              <SearchRoute search={search} changeMovieId={changeMovieId} />
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
