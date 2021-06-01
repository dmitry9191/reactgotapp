import React, {Component} from 'react';
import gotService from '../../services/gotService';
import './charDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../error';

const Field = ({char, field, label}) => {
    return (
       <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field] || "Unknown"}</span>
        </li> 
    )
}   

export {Field};

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true,
            char: null
        })
    }

    onCharDetLoaded = (char) => {
        this.setState({
            loading: false,
            char
        })
    }

    updateChar() {
        const {charId} = this.props;
        
        if (!charId) {
            return
        }

        this.gotService.getCharacter(charId)
            .then(this.onCharDetLoaded);
    }

    render() {

        if (!this.state.char && this.state.error) {
            return <ErrorMessage/>;
        } else if (!this.state.char) {
            return <span className="select-error">Please, select a character</span>
        }

        if (this.state.loading) {   
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {char} = this.state;
        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name || "Unknown"}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char});
                        })
                    }
                </ul>
            </div>
        );
    }
}