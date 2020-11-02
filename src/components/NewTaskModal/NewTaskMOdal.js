import React, { PureComponent } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

class NewTaskModal extends PureComponent {
    state = {
        title: '',
        description: '',
        date: ''
    };

    handleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSave();
        }
    };

    handleSave = () => {

        const { title } = this.state;
        if (title) {
            this.props.onAdd(title);
        }
    }

    render() {

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
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Input task"
                        aria-label="Input task"
                        aria-describedby="basic-addon2"
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








// import React from 'react';
// import PropTypes from 'prop-types';
// import { InputGroup, Button, FormControl, Col, Row } from 'react-bootstrap';

// export default class Input extends React.PureComponent {

//     state = {
//         inpValue: ''
//     };


//     handleChange = (event) => {
//         this.setState({
//             inpValue: event.target.value
//         });
//     };

//     handleKeydown = (event) => {

//         if (!this.state.inpValue) {
//             return
//         };

//         if (event.key === 'Enter') {
//             this.props.onAdd(this.state.inpValue);
//             this.setState({
//                 inpValue: ''
//             });
//         };
//     };

//     sendInputValue = () => {

//         if (!this.state.inpValue) {
//             return
//         };

//         this.props.onAdd(this.state.inpValue);
//         this.setState({
//             inpValue: ''
//         });
//     }


//     render() {

//         return (
//             <Row>
//                 <Col>
//                     <InputGroup className="mb-5 mt-4" >
//                         <FormControl
//                             value={this.state.inpValue}
//                             onChange={this.handleChange}
//                             onKeyDown={this.handleKeydown}
//                             placeholder="Enter the new Task"
//                         />
//                         <InputGroup.Append>
//                             <Button variant="outline-primary"
//                                 onClick={this.sendInputValue}
//                                 disabled={this.props.disabled}>
//                                 Add Task
//                         </Button>
//                         </InputGroup.Append>
//                     </InputGroup>
//                 </Col>
//             </Row>
//         );
//     }
// }

// Input.propTypes = {
//     onAdd: PropTypes.func.isRequired
// }