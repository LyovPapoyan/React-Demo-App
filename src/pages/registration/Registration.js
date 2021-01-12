import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './Registration.module.css';
import {register} from '../../store/userActions';
import {connect} from 'react-redux';

function Registration(props) {

    useEffect(() => {
        if(props.registerSuccses) {
            props.history.push('/login');
        }
    }, [props.registerSuccses])

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = () => {
        const {email, password, confirmPassword, name, surname} = values;
        let valid = true;
        let passwordMessage = null;

        if(!confirmPassword){
            passwordMessage = 'Password is required';
            valid = false
        }
        else if(password !== confirmPassword){
                passwordMessage = "Passwords didn't match";
                valid = false;
            }
        else if(password.length < 6){
                passwordMessage = 'Password should not be shorter than 6 characters';
                valid = false;
            }

        setErrors({
            email: email ? null : 'Email is required',
            confirmPassword: passwordMessage,
            password: password ? null : 'Password is required',
            name: name ? null : 'Name is required',
            surname: surname ? null : 'Surame is required'
        });

        if(valid) {
            props.register(values);
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: null
        });

    };

    return (

        <div className={styles.main}>
            <Container>

                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Registration</h3>

                            <Form.Group>
                                <Form.Control
                                    className={errors.email? styles.invalid: ''}
                                    type="text"
                                    name="name"
                                    placeholder="Enter your Name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                    {errors.name}
                                </Form.Text>
                                }
                               
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.email? styles.invalid: ''}
                                    type="text"
                                    name="surname"
                                    placeholder="Enter your Surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                    {errors.surname}
                                </Form.Text>
                                }
                               
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.email? styles.invalid: ''}
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger" >
                                    {errors.email}
                                </Form.Text>
                                }
                               
                            </Form.Group>

                            <Form.Group>
                                <Form.Control
                                    className={errors.password? styles.invalid: ''}
                                    type="password"
                                    placeholder="Password"
                                    value={values.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                                {
                                    <Form.Text className="text-danger">
                                    {errors.password}
                                </Form.Text>
                                } 
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                className={errors.confirmPassword? styles.invalid: ''}
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />
                                <Form.Text className="text-danger">
                                    {errors.confirmPassword}
                                </Form.Text>
                            </Form.Group>

                                <div className={styles.submitContainer}>
                                    <Button
                                        variant="primary"
                                        onClick={handleSubmit}
                                    >
                                        Register
                                </Button>
                                </div>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

const mapStateToProps = (state) => {
    return {
      registerSuccses: state.authReducer.registerSuccses
    }
}

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

