import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import Logo  from "../components/images/logo.jpeg"


function Header(props) {
    return (
        <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#">
        <Link to="/">Brand</Link>
    </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={Link} to="/flights">
        Flights
      </Nav.Link>
      <Nav.Link as={Link} to="/about-us">
        About Us
      </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    )
}

export default Header
