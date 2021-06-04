import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

const Header = () => {
    return (
        <div class="headerBlock">
            <h3 class="headerTitle">
                <Link to="/">
                Game of Thrones DB
                </Link>
            </h3>
            <ul class="headerLinks">
                <li>
                    <Link to="/characters">Characters</Link>
                </li>
                <li>
                    <Link to="/houses">Houses</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>   
                </li>
            </ul>
        </div>
    );
};

export default Header;