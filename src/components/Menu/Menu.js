import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styles from './Menu.module.css'


function Menu() {
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
                <Form inline className="ml-auto">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    );
}

export default Menu;