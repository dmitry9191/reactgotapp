import React, {useState, useEffect} from 'react';
import './itemDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../error';

const Field = ({item, field, label}) => {
    return (
       <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field] || "Unknown"}</span>
        </li> 
    )
}   

export {Field};

function ItemDetails({getData, itemId, children}) {

    const [item, updateItem] = useState(null),
          [loading, updateLoading] = useState(true),
          [error, updateError] = useState(false);

    useEffect(() => {
        updateChar();
    }, [children]);

    function onItemDetLoaded(item) {
        updateItem(item);
        updateLoading(false);
    }

    function updateChar() {
       
    if (!itemId) {
        return
    }

    getData(itemId)
        .then(onItemDetLoaded);
    }

    if (!item && error) {
        return <ErrorMessage/>;
    } else if (!item) {
        return <span className="select-error">Please, select a character</span>
    }

    if (loading) {   
        return (
            <div className="char-details rounded">
                <Spinner/>
            </div>
        )
    }

    const {name} = item;

    try {
        return (
            <div className="char-details rounded">
                <h4>{name || "Unknown"}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    } catch(err) {
        updateError(true);
        updateItem(null);
        console.log(err);
    }
}

export default ItemDetails;