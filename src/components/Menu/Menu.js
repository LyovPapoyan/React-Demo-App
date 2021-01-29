import React, {useEffect} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { logout, getUserInfo } from '../../store/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Menu(props) {

    const { isAuth, logout, getUserInfo, user } = props;

    useEffect(() => {
        if(isAuth) {
            getUserInfo();
        }
       
    }, [getUserInfo, isAuth,]);

    
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Link to="/">
                    <Navbar.Brand className={styles.logo}>LOGO</Navbar.Brand>
                </Link>
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="mr-auto">
                        {
                            isAuth &&

                            <NavLink to="/"
                                exact
                                activeClassName={styles.isActive}>
                                Home
                    </NavLink>

                        }

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
                </Navbar.Collapse>

                {isAuth ?
                    <>
                        <Button variant='outline-danger ml-auto' onClick={logout}>LogOut</Button>
                        <FontAwesomeIcon icon={faUser} className={styles.icon} title={user? user.name + " " + user.surname : null} />
                    </>
                    :
                    <>
                        <Link to='/login' className='ml-auto'>
                            <Button variant='outline-primary'>Login</Button>
                        </Link>
                        <Link to='/registration' className='ml-2'>
                            <Button variant='outline-success'>Registration</Button>
                        </Link>

                    </>

                }

            </Navbar>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        user: state.authReducer.userInfo
    }
};

const mapDispatchToProps = {
    logout,
    getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);