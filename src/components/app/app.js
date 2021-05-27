import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/gotService';
import './app.css';


export default class App extends Component  {
    
    constructor() {
        super();
        this.toggleChar = this.toggleChar.bind(this);
        this.onCharSelected = this.onCharSelected.bind(this);
    }

    state = {
        btnToggler: false,
        selectedChar: null
    }

    toggleChar(state) {
        this.setState((state) => {
            return {
                btnToggler: !state.btnToggler
            }
        })
    }

    onCharSelected(id) {
        this.setState({
            selectedChar: id
        })
    }
    
    render() {

        const {btnToggler} = this.state;

        const charBlock = !btnToggler ? <RandomChar/> : null;

        return (
            <div>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {charBlock}
                            <button onClick={this.toggleChar} className="toggleRandom">Toggle random character</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.onCharSelected}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
};

