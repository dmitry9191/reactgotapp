import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../error';
import './app.css';
import CharacterPage from '../pages/characterPage';
import BookPage from '../pages/bookPage';
import HousePage from '../pages/housePage';
import BookItem from '../pages/bookItem';
import StartingPage from '../pages/startingPage';
import UnknownPage from '../pages/unknownPage';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';


export default class App extends Component  {

    constructor() {
        super();
        this.toggleChar = this.toggleChar.bind(this);
    }

    state = {
        btnToggler: false,
        error: false,
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
            <Router>
                <div className="app">
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
                        <Switch>
                            <Route path="/" exact component={StartingPage}/>
                            <Route path="/characters/" exact component={CharacterPage}/>
                            <Route path="/houses/" exact component={HousePage}/>
                            <Route path="/books/" exact component={BookPage}/>
                            <Route path="/books/:id" render={
                                ({match}) => {
                                    const {id} = match.params;
                                    return <BookItem bookId={id}/>
                                }
                            }/>
                            <Route component={UnknownPage}/>
                        </Switch>
                    </Container>
                </div>
            </Router>
        );
    }
};

