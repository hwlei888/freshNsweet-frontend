
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {ElementsConsumer, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {RAILS_BASE_URL, REACT_BASE_URL} from './baseurl' 

import '../css/ordercomplete.css';



function OrderComplete(){

    const currentUser = useSelector(state => state.currentUser);
    // const address = useSelector(state => state.address);
    
    
    console.log('CheckoutForm currentUser', currentUser)
    
    useEffect(() => {
        
        if(currentUser.cart.length !== 0){
            window.location.replace("http://localhost:3001/#/ordercomplete"); // any better way?????
        }

        updateOrderHistory();
        
        
    },[]);
    
    const updateOrderHistory = async () => {
        if(currentUser.cart.length !== 0){
            const address = localStorage.getItem('address');
            const res = await axios.post(RAILS_BASE_URL + `user/addOrderHistory`, {items: currentUser.cart, address: address});
        }else{
            return;
        }
    }


    return (
        <div className='ordercomplete'>
            <h2>Congratulations! Your order is done!</h2>
            <p>Your order will be arrived in 2 to 3 days</p>
        </div>
    )
};

export default OrderComplete;



