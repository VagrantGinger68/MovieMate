import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
// import HomeRoute from './routes/HomeRoute';
import MovieRoute from './routes/MovieRoute';

const App = () => {

  return (
    <div>
      <TopNavBar />
      {/* <HomeRoute /> */}
      <MovieRoute />
      <Footer />
    </div>
  )
}

export default App
