import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import './app.css';
import CharacterPage from '../characterPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService';


export default class App extends Component  {

    gotService = new gotService();
    
    constructor() {
        super();
        this.toggleChar = this.toggleChar.bind(this);
    }

    state = {
        btnToggler: false,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleChar(state) {
        this.setState((state) => {
            return {
                btnToggler: !state.btnToggler
            }
        })
    }
    
    render() {

        const {btnToggler} = this.state;

        const charBlock = !btnToggler ? <RandomChar/> : null;

        if (this.state.error) {
            return <ErrorMessage/>;
        }

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
                    <CharacterPage/>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotService.getAllBooks}
                                      renderItem={(item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onItemSelected={this.onItemSelected}
                                      getData={this.gotService.getAllHouses}
                                      renderItem={(item) => item.name}/>
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

