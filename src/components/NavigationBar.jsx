import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { loginSuccess, logout } from '../store/authSlice'

function NavigationBar() {
    const dispatch = useDispatch()
    const { user, isLoggedIn } = useSelector(state => state.auth)

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
            })
            dispatch(loginSuccess(data))
        }
    })

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
                        <Nav.Link as={NavLink} to="/profile">
                            <i className="bi bi-person-circle me-1"></i>Profile
                        </Nav.Link>
                    </Nav>

                    {isLoggedIn ? (
                        <div className="d-flex align-items-center gap-2">
                            <img
                                src={user.picture}
                                alt={user.name}
                                width={32}
                                height={32}
                                style={{ borderRadius: '50%', objectFit: 'cover' }}
                            />
                            <span className="small fw-semibold">{user.name}</span>
                            <Button variant="outline-danger" size="sm" onClick={() => dispatch(logout())}>
                                <i className="bi bi-box-arrow-right me-1"></i>Logout
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline-primary" size="sm" onClick={() => login()}>
                            <i className="bi bi-google me-1"></i>Login
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
