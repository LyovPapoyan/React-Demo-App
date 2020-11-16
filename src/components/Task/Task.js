import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from "./Task.module.css";
import { Link } from 'react-router-dom';


export default class Task extends React.PureComponent {

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

        let { checked } = this.state

        return (
            <Card className={`${styles.card} ${checked ? styles.checked : null}`}>
                <input type="checkbox"
                    className={styles.checkbox}
                    onClick={this.toggleCheckbox}
                />
                <Link to={`/task/${this.props.data._id}`}>
                    <Card.Header className={styles.card_header}>Title: {this.props.data.title}</Card.Header>
                </Link>
                <Card.Body>
                    <Card.Text>
                        Description:  {this.props.data.description}
                    </Card.Text>
                    <Card.Text>
                        Date:  {this.props.data.date ? this.props.data.date.slice(0, 10) : "none"}
                    </Card.Text>

                    <Button className='m-1'
                        variant="info"
                        onClick={this.props.onEdit}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>

                    <Button
                        variant="danger"
                        onClick={this.props.removeTask(this.props.data._id)}
                        disabled={this.props.disabled}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </Card.Body>
            </Card>
        );
    };
};

Task.propTypes = {
    data: PropTypes.object.isRequired,
    removeTask: PropTypes.func,
    onCheck: PropTypes.func,
    onEdit: PropTypes.func
}

