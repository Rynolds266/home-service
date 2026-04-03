
import { useEffect, useState  } from "react"
import { useSearchParams } from "react-router-dom"
import { ServicesData } from "../data/services"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"


const services = ['House Cleaning', 'Car Services', 'Landscaping', 'Moving Out', 'Moving In', 'Junk Removal']

function Booking(){
    const [formData , setFormData] = useState({service:'',
        name:'',
        telephone:'',
        email:'',
        address:''


    })
 function HandleData(e){
    setFormData({... formData , [e.target.name]: e.target.value})

 }

 const [searchParams] = useSearchParams()

 const serviceFromURL = searchParams.get('service')

 useEffect(()=>{
      if(serviceFromURL){
         setFormData ({... formData , service:serviceFromURL})
      }
 }, [serviceFromURL])

 const navigate = useNavigate()

 const HandleBooking = async ()=> {
   
   const {error} = await supabase.from('Bookings').insert([formData])

    
   if (error){
      console.log('Error:', error.message)
   }
   else{
      console.log('booking saved!')

      setFormData({service:'' , name:'',telephone:'', email:'' , address:''})
      navigate('/confirmation')
    
   }
  
  
}


 

    return (
      <>
      <div></div>
       <div className="min-h-screen flex flex-col items-center pt-32 pb-16" style={{backgroundColor:'#0A0F1E'}}>
           <div className="rounded-2xl  p-6 w-full max-w-lg"
           style={{backgroundColor:'#111827', border:'1px solid #E8C55A '}}>
                 <h2 className="text-yellow-400 text-center mb-2 tracking-widest uppercase">Book a service</h2>
            <h3 className="text-center text-gray-400 mb-4">Louisville's trusted home service experts</h3>
            
            <div className="mb-2">

             <label className="text-sm tracking-widest uppercase block mb-2" style={{color:'#E8C55A'}}>
                Service
             </label>
             <select name="service" onChange={HandleData} value={formData.service} className="w-full rounded-lg   " style={{border:'1px solid rgba(232,197,90,0.3)' , color:'white',backgroundColor:'#0A0F1E',}}>
                    <option value="" className="text-sm font-bold  tracking-widest uppercase">SELECT A SERVICE</option>
                 {ServicesData.map((items)=>(
                    <option     style={{color:'#0A0F1E', backgroundColor:'white'}} key={items.name} value={items.name} >{items.name}</option>
                 ))}
             </select >

            </div>

            <div className="mb-4">
                <label className="text-sm text-white tracking-widest uppercase block mb-2" style={{color:'#E8C55A'}}>
                    Full name
                </label>
              <input name="name" className="w-full p-3 text-white rounded-lg " onChange={HandleData} value={formData.name}  style={{backgroundColor:'#0A0F1E' , border:'1px solid rgba(232,197,90,0.3)'}}/>
            </div>

           <div className="grid grid-cols-2 gap-4 mb-4">

                 <div className="mb-2">
                <label className="text-sm tracking-widest uppercase block mb-2" style={{color:'#E8C55A'}}>telephone</label>
                 <input name="telephone" onChange={HandleData} value={formData.telephone} className="w-full text-white p-3  rounded-lg" style={{backgroundColor:'#0A0F1E',border:'1px solid rgba(232,197,90,0.3)'}}/>
            </div>

            <div className="mb-2">
                 <label className="text-sm tracking-widest uppercase block mb-2" style={{color:'#E8C55A'}}>email</label>
                 <input name="email" onChange={HandleData} value={formData.email} className="w-full  p-3 text-white rounded-lg" style={{backgroundColor:'#0A0F1E',border:'1px solid rgba(232,197,90,0.3)'}}/>
            </div>


           </div>
            

            <div className="mb-2">
                 <label className="text-sm tracking-widest uppercase block mb-2" style={{color:'#E8C55A'}}>address</label>
                 <input name="address" onChange={HandleData}  value={formData.address} className="w-full  p-3 text-white rounded-lg mb-4" style={{backgroundColor:'#0A0F1E',border:'1px solid rgba(232,197,90,0.3)'}}/>
            </div>
            
             
             
             
             


            <div className="flex justify-center mt-6">

             <button  onClick={HandleBooking} className="tracking-widest  py-3 px-8 font-bold uppercase rounded-lg hover:cursor-pointer" style={{color:'#0A0F1E' , backgroundColor:'#E8C55A'}}>Book now</button>
            </div>
           
           </div>
           
        </div>
        
      </>
       
    )
}

export default Booking