import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [sent, setSent] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSent(true)
        setForm({ name: '', email: '', message: '' })
    }

    return (
        <Container className="py-5" style={{ maxWidth: 960 }}>
            <div className="text-center mb-5">
                <h1 className="fw-bold">Contact us!</h1>
            </div>

            <Row className="g-4">
                <Col md={5}>
                    <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-4 d-flex flex-column gap-4">
                            <div className="d-flex align-items-start gap-3">
                                <i className="bi bi-geo-alt-fill fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-1">Address</h6>
                                    <span className="text-muted">FPT University, Ho Chi Minh City</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3">
                                <i className="bi bi-envelope-fill fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-1">Email</h6>
                                    <span className="text-muted">nghminhnhat2006@gmail.com</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-3">
                                <i className="bi bi-telephone-fill fs-4 text-primary"></i>
                                <div>
                                    <h6 className="mb-1">Phone</h6>
                                    <span className="text-muted">0123 456 789</span>
                                </div>
                            </div>
                            <div className="d-flex gap-3 fs-4 mt-auto">
                                <a href="https://www.facebook.com/mnhat1405/" className="text-primary"><i className="bi bi-facebook"></i></a>
                                <a href="https://www.instagram.com/m.n_1405/"><i className="bi bi-instagram"></i></a>
                                <a href="https://www.youtube.com/watch?v=BIbgncfLpl0&list=RDBIbgncfLpl0" className="text-primary"><i className="bi bi-youtube"></i></a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={7}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4">
                            {sent && (
                                <Alert variant="success" onClose={() => setSent(false)} dismissible>
                                    Thank you! Your message has been sent.
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="email@example.com"
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Your message..."
                                        required
                                    />
                                </Form.Group>
                                <Button type="submit" variant="primary">
                                    <i className="bi bi-send"></i> Send message
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
