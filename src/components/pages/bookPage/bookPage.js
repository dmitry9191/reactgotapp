import React, {Component} from 'react';
import ItemList from '../../itemList';
import CharDetails, {Field} from '../../charDetails';
import ErrorMessage from '../../error';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class BookPage extends Component {
    
    gotService = new gotService();

    state = {
        selectedBook: null,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }
    
    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList =  (<ItemList onItemSelected={this.onItemSelected}
                                    getData={this.gotService.getAllBooks}
                                    renderItem={({name}) => `${name}`}/>),
              charDeatails = (
                <CharDetails itemId={this.state.selectedBook}
                             getData={this.gotService.getBook}>
                    <Field field="numberOfPages" label="Number of pages"/>
                    <Field field="released" label="Released"/>
                    <Field field="publisher" label="Publisher"/>
                </CharDetails>  
              );

        return (
            <RowBlock left={itemList} right={charDeatails}/>
        )
    }
}