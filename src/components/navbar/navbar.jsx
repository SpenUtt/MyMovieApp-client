import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

function Menubar() {
  return (
    <Container>
        <Navbar fixed="top" bg="dark" text="white" expand="lg">
        <Navbar.Brand href="#home">MyMovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </Container>
  );
}

export default Menubar;