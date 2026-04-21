import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import LandingPage from './pages/LandingPage'
import BookingFlow from './pages/BookingFlow'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ReviewsPage from './pages/ReviewsPage'
import ContactPage from './pages/ContactPage'
import Admin from './pages/Admin'

function App() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <>
      {isAdmin ? (
        <Routes>
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      ) : (
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/services' element={<ServicesPage/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/reviews' element={<ReviewsPage/>}/>
          <Route path='/contact' element={<ContactPage/>}/>
          <Route path='/book' element={<BookingFlow/>}/>
        </Routes>
      )}
    </>
  )
}

export default App