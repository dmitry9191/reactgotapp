import React from 'react';

const ErrorMessage = () => {
    return (
        <>
            <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img>
            <span>Somethink goes wrong</span>
        </>
    )
}

export default ErrorMessage