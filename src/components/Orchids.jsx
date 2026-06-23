import React from 'react'
import { ListOfOrchids } from '../data/ListOfOrchids.js'
import OrchidCard from './OrchidCard.jsx'
import { Col, Container, Row } from 'react-bootstrap'

// Container component: lo phần data/logic, cầm mảng và map() qua từng phần tử
export default function Orchids() {
  return (
    <Container className="py-4">
      <Row className="g-4 gy-5">
        {/* map() chạy qua mảng, mỗi orchid trả về 1 JSX (Col chứa card) -> ra mảng 16 JSX
            dấu {} ngoài cùng để nhúng JS vào giữa JSX */}
        {ListOfOrchids.map((orchid) => (
          // key bắt buộc khi render list, phải duy nhất (dùng id) -> React quản lý list
          // gắn key ở phần tử ngoài cùng của map (là Col)
          <Col key={orchid.id} md={3}>
            {/* truyền cả object orchid xuống con qua props tên "orchid" */}
            <OrchidCard orchid={orchid} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
