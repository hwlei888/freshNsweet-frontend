
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

    const currentUser = useSelector(state => state.currentUser);
    console.log('AllProducts currentUser', currentUser);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);
    const [quantities, setQuantities] = useState({});

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

            // if(currentUser){
            //     // for(let p = 0; p < res.data.length; p++){
            //     res.data.map(p => {
            //         let foundProduct = currentUser.cart.find(item => item.product._id === p._id);
            //         if(foundProduct){
            //             setQuantities({
            //                 ...quantities,
            //                 [foundProduct.product._id]: foundProduct.quantity
            //             })
            //         }
            //     })
            // }

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

        // setCartItem({
        //     product: item,
        //     quantity: quantities[item._id]
        // })

        const checkProductInCart = currentUser.cart.find((currentUserItem) => currentUserItem.product.title === item.title );
        
        if(checkProductInCart){
            currentUser.cart.map((currentUserCart) => {
                if(currentUserCart.product.title === item.title){
                    currentUserCart.quantity += quantities[item._id];
                }
            })
            const res = await axios.post(`http://localhost:3000/user/update`,  currentUser.cart)
        }else {
            currentUser.cart.push({
                quantity: quantities[item._id],
                product: item,
            })
            const res = await axios.post(`http://localhost:3000/user`, {product: item, quantity: quantities[item._id]} )
        }
    }





    
    function changeCartItemQuantity(id, value){

        // console.log('changeCartItemQuantity', id, value, quantities); // test
        const quantity = quantities[id] || 1
        let newQuantity = quantity + value;
        if(newQuantity < 0){
            newQuantity = 0;
        }
        setQuantities({
            ...quantities,
            [id]: newQuantity
        })

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
                            <button className='minus' onClick={() => changeCartItemQuantity(item._id, -1)} >
                                -
                            </button>
                            <span className='num'>
                                {quantities[item._id] || 1}
                            </span>
                            <button className='plus' onClick={() => changeCartItemQuantity(item._id, +1)}>
                                +
                            </button>
                        </div>
                        <button onClick={() => addToCart(item)}>Add to Cart</button>

                        <p>You have:{quantities[item._id] || 0}</p>
                    </div>
                )
            }
            
            </div>
        </div>
    );
}

export default AllProducts;






