import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo  from "../components/images/logo2.png"
import "./Header.css"



function Header(props) {
    return (
        // <div className="header">
     <Navbar className="header">
    <Container>
    <Navbar.Brand id="logo" href="#">
        <Link to="/"><img id="logo" src={Logo} alt="logo" />
        </Link>
    </Navbar.Brand>
    
                {/* <h1 id="title">{props.title}</h1> */}
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


//   </div>
    )
}

export default Header
