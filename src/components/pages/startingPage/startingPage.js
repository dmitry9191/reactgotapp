import React, { Component } from 'react';
import './startingPage.css';
import  img from './got.webp';


export default class StartingPage extends Component {

    render() {
        return (
            <>
                <h1 className="title">Welcome to GOT DB</h1>
                <div className="gotImg">
                    <img src={img} alt="alcoonthethrone"></img>    
                </div>
            </>
        )
    }
}