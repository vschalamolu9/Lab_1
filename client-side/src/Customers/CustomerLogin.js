import React, {useState} from 'react';
import classes from './CustomerLogin.module.css';
import LoginErrorModal from "./LoginErrorModal";
import Axios from "axios";

const CustomerLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState();

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }

    const submitLogin = (event) => {
        event.preventDefault();
        if(email.trim().length === 0 && password.trim().length === 0){
            setLoginError({
                title: 'Invalid email id and password',
                message: 'Please enter your email id.'
            })
        }
        else if(email.trim().length === 0){
            setLoginError({
                title: 'Invalid email id',
                message: 'Please enter your email id.'
            })
        }
        else if(password.trim().length === 0){
            setLoginError({
                title: 'Invalid password',
                message: 'Please enter your password'
            })
        }
        else if(!validateEmail(email)){
            setLoginError({
                title: 'Invalid Email',
                message: 'Please enter a valid email id.'
            })
        }

        Axios.post('http://localhost:5000/api/login',{
            emailId: email,
            password: password
        }).then(()=>{
            console.log("Login Successful")
        })
        setEmail('');
        setPassword('');
    }

    const emailHandler = (event) => {
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        setPassword(event.target.value);
    }

    const loginErrorHandler = () => {
        setLoginError(null);
    }

    return (
        <div>
            {loginError && <LoginErrorModal title={loginError.title} message={loginError.message} onConfirm = {loginErrorHandler}/>}
            <div className={classes.input}>
                <div className={classes.uberEats}>
                    <h1>Uber <span className={classes.eats}>Eats</span></h1>
                </div>
                <div>
                    <h2 className={classes.welcome}>Welcome back</h2>
                    <form>
                        <label>Sign in with your email address.</label>
                        <input type="text" name="email" value={email} onChange={emailHandler}/>
                        <label>Please enter your password to sign in.</label>
                        <input type="password" name="password" value={password} onChange={passwordHandler}/>
                        <button onClick={submitLogin}>Login</button>
                        <p className={classes.new}>New to Uber? <a href="/">Create an account</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerLogin;