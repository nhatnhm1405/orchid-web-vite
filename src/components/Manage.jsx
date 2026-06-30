import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Badge, Button, Container, Dropdown, Spinner, Table } from 'react-bootstrap'
import OrchidForm from './OrchidForm.jsx'
import { deleteOrchid, fetchOrchids } from '../store/orchidSlice'
import { notify } from '../store/notificationSlice'
import './Manage.css'

export default function Manage() {
    const dispatch = useDispatch()
    const { list, status, error } = useSelector(state => state.orchids)
    const { isLoggedIn } = useSelector(state => state.auth)
    const [showForm, setShowForm] = useState(false)
    const [editOrchid, setEditOrchid] = useState(null)

    useEffect(() => {
        if (status === 'idle') dispatch(fetchOrchids())
    }, [dispatch, status])

    if (!isLoggedIn) return <Navigate to="/" replace />

    const openAdd = () => { setEditOrchid(null); setShowForm(true) }
    const openEdit = (orchid) => { setEditOrchid(orchid); setShowForm(true) }

    const handleDelete = async (orchid) => {
        if (!window.confirm(`Delete "${orchid.name}"?`)) return
        try {
            await dispatch(deleteOrchid(orchid.id)).unwrap()
            dispatch(notify({ message: `Deleted "${orchid.name}" successfully` }))
        } catch {
            dispatch(notify({ message: `Failed to delete "${orchid.name}"`, variant: 'danger' }))
        }
    }

    const renderBody = () => {
        if (status === 'loading') return (
            <tr><td colSpan={8} className="text-center py-5">
                <Spinner animation="border" variant="primary" />
            </td></tr>
        )
        if (status === 'failed') return (
            <tr><td colSpan={8} className="text-center text-danger py-5">Error: {error}</td></tr>
        )
        if (list.length === 0) return (
            <tr><td colSpan={8} className="text-center text-muted py-5">No orchids yet.</td></tr>
        )
        return list.map((orchid) => {
            const isNatural = orchid.isNatural === true || orchid.isNatural === 'true'
            return (
                <tr key={orchid.id}>
                    <td>
                        <img
                            className="manage-thumb"
                            src={orchid.image}
                            alt={orchid.name}
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/80x60?text=N/A' }}
                        />
                    </td>
                    <td className="fw-semibold">
                        {orchid.name}
                        {orchid.isSpecial && <Badge bg="warning" text="dark" className="ms-2">Special</Badge>}
                    </td>
                    <td>{orchid.category}</td>
                    <td>{orchid.origin}</td>
                    <td>
                        {isNatural
                            ? <Badge bg="success">Natural</Badge>
                            : <Badge bg="secondary">Hybrid</Badge>}
                    </td>
                    <td className="text-warning text-nowrap">{'★'.repeat(orchid.rating)}</td>
                    <td className="text-danger text-nowrap">♥ {orchid.numberOfLike}</td>
                    <td className="text-end text-nowrap">
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="outline-secondary" size="sm" className="manage-actions-toggle">
                                <i className="bi bi-three-dots-vertical"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openEdit(orchid)}>
                                    <i className="bi bi-pencil me-2 text-warning"></i>Edit
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDelete(orchid)} className="text-danger">
                                    <i className="bi bi-trash me-2"></i>Delete
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            )
        })
    }

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h2 className="fw-bold mb-1">Manage Orchids</h2>
                    <p className="text-muted mb-0">{list.length} orchid{list.length !== 1 ? 's' : ''} in the collection</p>
                </div>
                <Button className="btn-add-orchid" onClick={openAdd}>
                    <i className="bi bi-plus-circle-fill"></i>Add Orchid
                </Button>
            </div>

            <div className="manage-table-wrap shadow-sm">
                <Table responsive hover className="manage-table align-middle mb-0">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Origin</th>
                            <th>Type</th>
                            <th>Rating</th>
                            <th>Likes</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{renderBody()}</tbody>
                </Table>
            </div>

            <OrchidForm show={showForm} onHide={() => setShowForm(false)} editOrchid={editOrchid} />
        </Container>
    )
}
