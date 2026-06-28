import React from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Navbar from './components/NavigationBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { useTheme } from './hooks/useTheme'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function RouteRoot() {
    const { theme, toggleTheme } = useTheme()

    return (
        // min-vh-100 + flex-column + flex-grow-1 ở main -> footer luôn nằm đáy dù trang ngắn
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop />
            <Navbar />

            <main className="flex-grow-1">
                <Outlet />
            </main>

            <Footer />

            {/* nút theme fixed góc dưới-phải (style trong App.css) */}
            <Button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
            </Button>
        </div>
    )
}
