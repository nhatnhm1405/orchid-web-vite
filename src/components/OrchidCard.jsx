import React, { useState } from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import './OrchidCard.css'
import OrchidCardDetail from './OrchidCardDetail'
import OrchidForm from './OrchidForm'
import { deleteOrchid } from '../store/orchidSlice'

const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

export default function OrchidCard({ orchid }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const [showModal, setShowModal] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const { id, name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const fallback = 'https://placehold.co/400x300?text=No+Image'
    const code = countryCode[origin]

    const handleDelete = () => {
        if (window.confirm(`Delete "${name}"?`)) dispatch(deleteOrchid(id))
    }

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
                        {isNatural === true || isNatural === 'true'
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

                    <div className="d-flex gap-2 mb-2">
                        <Button variant="outline-secondary" size="sm" className="flex-fill"
                            onClick={() => setShowModal(true)}>
                            <i className="bi bi-eye"></i> Quick view
                        </Button>
                        <Button variant="outline-primary" size="sm" className="flex-fill"
                            onClick={() => navigate(`/detail/${id}`)}>
                            Details
                        </Button>
                    </div>

                    {isLoggedIn && (
                        <div className="d-flex gap-2">
                            <Button variant="outline-warning" size="sm" className="flex-fill"
                                onClick={() => setShowEdit(true)}>
                                <i className="bi bi-pencil"></i> Edit
                            </Button>
                            <Button variant="outline-danger" size="sm" className="flex-fill"
                                onClick={handleDelete}>
                                <i className="bi bi-trash"></i> Delete
                            </Button>
                        </div>
                    )}
                </div>
            </Card.Body>

            <OrchidCardDetail orchid={orchid} show={showModal} onHide={() => setShowModal(false)} />
            <OrchidForm show={showEdit} onHide={() => setShowEdit(false)} editOrchid={orchid} />
        </Card>
    )
}
