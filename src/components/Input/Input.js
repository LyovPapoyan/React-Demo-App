import React from 'react';
import { InputGroup, Button , FormControl } from 'react-bootstrap';

export default class Input extends React.Component {

    state = {
        inpValue: ''
    };


    handleChange = (event) => {
        this.setState({
            inpValue : event.target.value
        });
    };

    handleKeydown = (event) => {

        if(!this.state.inpValue) {
            return
        };

        if(event.key === 'Enter') {
            this.props.onAdd(this.state.inpValue);
            this.setState({
                inpValue : ''
            });
        };
    };

    sendInputValue = () => {

        if(!this.state.inpValue) {
            return
        };

        this.props.onAdd(this.state.inpValue);
        this.setState({
            inpValue: ''
        });
    }


    render() {

        return (
            <InputGroup className="mb-5 mt-4" style={{width: '67rem'}}>
                <FormControl
                    value={this.state.inpValue}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeydown}
                    placeholder="Enter the new Task"    
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" onClick={this.sendInputValue}>Add Task</Button>
                </InputGroup.Append>
            </InputGroup> 
        );       
    }
}