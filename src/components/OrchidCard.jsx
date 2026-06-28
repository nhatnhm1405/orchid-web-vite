import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import './OrchidCard.css'

const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

export default function OrchidCard({ orchid }) {
    const { name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const fallback = 'https://placehold.co/400x300?text=No+Image'
    const code = countryCode[origin]

    return (
        <Card className="orchid-card h-100 shadow-sm border-0">
            <Card.Img
                variant="top"
                src={image}
                alt={name}
                onError={(e) => { e.currentTarget.src = fallback }}
                style={{ height: '260px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-start">
                    <span>{name}</span>
                    {isSpecial && (
                        <span className="orchid-card-special">
                            <i className="bi bi-star-fill"></i> Special
                        </span>
                    )}
                </Card.Title>

                <div className="d-flex justify-content-between mb-2">
                    <span className="text-warning">{stars}</span>
                    <span className="text-danger">♥ {numberOfLike}</span>
                </div>

                <div className="mt-auto">
                    <div className="d-flex gap-1 flex-wrap mb-2">
                        <Badge bg="info">{category}</Badge>
                        {isNatural
                            ? <Badge bg="success">Natural</Badge>
                            : <Badge bg="secondary">Hybrid</Badge>}
                    </div>

                    <Card.Subtitle className="text-muted mb-3 d-flex align-items-center gap-1">
                        {code && (
                            <img src={`https://flagcdn.com/24x18/${code}.png`} alt={origin} width={24} height={18} />
                        )}
                        {origin} ·
                        <span style={{
                            display: 'inline-block', width: 12, height: 12,
                            borderRadius: '50%', backgroundColor: color.toLowerCase(), border: '1px solid #ccc',
                        }} />
                        {color}
                    </Card.Subtitle>

                    <Button variant="outline-primary" size="sm" className="w-100">
                        Details
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
