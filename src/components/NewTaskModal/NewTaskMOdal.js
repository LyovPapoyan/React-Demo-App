import React, { PureComponent } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Input.module.css'


class NewTaskModal extends PureComponent {
    state = {
        title: '',
        description: '',
        date: new Date(),
        valid: true,
        validationType: null
    };

    validationErrors = {
        requiredError: 'The field is required!',
        lengthError: 'The title length should be less than 30 characters'
    }

    handleChange = (type, value) => {

        if(type === 'title' && !this.state.valid) {
            this.setState({
                [type]: value,
                valid: true
            });
        }

        this.setState({
            [type]: value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSave();
        }
    };

    handleSave = () => {

        let { title, description, date } = this.state;
        title = title.trim();

        if (!title) {
            this.setState({
                valid: false,
                 validationType: 'requiredError'
            })
            return;
        };


        if (title.length > 30) {
            this.setState({
                valid: false,
                validationType: 'lengthError'
            })
            return;
        };

        const data = {
            title,
            description,
            date: date.toISOString().slice(0, 10)
        }
        this.props.onAdd(data);
    }

    render() {

        let errorMsg = '';

        if(!this.state.valid) {
            errorMsg = this.validationErrors[this.state.validationType];
        }

        return (
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={true}
                onHide={this.props.onCancel}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add new task
               </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        className={!this.state.valid ? styles.invalid : null}
                        onChange={(event) => this.handleChange('title', event.target.value)}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Title"
                        aria-label="Title"
                        aria-describedby="basic-addon2"
                    />
                    <p className={styles.errorMsg}>{errorMsg}</p>
                    <Form.Control as="textarea" className="my-3" rows={3}
                        placeholder="Description"
                        onChange={(event) => this.handleChange('description', event.target.value)}
                    />
                    <DatePicker selected={this.state.date}
                        minDate={new Date()}
                        onChange={(value) => this.handleChange('date', value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleSave} variant='success'>Add</Button>
                    <Button onClick={this.props.onCancel} variant='secondary'>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }


}


NewTaskModal.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default NewTaskModal;