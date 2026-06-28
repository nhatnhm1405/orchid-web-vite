import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import OrchidCard from './OrchidCard.jsx'
import HeroBanner from './HeroBanner.jsx'
import OrchidForm from './OrchidForm.jsx'
import { fetchOrchids } from '../store/orchidSlice'

export default function Orchids() {
  const dispatch = useDispatch()
  const { list, status, error } = useSelector(state => state.orchids)
  const { isLoggedIn } = useSelector(state => state.auth)
  const [showForm, setShowForm] = useState(false)

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
        {/* nút Add chỉ hiện khi đã login */}
        {isLoggedIn && (
          <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <i className="bi bi-plus-lg me-1"></i>Add Orchid
            </Button>
          </div>
        )}
        {renderContent()}
      </Container>

      <OrchidForm show={showForm} onHide={() => setShowForm(false)} editOrchid={null} />
    </>
  )
}
