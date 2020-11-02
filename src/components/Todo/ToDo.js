import React from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';

import NewTaskModal from '../NewTaskModal/NewTaskMOdal';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import Modal from '../Modal';
import styles from './Todo.module.css'

export default class Todo extends React.PureComponent {


    state = {
        tasks: [],
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        fetch("http://localhost:3001/task", {

        })
            .then(response => response.json())
            .then(tasks => {
                if (tasks.error) throw tasks.error;
                this.setState({
                    tasks: tasks
                })
            })
            .catch(err => console.log(err))
    }


    addTask = (inpValue) => {

        let tasks = [...this.state.tasks];

        const newTask = {
            title: inpValue
        }

        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(task => {
                if (task.error) throw task.error;

                this.setState({
                    tasks: [task, ...tasks],
                    openNewTaskModal: false
                })
                console.log(task);
            })
            .catch(err => console.log(err.message));
    }
    
    deleted = id => {
        return () => {
            let newArr = this.state.tasks.filter((item) => id !== item._id);
            this.setState({
                tasks: newArr,

            });
        }
    }

    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);

        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId);
        } else {
            checkedTasks.add(taskId);
        }

        this.setState({
            checkedTasks: checkedTasks
        });
    }

    removeSelected = () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        let tasks = [...this.state.tasks]

        for (const checkTaskId of checkedTasks) {
            tasks = tasks.filter(task => task._id !== checkTaskId)
        };

        checkedTasks.clear();
        this.setState({
            tasks,
            checkedTasks,
            showConfirm: false
        });
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    handleSave = (taskId, value) => {

        const tasks = [...this.state.tasks];

        const taskIndex = tasks.findIndex(task => task._id === taskId);

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

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal,

        });
    };


    render() {
        let size = this.state.checkedTasks.size;
        let taskCards = this.state.tasks
            .map((item) =>
                <Col key={item._id}>
                    <Task
                        data={item}
                        removeTask={this.deleted}
                        onCheck={this.handleCheck(item._id)}
                        onEdit={this.handleEdit(item)}
                        disabled={size ? true : false}
                    />
                </Col>
            );

        return (
            <Container>
                <Row>
                    <Col>
                        <Button
                            variant="primary"
                            className={styles.addTaskBtn}
                            disabled={size}
                            onClick={this.toggleNewTaskModal}
                        >
                            Add new Task
                       </Button>
                    </Col>
                </Row>

                <Row>
                    {
                        taskCards
                    }
                </Row>

                <Row className="justify-content-center">
                    <Button variant="danger"
                        disabled={size ? false : true}
                        onClick={this.toggleConfirm}
                    >
                        Remove Selected Tasks
                    </Button>
                </Row>

                { this.state.showConfirm ?
                    <Confirm
                        count={size}
                        onSubmit={this.removeSelected}
                        onCancel={this.toggleConfirm}
                    />
                    : false
                }

                {!!this.state.editTask &&
                    <Modal
                        value={this.state.editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                }

                { this.state.openNewTaskModal &&
                    <NewTaskModal
                        onAdd={this.addTask}
                        onCancel={this.toggleNewTaskModal}
                    />
                }

            </Container>
        )
    }
}