import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    return (
        <Container className="py-5 text-center">
            <div style={{ fontSize: '5rem', lineHeight: 1 }}>🌵</div>
            <h1 className="fw-bold display-4 mb-2">404</h1>
            <p className="text-muted mb-4">Oops! The page you're looking for doesn't exist.</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/')}>
                <i className="bi bi-house-door"></i> Back to home
            </Button>
        </Container>
    )
}
