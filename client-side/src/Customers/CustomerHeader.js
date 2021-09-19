import React from 'react';
import classes from './CustomerHeader.module.css'
import {FiLogIn, IoCart, IoLocationOutline} from "react-icons/all";


const CustomerHeader = (props) => {

    return (
        <header>
            <div className={classes.container}>
                <div>
                    <h1>Uber<span className={classes.eats}>Eats</span></h1>
                </div>
                <div className={classes.currentDetails}>
                    <div className={classes.headerOption}>
                        <IoLocationOutline/>
                        <span>San Jose</span>
                    </div>
                </div>
                <div className={classes.currentDetails}>
                    <div className={classes.headerOption}>
                        <span>Deliver now</span>
                    </div>
                </div>
                <div className={classes.searchBar}>
                    <div className={classes.cart}>
                        <IoCart className={classes.ioCart}/>
                        <span>Cart</span>
                    </div>
                    <div className={classes.signIn}>
                        <FiLogIn className={classes.loginIcon}/>
                        <span>Sign in</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default CustomerHeader;