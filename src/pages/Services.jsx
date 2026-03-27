import { ServicesData } from "../data/services"
import { Link } from "react-router-dom"


export default function Services(){
    return (

    <div className="pt-24  pb-20  px-8">
          <div className="text-center mb-12">
            <h3 style={{color:'#E8C55A'}}>WHAT WE OFFER</h3>
            <h2 className="text-white">Our Services</h2>
            <p className="text-gray-400">Quality services across Louisville, Kentucky</p>

          </div>
            
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            

                {ServicesData.map((items)=>(
                    <div key={items.name}  className="flex flex-col gap-0 rounded-lg p-8 border border-gray-700 hover:border-yellow-400 hover:scale-105 
                    transition-all duration-300  overflow-hidden" style={{backgroundColor:"#111827"}}>
                        <img src={items.image} alt={items.name} className="w-full  object-cover  rounded-lg"></img>
                        <div className="p-4">
                            
                            <div className="text-white">{items.name}</div>
                            <div style={{color:'#E8C55A'}}>{items.price}</div>
                            <div className="text-gray-400">{items.description}</div>

                            <Link to={`/booking?service=${items.name}`} className="inline-block mt-8 tracking-widest font-bold rounded-lg uppercase text-center py-3 px-8 pt-5 hover:cursor-pointer"
                             style={{ backgroundColor:'#C9A84C', color:'black'}}> Book this now</Link>
                        </div>

                    </div>
                ))}

        </div>

      

    </div>

        
    )
}


