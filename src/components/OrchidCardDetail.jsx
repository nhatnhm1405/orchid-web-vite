import { Badge, Button, Modal } from 'react-bootstrap'
import './OrchidCardDetail.css'

const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

export default function OrchidCardDetail({ orchid, show, onHide }) {
    const { name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const code = countryCode[origin]
    const fallback = 'https://placehold.co/600x400?text=No+Image'

    return (
        <Modal show={show} onHide={onHide} size="lg" centered dialogClassName="orchid-modal">
            <Modal.Body className="p-0">
                <div className="orchid-modal-layout">
                    {/* ---- CỘT TRÁI: ảnh + overlay ---- */}
                    <div className="orchid-modal-img-wrap">
                        <img
                            src={image}
                            alt={name}
                            className="orchid-modal-img"
                            onError={(e) => { e.currentTarget.src = fallback }}
                        />
                        {isSpecial && (
                            <span className="orchid-modal-ribbon">
                                <i className="bi bi-star-fill"></i> Special
                            </span>
                        )}
                        <div className="orchid-modal-caption">
                            <Badge bg="light" text="dark" className="mb-2">{category}</Badge>
                            <h5 className="text-white fw-bold mb-0">{name}</h5>
                        </div>
                    </div>

                    {/* ---- CỘT PHẢI: info ---- */}
                    <div className="orchid-modal-info">
                        <button className="orchid-modal-close" onClick={onHide} aria-label="Close">
                            <i className="bi bi-x-lg"></i>
                        </button>

                        <h5 className="fw-bold mb-1">{name}</h5>
                        <p className="text-muted small mb-4">{category}</p>

                        {/* stat: rating + likes */}
                        <div className="orchid-modal-stats mb-4">
                            <div className="orchid-modal-stat">
                                <span className="orchid-modal-stat-label">Rating</span>
                                <span className="text-warning fw-semibold">{stars}</span>
                            </div>
                            <div className="orchid-modal-stat">
                                <span className="orchid-modal-stat-label">Likes</span>
                                <span className="text-danger fw-semibold">♥ {numberOfLike}</span>
                            </div>
                        </div>

                        {/* danh sách thuộc tính */}
                        <ul className="orchid-modal-list">
                            <li>
                                <i className="bi bi-tag-fill text-primary"></i>
                                <span className="orchid-modal-key">Type</span>
                                {isNatural
                                    ? <Badge bg="success">Natural</Badge>
                                    : <Badge bg="secondary">Hybrid</Badge>}
                            </li>
                            <li>
                                <i className="bi bi-geo-alt-fill text-primary"></i>
                                <span className="orchid-modal-key">Origin</span>
                                <span className="d-flex align-items-center gap-1">
                                    {code && <img src={`https://flagcdn.com/20x15/${code}.png`} alt={origin} width={20} height={15} />}
                                    {origin}
                                </span>
                            </li>
                            <li>
                                <i className="bi bi-palette-fill text-primary"></i>
                                <span className="orchid-modal-key">Color</span>
                                <span className="d-flex align-items-center gap-2">
                                    <span className="orchid-modal-color-dot" style={{ backgroundColor: color.toLowerCase() }} />
                                    {color}
                                </span>
                            </li>
                        </ul>

                        <Button variant="primary" className="w-100 mt-auto" onClick={onHide}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
