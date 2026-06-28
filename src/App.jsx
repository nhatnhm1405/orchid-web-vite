import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react'
import Orchids from './components/Orchids'
import './App.css'
import { useTheme } from './hooks/useTheme'
import { Button } from 'react-bootstrap'

function App() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div data-bs-theme={theme}>
            <Orchids />
            <Button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light'
                    ? <i className="bi bi-moon-fill"></i>
                    : <i className="bi bi-brightness-high-fill"></i>}
            </Button>
        </div>
    )
}

export default App
