import React from 'react';


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
         let task = this.state.tasks;
         task.unshift(this.state.inpValue);

         this.setState({
            inpValue: '',
            tasks: task
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
                  this.state.tasks.map((item,index) => <p key = { index }> { item } </p>)
                }
            </>
        )
    }
}