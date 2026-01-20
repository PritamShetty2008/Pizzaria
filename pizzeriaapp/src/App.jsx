import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import OrderPizza from './pages/OrderPizza.jsx';
import BuildPizza from './pages/BuildPizza.jsx';
import ShoppingCart from './pages/ShoppingCart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderPizza />} />
          <Route path="/build" element={<BuildPizza />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;