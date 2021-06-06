import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner';
/* import ErrorMessage from '../error';*/

function ItemList({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState();

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data); 
            })
    }); 


    /* componentDidCatch() {
        this.setState({
            error: true
        })
    } */

    function renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            const label = renderItem(item);

            return(
                <li key={id}
                    onClick={() => onItemSelected(id)}
                    className="list-group-item">
                    {label}
                </li>
            )
        })
    }

    if (!itemList) {
        return <Spinner/>;
    }

    /* if (this.state.error) {
        return <ErrorMessage/>;
    } */

    const items = renderItems(itemList);

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    ); 
}

export default ItemList;