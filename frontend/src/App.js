
import './App.css';
import TopNav from './Components/TopNav/TopNav';
import CatNav from './Components/CatNav/CatNav';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Cart from './Components/Cart/Cart';

function App() {
  return (
    <div className="App">
      <TopNav/>
      <CatNav/>
     <Routes>
        <Route path='/' Component={LandingPage}/>
        <Route path='/productDetails' Component={ProductDetails}/>
        <Route path='/cart' Component={Cart}/>
      </Routes>

    </div>
  );
}

export default App;
