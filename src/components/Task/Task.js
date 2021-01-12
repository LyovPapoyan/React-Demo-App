import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from "./Task.module.css";
import { Link } from 'react-router-dom';

import {connect} from 'react-redux';
import {removeTask, changeTaskStatus} from '../../store/taskActions'


 class Task extends React.PureComponent {

    state = {
        checked: false
    }

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });

        this.props.onCheck(this.props.id);
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {

        let { checked } = this.state;
        let {status} = this.props.data;

        return (
            <Card className={`${styles.card} ${checked ? styles.checked : null}  ${status === 'done' ? styles.done : styles.active}`}>
                <input type="checkbox"
                    className={styles.checkbox}
                    onClick={this.toggleCheckbox}
                />
                <Link to={`/task/${this.props.data._id}`}>
                    <Card.Header className={styles.card_header}>Title: {this.props.data.title}</Card.Header>
                </Link>
                <Card.Body>
                    <Card.Text className={styles.desc}>
                        Description:  {this.props.data.description}
                    </Card.Text>
                    <Card.Text>
                        Date: { this.props.data.date.slice(0, 10) }
                    </Card.Text>

                    <Card.Text>
                        Created: { this.props.data.created_at.slice(0, 10)}
                    </Card.Text>

                    <Card.Text>
                        Status: {status}
                    </Card.Text>
            { status === 'done' ? 
                    <Button className='m-1'
                        variant="warning"
                        onClick={() => this.props.changeTaskStatus(this.props.data._id, {status:'active'})}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faHistory} title="Active"/>
                    </Button>
                :
                    <Button className='m-1'
                        variant="success"
                        onClick={() => this.props.changeTaskStatus(this.props.data._id, {status:'done'})}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faCheck} title="Completed"/>
                    </Button>
            }
                    <Button className='m-1'
                        variant="info"
                        onClick={this.props.onEdit}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faEdit} title="Edit"/>
                    </Button>

                    <Button
                        variant="danger"
                        onClick={() => this.props.removeTask(this.props.data._id)}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faTrash} title="Delete"/>
                    </Button>
                </Card.Body>
            </Card>
        );
    };
};

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onCheck: PropTypes.func,
    onEdit: PropTypes.func
}

const mapDispatchToProps = {
        removeTask, 
        changeTaskStatus
}

export default connect(null, mapDispatchToProps)(Task)

