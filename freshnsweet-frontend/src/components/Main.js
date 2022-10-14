
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl';

import '../App.css';

import Home from './Home';
import AllProducts from './AllProducts';
import ProductDetails from './ProductDetails';
import Category from './Category';
import Cart from './Cart';
import Login from './Login';
import Checkout from './Checkout';
import OrderComplete from './OrderComplete';

// const RAILS_BASE_URL = 'http://localhost:3000/';


function Main() {
    
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);


    useEffect(() => {
        fetchCurrentUser();
    },[]);

    const fetchCurrentUser = async () => {
        const token = localStorage.getItem('jwt');
        if(token){
            try{
                console.log('This setCurrentUserFunction', token); // test
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                const res = await axios.get(RAILS_BASE_URL + 'users/current');
                dispatch({type: 'currentUser/set', payload: res.data});
                // localStorage.setItem('currentUser', JSON.stringify(res.data));

            }catch(err) {
                console.error('Error fetchCurrentUser', err)
            }
        }
        
    }

    const handleLogout = () => {
        // setCurrentUser(null);
        localStorage.removeItem('jwt');
        axios.defaults.headers.common['Authorization'] = undefined;
        dispatch({type: 'currentUser/set', payload: null});
    }




    return (
        <div>
            <div className='h1title'><h1>Fresh N Sweet</h1></div>
            
            <Router>
            <nav>
                {/* <Link to="/">Home</Link> */}
                <Link to="/" >Home</Link>
                <Link to="/products">All Products</Link>
                {/* <Link to="/user">My Cart</Link> */}
                {
                    currentUser
                    ?
                    (
                        <div>
                            <p>Welcome {currentUser.name}</p>
                            <Link to="/user">My Cart</Link>
                            <Link to="/" onClick={() => handleLogout()}>Logout</Link>
                        </div>
                    )
                    :
                    (
                        <Link to="/login">Login</Link>
                    )
                }
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
                    
                    <Route path='/products/:id' element={< ProductDetails/>} />
                    <Route path='/category/:title' element={< Category />} />
                    <Route path='/login' element={<Login fetchCurrentUser={fetchCurrentUser}/>} />
                    {
                        currentUser
                        &&
                        <>
                        <Route path='/user' element={< Cart/>} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/ordercomplete' element={<OrderComplete />} />
                        </>
                    }

                </Routes>
            </Router>

            <footer className='footer center'>
                &copy; FreshNSweet @ 2022
            </footer>
        </div>
    );
} // function Main()

export default Main;




