import React, {useState, useMemo} from 'react';
import classes from "./CustomerSignup.module.css";
import Select from "react-select";
import countryList from "react-select-country-list";

const CustomerSignup = () => {

    const [value, setValue] = useState('');
    const options = useMemo(()=>countryList().getData(), []);

    const changeHandler = value => {
        setValue(value)
    }

    return(
        <div className={classes.input}>
            <div className={classes.uberEats}>
                <h1>Uber <span className={classes.eats}>Eats</span></h1>
            </div>
            <div>
                <h2 className={classes.signup}>Please Signup</h2>
                <form>
                    <label>Nick name(optional)</label>
                    <input type="text" name="nickName"/>
                    <label>Please enter your first name</label>
                    <input type="text" name="firstName"/>
                    <label>Please enter your last name</label>
                    <input type="text" name="lastName"/>
                    <label>Please enter your email address.</label>
                    <input type="text" name="email"/>
                    <label>Please enter your password</label>
                    <input type="password" name="password"/>
                    <label>Please confirm your password</label>
                    <input type="password" name="cnfPassword"/>
                    <label>Please provide your Date of Birth</label>
                    <input type="date" name="dateOfBirth"/>
                    <label>City</label>
                    <input type="text" name="city"/>
                    <label>State or Province</label>
                    <input type="text" name="province"/>
                    <label>Country</label>
                    <Select options={options} value={value} onChange={changeHandler}/>
                    <br/>
                    <label>ZIP Code</label>
                    <input type="text" name="zipCode"/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default CustomerSignup;