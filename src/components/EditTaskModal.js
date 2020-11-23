import React, { PureComponent } from 'react';
import { FormControl, Button, Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './NewTaskModal/Input.module.css'


class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state =
    {
      ...props.data,
      date: new Date(props.data.date),
      valid: true
    }
  }


  validationErrors = {
    requiredError: 'The field is required!',
    lengthError: 'The title length should be less than 30 characters'
  }

  handleChange = (type, value) => {

    if (type === 'title' && !this.state.valid) {
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

    let { title, description, date, _id } = this.state;
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
    this.props.onSave(_id, data);
  }

  render() {

    let errorMsg = '';

    if (!this.state.valid) {
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
            Edit task
               </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            className={!this.state.valid ? styles.invalid : null}
            onChange={(event) => this.handleChange('title', event.target.value)}
            onKeyDown={this.handleKeyDown}
            value={this.state.title}
            placeholder="Title"
            aria-label="Title"
            aria-describedby="basic-addon2"
          />
          <p className={styles.errorMsg}>{errorMsg}</p>
          <Form.Control as="textarea" className="my-3" rows={3}
            value={this.state.description}
            placeholder="Description"
            onChange={(event) => this.handleChange('description', event.target.value)}
          />
          <DatePicker
            selected={this.state.date}
            minDate={new Date()}
            onChange={(value) => this.handleChange('date', value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSave} variant='success'>Save</Button>
          <Button onClick={this.props.onCancel} variant='secondary'>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }


}


EditTaskModal.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default EditTaskModal;

