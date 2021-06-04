import React, {Component} from 'react';
import './charDetails.css';
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

export default class CharDetails extends Component {

    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
            item: null
        })
    }

    onItemDetLoaded = (item) => {
        this.setState({
            loading: false,
            item
        })
    }

    updateChar() {
        const {itemId} = this.props;
        const {getData} = this.props;
        
        if (!itemId) {
            return
        }

        getData(itemId)
            .then(this.onItemDetLoaded);
    }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage/>;
        } else if (!this.state.item) {
            return <span className="select-error">Please, select a character</span>
        }

        if (this.state.loading) {   
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {item} = this.state;
        const {name} = item;

        return (
            <div className="char-details rounded">
                <h4>{name || "Unknown"}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </ul>
            </div>
        );
    }
}