
function NavBar(){
    return (
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
             <ul className="flex gap-4">
                {['Home','Services','Deals','Contact','About'].map((items)=>(
                    <li key={items} style={{color:'#9CA3AF', letterSpacing:'1px' , fontSize:'0.85rem', cursor:'pointer', textTransform:'uppercase',transition:'color '}}
                      onMouseEnter={e=>e.target.style.color='#C9A84C'}
                      onMouseLeave={e=>e.target.style.color='#9CA3AF'}
                    >
                     {items}   

                    </li>
                ))}

             </ul>

             {/* button */}

             <button style={{
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

             </button>


        </nav>
    )
}

export default NavBar