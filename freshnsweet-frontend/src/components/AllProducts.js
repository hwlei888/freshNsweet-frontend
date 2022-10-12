
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import '../App.css'
import '../css/products.css'
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

const PRODUCT_BASE_URL = 'http://localhost:3000/';


function AllProducts(){

    // const params = useParams();
    const push = useNavigate();
    // const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser);
    
    console.log('AllProducts currentUser', currentUser);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [showAddDone, setShowAddDone] = useState({});


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

        setShowAddDone({
            [item._id]: 'Add Successfully'
        });

        setQuantities({
            ...quantities,
            [item._id]: 1
        })

        // setCartItem({
        //     product: item,
        //     quantity: quantities[item._id]
        // })

        const checkProductInCart = currentUser.cart.find((currentUserItem) => currentUserItem.product.title === item.title );
        // console.log('AllProducts checkProductInCart', checkProductInCart)
        const itemQuantities = quantities[item._id] || 1;
        
        if(checkProductInCart){
            currentUser.cart.map((currentUserCart) => {
                if(currentUserCart.product.title === item.title){
                    currentUserCart.quantity += itemQuantities;
                }
            })
            const res = await axios.post(`http://localhost:3000/user/update`,  currentUser.cart)
        }else {
            currentUser.cart.push({
                quantity: itemQuantities,
                product: item,
            })
            const res = await axios.post(`http://localhost:3000/user`, {product: item, quantity: itemQuantities} )
        }

    } // addToCart()


    const ShowCurrentQuantity = ({id}) => {

        if(currentUser){
            const checkProductInCart = currentUser.cart.find((currentUserCart) => currentUserCart.product._id === id );
            // console.log(checkProductInCart)
    
            if(checkProductInCart){
                return checkProductInCart.quantity;
            }else {
                return 0;
            }
        }
    }







    
    function changeCartItemQuantity(id, value){

        setShowAddDone({
            [id]: ''
        });

        // console.log('changeCartItemQuantity', id, value, quantities); // test
        const quantity = quantities[id] || 1
        // const quantity = 1
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

                        <p>You have:<ShowCurrentQuantity id={item._id}/></p>

                        <p>
                            {showAddDone[item._id]}
                        </p>
                    </div>
                )
            }
            
            </div>
        </div>
    );
}

export default AllProducts;






