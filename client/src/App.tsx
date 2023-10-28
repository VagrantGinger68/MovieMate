import './App.css'
import Footer from './components/Footer';
import TopNavBar from './components/TopNavBar';
import HomeRoute from './routes/HomeRoute';

const App = () => {

  return (
    <div>
      <TopNavBar />
      <HomeRoute />
      <Footer />
    </div>
  )
}

export default App
