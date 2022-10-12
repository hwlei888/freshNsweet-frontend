
// import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel'
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

import '../App.css';
import '../css/products.css';

const BASE_URL = 'http://localhost:3000/';

function ProductDetails() {

    const params = useParams();

    const currentUser = useSelector(state => state.currentUser);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productDetails, setProductDetails] = useState(null);
    
    const [quantity, setQuantity] = useState(0);

    // const [cartItem, setCartItem] = useState({product: '', quantity: 0});
    const [cartItem, setCartItem] = useState({});


    useEffect(() => {

        showProductDetails();

    }, [params.id]);

    const showProductDetails = async() => {

        try {

            setLoading(true);

            const res = await axios.get(`http://localhost:3000/products/${params.id}`);
            // console.log('data ProductDetails', res.data.product); // for test

            setLoading(false);
            setProductDetails(res.data.product);

        }catch(err){
            console.error('Error loading product details', err);

            setLoading(false);
            setError(err);
        }
    }
    

    function toggleCartItemQuantity(value){
        // const foundProduct = products.find(item => item._id === id);
        // console.log('toggleCartItemQuantity', foundProduct);

        if(value === 'inc'){
            setQuantity(quantity + 1);
        }else if(value === 'dec'){
            if (quantity > 0){
                setQuantity(quantity - 1);
            }
        }
    }

    // const addToCart = async(item) => {

    //     const res = await axios.post(`http://localhost:3000/user`, {product: item, quantity: quantity} )
    //     console.log('addToCart res.data', res.data); // for test
    //     setCartItem((prevState) => ({
    //         ...prevState,
    //         product: res.data.product,
    //         quantity: res.data.quantity
    //     }))

    //     const checkProductInCart = currentUser.cart.find((item) => item.product.title === res.data.product.title );
        
    //     if(checkProductInCart){
    //         currentUser.cart.map((cartProduct) => {
    //             if(cartProduct.product.title === res.data.product.title){
    //                 cartProduct.quantity += res.data.quantity;
    //             }
    //         })
    //     }else {
    //         currentUser.cart.push({
    //             quantity: res.data.quantity,
    //             product: res.data.product,
    //         })
    //     }
    // }


    const addToCart = async(item) => {

        // setCartItem({
        //     product: item,
        //     quantity: quantity
        // })

        const checkProductInCart = currentUser.cart.find((currentUserItem) => currentUserItem.product.title === item.title );
        
        if(checkProductInCart){
            currentUser.cart.map((currentUserCart) => {
                if(currentUserCart.product.title === item.title){
                    currentUserCart.quantity += quantity;
                }
            })
            const res = await axios.post(`http://localhost:3000/user/update`,  currentUser.cart)
        }else {
            currentUser.cart.push({
                quantity: quantity,
                product: item,
            })
            const res = await axios.post(`http://localhost:3000/user`, {product: item, quantity: quantity} )
        }
    }
   
    // console.log('cartItem', cartItem)
    console.log('currentUser', currentUser)




    if(error){
        return <p>Error Loading from API</p>
    }


    return (
        <div>
            
            <h2>Product Details</h2>
            {
                loading
                ?
                <p>Loading results...</p>
                :
                productDetails &&
                <div className='productDetails center'>
                    
                        {/* <Carousel interval={null}> */}
                        <Carousel>
                           
                            {
                                productDetails.images.map((item, index) =>
                                     <Carousel.Item key={item._id} >
                                            <img 
                                            className="text-center"
                                            src={item.url} 
                                            alt={`${productDetails.title} image`}
                                            />
                                    </Carousel.Item>
                                )
                            }
                            
                         </Carousel>
                    

                    <div>
                        <p>{productDetails.title}</p>
                        <p>${productDetails.price} / {productDetails.weight}</p>
                    </div>

                    <div className='quantityChange'>
                            <button className='minus' onClick={() => toggleCartItemQuantity('dec')} >
                                -
                            </button>
                            <span className='num'>
                                {quantity}
                            </span>
                            <button className='plus' onClick={() => toggleCartItemQuantity('inc')}>
                                +
                            </button>
                    </div>
                    <button onClick={() => addToCart(productDetails)}>Add to Cart</button>

                    <div>
                        {
                            productDetails.categories.map((item, index) => 
                                <p key={index}>{item.title}</p>
                            )
                        }
                        <p>{productDetails.introduction}</p>
                    </div>
                </div>
            }

       
        </div>
    )
}

export default ProductDetails;


