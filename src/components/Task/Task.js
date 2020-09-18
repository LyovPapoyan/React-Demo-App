import React from 'react';

import { Button, Card } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
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
                <Button variant="danger" onClick={ this.props.removeTask(this.props.data.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
        </Card.Body>
    </Card>
    );
  };
};

