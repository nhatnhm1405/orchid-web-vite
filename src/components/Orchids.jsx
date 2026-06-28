import React from 'react'
import { ListOfOrchids } from '../data/ListOfOrchids.js'
import OrchidCard from './OrchidCard.jsx'
import { Col, Container, Row } from 'react-bootstrap'
import HeroBanner from './HeroBanner.jsx'

export default function Orchids() {
    return (
        <>
            <HeroBanner />
            <Container className="pb-5">
                {ListOfOrchids.length === 0 ? (
                    <p className="text-center text-muted py-5">No orchids found.</p>
                ) : (
                    <Row className="g-4 gy-5">
                        {ListOfOrchids.map((orchid) => (
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
