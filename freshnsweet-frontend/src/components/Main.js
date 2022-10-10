
import { useState, useEffect } from 'react';
import axios from 'axios';
import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';

import '../App.css';


import Home from './Home';
import AllProducts from './AllProducts';
import ProductDetails from './ProductDetails';
import Category from './Category';
import Cart from './Cart';
import Login from './Login';

const BASE_URL = 'http://localhost:3000/';

function Main() {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setCurrentUserFunction();
    },[]);

    const setCurrentUserFunction = () => {
        let token = "Bearer " + localStorage.getItem('jwt');
        console.log('Main setCurrentUserFunction', token); // test
        axios.get(BASE_URL + 'users/current', {
            headers: {
                'Authorization': token
              }
        })
        .then(res => {
            setCurrentUser(res.data);
        })
        .catch(err => console.warn(err))
    }

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('jwt');
        axios.defaults.headers.common['Authorization'] = undefined;
    }




    return (
        <div>
            <h1>Fresh N Sweet</h1>
            <Router>
            <nav>
                <Link to="/">Home</Link>
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
                    <Route path='/user' element={< Cart/>} />
                    <Route path='/products/:id' element={< ProductDetails/>} />
                    <Route path='/category/:title' element={< Category />} />
                    <Route path='/login' element={<Login setCurrentUserLogin={setCurrentUserFunction} />} />

                </Routes>
            </Router>

            <footer className='footer center'>
                &copy; FreshNSweet @ 2022
            </footer>
        </div>
    );
} // function Main()

export default Main;




