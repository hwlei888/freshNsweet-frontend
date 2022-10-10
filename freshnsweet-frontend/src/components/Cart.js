
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import '../css/cart.css';

const BASE_URL = 'http://localhost:3000/';

function Cart() {

    // const params = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState(null);

    useEffect(() => {
        showCartProducts();

    }, []);

    const showCartProducts = async () => {
        try {
            setLoading(true);
            let token = "Bearer " + localStorage.getItem('jwt');
            const res = await axios.get(BASE_URL + 'user', {
                headers: {
                    'Authorization': token
                  }
            });
            console.log('Cart useEffect', res.data);

            setLoading(false);
            setCart(res.data.cart);

        }catch(err){
            console.error('Error loading products in cart', err);
            
            setLoading(false);
            setError(err);
        }
    }

    // 
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
                    cart &&
                    <div className='cartDetails center'>
                        {
                            cart.map((item, index) => 
                            <div key={item._id}>
                                <img 
                                src={item.product.images[0].url} 
                                alt={`${item.product.title} image`}
                                />
                                <p>{item.product.title}</p>
                                <p>{item.quantity}</p>
                            </div>
                            
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )

}

export default Cart;

