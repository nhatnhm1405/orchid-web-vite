import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavigationBar() {
    return (
        <Navbar expand="lg" sticky="top" className="app-navbar bg-body-tertiary shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/" className="fw-bold d-flex align-items-center gap-2">
                    <span className="brand-flower">🌸</span> Orchid Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            <i className="bi bi-house-door me-1"></i>Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/natural">
                            <i className="bi bi-tree me-1"></i>Natural
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about">
                            <i className="bi bi-info-circle me-1"></i>About
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">
                            <i className="bi bi-envelope me-1"></i>Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
