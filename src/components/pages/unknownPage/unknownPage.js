import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class UnknownPage extends Component {
    render() {
        return (
            <>
                <h1>Page is unknown</h1>
                <Link to="/"><button>Back to the main page</button></Link>
            </>
        )
    }
}