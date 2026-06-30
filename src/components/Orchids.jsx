import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import OrchidCard from './OrchidCard.jsx'
import HeroBanner from './HeroBanner.jsx'
import { fetchOrchids } from '../store/orchidSlice'

export default function Orchids() {
    const dispatch = useDispatch()
    const { list, status, error } = useSelector(state => state.orchids)

    useEffect(() => {
        if (status === 'idle') dispatch(fetchOrchids())
    }, [dispatch, status])

    const renderContent = () => {
        if (status === 'loading') return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
        if (status === 'failed') return (
            <p className="text-center text-danger py-5">Error: {error}</p>
        )
        if (list.length === 0) return (
            <p className="text-center text-muted py-5">No orchids found.</p>
        )
        return (
            <Row className="g-4 gy-5">
                {list.map((orchid) => (
                    <Col key={orchid.id} md={3}>
                        <OrchidCard orchid={orchid} />
                    </Col>
                ))}
            </Row>
        )
    }

    return (
        <>
            <HeroBanner />
            <Container className="pb-5">
                {renderContent()}
            </Container>
        </>
    )
}
