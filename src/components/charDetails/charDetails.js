import React, {Component} from 'react';
import gotService from '../../services/gotService';
import './charDetails.css';
import Spinner from '../spinner';
import ErrorMessage from '../error';


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
            return <span className="select-error">Please, choose the character</span>
        }

        if (this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name, gender, born, died, culture} = this.state.char;

        return (
            <div className="char-details rounded">
                <h4>{name || "Unknown"}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender || "Unknown"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born || "Unknown"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died || "Unknown"}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture || "Unknown"}</span>
                    </li>
                </ul>
            </div>
        );
    }
}