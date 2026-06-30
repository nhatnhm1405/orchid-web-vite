import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './OrchidCard.css'
import OrchidCardDetail from './OrchidCardDetail'

const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

export default function OrchidCard({ orchid }) {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)

    const { id, name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const fallback = 'https://placehold.co/400x300?text=No+Image'
    const code = countryCode[origin]

    return (
        <Card className="orchid-card h-100 shadow-sm border-0">
            <div className="orchid-card-imgwrap">
                <Card.Img
                    variant="top"
                    src={image}
                    alt={name}
                    onError={(e) => { e.currentTarget.src = fallback }}
                    style={{ height: '260px', objectFit: 'cover' }}
                />
                {isSpecial && (
                    <span className="orchid-card-ribbon">Special</span>
                )}
            </div>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{name}</Card.Title>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="orchid-rating">{stars}</span>
                    <span className="orchid-likes">
                        <i className="bi bi-heart-fill"></i> {numberOfLike}
                    </span>
                </div>

                <div className="mt-auto">
                    <div className="d-flex gap-2 flex-wrap mb-2">
                        <span className="orchid-pill orchid-pill-category">{category}</span>
                        {isNatural === true || isNatural === 'true'
                            ? <span className="orchid-pill orchid-pill-natural"><i className="bi bi-leaf-fill"></i>Natural</span>
                            : <span className="orchid-pill orchid-pill-hybrid">Hybrid</span>}
                    </div>

                    <div className="orchid-meta mb-3">
                        {code && (
                            <img className="flag" src={`https://flagcdn.com/24x18/${code}.png`} alt={origin} width={24} height={18} />
                        )}
                        <span>{origin}</span>
                        <span className="dot-sep">·</span>
                        <span className="orchid-color-swatch" style={{ backgroundColor: color?.toLowerCase() }} />
                        <span>{color}</span>
                    </div>

                    <div className="d-flex gap-2">
                        <Button variant="outline-secondary" size="sm" className="flex-fill"
                            onClick={() => setShowModal(true)}>
                            <i className="bi bi-eye"></i> Quick view
                        </Button>
                        <Button variant="outline-primary" size="sm" className="flex-fill"
                            onClick={() => navigate(`/detail/${id}`)}>
                            Details
                        </Button>
                    </div>
                </div>
            </Card.Body>

            <OrchidCardDetail orchid={orchid} show={showModal} onHide={() => setShowModal(false)} />
        </Card>
    )
}
