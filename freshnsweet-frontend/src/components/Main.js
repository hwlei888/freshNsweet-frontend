
import React from 'react';
import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';

import '../App.css';


import Home from './Home';
import AllProducts from './AllProducts';
import ProductDetails from './ProductDetails';
import Category from './Category';
import Cart from './Cart';

function Main() {


    return (
        <div>
            <h1>Fresh N Sweet</h1>
            <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/products">All Products</Link>
                <Link to="/cart">My Cart</Link>
                <br />
                <Link to="/category/Fruit">Fruit</Link>
                <Link to="/category/Vegetable">Vegetable</Link>
                <Link to="/category/Special">Fresh Special</Link>
                <Link to="/category/New">New Arrival</Link>
                <Link to="/category/Australian">Australian Grown</Link>
                <Link to="/category/Best">Best Seller</Link>

            </nav>
                <Routes>
                    <Route exact path='/' element={< Home/>}/>
                    <Route path='/products' element={< AllProducts/>} />
                    <Route path='/cart' element={< Cart/>} />
                    <Route path='/products/:id' element={< ProductDetails/>} />
                    <Route path='/category/:title' element={< Category />} />

                </Routes>
            </Router>

            <footer className='footer center'>
                &copy; FreshNSweet @ 2022
            </footer>
        </div>
    );
} // function Main()

export default Main;




