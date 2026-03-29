import { Phone , Mail , MapPin } from "lucide-react"
import { ContactData } from "../data/Contact"
import { useState } from "react"

function Contact(){
  const [formData , setFormData] = useState ({
     name:'',
     email:'',
     messageText:''
  })


   function HandForm (e){
       setFormData({... formData , [e.target.name]: e.target.value})
  }

    return  (
        <div className="pt-32 pb-20 px-8 max-w-2xl mx-auto">

             <h4 className="text-center mb-8" style={{color:'#e8c55a'}}>CONTACT US</h4>
            <h2 className="text-white  text-center">Get In Touch</h2>

        

            <div className="grid grid-cols-1 lg:grid-cols-2   gap-8 mt-12">

                    {/* left */}
                 <div className="rounded-lg p-6" style={{backgroundColor:'#111827' , border :'1px solid rgba(232,197,90,0.2)'}}>
                    {ContactData.map((items)=>(
                        <div key={items.value} className="flex items-center gap-3 mt-3">
                          <items.icon size={16} color="#E8C55A"/>
                          <span className="text-gray-400 text-sm">{items.value}</span>

                        </div>
                    ))}
                 </div>
                    

                    {/* right */}

                    <div className=" rounded-lg p-6" style={{backgroundColor:'#111827' , border:'1px solid rgba(232,197,90,0.2)'}}>
                        <div className="mb-3">
                        <label className="block tracking-widest uppercase text-sm mb-2  " style={{color:'#e4be4e'}}> name </label>
                       
                        <input name='name' onChange={HandForm} className="w-full rounded-lg text-white p-3 "
                        style={{backgroundColor:'#0A0F1E' , border:'1px solid  '}}/>
                      
                        </div>

                        
                     <div className="mb-4">
                         <label className="block uppercase tracking-widest text-sm mb-2" style={{color:'#E8C55A'}}> email </label>
                       
                        <input name='email' onChange={HandForm} className="w-full rounded-lg text-white p-3" style={{border:'1px solid rgba(232,197,90,0.2)'}}/>
                        
                    
                     </div>
                    
                     <div className="mb-4">
                         <label className="block uppercase tracking-widest text-sm mb-2" style={{color:'#E8C55A'}}>leave a   Message</label>
                     
                      <textarea rows={4} name='messageText' onChange={HandForm} 
                      className="rounded-lg w-full text-white" style={{border:'1px solid rgba(232,197,90,0.2)'}} ></textarea>
            
                  
                     </div>
                    
                    <div className="flex justify-center mx-auto">
                         <button className=" py-3 px-8 text-center w-full rounded-lg mt-10" style={{backgroundColor:'#E8C55A'}}>submit</button>
                    </div>
                    

                    </div>

                    
                    
                     
                   


            </div>

           

            
           



        </div>
    )
}

export default Contact