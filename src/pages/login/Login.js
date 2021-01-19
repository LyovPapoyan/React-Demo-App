import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import styles from '../registration/Registration.module.css';
import {connect} from 'react-redux';
import {login} from '../../store/userActions';

function Login(props) {

    useEffect(() => {
        if(props.isAuth){
            props.history.push('/');
        }
    }, [props.isAuth, props.history])

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null
    });

    const handleSubmit = () => {
        const {email, password } = values;

        setErrors({
            email: email ? null : 'Email is required',
            password: password ? null : 'Password is required',
        });

        if(email && password) {
           console.log(values);
           props.login(values)
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
                            <h3 className={styles.heading}>Login</h3>

                            <Form.Group>
                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
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
                                    className={errors.password ? styles.invalid : ''}
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
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Login
                            </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    }
}

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)