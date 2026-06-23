import React, { useState } from 'react'
import { Badge, Button, Card, Modal } from 'react-bootstrap'
import './OrchidCard.css'
import OrchidCardDetail from './OrchidCardDetail'

// Đặt bảng tra ngoài component: nó cố định, để trong sẽ bị tạo lại mỗi lần render -> phí
// data lưu tên nước, còn flagcdn cần mã ISO 2 ký tự nên phải dịch qua đây
const countryCode = {
    Taiwan: 'tw', Japan: 'jp', Thailand: 'th', India: 'in',
    China: 'cn', Brazil: 'br', Mexico: 'mx', Vietnam: 'vn',
    Peru: 'pe', Guatemala: 'gt', Colombia: 'co', Australia: 'au',
    'Costa Rica': 'cr', Nepal: 'np', Ecuador: 'ec', Madagascar: 'mg',
}

// Presentational component: chỉ lo hiển thị, nhận 1 bông lan qua props rồi vẽ ra
export default function OrchidCard({ orchid }) {
    // destructuring: tách các field ra khỏi object orchid cho gọn, khỏi viết orchid.name...
    const { name, image, color, rating, isSpecial, isNatural, category, origin, numberOfLike } = orchid
    // .repeat(n) lặp chuỗi n lần -> biến số rating thành chuỗi sao, vd rating=3 -> ★★★☆☆
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating)
    const fallback = 'https://placehold.co/400x300?text=No+Image'
    const code = countryCode[origin] // tra mã nước, nếu không có thì undefined

    const [show, setShow] = useState(false)

    return (
        <>
        {/* h-100 cho mọi card cao bằng nhau, orchid-card là class hover tự viết bên file css */}
            <Card className="orchid-card h-100 shadow-sm border-0">
                <Card.Img
                    variant="top"
                    src={image}
                    alt={name}
                    // onError: khi ảnh tải lỗi (404...)
                    onError={(e) => { e.currentTarget.src = fallback }}
                    style={{ height: '260px', objectFit: 'cover' }} // objectFit: cover -> ảnh không bị méo
                />
                {/* d-flex flex-column + mt-auto ở nút -> đẩy nút Details xuống đáy cho thẳng hàng */}
                <Card.Body className="d-flex flex-column">
                    <Card.Title className="d-flex justify-content-between align-items-start">
                        <span>{name}</span>
                        {isSpecial && <Badge bg="success" text="white">Special</Badge>}
                    </Card.Title>

                    {/* justify-content-between: đẩy sao sang trái, tim sang phải */}
                    <div className="d-flex justify-content-between mb-2">
                        <span className="text-warning">{stars}</span>
                        <span className="text-danger">♥ {numberOfLike}</span>
                    </div>

                    <div className="d-flex gap-1 flex-wrap mb-2">
                        <Badge bg="info">{category}</Badge>
                        {isNatural
                            ? <Badge bg="success">Natural</Badge>
                            : <Badge bg="secondary">Hybrid</Badge>}
                    </div>

                    <Card.Subtitle className="text-muted mb-3 d-flex align-items-center gap-1">
                        {code && (
                            <img
                                // template literal `${}`: ghép biến vào chuỗi, code='vn' -> .../vn.png
                                src={`https://flagcdn.com/24x18/${code}.png`}
                                alt={origin}
                                width={24}
                                height={18}
                            />
                        )}
                        {origin} ·
                        {/* chấm tròn màu: dùng style object (2 ngoặc nhọn), thuộc tính viết camelCase
                        color.toLowerCase() vì tên màu CSS phải chữ thường */}
                        <span
                            style={{
                                display: 'inline-block',
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                backgroundColor: color.toLowerCase(),
                                border: '1px solid #ccc',
                            }}
                        />
                        {color}
                    </Card.Subtitle>

                    <Button variant="outline-primary" size="sm" className="mt-auto"
                        onClick={() => setShow(true)}>
                        Details
                    </Button>
                </Card.Body>
            </Card>
            <OrchidCardDetail orchid={orchid} show={show} onHide={() => setShow(false)} />
        </>
    )
}
