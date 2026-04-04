import { useState } from "react"
import { Link } from "react-router-dom"
import { dataLinks } from "../data/dataLink"
import { Scale } from "lucide-react"

function NavBar(){
  const [isOpen , setIsOpen ] = useState(false)
    return (
  <>
   
         <nav className="fixed top-0 left-0  right-0 z-50 shadow-md px-8 py-4 flex justify-between items-center"
         style={{backgroundColor:'#0A0F1E' , borderBottom: '1px solid rgb(201,168,76,0.2)' }}
        >
        
           
            {/* Logo */}

            <div className="flex items-center gap-2">
                <span style={{color:"" , fontSize:""}}></span>
                
                <span style={{color:'white', fontFamily:'Georgia , serif' , fontSize:'1.3em' , letterSpacing:'2px', fontWeight:'bold'}}>
                     Anthony-Teague<span style={{color:'#E8C55A'}}>.inc</span>
                </span>
               
                

            </div>
            
            {/* navigations links */}
             <ul className="hidden lg:flex gap-4">
                {dataLinks.map((items)=>(
                    <Link key={items.name} to={items.path}  style={{color:'#9CA3AF', letterSpacing:'1px' , fontSize:'0.85rem', cursor:'pointer', textTransform:'uppercase',transition:'color '}}
                      onMouseEnter={e=>e.target.style.color='#C9A84C'}
                      onMouseLeave={e=>e.target.style.color='#9CA3AF'}
                    >{items.name}</Link>
                    
                ))}

             </ul>


             {/* hamburger button */}


             <button className="lg:hidden " onClick={()=>setIsOpen(!isOpen)} style={{color:'#E8C55A', fontSize:'1.5rem'}}>☰</button>


            
             {/* button book now */}

             <Link  to={`/booking`} className="hidden lg:block rounded-lg active:scale-95 transition-transform" style={{
                backgroundColor:'transparent',
                border:'1px solid #C9A84C',
                color:'#C9A84C',
                padding:'8px 24px',
                letterSpacing:'1px',
                fontSize:'0.85rem',
                cursor:'pointer',
                textTransform:'uppercase',
                transition:'all 0.3s'
               
             }} 
             onMouseEnter={e=>{e.target.style.color}}
             
             
             >

                book now

             </Link>


        </nav>

     {isOpen && ( <div className="lg:hidden px-4 py-4 mt-16" style={{backgroundColor:'#0A0F1E'}}>

        {dataLinks.map((item)=>(
            <Link key={item.name} to={item.path} onClick={()=>setIsOpen(false)} className="py-2 text-sm uppercase tracking-widest  text-gray-400 block"
             style={{borderBottom:'1px solid rgba(201,168,76,0.1)'}}>{item.name}</Link>
        ))}



      </div>
       )}
  
  
  </>
    

    )
}

export default NavBar