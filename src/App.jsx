import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import RouteRoot from './RouteRoot'
import Orchids from './components/Orchids'
import OrchidDetail from './components/OrchidDetail'
import Contact from './components/Contact'
import NotFound from './components/NotFound'
import Natural from './components/Natural'
import Special from './components/Special'
import About from './components/About'
import Profile from './components/Profile'
import Manage from './components/Manage'

function App() {
    return (
        <Routes>
            <Route path='/' element={<RouteRoot />}>
                <Route index element={<Orchids />} />
                <Route path="contact" element={<Contact />} />
                <Route path="natural" element={<Natural />} />
                <Route path="special" element={<Special />} />
                <Route path="about" element={<About />} />
                <Route path="profile" element={<Profile />} />
                <Route path="manage" element={<Manage />} />
                <Route path="detail/:id" element={<OrchidDetail />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
