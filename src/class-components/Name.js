/* eslint-disable no-useless-constructor */
import React from 'react';

export default class Name extends React.Component {
    // constructor(props){
    //     super(props)
    // }

    
    render() {
        return <span>Name is - {this.props.name} </span>
    }
}