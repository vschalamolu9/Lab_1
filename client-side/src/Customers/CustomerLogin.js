import React, {useState} from 'react';
import Axios from "axios";

const CustomerLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = () => {
        Axios.post('http://localhost:5000/api/login',{
            emailId: email,
            password: password
        }).then(()=>{
            alert("Login Successful");
        })
    }

    return (
        <div>
            <h1>Uber Eats</h1>
            <div className="form">
                <h2>Welcome back</h2>
                <label>Sign in with your email address.</label>
                <input type="text" name="email" onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <br/>
                <br/>
                <label>Please enter your password to sign in.</label>
                <input type="password" name="password" onChange={(e)=>{
                    setPassword(e.target.value);
                }}/>
                <br/>
                <br/>
                <button onClick={submitLogin}>Submit</button>
            </div>
        </div>
    )
}

export default CustomerLogin;