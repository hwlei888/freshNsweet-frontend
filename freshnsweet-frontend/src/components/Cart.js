
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

import '../App.css';
import '../css/cart.css';



function Cart() {

    const push = useNavigate();

    // Redux
    const currentUser = useSelector(state => state.currentUser);
    console.log('Cart currentUser', currentUser); // test

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        showCartProducts();

    }, []); //  useEffect()


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
    } // showCartProducts()


    const TotalPrice = () => {
        let totalAmount = 0;
        currentUser.cart.map(item => {
            totalAmount += item.quantity * item.product.price
        })
        return totalAmount.toFixed(2);
    } // TotalPrice()


    const handleClick = () => {
        push(`/checkout`);
    } // handleClick()

    
    return (
        <div className='cartbox'>
            <h2>My Cart</h2>
            {/* <p>TODO make the quantity increase and decrease</p>
            <p>TODO add title to table</p> */}
            
            <div>
                {
                    loading
                    ?
                    <p>Loading results...</p>
                    :
                    currentUser.cart &&
                    <div className='cartDetailsBox center'>
                        <div className='cartDetailsGrid'>
                        {
                            currentUser.cart.map((item, index) => 
                            <div className='cartDetailsSingle' key={index}>

                                <div>
                                    <img 
                                    src={item.product.images[0].url} 
                                    alt={`${item.product.title} image`}
                                    />
                                </div>

                                <div>
                                    {item.product.title}
                                </div>

                                <div>
                                {item.quantity}
                                </div>

                                <div>
                                    ${(item.quantity * item.product.price).toFixed(2)}
                                </div>

                            </div>
                            )
                        }
                        </div>

                        <div className='cartboxTotol'>
                            Totol: $<TotalPrice/>
                        </div>

                        <button onClick={handleClick}>
                            Checkout
                        </button>

                    </div>
                }
            </div>
        </div>
    )

}

export default Cart;

