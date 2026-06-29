import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hideNotification } from '../store/notificationSlice'
import './Notification.css'

const icons = {
    success: 'bi-check-circle-fill',
    danger: 'bi-exclamation-triangle-fill',
}

export default function Notification() {
    const dispatch = useDispatch()
    const { show, message, variant } = useSelector(state => state.notification)

    return (
        <ToastContainer className="notification-container p-3">
            <Toast
                show={show}
                onClose={() => dispatch(hideNotification())}
                delay={3000}
                autohide
                animation={false}
                className="notification-toast"
            >
                <Toast.Body className={`d-flex align-items-center gap-2 fw-semibold text-${variant}`}>
                    <i className={`bi ${icons[variant] ?? icons.success}`}></i>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}
