import {useState, useEffect} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl'

import '../App.css'
import '../css/orderhistory.css'

// const RAILS_BASE_URL = 'http://localhost:3000/';

function OrderHistory(){

    // const currentUser = useSelector(state => state.currentUser);

    // console.log('Cart currentUser outside showCartProducts', currentUser); // test


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        showCartProducts();

    }, []); //  useEffect()


    const showCartProducts = async () => {

        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        try {
            setLoading(false);
            // localStorage
            console.log('Cart currentUser inside showCartProducts', currentUser); // test
            setCurrentUser(currentUser);

        }catch(err){
            console.error('Error loading products in cart', err);
            
            setLoading(false);
            setError(err);
        }
    } // showCartProducts()

    return (
        <div>
            <h2 className='orderhistoryname'>Order History</h2>

            <div>
                {
                    loading
                    ?
                    <p>Loading results...</p>
                    :
                    currentUser &&
                    <div className='cartDetailsBox center'>
                        <div className=''>
                        {
                            currentUser.orderHistory.map((item, index) => 
                            <div className='' key={index}>

                                <div>
                                    Address: {item.address}     
                                </div>

                                <div>
                                    {item.items.map((historyItem, index) => 
                                        <div className='orderhistoryspan' key={index}>

                                            <div>
                                                {historyItem.product.title}
                                            </div>

                                            <div>
                                                {historyItem.quantity}
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>

                                <hr />
                            </div>
                            )
                            
                        }
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default OrderHistory;

