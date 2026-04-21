
import { useState , useEffect } from "react"
import { supabase } from "../lib/supabase"
import { Link } from "react-router-dom"


const colors = ['#E8C55A', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']



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


async function updateStatus(id , status){

    const {error} = await supabase.from('Bookings').update({status:status}).eq('id',id)

    if(error){
        console.log(error.message)
    }else{
        setBookings(Bookings.map(b =>b.id===id? {...b, status:status}:b))
    }

}

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


const statusConfig = {
    pending:{bg:'#FEF3C7' , dot:'#F59E0B' , label:'pending'},
    confirmed:{bg:'#D1FAE5' , dot:'#10B981', label:'confirmed'},
    cancelled: {bg:'#FEE2E2', dot:'#EF4444', label:'cancelled'}
}

    return (
        <div className="flex min-h-screen  ">

        {/* side bar */}
          <div className="w-64 p-6"  style={{background:'#064E3B'}}>
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
          <div className="flex-1"  style={{backgroundColor:'#F1F5F9'}}>
            

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

                {/* Table start here */}

                <div className="ml-6 mr-6 rounded-2xl shadow-sm overflow-hidden bg-white">
                <table className="w-full border-collapse">
                 <thead  className="bg-gray-50">
                     <tr className="rounded-2xl">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">service</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Address</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-12 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                       
                     </tr>
                 </thead>
                  <tbody>
                     {Bookings.map((items)=>{ 
                        const avatarColr= colors[Math.floor(Math.random() * colors.length)]
                        const status = statusConfig[items.status] || statusConfig['pending']
                        return (
                         <tr  key={items.id}> 
                          <td className="px-6 py-4">

                        <div className="flex items-center gap-4">
                             <div>{items.photo?<img className="h-12 w-12  rounded-full object-cover" src={items.photo}></img>:
                             <div className="flex justify-center items-center  text-white h-12  w-12 rounded-full object-cover" style={{backgroundColor:avatarColr}}> 
                                {items.name.split(' ').map(w => w.charAt(0)).join('')}</div>} </div>

                               {/* info */} 
                             <div className="flex flex-col">
                              
                                <span className="font-semibold text-gray-900">{items.name}</span>
                                <span className="text-sm text-gray-500">{items.telephone}</span>
                                <span className="text-sm text-gray-500">{items.email}</span>
                             </div>


                        </div>

                            
                            
                          </td>

                          <td className="p-3 text-left border-b border-gray-200">{items.service}</td>
                     
                         <td className="p-3 text-left border-b border-gray-200">{items.address}</td>
                        <td className="p-3 text-left border-b border-gray-200">
                            <span  style={{backgroundColor:status.bg , color:status.dot}} className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ">
                                <span style={{backgroundColor:status.dot}} className="h-2 w-2 rounded-full "></span>
                                    {status.label}
                            </span>


                        </td>
                        <td className="flex justify-center items-center gap-2">
                            <div className="flex gap-2">
                                <button onClick={()=>updateStatus(items.id ,'confirmed')} className="bg-transparent px-3 py-1 border
                                border-gray-400 rounded-lg mt-2 hover:cursor-pointer active:scale-95 " 
                                style={{backgroundColor:''}}>confirm</button>

                                <button  className="px-3 py-1 rounded-lg mt-4"
                                style={{backgroundColor:'red'}}>Cancel</button>
                             </div>
                        </td>
                          
                    </tr>

                     )})}
                        
                       
                        
                    
                   
                  </tbody>
               </table>
        
                </div>    
              
          </div>

        </div>
    )
}