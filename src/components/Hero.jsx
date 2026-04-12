import { Link } from "react-router-dom"


const StatsData = [
    {number:'500+', label:'Jobs Completed'},
    {number:'98%', label:'Satisfaction Rate'},
    {number:'5★', label:'Average Rating'}
]

function Hero(){
    return (

        
        <div className="flex items-center justify-center min-h-fit md:min-h-screen flex-col pt-20 pb-16" style={{backgroundColor:'#0A0F1E'}}>
            <div className="border border-yellow-400 px-4 py-2 text-sm  mb-6  tracking-widest" style={{color:'#E8C55A'}}>
                📍 Louisville, Kentucky
                
            </div>
            <h1 className="text-white text-center font-bold text-3xl lg:text-5xl" >
               <span style={{color:'#E8C55A'}}>Premium </span> Home Services, Done Right.
            </h1>

            <p className="text-gray-400 mt-4 text-center text-sm max-w-xl ">
                From moving to junk removal   we handle it all 
                across Louisville with care and professionalism.
            </p>

            <div className="flex gap-8 mt-12">
                {StatsData.map((items)=>(
                    <div key={items.label} className="flex flex-col">
                        <span className="text-3xl  font-bold" style={{color:'#E8C55A'}}>{items.number}</span>
                         <span className="text-sm text-gray-400">{items.label}</span>

                    </div>
                ))}
            </div>

            { <Link  to={`/booking`} className=" active:scale-95 transition-transform inline-block mt-10 py-3 px-8 font-bold rounded-lg uppercase tracking-widest hover:cursor-pointer " style={{color:'#0A0F1E', backgroundColor:'#E8C55A'}}>
                Book Service
            </Link>
            
            }

          
        </div>
    )
}


export default Hero