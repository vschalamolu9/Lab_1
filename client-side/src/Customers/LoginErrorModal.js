import React from 'react';
import classes from './LoginErrorModal.module.css';

const LoginErrorModal = (props) => {

    return(
        <div>
            <div className={classes.backdrop} onClick={props.onConfirm}/>
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>{props.title}</h2>
                </header>
                <div className={classes.content}>
                    <p>{props.message}</p>
                </div>
                <footer className={classes.actions}>
                    <button className={classes.okay} onClick={props.onConfirm}>Okay</button>
                </footer>
            </div>
        </div>
    )

}

export default LoginErrorModal;