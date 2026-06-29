import React from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Navbar from './components/NavigationBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Notification from './components/Notification'
import { useTheme } from './hooks/useTheme'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function RouteRoot() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div className="d-flex flex-column min-vh-100" data-bs-theme={theme}>
            <ScrollToTop />
            <Notification />
            <Navbar />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />

            <Button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
            </Button>
        </div>
    )
}
