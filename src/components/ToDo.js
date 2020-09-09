import React from 'react';
import idGenerator from './Helpers/Helper'


export default class Todo extends React.Component {


    state = {
        inpValue: '',
        tasks: []
    };

    
    handleChange = (event) => {
        this.setState({
            inpValue : event.target.value
        });
    }

    task = () => {
         let tasks = [...this.state.tasks];
         let task = {
             id :idGenerator(),
             text: this.state.inpValue
         }
         tasks.unshift(task);
         this.setState({
            inpValue: '',
            tasks: tasks
        });
        
    }

    deleted = id => {
       let newArr =  this.state.tasks.filter((item) => id !== item.id);
       this.setState({
             tasks: newArr
         });
    }

    render() {
        return (
            <>
            <input 
                type="text" 
                placeholder="Enter new task" value={this.state.inpValue}
                onChange = {this.handleChange}
              />
              <button onClick={this.task}>Add Task</button>
                {
                  this.state.tasks.map((item ) => <>
                   <span key = {item.id }> { item.text } </span>
                   <button onClick={() => this.deleted(item.id)}>Remove</button> 
                    </> 
                  )
                }
                
            </>
        )
    }
}