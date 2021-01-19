import React from 'react';
import styles from './SingleTask.module.css';
import EditTaskModal from '../../components/EditTaskModal';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faHistory, faCheck } from '@fortawesome/free-solid-svg-icons';

import { connect } from 'react-redux';
import { getTask, removeTask, changeTaskStatus } from '../../store/taskActions';

class SingleTask extends React.PureComponent {

    state = {
        isEdit: false
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);

        //     fetch(`http://localhost:3001/task/${taskId}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-type": "application/json"
        //         }
        //     })
        //         .then(response => response.json())
        //         .then(task => {
        //             if (task.error) throw task.error;
        //             this.setState({
        //                 task: task
        //             })

        //         })
        //         .catch(err => console.log(err));
    }


    componentDidUpdate(prevProps) {
        if (!prevProps.removeTaskSuccsess && this.props.removeTaskSuccsess) {
            this.props.history.push("/");
        }

        if (!prevProps.editTaskSuccsess && this.props.editTaskSuccsess) {
            this.toggleEditModal();
        }
    }


    toggleEditModal = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    // handleSave = (taskId, task) => {

    //     this.props.editTask(taskId, task, 'single')

    // fetch(`http://localhost:3001/task/${taskId}`, {
    //     method: "PUT",
    //     body: JSON.stringify(task),
    //     headers: { "Content-Type": "application/json" }
    // })
    //     .then(response => response.json())
    //     .then(editedTask => {
    //         if (editedTask.error) throw editedTask.error;

    //         this.setState({
    //             task: editedTask,
    //             isEdit: false
    //         })
    //     })
    //     .catch(err => console.log(err.message));

    // }

    handleRemove = () => {


        const id = this.props.task._id

        this.props.removeTask(id, 'single')

        // fetch(`http://localhost:3001/task/${id}`, {
        //     method: "DELETE",
        //     headers: { "Content-Type": "application/json" }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.error) throw data.error;
        //         this.props.history.push("/")
        //     })
        //     .catch(err => console.log(err.message));
    }

    render() {
        const { isEdit } = this.state;
        let { task,  changeTaskStatus } = this.props;
       
        return (
            <>
                { task ?
                    <div className={styles.container}>
                        <h3>Title</h3>
                        <p>{task.title}</p>
                        <h3>Description</h3>
                        <p className={styles.desc}>{task.description}</p>
                        <h3>Time</h3>
                        <p>{task.date.slice(0, 10)}</p>
                        <h3>Created</h3>
                        <p>{task.created_at.slice(0, 10)}</p>
                        <h3>Status</h3>
                        <p>{task.status}</p>

                        {task.status === 'done' ?
                            <Button 
                                variant="warning"
                                onClick={() => changeTaskStatus(task._id, { status: 'active' }, 'single')}
                                disabled={this.props.disabled}>
                                <FontAwesomeIcon icon={faHistory} title="Active" />
                            </Button>
                            :
                            <Button 
                                variant="success"
                                onClick={() => changeTaskStatus(task._id, { status: 'done' }, 'single')}
                                disabled={this.props.disabled}>
                                <FontAwesomeIcon icon={faCheck} title="Completed" />
                            </Button>
                        }

                        <Button className='m-3'
                            variant="info"
                            onClick={this.toggleEditModal}>
                            <FontAwesomeIcon icon={faEdit} title="Edit" />
                        </Button>

                        <Button
                            variant="danger"
                            onClick={this.handleRemove}>
                            <FontAwesomeIcon icon={faTrash} title="Delete" />
                        </Button>

                        {
                            isEdit &&
                            <EditTaskModal
                                data={task}
                                onCancel={this.toggleEditModal}
                                from='single'
                            />
                        }
                    </div> :
                    <p>THERE IS NO TASKS!</p>

                }

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.taskReducer.task,
        removeTaskSuccsess: state.taskReducer.removeTaskSuccsess,
        editTaskSuccsess: state.taskReducer.editTaskSuccsess
    }
}

const mapDispatchToProps = {
    getTask,
    removeTask,
    changeTaskStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);