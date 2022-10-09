
import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';


function Cart() {

    const params = useParams();

    return (
        <div>
            <h2>My Cart</h2>
        </div>
    )

}

export default Cart;

