import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../error';


export default class ItemList extends Component {

    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList
                })
            })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            console.log(item.id);
            return(
                <li key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}
                    className="list-group-item">
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const {charList} = this.state;

        if (!charList) {
            return <Spinner/>;
        }

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const items = this.renderItems(charList);

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}