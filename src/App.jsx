import  Home  from './pages/Home'

import Footer from './components/Footer'

import NavBar from './components/Navbar'

import Booking from './pages/Booking'

import  Contact  from './pages/Contact'


import { Routes , Route } from 'react-router-dom'
import Services from './pages/Services'
import About from './pages/About'





function App(){
  return (
    <div style={{backgroundColor:'#0A0F1E',minHeight:'100vh'}}>
  
    <NavBar/>
    <main className="pt-20">
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/contact' element={<Contact/>}/>
         <Route path='/booking' element={<Booking/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/service' element={<Services/>}></Route>
       </Routes>
      <Footer/>
    </main>
    
    </div>
  )
}


export default App
