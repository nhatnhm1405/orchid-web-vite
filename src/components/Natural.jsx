import React from 'react'
import { ListOfOrchids } from '../data/ListOfOrchids'
import OrchidCard from './OrchidCard'
import { Col, Container, Row } from 'react-bootstrap'

export default function Natural() {
    const naturalOrchids = ListOfOrchids.filter(o => o.isNatural === true || o.isNatural === 'true')

    return (
        <>
            <div className="py-4 text-center">
                <h2>🌿 Natural Orchids</h2>
                <p className="text-muted">{naturalOrchids.length} species found</p>
            </div>

            <Container className="pb-5">
                {naturalOrchids.length === 0 ? (
                    <p className="text-center text-muted py-5">No natural orchids found.</p>
                ) : (
                    <Row className="g-4 gy-5">
                        {naturalOrchids.map((orchid) => (
                            <Col key={orchid.id} md={3}>
                                <OrchidCard orchid={orchid} />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    )
}
