import React, {Component} from 'react';
import ItemList from '../../itemList';
import ItemDetails, {Field} from '../../itemDetails';
import ErrorMessage from '../../error';
import gotService from '../../../services/gotService';
import RowBlock from '../../rowBlock';


export default class HousePage extends Component {
    
    gotService = new gotService();

    state = {
        selectedHouse: null,
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
            selectedHouse: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>;
        }

        const itemList =  (<ItemList onItemSelected={this.onItemSelected}
                                    getData={this.gotService.getAllHouses}
                                    renderItem={({name, region}) => `${name} (${region})`}/>),
              ItemDeatails = (
                <ItemDetails itemId={this.state.selectedHouse}
                             getData={this.gotService.getHouse}>
                    <Field field="region" label="Region"/>
                    <Field field="words" label="Words"/>
                    <Field field="titles" label="Titles"/>
                </ItemDetails>  
              );

        return (
            <RowBlock left={itemList} right={ItemDeatails}/>
        )
    }
}