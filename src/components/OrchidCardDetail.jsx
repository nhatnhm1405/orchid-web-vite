import { Badge, Button, ListGroup, Modal } from 'react-bootstrap'
import './OrchidCardDetail.css'

// Presentational: nhận orchid + trạng thái đóng/mở (show) + cách đóng (onHide) từ cha
export default function OrchidCardDetail({ orchid, show, onHide }) {
    const { name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)

    return (
        <Modal show={show} onHide={onHide} size="lg" centered dialogClassName="orchid-modal">
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img
                    src={image}
                    alt={name}
                    className="orchid-modal-img w-100 mb-3"
                    style={{ maxHeight: 320, objectFit: 'cover' }}
                />

                {/* nhóm badge: category + special + natural/hybrid */}
                <div className="d-flex gap-1 flex-wrap mb-3">
                    <Badge bg="info">{category}</Badge>
                    {isSpecial && <Badge bg="success">Special</Badge>}
                    {isNatural
                        ? <Badge bg="success">Natural</Badge>
                        : <Badge bg="secondary">Hybrid</Badge>}
                </div>

                {/* ListGroup variant="flush": danh sách thông tin không viền ngoài */}
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <strong>Rating:</strong> <span className="text-warning">{stars}</span>
                    </ListGroup.Item>
                    <ListGroup.Item><strong>Origin:</strong> {origin}</ListGroup.Item>
                    <ListGroup.Item><strong>Color:</strong> {color}</ListGroup.Item>
                    <ListGroup.Item><strong>Likes:</strong> <span className="text-danger">♥ {numberOfLike}</span></ListGroup.Item>
                </ListGroup>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
