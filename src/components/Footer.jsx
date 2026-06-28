import { Container } from 'react-bootstrap'

// Footer chung, nằm trong RouteRoot nên hiện ở mọi trang
export default function Footer() {
    return (
        <footer className="app-footer border-top py-4 mt-5">
            <Container className="text-center">
                <div className="fs-5 fw-semibold mb-1">🌸 Orchid Gallery</div>
                <div className="text-muted small">
                    {/* getFullYear() lấy năm hiện tại -> khỏi sửa tay mỗi năm */}
                    © {new Date().getFullYear()} Orchid Gallery · FER202 Lab
                </div>
            </Container>
        </footer>
    )
}
