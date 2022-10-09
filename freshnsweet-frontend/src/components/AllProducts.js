
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import '../css/products.css'

const PRODUCT_BASE_URL = 'http://localhost:3000/';

function AllProducts(props){ // try delete props

    // const params = useParams();
    const push = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    // equivalent of componentDidMount()
    // useEffect(async () => {
    //     try {

    //         setLoading(true); // To show message when re-searching

    //         const res = await axios.get(PRODUCT_BASE_URL + 'products');
    //         console.log('AllProducts useEffect', res.data);

    //         setLoading(false);
    //         setProducts(res.data);

    //     }catch(err){
    //         console.error('Error loading All products', err);
            
    //         setLoading(false);
    //         setError(err);
    //     }

    // },[]);

    // why move out and no error ????????????????
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
        console.log('handleClick AllProducts', productID); // for test
        push(`/products/${productID}`)
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
                products.map((item, index) =>
                    <div className='allProductsItems' key={item._id}>
                        <img 
                        src={item.images[0].url} 
                        alt={`${item.title} image`} 
                        onClick={() => handleClick(item._id)} 
                        />
                        <p>{item.title}</p>
                        <p>${item.price} / {item.weight}</p>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default AllProducts;






