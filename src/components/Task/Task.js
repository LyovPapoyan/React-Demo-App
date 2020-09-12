import React from 'react';

import { Button, Card } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default function(props) {

    return (
        <Card className="mb-5"  style={{width: '20rem'}}>
            <Card.Header>Task</Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.data.text}
                </Card.Text>
                <Button variant="danger" onClick={ props.removeTask(props.data.id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </Button>
        </Card.Body>
    </Card>
    )
}