// import './RegisterPage.scss';
import React, { useState, useEffect} from 'react';
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios';

function RegisterPage(){

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [redirect, setRedirect] = useState(false);

    // Axios Handles Registration
    function handleSubmit (event) {
        event.preventDefault();
        // const {userEmail, userPassword, userConfirmPassword} = {email,password, confirmPassword};
        axios
            .post("http://localhost:8080/register", {
                userName,
                email,
                password,
                confirmPassword
            })
            .then((response) => {
                sessionStorage.setItem("token", response.data.token);
                setRedirect(true);
                setSuccess(true);
                event.target.reset();
            })
            .catch((error) => {
                console.log(error.response);
                setError(error.response.data);
                setSuccess(false);
            });
    };

    // Redirect After Successful Registration
    if (redirect === true) {
        return (
            <div>
                <Navigate to="/dashboard" />
            </div>
        )
    }
    return (
        <div className='signUp'>
            <section className='signUp-wrapper'>
                <form className='signUp__form' onSubmit={handleSubmit}>
                    <h1 className='signUp__title'>Join the Team</h1>
                    <input type="text" name="userName" label="Name" value={userName} onChange={event => setUserName(event.target.value)} />
                    <input type="email" name="email" label="Email" value={email} onChange={event => setEmail(event.target.value)} />
                    <input type="password" name="password" label="Password" value={password} onChange={event => setPassword(event.target.value)} />
                    <input type="password" name="confirmPassword" label="Confirm Password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} />

                    <button className='signUp__btn' type="submit">Register</button>
                    {success && <span className="signUp__message">Signed up!</span>}
                    {error && <span className="signUp__message">{error}</span>}
                    <div className='signUp__login'>
                        <p className='signUp__login__body'>Already have an account?</p>
                        <Link to="/" className='signUp__login__link'>Login</Link>
                    </div>
                </form>
            </section>
        </div>
    );
    
}

export default RegisterPage;