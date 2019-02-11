import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRecipes } from '../actions';

class SearchRecipes extends Component {

    constructor(){
        super();

        this.state = {
            ingredients: '',
            dish: ''
        }
    }

    search() {
        let { ingredients, dish } = this.state;
        const url = `http://www.recipepuppy.com/api/?i=${ingredients}&${dish}`;
        
        axios.get(url, {
            crossDomain: true
        })
        .then(function (response) {
            this.props.setRecipes(response.results);
        })
        .catch(function (error) {
            console.log(error);
        });        
    }

    render(){
        return (
            <Form inline>
                <FormGroup>
                    <label>Ingredients</label>
                    <FormControl 
                        type="text" 
                        placeholder="garlic, chicken"
                        onChange={event => this.setState({ ingredients: event.target.value })}
                    />
                </FormGroup>
                {' '}
                <FormGroup>
                    <label>Dish</label>
                    <FormControl 
                        type="text" 
                        placeholder="adobo"
                        onChange={event => this.setState({ dish: event.target.value })}
                    />
                </FormGroup>
                {' '}
                <Button onClick={() => this.search()}>Submit</Button>
            </Form>
        )
    }
}

export default connect(null, { setRecipes })(SearchRecipes);