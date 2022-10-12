
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import '../css/cart.css';

const BASE_URL = 'http://localhost:3000/';


function Cart() {
    // Redux
    const currentUser = useSelector(state => state.currentUser);
    console.log('Cart currentUser', currentUser); // test

    

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        showCartProducts();

    }, []);

    const showCartProducts = async () => {
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            setLoading(false);
            // localStorage
            // console.log('Cart currentUser', currentUser); // test
            // setCurrentUser(currentUser);

        }catch(err){
            console.error('Error loading products in cart', err);
            
            setLoading(false);
            setError(err);
        }
    }

    const TotalPrice = () => {
        let totalAmount = 0;
        currentUser.cart.map(item => {
            totalAmount += item.quantity * item.product.price
        })
        return totalAmount;
    }

    
    return (
        <div>
            <h2>My Cart</h2>
            <p>TODO make the quantity increase and decrease</p>
            
            <div>
                {
                    loading
                    ?
                    <p>Loading results...</p>
                    :
                    currentUser &&
                    <div className='cartDetails center'>
                        {
                            currentUser.cart.map((item, index) => 
                            <div key={index}>
                                {item.quantity}
                                <img 
                                src={item.product.images[0].url} 
                                alt={`${item.product.title} image`}
                                />
                                {item.product.title}

                                total:${item.quantity * item.product.price}

                            </div>
                            )
                        }

                        <div>
                            Totol: $<TotalPrice/>
                        </div>

                        <button>
                            Checkout
                        </button>
                    </div>

                }
            </div>
        </div>
    )

}

export default Cart;

