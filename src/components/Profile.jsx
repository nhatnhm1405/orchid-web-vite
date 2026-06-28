import { Container } from 'react-bootstrap'
import '../SCSS/profile.scss'

const info = [
    { icon: 'bi-person-fill',      label: 'Full name',  value: 'Nguyen Huynh Minh Nhat' },
    { icon: 'bi-envelope-fill',    label: 'Email',      value: 'nghminhnhat2006@gmail.com' },
    { icon: 'bi-building',         label: 'University', value: 'FPT University HCM' },
    { icon: 'bi-book-fill',        label: 'Major',      value: 'Software Engineering' },
    { icon: 'bi-mortarboard-fill', label: 'Course',     value: 'FER202 — Front-End with React' },
]

export default function Profile() {
    return (
        <div className="profile-page">
            <Container style={{ maxWidth: 600 }}>

                {/* ── Hero ── */}
                <div className="profile-hero">
                    <div className="profile-hero__avatar-text">N</div>
                    <div className="profile-hero__name">Nguyen Huynh Minh Nhat</div>
                </div>

                {/* ── Info ── */}
                <div className="profile-info">
                    <div className="profile-info__title">
                        <i className="bi bi-person-lines-fill me-2"></i>Information
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
