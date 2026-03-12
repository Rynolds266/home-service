import { Phone , Mail , MapPin , Twitter, Facebook, Instagram } from "lucide-react"



const ContactData = [{icon:Phone,value:'5025365571'},
                     {icon:Mail, value:'info@teagueinc.com'},
                     {icon:MapPin , value:'Louisville, Kentucky'}
     
                  ]

const quickLinks = ['Home', 'Services', 'Deals', 'Contact']


function Footer(){
    return (

     <div className="py-16 px-6" style={{backgroundColor:'#060B14'}}>


          {/* 3 colomn grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>

                <h3 className="font-bold text-white text-xl">Anthony-Teague<span style={{color:'#E8C55A'}}>.Inc</span></h3>
                <p className="text-gray-400 text-sm mt-3 ">Louisville's trusted home service experts</p>

            </div>

                
            <div>
                <h4 className="text-white font-bold text-lg">Quick Links</h4>
                <ul>
                    {quickLinks.map((items)=>(
                        <li key={items} className="text-gray-400 mt-2">{items}</li>
                    ))}



                </ul>
            </div>

            {/* last column */}

            <div>
                <h4 className="text-white font-bold text-lg">Contact</h4>
               {ContactData.map((items)=>(
                <div key={items.value} className="flex items-center gap-2 mt-3">
                    <items.icon size={16} color="#E8C55A"/>
                     <span className="text-gray-400 text-sm">{items.value}</span>
                </div>
               ))}
            </div>

            {/* divider */}
            
             
          </div>
          <hr  className="my-8" style={{borderColor:'rgba(232,197,90,0.2)'}}/>

             <div className="flex justify-between items-center">
                {/* paragraph  */}
                  <p className="text-gray-400 text-sm">© 2025 Teague Inc. All rights reserved.</p>
             </div>
      </div>
     
      
  )
}

export default Footer