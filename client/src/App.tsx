import { useEffect, useState } from 'react';
import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';
import CategoryRoute from './routes/CategoryRoute';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import MovieCarousel from './components/MovieCarousel';
import SearchBar from './components/SearchBar';
import SearchRoute from './routes/SearchResults';
import Login from './routes/Login';
import { useCookies } from 'react-cookie';
import Logout from './routes/Logout';

const App = () => {
  const [genre, setGenre] = useState(0);
  const [displayList, setDisplayList] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['name']);

  const changeCookie = (newCookie: string) => {
    setCookie('name', newCookie);
  }

  const destroyCookie = () => {
    removeCookie('name');
  }

  const changeGenre = (newGenre: number) => {
    setGenre(newGenre)
  };

  const changeDisplayList = (newList: boolean) => {
    setDisplayList(newList);
  }

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <ScrollToTop />
              <TopNavBar changeGenre={changeGenre} cookies={cookies} />
              <MovieCarousel />
              <SearchBar inNavBar={false} />
              <HomeRoute displayList={displayList} changeDisplayList={changeDisplayList} />
              <Footer />
            </>
          } />
          <Route path="/categories/:categoryName" element={
            <>
              <ScrollToTop />
              <TopNavBar changeGenre={changeGenre} cookies={cookies} />
              <CategoryRoute changeGenre={changeGenre} genre={genre} displayList={displayList} changeDisplayList={changeDisplayList} />
              <Footer />
            </>
          } />
          <Route path="/movie/:id" element={
            <>
              <ScrollToTop />
              <TopNavBar changeGenre={changeGenre} cookies={cookies} />
              <MovieRoute cookies={cookies} />
              <Footer />
            </>
          } />
          <Route path="/search/:query" element={
            <>
              <ScrollToTop />
              <TopNavBar changeGenre={changeGenre} cookies={cookies} />
              <SearchRoute />
              <Footer />
            </>
          } />
          <Route path="/login" element={
            <>
              <ScrollToTop />
              <TopNavBar changeGenre={changeGenre} cookies={cookies} />
              <Login changeCookie={changeCookie} />
              <Footer />
            </>
          } />
          <Route path="/logout" element={
            <>
              <Logout destroyCookie={destroyCookie} />
            </>
          } />
        </Routes>
      </Router>
    </div>
  )
}

export default App
