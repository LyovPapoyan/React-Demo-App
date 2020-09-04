import React, { Component } from 'react';
import Name from './Name';
import Price from './Price';
import Description from './Description';


export default class Product extends Component {
    

    render() {
        console.log(this.props);    
        return (
            <ul>
                 <li> <Name name={this.props.name} /> </li>
                 <li> <Price price={this.props.price} /> </li>
                 <li> <Description description={this.props.description}/> </li>
            </ul>
        )
    }
}