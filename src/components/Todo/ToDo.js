import React from 'react';
import idGenerator from '../Helpers/Helper';

import { Row, Col, Container, Button } from 'react-bootstrap';

import Input from '../Input/Input';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import Modal from '../Modal';


export default class Todo extends React.PureComponent {


    state = {
        tasks: [],
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null
    };
    

    addTask = (inpValue) => {
    
         let tasks = [...this.state.tasks];
         let task = {
             id :idGenerator(),
             text: inpValue
         }
         tasks.unshift(task);

         this.setState({
            inpValue: '',
            tasks: tasks
        });   
    }

    deleted = id => {
        return () => {
            let newArr =  this.state.tasks.filter((item) => id !== item.id);
             this.setState({
              tasks: newArr,
              
         });
       }
    }

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);

        if(checkedTasks.has(taskId)){
            checkedTasks.delete(taskId);
        } else {
            checkedTasks.add(taskId);
        }

        this.setState({
            checkedTasks:checkedTasks
        });
    }

    removeSelected = () => {
        const checkedTasks = new Set(this.state.checkedTasks);
         let tasks = [...this.state.tasks]

        for (const checkTaskId of checkedTasks) {
           tasks = tasks.filter(task => task.id !== checkTaskId)
        };

        checkedTasks.clear();
        this.setState({
            tasks,
            checkedTasks,
            showConfirm: false
        });
    }

    toggleConfirm = ()=>{
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    handleSave = (taskId, value)=>{
        
        const tasks = [...this.state.tasks];

        const taskIndex = tasks.findIndex(task => task.id === taskId);

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            text: value
        };

        this.setState({
            tasks: tasks,
            editTask: null
        });
    };

    handleEdit = (task) => () => {
        this.setState({ editTask: task });
    };

    render() {

      let taskCards = this.state.tasks
      .map((item) => 
        <Col key={item.id}>
           <Task 
           data = {item}
           removeTask={this.deleted}
           onCheck={this.handleCheck(item.id)}
           onEdit = {this.handleEdit(item)}
           disabled = {this.state.checkedTasks.size? true : false}
           />
       </Col>
      );
      
        return (
             <Container>
                <Row>
                    <Col>
                        <Input 
                        onAdd={this.addTask}
                        disabled = {this.state.checkedTasks.size? true : false}
                        />
                    </Col>
                </Row>
                
                <Row>
                    {
                        taskCards
                    }
                </Row>

                <Row className="justify-content-center">
                    <Button variant="danger"
                       disabled={this.state.checkedTasks.size? false : true}
                       onClick={this.toggleConfirm}
                     >
                      Remove Selected Tasks
                    </Button>
                </Row>

                    { this.state.showConfirm ?
                      <Confirm 
                        count = {this.state.checkedTasks.size}
                        onSubmit = {this.removeSelected}
                        onCancel = {this.toggleConfirm}
                     />
                     : false
                    }
  
                    {!!this.state.editTask && 
                    <Modal 
                    value={this.state.editTask}
                    onSave = {this.handleSave}
                    onCancel = {this.handleEdit(null)}
                    />
                   }
                    
            </Container>
        )
    }
}