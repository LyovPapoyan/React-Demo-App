import React from 'react';
import PropTypes from 'prop-types';

import { Button, Card } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import styles from "./Task.module.css";

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

    toggleModal = ()=>{
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {

        let {checked} = this.state

    return (
        <Card className= {`${styles.card} ${checked ? styles.checked : null}`}>
          <input type="checkbox"
           className={styles.checkbox}
            onClick={this.toggleCheckbox}
           />
            <Card.Header>Task</Card.Header>
            <Card.Body>
                <Card.Text>
                    {this.props.data.text}
                </Card.Text>

                <Button  className = 'm-1' variant="info" onClick={this.props.onEdit}>
                    <FontAwesomeIcon icon={faEdit} />
                    </Button>

                <Button variant="danger" onClick={ this.props.removeTask(this.props.data.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
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
