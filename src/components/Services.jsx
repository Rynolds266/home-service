import { ServicesData } from "../data/services"

{/* moving data outside the function then call it in the function  */}


function Services(){
    return (

        
      <div className='py-20 px-8'>
        <h2 className="text-yellow-400 text-3xl text-center mb-2">
            Our Services  
        </h2>
        <p className="text-gray-400 text-center mb-4">Quality services across Louisville, Kentucky</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">   
            {ServicesData.map((items)=>(
                <div key={items.name} className="rounded-2xl shadow-lg overflow-hidden p-6 border  border-gray-700 flex flex-col gap-2  hover:border-yellow-400 hover:scale-105 transition-all duration-300"
                  style={{backgroundColor:'#111827'}}
                >

                   {/* section 1 photo */}

                   <div>
                      <img src={items.image} alt={items.name} className=" rounded-t-2xl"></img>
                   </div>

                   {/* info */}

                    <div className="p-4 flex flex-col gap-2 ">
                        <h3 className="text-white">{items.name}</h3>
                        <p style={{color:'#E8C55A'}}>{items.price}</p>
                    </div>
                
                </div>
            ))} 

        </div>

      </div>

        
    )
}

export default Services