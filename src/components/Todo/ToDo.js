import React from 'react';
import idGenerator from '../Helpers/Helper';

import { Row, Col, Container } from 'react-bootstrap';

import Input from '../Input/Input';
import Task from '../Task/Task';


export default class Todo extends React.PureComponent {


    state = {
        tasks: []
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
              tasks: newArr
         });
       }
    }

    render() {

      let taskCards = this.state.tasks
      .map((item) => 
        <Col key={item.id}>
           <Task 
           data = {item}
            removeTask={this.deleted}
           />
       </Col>
      );
      
        return (
             <Container>
                <Row>
                    <Col>
                        <Input onAdd={this.addTask}/>
                    </Col>
                </Row>
                
                <Row>
                    {
                        taskCards
                    }
                </Row>
            </Container>
        )
    }
}