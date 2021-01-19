import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import { connect } from 'react-redux';
import { logout } from '../../store/userActions'



function Menu(props) {

    const { isAuth, logout } = props;

    return (
        <>
            <Navbar bg="dark" variant="dark">

                <Link to="/">
                    <Navbar.Brand >LOGO</Navbar.Brand>
                </Link>

                <Nav>
                    <NavLink to="/"
                        exact
                        activeClassName={styles.isActive}>
                        Home
                    </NavLink>

                    <NavLink to="/about"
                        exact
                        activeClassName={styles.isActive}>
                        About
                    </NavLink>
                    <NavLink to="/contacts"
                        exact
                        activeClassName={styles.isActive}>
                        Contacts
                    </NavLink>
                </Nav>

                {isAuth ?
                    <Button className='btn-danger ml-auto' onClick={logout}>LogOut</Button> :
                    <>
                        <Link to='/login' className='ml-auto'>
                            <Button className='primary'>Login</Button>
                        </Link>
                        <Link to='/registration' className='m-2'>
                            <Button className='btn-danger'>Registration</Button>
                        </Link>

                    </>
                }

            </Navbar>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth
    }
};

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);