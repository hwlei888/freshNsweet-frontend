
import {useState, useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import CheckoutForm from './CheckoutForm';
import '../css/checkout.css';

import {RAILS_BASE_URL, REACT_BASE_URL} from './baseurl';

const stripePromise = loadStripe('pk_test_51LsGvMFrcW4uVwL0hr9J9yWnkru8hMGDON6PqHIKGoBPucFM2YZvudvodxb3bh64dpNvbDmXg7r8S1QuVT41dPq600h1qtg5Sc');

function Checkout(){


    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);

    const [clientSecret, setClientSecret] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        if(currentUser){
            checkoutPage();
        }
        // console.log('Checkout useEffect');

      }, []);


    const checkoutPage = async () => {
        try {

            const res = await axios.post(RAILS_BASE_URL + "create-payment-intent");
            // console.log('Checkout useEffect', res.data);

            setLoading(false);
            setClientSecret(res.data.clientSecret);
            // console.log('Checkout useEffect clientSecret', res.data.clientSecret)
            dispatch({type: 'completeOrder/message', payload:res.data.clientSecret});


        }catch(err){
            console.error('Error loading checkoutPage', err);
            
            setLoading(false);
            setError(err);
        }

    } // checkoutPage()


      const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };


    return(
        <div>
            {
                clientSecret 
                &&
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            }
        </div>
    );
}

export default Checkout;

