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
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => login()}
                            className="d-flex align-items-center gap-2"
                            style={{ borderColor: '#dadce0', color: '#3c4043', fontWeight: 500 }}
                        >
                            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                                <path fill="none" d="M0 0h48v48H0z"/>
                            </svg>
                            Login with Google
                        </Button>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar
