/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import { postContactForm } from '../../store/userActions';


 function Contact(props) {

    useEffect(() => {
        if(props.authSuccessMessage) {
            setValues({
                email: '',
                name: '',
                message: ''
            })
        }
    }, [props.authSuccessMessage])

    const [values, setValues] = useState({
        email: '',
        name: '',
        message: '',
    });


    const [errors, setErrors] = useState({
        email: null,
        name: null,
        message: null
    });


    const handleChange = (key, value) => {
        setValues({
            ...values,
            [key]: value
        });

        setErrors({
            ...errors,
            [key]: null
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, message, email } = values;

        setErrors({
            email: email ? null : 'Email is required',
            name: name ? null : 'Name is required',
            message: message ? null : 'Text is required',
        })

        if (email && name && message) {

            props.postContactForm(values);

           

        }
    }


        return (
            <div className={styles.container}>
                <h2 className='text-center m-5'>Contact Us</h2>
                <Row className="justify-content-center mr-1">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    className={errors.email ? styles.invalid : ''}
                                    value={values.email}
                                    onChange={(event) => handleChange('email', event.target.value)}
                                />

                                {
                                    <Form.Text className="text-danger" >
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    className={errors.name ? styles.invalid : ''}
                                    value={values.name}
                                    onChange={(event) => handleChange('name', event.target.value)}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                        {errors.name}
                                    </Form.Text>
                                }

                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Your message</Form.Label>
                                <Form.Control as="textarea"
                                    rows={3}
                                    className={errors.message ? styles.invalid : ''}
                                    value={values.message}
                                    onChange={(event) => handleChange('message', event.target.value)}
                                />

                                {
                                    <Form.Text className="text-danger" >
                                        {errors.message}
                                    </Form.Text>
                                }

                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }

   const mapStateToProps = (state) => {
       return {
        authSuccessMessage: state.authReducer.authSuccessMessage
       }
   }

    const mapDispatchToProps = {
        postContactForm
    }


    export default connect(mapStateToProps, mapDispatchToProps)(Contact)