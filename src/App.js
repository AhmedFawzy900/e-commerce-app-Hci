import './App.css';
import { Routes , Route } from 'react-router';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Card from './pages/Cart';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Create from './pages/Create';
import EditProduct from './pages/EditProduct';
import Profile from './pages/Profile';
import Orders from './pages/Orders';


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/e-commerce-app-Hci" element={<Home/>} />
        <Route path='/cart' element={<Card/>} />
        <Route path='/create' element={<Create/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/edit-product/:product_id' element={<EditProduct/>} />
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
