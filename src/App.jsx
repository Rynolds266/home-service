import  Home  from './pages/Home'

import Footer from './components/Footer'

import NavBar from './components/Navbar'

import Booking from './pages/Booking'

import  Contact  from './pages/Contact'


import { Routes , Route } from 'react-router-dom'
import Services from './pages/Services'
import About from './pages/About'
import Confirmation from './pages/confirmation'
import Admin from './pages/Admin'

import { useLocation } from 'react-router-dom'
import BookingFlow from './pages/BookingFlow'





function App(){

  const location = useLocation()

  const isAdmin = location.pathname==='/admin'

  return (
  <>
    <div style={!isAdmin?{backgroundColor:'#0A0F1E',minHeight:'100vh'}:{}}>
  {!isAdmin && <NavBar/>}
    
    <main className={!isAdmin?"pt-20": ""}>
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/booking' element={<BookingFlow/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/service' element={<Services/>}></Route>
         <Route path='/confirmation' element={<Confirmation/>}></Route>
         <Route path='/admin' element={<Admin/>}></Route>
       </Routes>

     {!isAdmin &&  <Footer/> }
    </main>
    
    </div>
    
    </>
  )
}


export default App
