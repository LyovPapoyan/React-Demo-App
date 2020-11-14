import React from 'react';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';  
import {Link} from 'react-router-dom';
import styles from './Menu.module.css'


function Menu() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Link to="/">
            <Navbar.Brand >LOGO</Navbar.Brand>
            </Link>
                <Nav className = {styles.links} >
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contacts">Contacts</Link>
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