import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addOrchid, updateOrchid } from '../store/orchidSlice'
import { notify } from '../store/notificationSlice'
import './OrchidForm.css'

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
            try {
                if (isEdit) {
                    await dispatch(updateOrchid({ id: editOrchid.id, orchid: values })).unwrap()
                    dispatch(notify({ message: `Updated "${values.name}" successfully` }))
                } else {
                    await dispatch(addOrchid(values)).unwrap()
                    dispatch(notify({ message: `Added "${values.name}" successfully` }))
                }
                resetForm()
                onHide()
            } catch {
                dispatch(notify({
                    message: `Failed to ${isEdit ? 'update' : 'add'} "${values.name}". Please try again.`,
                    variant: 'danger',
                }))
            }
        },
    })

    const validImage = formik.values.image && !formik.errors.image

    return (
        <Modal show={show} onHide={onHide} size="lg" centered className="orchid-form-modal">
            <Modal.Header closeButton>
                <Modal.Title>
                    <i className={`bi ${isEdit ? 'bi-pencil-square' : 'bi-flower1'}`}></i>
                    {isEdit ? 'Edit Orchid' : 'Add New Orchid'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Name<span className="req">*</span></Form.Label>
                        <Form.Control
                            name="name"
                            placeholder="e.g. Taichung Beauty"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.name && !!formik.errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        <Form.Group className="flex-fill">
                            <Form.Label>Category<span className="req">*</span></Form.Label>
                            <Form.Control
                                name="category"
                                placeholder="e.g. Cattleya"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.category && !!formik.errors.category}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="flex-fill">
                            <Form.Label>Origin<span className="req">*</span></Form.Label>
                            <Form.Control
                                name="origin"
                                placeholder="e.g. Taiwan"
                                value={formik.values.origin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.origin && !!formik.errors.origin}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.origin}</Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className="d-flex gap-3 mb-3 flex-wrap">
                        <Form.Group className={`flex-fill orchid-color-field${formik.values.color ? ' has-swatch' : ''}`}>
                            <Form.Label>Color<span className="req">*</span></Form.Label>
                            {formik.values.color && (
                                <span className="swatch-preview" style={{ backgroundColor: formik.values.color.toLowerCase() }} />
                            )}
                            <Form.Control
                                name="color"
                                placeholder="e.g. Pink"
                                value={formik.values.color}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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
                            type="switch"
                            label="Special"
                            name="isSpecial"
                            checked={formik.values.isSpecial}
                            onChange={formik.handleChange}
                        />
                        <Form.Check
                            type="switch"
                            label="Natural"
                            name="isNatural"
                            checked={formik.values.isNatural}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="d-flex gap-3 mb-3 flex-wrap align-items-start">
                        <Form.Group className="flex-fill">
                            <Form.Label>Image URL<span className="req">*</span></Form.Label>
                            <Form.Control
                                name="image"
                                placeholder="https://..."
                                value={formik.values.image}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.image && !!formik.errors.image}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.image}</Form.Control.Feedback>
                        </Form.Group>
                        {validImage && (
                            <img
                                className="orchid-image-preview"
                                style={{ width: 180 }}
                                src={formik.values.image}
                                alt="preview"
                                onError={(e) => { e.currentTarget.style.display = 'none' }}
                            />
                        )}
                    </div>

                    <Form.Group className="mb-4">
                        <Form.Label>Clip URL <span className="text-muted small fw-normal">(optional)</span></Form.Label>
                        <Form.Control
                            name="clip"
                            placeholder="https://..."
                            value={formik.values.clip}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.clip && !!formik.errors.clip}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.clip}</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button variant="light" className="btn-cancel" onClick={onHide}>Cancel</Button>
                        <Button type="submit" className="btn-save" disabled={formik.isSubmitting}>
                            {formik.isSubmitting
                                ? <><Spinner as="span" size="sm" animation="border" className="me-1" />Saving…</>
                                : <><i className={`bi ${isEdit ? 'bi-check-lg' : 'bi-plus-lg'} me-1`}></i>{isEdit ? 'Save changes' : 'Add orchid'}</>}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
