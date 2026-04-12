
import { useState , useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"




const dataSideLink = [{icon:'', LinkName:'Booking'},
                     {icon:''}

]

export default function Admin(){

const [Bookings  , setBookings] = useState([])


useEffect(()=>{
   async function fetchBookings() {
    const {data , error}  = await supabase.from('Bookings').select('*')

    if (error){
        console.log("error ", error.message )
    }else{
        console.log("data retrieve successfull")
        setBookings(data)
        console.log(data)
    }


   }
   fetchBookings()
} , [])



const [messages , setMessages] = useState([])

useEffect(()=>{
    async function Messages () {
        const {data , error} = await supabase.from('messages').select('*')

        if(error){
            console.log('error', error.message)
        }else{
            console.log('messages retrieve')
            setMessages(data)
            console.log(data)
        }
    }
    Messages()
},[])

const [activeTab , setActiveTab] = useState('bookings')

    return (
        <div className="flex min-h-screen  ">

        {/* side bar */}
          <div className="w-64 p-6"  style={{background:'#1E1B4B'}}>
              <div className="flex items-center gap-2 mb-8">
                <span style={{color:"" , fontSize:""}}></span>
                
                <span style={{color:'white', fontFamily:'Georgia , serif' , fontSize:'1.3em' , letterSpacing:'2px', fontWeight:'bold'}}>
                     Teague<span style={{color:'#E8C55A'}}>.inc</span>
                     
                </span>
             

            </div>

             <div>
                <Link className="text-gray-400 font-bold">Booking</Link>
                </div>
          </div>


         

          
          {/* main content */}
          <div className="flex-1" style={{backgroundColor:'#F1F5F9'}}>
            

             <div className="grid grid-cols-3 gap-4 p-6">
                 {/*  count */}
                <div className="shadow-sm p-4 bg-white rounded-lg mt-4">
                    <p className="text-gray-500 text-sm">Total bookings</p>
                    <span className="text-2xl font-bold"  style={{color:'#3B82F6'}}>{Bookings.length}</span>
                </div>
                {/* pending */}
                <div   className="p-4 bg-white rounded-lg mt-4 shadow-sn">
                    <p  className="text-gray-500 text-sm">Pending</p>
                    <span   className="text-2xl font-bold"  style={{color:'#F59E0B'}} > {Bookings.filter(b=>b.status === "pending").length} </span>

                </div>
                {/*confirmed */}

                <div className="p-4 bg-white rounded-lg mt-4  shadow-sm">
                    <p  className="text-gray-500 text-sm">confirmed</p>
                   <span className="text-2xl font-bold" style={{color:'#10B981'}}> {Bookings.filter(b=> b.status==="confirmed").length}</span> 
                </div>

             </div>
               <h1  className="flex justify-center p-6" style={{}}>bookings</h1>


                <div className="p-6 rounded-lg">
                     <table className="w-full border-collapse">
                 <thead  className="bg-gray-50">
                     <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">service</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Validate</th>
                         <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Cancel</th>
                     </tr>
                 </thead>
                  <tbody>
                     {Bookings.map((items)=>(
                        <tr  key={items.id}> 
                          <td className="px-6 py-4">
                             <div className="flex flex-col">
                                <span className="font-semibold text-gray-900">{items.name}</span>
                                <span className="text-sm text-gray-500">{items.telephone}</span>
                                <span className="text-sm text-gray-500">{items.email}</span>
                             </div>

                            
                          </td>

                          <td className="p-3 text-left border-b border-gray-200">{items.service}</td>
                     
                         <td className="p-3 text-left border-b border-gray-200">{items.address}</td>
                        <td className="p-3 text-left border-b border-gray-200">{items.status}</td>
                    </tr>
                        ))}
                    
                   
                  </tbody>
               </table>
        
                </div>    
              
          </div>

        </div>
    )
}