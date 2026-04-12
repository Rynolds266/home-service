import { Link } from "react-router-dom"
import { StatsData } from "../data/Stats"
import { whydata } from "../data/whyData"


export default function About(){

    return (

    <div className="w-full " style={{background:'radial-gradient(circle at top ,   #0A0F1E)'}}>

        
        <div className="pt-32 pb-20 px-8 max-w-6xl mx-auto" style={{ }}>

            {/* 1 - Hero section */}
            <h4 className="uppercase tracking-widest text-center " style={{color:'#E8C55A'}}>OUR STORY</h4>
            <h2 className="text-white text-center ">Louisville's Most Trusted Home Service Team</h2>
            <p className="text-gray-400 max-w-2xl text-center mx-auto">Founded with one mission   deliver premium home services with professionalism, care, and reliability across Louisville, Kentucky.</p>
                
                {/* 2 - Stats */}

                <div className="grid grid-cols-3 gap-4 mt-12">
                    {StatsData.map((items)=>(
                        <div  key={items.number} className="text-center rounded-lg p-4" style={{backgroundColor:'#111827' , border:'1px solid rgba(232,197,90,0.2)'}}>
                            <p style={{color:'#e8c55a'}}>{items.number}</p>
                            <p className="text-sm text-gray-400">{items.label}</p>
                        
                        
                        </div>
                        
                    ))}

                </div>
                    
                
                {/* 3 - Why Choose Us */}
                <div className="grid grid-cols-2 mt-10 gap-4">
                    {whydata.map((items)=>(
                    <div key={items.title} className="rounded-lg p-4" style={{backgroundColor:'#111827',border:'1px solid rgba(232,197,90,0.2)'}}>
                        <p>{items.icon}</p>
                        <p className="text-white">{items.title}</p>
                        <p className="text-gray-400 ">{items.description}</p>
                    </div>
                ))}
                </div>
            
                
                {/* 4 - CTA */}

                <div className=" flex flex-col justify-center mt-12 p-4 rounded-lg  text-center" style={{backgroundColor:'#111827' , border:'1px solid rgba(232,197,90,0.2)'}}>
                    <h2 className="text-white text-center">Ready to get started?</h2>
                    <p className="text-gray-400 text-center">Book a service today and see why Louisville trusts us.</p>

                    <Link to={`/booking`} className="active:scale-95 transition-transform inline-block mx-auto uppercase tracking-widest font-bold py-3 px-8 rounded-lg  mt-4" style={{backgroundColor:'#e8c55a'}}>book now</Link>
                </div>

        </div>
        


    </div>
    
)
}