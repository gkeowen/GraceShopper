import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Cart from './components/Cart';
import Products from './components/Products'
import SingleProduct from './components/SingleProduct'
import { myData } from './api/index'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [singleProductPath, setSingleProductPath] = useState('');
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const openCart = () => {
    setCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const removeFromCart = () => {
    cartCount <= 0 ? setCartCount(0) : setCartCount(cartCount - 1);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await myData(token);
      setUser(userData);
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul className="nav-item nav-list">
            <li className="nav-title">
              <Link to="/">Unreal Boosters</Link>
            </li>
            <li className="nav-item">
              {token && <p>{token.token}</p>}
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-item-cart" onClick={openCart}>
              {/* <span className='cart-image'>Cart</span> */}
              <span onClick={openCart}>Cart: {cartCount}</span>
            </li>
          </ul>
        </nav >
        <div className="app-container">
          <Cart isOpen={isCartOpen} onClose={closeCart} removeFromCart={removeFromCart} setCartCount={setCartCount} />
          <Switch>
            <Route path="/"><Home user={user} token={token} isLoggedIn={isLoggedIn} /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/login"><Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} /></Route>
            <Route path="/register"><Register setIsLoggedIn={setIsLoggedIn} setToken={setToken} /></Route>
            <Route path="/logout"><Logout setIsLoggedIn={setIsLoggedIn} /></Route>
            {/* <Route path="/users"><Users /></Route> */}
            <Route path="/products"><Products addToCart={addToCart} /></Route>
            {/* <Route path="/product"><Products addToCart={addToCart} /></Route>
            <Route exact path="/product" component={SingleProduct} addToCart={addToCart} /> */}
          </Switch >
        </div >
      </div >
    </Router >
  );
};

export default App;
