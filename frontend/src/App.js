import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from "./screens/CartScreen";
import {Link} from 'react-router-dom';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  const userSignin= useSelector(state => state.userSignin);
  const {userInfo}=userSignin;
  const openMenu=()=>{
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu=()=>{
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
  <BrowserRouter>
    <div className="grid-Container">
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}>&#9776;</button>
                <Link to='/'>amazona</Link>
            </div>
            <div className="header-links">
                <Link to='/cart'>Cart</Link>
                {userInfo?<Link to='/profile'>{userInfo.name}</Link>:<Link to='/signin'>Signin</Link>}
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li><a href="index.html">Paints</a></li>
                <li><a href="index.html">Shirts</a></li>
                <li><Link to='/products'>Create New Product</Link></li>
            </ul>
        </aside>
        <main className="main">
            <div className="content">
              <Route path="/signin" component={SigninScreen}/>
              <Route path="/register" component={RegisterScreen}/>
              <Route path="/products" exact={true} component={ProductsScreen}/>
              <Route path="/product/:id" exact={true} component={ProductScreen}/>
              <Route path="/cart/:id?" component={CartScreen}/>
              <Route path="/" exact={true} component={HomeScreen}/>   
            </div>
        </main>
        <footer className="footer">All right reserved.</footer>
    </div>
  </BrowserRouter>
  );
}

export default App;
