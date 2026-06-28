import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RouteRoot from './RouteRoot'
import Orchids from './components/Orchids'
import OrchidDetail from './components/OrchidDetail'
import Contact from './components/Contact'
import NotFound from './components/NotFound'

function App() {
    return (
        <Routes>
            <Route path='/' element={<RouteRoot />}>
                <Route index element={<Orchids />} />
                <Route path="contact" element={<Contact />} />
                <Route path="detail/:id" element={<OrchidDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
