
{/* moving data outside the function then call it in the function  */}

const ServicesData = [ {icon:'🏠' , name:'House Cleaning', price:'Starting at $99', description:'Professional home cleaning services',image:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop'}, 
                  {icon: '🚗', name: 'Car Services', price:'Starting at $79', description: 'Full car care and detailing',image:'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&h=500&fit=crop'},
                  {icon:'🌿', name:' Landscaping', price:'Starting at $120',description:'land cleaning deep level',image:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'},
                  {icon:'📦', name:'Moving Out', price:'Starting at $199',description:'moving out full service',image:'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800&h=500&fit=crop'},
                  {icon:'📦', name:'Moving in', price:'Starting at $199',description:' Mouving in full service',image:'https://plus.unsplash.com/premium_photo-1680300960759-7afa8664efee?w=800&h=500&fit=crop'},
                  {icon:'🗑️', name:'Junk Removal', price:'Starting at $149',description:'removing all junk',image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'}
                ]



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