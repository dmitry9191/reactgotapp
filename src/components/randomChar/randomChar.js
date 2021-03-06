import React, {useState, useEffect} from 'react';
import gotService from '../../services/gotService';
import './randomChar.css';
import Spinner from '../spinner';
import ErrorMessage from '../error';

function RandomChar() {

    const fetchService = new gotService();    

    const [char, updateCharacter] =  useState({}),
          [loading, updateLoading] = useState(true),
          [error, updateError] = useState(false);
     
    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 10000);
        return () => {clearInterval(timerId)};
    }, []);

    function updateChar() {
        const id = Math.floor(Math.random() * 140 + 25);
        fetchService.getCharacter(id)
            .then((data) => {
                updateCharacter(data);
                updateLoading(false);
            })
            .catch(() => {
                updateError(true);
                updateLoading(false);
            });
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;


    return (
        <div className="random-block rounded">
            {errorMessage}
            {spinner}
            {content}
        </div>
    );
}

export default RandomChar;


const View = ({char}) => {

    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}