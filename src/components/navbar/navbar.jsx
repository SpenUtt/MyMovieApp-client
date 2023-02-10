import React from 'react';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';

function Navbar() {
  return (
    <Container>
        <Navbar fixed="top" bg="dark" text="white" expand="lg">
        <Navbar.Brand href="#home">MyMovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </Container>
  );
}

//export default Navbar;