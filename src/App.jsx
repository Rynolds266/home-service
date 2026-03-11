import DealoftheWeek from './components/DealoftheWeek'
import Footer from './components/Footer'
import Hero from './components/Hero'
import NavBar from './components/Navbar'
import Services from './components/Services'
function App(){
  return (
    <div style={{backgroundColor:'#0A0F1E',minHeight:'100vh'}}>
      <NavBar/>
      <Hero/>
      <Services/>
      <DealoftheWeek/>
      <Footer/>
    </div>
  )
}


export default App
