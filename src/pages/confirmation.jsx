import { Link } from "react-router-dom"

export default function Confirmation(){
    return (


        <div className="min-h-screen justify-center flex  items-center  " style={{backgroundColor:'#0A0F1E '}}>

        {/* booking confirmation */}
            <div className="max-w-lg w-full p-8 rounded-2xl text-center" style={{border:'1px solid rgba(232,197,90,0.3)'  , backgroundColor:'#111827',}}>
                    <div>
                        
                        <span style={{}}>✓</span>
                    </div>
                <div mt-4 >
                      
                     <h1 className="uppercase tracking-widest " style={{color:'#E8C55A'}}>Booking Confirmed!</h1>
                  <p className="text-gray-400  text-center max-w-xl">Thank you for choosing Anthony-Teague Inc.
                     We'll contact you shortly to confirm your appointment.</p>
                </div>

                 
                
                <div className="rounded-xl p-4 mt-20 text-left" style={{backgroundColor:'#0A0F1E' , border:'1px solid rgba(232,197,90,0.3)'}}>
                    <h3 style={{color:'#E8C55A'}}>What happens next</h3>
                    <p className="text-gray-400">1.Our team will review your booking</p>
                    <p className="text-gray-400">2.We'll call or email you to confirm the time</p>
                    <p className="text-gray-400">3.Our professional will arrive at your address</p>
                </div>

                
                <div className=" flex justify-center gap-8 mt-20">
                    <Link className="py-4 px-16 rounded-lg font-bold " to={'/'} style={{backgroundColor:'#0A0F1E' , color:'#E8C55A' , border:'1px solid rgba(232,197,90,0.3) '}}>Go home</Link>
                    <Link className="py-4 px-16 rounded-lg font-bold" to={'/booking'} style={{backgroundColor:'#E8C55A'}}>book  again</Link>
                </div>
            </div>
              


          

            

        </div>
    )
}