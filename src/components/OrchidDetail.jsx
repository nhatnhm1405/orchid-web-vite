import { useParams, useNavigate } from 'react-router-dom'
import { Badge, Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import { ListOfOrchids } from '../data/ListOfOrchids'
import './OrchidDetail.css'

const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

export default function OrchidDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const orchid = ListOfOrchids.find(o => String(o.id) === String(id))

    if (!orchid) {
        return (
            <Container className="py-5 text-center">
                <h3 className="mb-3">Orchid not found 🥲</h3>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Back to home
                </Button>
            </Container>
        )
    }

    const { name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike, clip } = orchid
    const embedUrl = clip ? clip.replace('watch?v=', 'embed/').split('&')[0] : null
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const code = countryCode[origin]
    const fallback = 'https://placehold.co/600x400?text=No+Image'

    return (
        <Container className="orchid-detail py-4">
            <Button variant="link" className="px-0 mb-3 text-decoration-none orchid-back" onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i> Back
            </Button>

            <Card className="orchid-detail-card border-0 shadow-lg">
                <Row className="g-0">
                    <Col md={6}>
                        <div className="orchid-detail-img-wrap h-100">
                            <img
                                src={image}
                                alt={name}
                                onError={(e) => { e.currentTarget.src = fallback }}
                                className="orchid-detail-img"
                            />
                            {isSpecial && (
                                <span className="orchid-ribbon">
                                    <i className="bi bi-star-fill"></i> Special
                                </span>
                            )}
                            <div className="orchid-img-caption">
                                <Badge bg="light" text="dark" className="mb-2">{category}</Badge>
                                <h2 className="text-white fw-bold mb-1">{name}</h2>
                                <span className="text-white-50 d-flex align-items-center gap-2">
                                    {code && (
                                        <img src={`https://flagcdn.com/20x15/${code}.png`} alt={origin} width={20} height={15} />
                                    )}
                                    {origin}
                                </span>
                            </div>
                        </div>
                    </Col>

                    <Col md={6}>
                        <Card.Body className="d-flex flex-column h-100 p-4 p-lg-5">
                            <Tabs defaultActiveKey="info" className="mb-3">
                                <Tab eventKey="info" title={<><i className="bi bi-info-circle me-1"></i>Info</>}>
                                    <Row className="g-3 mb-4">
                                        <Col xs={6}>
                                            <div className="orchid-stat">
                                                <span className="orchid-stat-label">Rating</span>
                                                <span className="orchid-stat-value text-warning">{stars}</span>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="orchid-stat">
                                                <span className="orchid-stat-label">Likes</span>
                                                <span className="orchid-stat-value text-danger">♥ {numberOfLike}</span>
                                            </div>
                                        </Col>
                                    </Row>

                                    <ul className="orchid-info-list mb-4">
                                        <li>
                                            <span className="orchid-info-icon"><i className="bi bi-tag-fill"></i></span>
                                            <span className="orchid-info-key">Type</span>
                                            <span className="orchid-info-val">
                                                {isNatural ? <Badge bg="success">Natural</Badge> : <Badge bg="secondary">Hybrid</Badge>}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="orchid-info-icon"><i className="bi bi-flower1"></i></span>
                                            <span className="orchid-info-key">Family</span>
                                            <span className="orchid-info-val">{category}</span>
                                        </li>
                                        <li>
                                            <span className="orchid-info-icon"><i className="bi bi-geo-alt-fill"></i></span>
                                            <span className="orchid-info-key">Origin</span>
                                            <span className="orchid-info-val d-flex align-items-center gap-2">
                                                {code && <img src={`https://flagcdn.com/20x15/${code}.png`} alt={origin} width={20} height={15} />}
                                                {origin}
                                            </span>
                                        </li>
                                        <li>
                                            <span className="orchid-info-icon"><i className="bi bi-palette-fill"></i></span>
                                            <span className="orchid-info-key">Color</span>
                                            <span className="orchid-info-val d-flex align-items-center gap-2">
                                                <span className="orchid-color-dot" style={{ backgroundColor: color.toLowerCase() }} />
                                                {color}
                                            </span>
                                        </li>
                                    </ul>
                                </Tab>

                                <Tab eventKey="video" title={<><i className="bi bi-play-circle me-1"></i>Video</>}>
                                    {embedUrl ? (
                                        <div className="ratio ratio-16x9">
                                            <iframe src={embedUrl} title={name} allowFullScreen />
                                        </div>
                                    ) : (
                                        <p className="text-muted text-center py-4">
                                            <i className="bi bi-camera-video-off fs-3 d-block mb-2"></i>
                                            No video available for this orchid.
                                        </p>
                                    )}
                                </Tab>
                            </Tabs>

                            <div className="d-flex gap-2 mt-auto">
                                <Button variant="primary" className="flex-fill" onClick={() => navigate(-1)}>
                                    <i className="bi bi-arrow-left"></i> Back
                                </Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}
