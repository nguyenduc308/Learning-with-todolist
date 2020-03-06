import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import TaskSearch from '../Task/TaskSearch';

class HeaderContent extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Todo React-Redux</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">About</Nav.Link>
                    </Nav>
                    <TaskSearch onSearch = {this.props.onSearch}/>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default HeaderContent;
