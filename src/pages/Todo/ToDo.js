import React from 'react';

import { Row, Col, Container, Button } from 'react-bootstrap';

import NewTaskModal from '../../components/NewTaskModal/NewTaskMOdal';
import Task from '../../components/Task/Task';
import Confirm from '../../components/Confirm';
import EditTaskModal from '../../components/EditTaskModal';

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
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
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


    addTask = (newTask) => {

        let tasks = [...this.state.tasks];


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
            })
            .catch(err => console.log(err.message));
    }

    deleted = id => {
        return () => {
            fetch(`http://localhost:3001/task/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.error) throw data.error;
                    let newArr = this.state.tasks.filter((item) => id !== item._id);
                    this.setState({
                        tasks: newArr,
                    });
                })
                .catch(err => console.log(err.message));
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
        console.log();
        fetch(`http://localhost:3001/task/`, {
            method: "PATCH",      // Patch - update server 
            body: JSON.stringify({
                tasks: [...checkedTasks]
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) throw data.error;
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
            })
            .catch(err => console.log(err.message));
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    handleSave = (taskId, data) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(editedTask => {
                if (editedTask.error) throw editedTask.error;

                const tasks = [...this.state.tasks];
                const foundIndex = tasks.findIndex(el => el._id === editedTask._id);
                tasks[foundIndex] = editedTask;

                this.setState({
                    tasks,
                    editTask: null
                })
            })
            .catch(err => console.log(err.message));

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
                    <Col className="text-center m-3">
                        <Button
                            variant="primary"
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

                { this.state.tasks.length !== 0 &&
                    <Row className="justify-content-center">
                        <Button variant="danger"
                            disabled={size ? false : true}
                            onClick={this.toggleConfirm}
                        >
                            Remove Selected Tasks
                    </Button>
                    </Row>
                }
                { this.state.showConfirm ?
                    <Confirm
                        count={size}
                        onSubmit={this.removeSelected}
                        onCancel={this.toggleConfirm}
                    />
                    : false
                }

                {!!this.state.editTask &&
                    <EditTaskModal
                        data={this.state.editTask}
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