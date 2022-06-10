import './LoginPage.scss';
import React, { useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    //function to POST login credentials to login API
    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:8080/login', {
                email,
                password
            })
            //if the credentials are valid, store them in session storage for later use
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                setSuccess(true)
                event.target.reset();
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };


    return (
        <div className='loginForm'>
        <section className='loginForm-wrapper'>
            <form className="loginForm__form" onSubmit={handleSubmit}>
                <h1 className="loginForm__title">Login</h1>
                <input className="loginForm__form--input" type="text" name="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)}/>
                <input className="loginForm__form--input" type="password" name="password" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)} />
                <button className='loginForm__btn' type="submit">Login</button>
                {success && <Navigate to='/dashboard' />}
                {error && <p>{error}</p>}
                <div className='loginForm__register'>
                    <p className='loginForm__register__body'>Not Registered?</p>
                    <Link to="/" className='loginForm__register__link'>Register Here</Link>
                </div>
            </form>
        </section>
        </div>
    );

}

export default LoginPage;