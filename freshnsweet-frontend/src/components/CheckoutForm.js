
import {useState, useEffect} from 'react';
import {ElementsConsumer, PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {useNavigate, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {RAILS_BASE_URL, REACT_BASE_URL} from './baseurl' 

import '../css/checkout.css';


const PRODUCT_BASE_URL = 'http://localhost:3000/';

function CheckoutForm(){

  const currentUser = useSelector(state => state.currentUser);

  const dispatch = useDispatch();


    const stripe = useStripe();
    const elements = useElements();

    // const dispatch = useDispatch();
  
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [street, setStreet] = useState('');
    const [suburb, setSuburb] = useState('');
    const [state, setState] = useState('');
    const [postCode, setPostCode] = useState('');


    useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    

        // When Stripe redirects the customer to the return_url, 
        // the payment_intent_client_secret query parameter is appended by Stripe.js. 
        // Use this to retrieve the PaymentIntent to determine what to show to your customer.
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }

          console.log('retrievePaymentIntent', paymentIntent);
        });

      }, [stripe]); // useEffect()



    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const address = `${street}, ${suburb} ${state} ${postCode}`;
        localStorage.setItem('address', address);

        // console.log('CheckoutForm', address); // test
        // dispatch({type: 'checkOutForm/address', payload: address});
        
        if (!stripe || !elements){
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        
        
        // To safely pass the payment information collected by the Payment Element to the Stripe API, 
        // access the Elements instance so that you can use it with stripe.confirmPayment
        const { error } = await stripe.confirmPayment({
          //`elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `${RAILS_BASE_URL}ordercomplete`, 
          },
        });
        

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
          } else {
            setMessage("An unexpected error occurred.");
          }




      
          setIsLoading(false); 
        
    }; // handleSubmit()


    // const handleConfirm = async (ev) => {
    //   ev.preventDefault();

    //   const address = `${street}, ${suburb} ${state} ${postCode}`;
    //   // console.log('CheckoutForm', address); // test

    //   const res = await axios.post(RAILS_BASE_URL + `user/addOrderHistory`, {items: currentUser.cart, address: address});

    // }


    const TotalPrice = () => {
      let totalAmount = 0;
      currentUser.cart.map(item => {
          totalAmount += item.quantity * item.product.price
      })
      return totalAmount.toFixed(2);
    } // TotalPrice()


    const handleInput = (ev) => {
      console.log('handleInput', ev.target.value); // test

      switch(ev.target.name){
        case 'Street':
          setStreet(ev.target.value);
        case 'Suburb':
          setSuburb(ev.target.value);
        case 'State':
          setState(ev.target.value);
        case 'Post Code':
          setPostCode(ev.target.value);
      }
    }






    return (
      <div className='checkoutform'>
        <div>
          <p className='checkoutformptag'>Please Check Your Order:</p>
          {
            currentUser 
            &&
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

              <div>
              Totol: $<TotalPrice/>
              </div>

            </div>

          }
        </div>


          <div className='paymentformbox'>
        <form id="payment-form" onSubmit={handleSubmit}>
        {/* <form id="payment-form" onSubmit={handleConfirm}> */}
        <div className='addressform'>
          <p>Please fill the address</p>
          <input 
          onChange={handleInput}
          type="text" 
          name='Street'
          placeholder='Street'
          />

          <input 
          onChange={handleInput}
          type="text" 
          name='Suburb'
          placeholder='Suburb'
          />

          <input 
          onChange={handleInput}
          type="text" 
          name='State'
          placeholder='State'
          />

          <input 
          onChange={handleInput}
          type="text" 
          name='Post Code'
          placeholder='Post Code'
          />


        </div>
        {/* </form> */}



        <div className='paymentform'>
        {/* <form id="payment-form" onSubmit={handleSubmit}> */}
        <PaymentElement id="payment-element" />
        </div>

        <button disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
            {
              isLoading 
              ? 
              <div className="spinner" id="spinner"></div> 
              : 
              "Pay now"
            }
            </span>
        </button>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
        </form>
        </div>

      </div>
    );
}

export default CheckoutForm;

// export default function InjectedCheckoutForm() {
//     return(
//         <ElementsConsumer>
//             {({stripe, elements}) => {
//                 <CheckoutForm stripe={stripe} elements={elements} />
//             }}
//         </ElementsConsumer>
//     )
// }





