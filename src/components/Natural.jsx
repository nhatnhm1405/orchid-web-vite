import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import OrchidCard from './OrchidCard'
import { fetchOrchids } from '../store/orchidSlice'

export default function Natural() {
    const dispatch = useDispatch()
    const { list, status, error } = useSelector(state => state.orchids)

    useEffect(() => {
        if (status === 'idle') dispatch(fetchOrchids())
    }, [dispatch, status])

    const naturalOrchids = list.filter(o => o.isNatural === true || o.isNatural === 'true')

    const renderContent = () => {
        if (status === 'loading') return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        )
        if (status === 'failed') return (
            <p className="text-center text-danger py-5">Error: {error}</p>
        )
        if (naturalOrchids.length === 0) return (
            <p className="text-center text-muted py-5">No natural orchids found.</p>
        )
        return (
            <Row className="g-4 gy-5">
                {naturalOrchids.map((orchid) => (
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
                <h2>🌿 Natural Orchids</h2>
                <p className="text-muted">{naturalOrchids.length} species found</p>
            </div>

            <Container className="pb-5">
                {renderContent()}
            </Container>
        </>
    )
}
