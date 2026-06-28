import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addOrchid, updateOrchid } from '../store/orchidSlice'

const validationSchema = Yup.object({
    name:         Yup.string().required('Name is required'),
    category:     Yup.string().required('Category is required'),
    origin:       Yup.string().required('Origin is required'),
    color:        Yup.string().required('Color is required'),
    rating:       Yup.number().min(1).max(5).required('Rating is required'),
    numberOfLike: Yup.number().min(0).required('Likes is required'),
    image:        Yup.string().url('Must be a valid URL').required('Image URL is required'),
    clip:         Yup.string().url('Must be a valid URL').nullable(),
})

const emptyValues = {
    name: '', category: '', origin: '', color: '',
    rating: 1, numberOfLike: 0,
    isSpecial: false, isNatural: false,
    image: '', clip: '',
}

export default function OrchidForm({ show, onHide, editOrchid }) {
    const dispatch = useDispatch()
    const isEdit = !!editOrchid

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: editOrchid ?? emptyValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (isEdit) {
                await dispatch(updateOrchid({ id: editOrchid.id, orchid: values }))
            } else {
                await dispatch(addOrchid(values))
            }
            resetForm()
            onHide()
        },
    })

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit Orchid' : 'Add New Orchid'}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-3 mb-3">
                        <Form.Group className="flex-fill">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.category && !!formik.errors.category}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="flex-fill">
                            <Form.Label>Origin</Form.Label>
                            <Form.Control
                                name="origin"
                                value={formik.values.origin}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.origin && !!formik.errors.origin}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.origin}</Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="d-flex gap-3 mb-3">
                        <Form.Group className="flex-fill">
                            <Form.Label>Color</Form.Label>
                            <Form.Control
                                name="color"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.color && !!formik.errors.color}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.color}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group style={{ width: 90 }}>
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number" min={1} max={5}
                                name="rating"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.rating && !!formik.errors.rating}
                            />
                        </Form.Group>

                        <Form.Group style={{ width: 100 }}>
                            <Form.Label>Likes</Form.Label>
                            <Form.Control
                                type="number" min={0}
                                name="numberOfLike"
                                value={formik.values.numberOfLike}
                                onChange={formik.handleChange}
                                isInvalid={formik.touched.numberOfLike && !!formik.errors.numberOfLike}
                            />
                        </Form.Group>
                    </div>

                    <div className="d-flex gap-4 mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Special"
                            name="isSpecial"
                            checked={formik.values.isSpecial}
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            type="checkbox"
                            label="Natural"
                            name="isNatural"
                            checked={formik.values.isNatural}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <Form.Group className="mb-3">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            name="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.image && !!formik.errors.image}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.image}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Clip URL <span className="text-muted small">(optional)</span></Form.Label>
                        <Form.Control
                            name="clip"
                            value={formik.values.clip}
                            onChange={formik.handleChange}
                            isInvalid={formik.touched.clip && !!formik.errors.clip}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.clip}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="secondary" onClick={onHide}>Cancel</Button>
                        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? 'Saving...' : isEdit ? 'Save changes' : 'Add orchid'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
