import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import OrchidCard from './OrchidCard'
import { fetchOrchids } from '../store/orchidSlice'

export default function Special() {
    const dispatch = useDispatch()
    const { list, status, error } = useSelector(state => state.orchids)

    useEffect(() => {
        if (status === 'idle') dispatch(fetchOrchids())
    }, [dispatch, status])

    const specialOrchids = list.filter(o => o.isSpecial === true || o.isSpecial === 'true')

    const renderContent = () => {
        if (status === 'loading') return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
        if (status === 'failed') return (
            <p className="text-center text-danger py-5">Error: {error}</p>
        )
        if (specialOrchids.length === 0) return (
            <p className="text-center text-muted py-5">No special orchids found.</p>
        )
        return (
            <Row className="g-4 gy-5">
                {specialOrchids.map((orchid) => (
                    <Col key={orchid.id} md={3}>
                        <OrchidCard orchid={orchid} />
                    </Col>
                ))}
            </Row>
        )
    }

    return (
        <>
            <div className="py-4 text-center">
                <h2>⭐ Special Orchids</h2>
                <p className="text-muted">{specialOrchids.length} featured orchids</p>
            </div>

            <Container className="pb-5">
                {renderContent()}
            </Container>
        </>
    )
}
