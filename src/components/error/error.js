import React from 'react';
import './error.css';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/img/error1.jpg'} alt='error'></img>
            <span>Somethink goes wrong</span>
        </>
    )
}

export default ErrorMessage