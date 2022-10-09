
import {useState, useEffect} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import '../App.css'
import '../css/products.css'

const PRODUCT_BASE_URL = 'http://localhost:3000/';

function Category(){

    const params = useParams();
    const push = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);

    useEffect(() => {

        showCategoryProducts();

    }, [params.title]);


    const showCategoryProducts = async() => {

        try{

            setLoading(true);

            const res = await axios.get(`http://localhost:3000/category/${params.title}`);
            console.log('data Category', res.data); // for test

            setLoading(false);
            setCategory(res.data);

        }catch(err){
            console.error('Error loading products of that category', err);

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

    return(
        <div>
            <h2>Category</h2>
            <div className='allProducts'>
            {
                loading
                ?
                <p>Loading results...</p>
                :
                category &&
                category.map((item, index) =>
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
    )
}

export default Category;

