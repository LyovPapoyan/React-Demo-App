import React from 'react';
import styles from './SingleTask.module.css';
import Spinner from '../../components/Spinner/Spinner';
import EditTaskModal from '../../components/EditTaskModal';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

class SingleTask extends React.PureComponent {

    state = {
        task: null,
        isEdit: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => response.json())
            .then(task => {
                if (task.error) throw task.error;
                this.setState({
                    task: task
                })

            })
            .catch(err => console.log(err));
    }


    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handleSave = (taskId, task) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "PUT",
            body: JSON.stringify(task),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(editedTask => {
                if (editedTask.error) throw editedTask.error;
               
                this.setState({
                    task: editedTask,
                    isEdit: false
                })
            })
            .catch(err => console.log(err.message));

    }

    removeTask = () => {
        const id = this.state.task._id
        fetch(`http://localhost:3001/task/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data.error;
                this.props.history.push("/")
            })
            .catch(err => console.log(err.message));
    }

    render() {
        const { task, isEdit } = this.state;
        return (
            <>
                {
                    !task ? <Spinner /> :
                        <div className={styles.container}>
                            <h3>Title</h3>
                            <p>{task.title}</p>
                            <h3>Description</h3>
                            <p>{task.description}</p>
                            <h3>Time</h3>
                            <p>{task.date.slice(0, 10)}</p>
                            <Button className='mr-4'
                                variant="info"
                                onClick={this.toggleEditModal}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>

                            <Button
                                variant="danger"
                                onClick={this.removeTask}>
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>

                            {
                                isEdit &&
                                <EditTaskModal
                                    data={task}
                                    onSave={this.handleSave}
                                    onCancel={this.toggleEditModal}
                                />
                            }
                        </div>

                }

            </>
        )
    }
}

export default SingleTask;