
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import '../App.css'
import '../css/products.css'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const PRODUCT_BASE_URL = 'http://localhost:3000/';


function AllProducts(props){ // try delete props

    // const params = useParams();
    const push = useNavigate();
    // const dispatch = useDispatch();

    // const quantity = useSelector(state => state.quantity);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);
    const [newCartItem, setNewCartItem] = useState(null);

    const [cartItemQuantity, setCartItemQuantity] = useState({});

    // if(products){
    //     const cartItemObject = {};
    //     console.log(products)
    //     products.map(item => 
    //         cartItemObject[item.title] = 0
    //     )
    //     console.log(cartItemObject);
    //     // setCartItemQuantity(cartItemObject);
    // }



    useEffect(() => {
        findAllProdcuts();

    },[]);

    const findAllProdcuts = async () => {
        try {

            setLoading(true); // To show message when re-searching

            const res = await axios.get(PRODUCT_BASE_URL + 'products');
            console.log('AllProducts useEffect', res.data);

            setLoading(false);
            setProducts(res.data);

        }catch(err){
            console.error('Error loading All products', err);
            
            setLoading(false);
            setError(err);
        }

    }


    if(error){
        return <p>Error Loading from API</p>
    }

    function handleClick(productID){
        // console.log('handleClick AllProducts', productID); // for test
        push(`/products/${productID}`)
    }



    const addToCart = async(item) => {
        // console.log('handleClick AllProducts', item); // for test
        // setCartItem(item);
        // if(cartItem){
            // try{
                const res = await axios.post(`http://localhost:3000/user`, item )
                console.log('addToCart res.data', res.data); // for test

            // }catch(err){
            //     console.error('Error saving cart item');
            //     this.error = err;
            // }
        // }
    }

    function toggleCartItemQuantity(id, value){
        const foundProduct = products.find(item => item._id === id);
        // console.log('toggleCartItemQuantity', foundProduct);

        if(value === 'inc'){
            setNewCartItem({...foundProduct, quantity: foundProduct.selectQuantity + 1})
        }else if(value === 'dec'){
            if (foundProduct.quantity > 0){
                setNewCartItem({...foundProduct, quantity: foundProduct.selectQuantity - 1})
            }
        }
    }


    return (
        <div className='allProductsPage'>
            <h2>All Products</h2>
            <div className='allProducts'>
            {
                loading
                ?
                <p>Loading results...</p>
                :
                products &&
                products.map((item, index) =>
                    <div className='allProductsItems' key={item._id}>
                        <img 
                        src={item.images[0].url} 
                        alt={`${item.title} image`} 
                        onClick={() => handleClick(item._id)} 
                        />
                        <p>{item.title}</p>
                        <p>${item.price} / {item.weight}</p>

                        <div className='quantityChange'>
                            <button className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')} >
                                -
                            </button>
                            <span className='num'>
                                {/* {cartItemQuantity.(item.title)} */}
                            </span>
                            <button className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}>
                                +
                            </button>
                        </div>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>
                    </div>
                )
            }
            
            </div>
        </div>
    );
}

export default AllProducts;






