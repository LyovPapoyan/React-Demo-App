import React from 'react';

export default class Price extends React.Component {

    state = {
        price : this.props.price
    }

    changeCurrency = () => {
        let {price} = this.state;

        if (price.includes('USD')) {

            return this.setState({
                price: Math.round( parseInt(price) * 485)  + ' AMD',
            });
        } else {
            return this.setState({
                price: Math.round( parseInt(price) / 485) + ' USD '
            })
        };    
    }

    
    render(){
        return ( 
         <div> 
            <span>Price is - {this.state.price}</span> 
            <button onClick={this.changeCurrency}>Change the currency </button>
        </div>  
        )
    }
}