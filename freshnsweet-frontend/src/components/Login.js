
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl';


import '../css/login.css'

// const RAILS_BASE_URL = 'http://localhost:3000/';

function Login(props){

    const push = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleInput = (ev) => {
        switch(ev.target.name){
            case "email":
                setEmail(ev.target.value);
            case "password":
                setPassword(ev.target.value)
        }
    } // handleInput()

    const handleSubmit = (ev) => {
        const request = {email, password};
        
        axios.post(RAILS_BASE_URL + 'login', request)
        .then(result => {
            localStorage.setItem('jwt', result.data.token);
            console.log('Login handlesubmit', result.data.token); // test
            props.fetchCurrentUser();
            push('/products');
        })
        .catch(err => {
            console.warn(err)
        })
        ev.preventDefault();
    }




    return(
        <div className='loginbox'>
            <h2>Login</h2>
            <form className='loginform' onSubmit={handleSubmit}>
                <label>Login Form</label>
                <br />

                <input 
                type="email"
                name='email'
                placeholder='Enter Email'
                onChange={handleInput}
                />
                <br />

                <input 
                type="password"
                name='password'
                placeholder='Enter Password'
                onChange={handleInput}
                />
                <br />

                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;

