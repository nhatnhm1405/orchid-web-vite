import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import '../SCSS/profile.scss'

const staticInfo = [
    { icon: 'bi-building',         label: 'University', value: 'FPT University HCM' },
    { icon: 'bi-book-fill',        label: 'Major',      value: 'Software Engineering' },
    { icon: 'bi-mortarboard-fill', label: 'Course',     value: 'FER202 — Front-End with React' },
]

export default function Profile() {
    const { user, isLoggedIn } = useSelector(state => state.auth)

    if (!isLoggedIn) {
        return (
            <div className="profile-page">
                <Container style={{ maxWidth: 600 }}>
                    <div className="profile-info text-center py-4">
                        <i className="bi bi-person-lock fs-1 text-muted d-block mb-3"></i>
                        <p className="text-muted">Please login to view your profile.</p>
                    </div>
                </Container>
            </div>
        )
    }

    const info = [
        { icon: 'bi-person-fill',   label: 'Full name', value: user.name },
        { icon: 'bi-envelope-fill', label: 'Email',     value: user.email },
        ...staticInfo,
    ]

    return (
        <div className="profile-page">
            <Container style={{ maxWidth: 600 }}>

                <div className="profile-hero">
                    <img
                        src={user.picture}
                        alt={user.name}
                        className="profile-hero__avatar"
                    />
                    <div className="profile-hero__name">{user.name}</div>
                    <div className="profile-hero__email">{user.email}</div>
                </div>

                <div className="profile-info">
                    <div className="profile-info__title">
                        <i className="bi bi-person-lines-fill me-2"></i>Profile Page
                    </div>
                    <ul className="profile-info__list">
                        {info.map(({ icon, label, value }) => (
                            <li key={label} className="profile-info__item">
                                <i className={`bi ${icon}`}></i>
                                <span>
                                    <span style={{ color: '#6b7280', fontSize: '0.78rem', display: 'block' }}>{label}</span>
                                    {value}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </Container>
        </div>
    )
}
