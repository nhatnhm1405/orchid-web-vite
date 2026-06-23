import 'bootstrap/dist/css/bootstrap.min.css';
import Orchids from './components/Orchids'
import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { useTheme } from './hooks/useTheme.js';

function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <>
      <div className='p-3'>
        <Button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-brightness-high-fill"></i>}
        </Button>
      </div>
      <Orchids />
    </>
  )
}

export default App
