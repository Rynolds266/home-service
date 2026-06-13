import { useNavigate } from "react-router-dom";

const C = {
  darkBg:"#0A1A0D", deepDark:"#060F08", primary:"#2A9D5C",
  lightBg:"#F3FBF6", sectionBg:"#F6FBF7", greenText:"#4CAF82",
  muted:"#7A9A85", gold:"#F4C430", border:"#E2F0E7",
  text:"#0A1A0D", bodyMuted:"#6B7280", footerTxt:"#3A5A42",
};

const SERVICES = [
  {
    id:"cleaning", icon:"✨", label:"Cleaning", from:"$35", popular:false,
    tagline:"A spotless home, every time.",
    desc:"Whether you need a quick standard clean or a full deep clean before moving in or out, our team arrives fully equipped and leaves nothing behind.",
    includes:["Standard & deep cleaning","Move-in / move-out cleaning","Kitchen & bathroom detail","Floors, surfaces & windows","Eco-friendly products available"],
    duration:"2–4 hours", ideal:"Weekly, bi-weekly, or one-time",
  },
  {
    id:"lawn", icon:"🌿", label:"Lawn & Landscaping", from:"$45", popular:false,
    tagline:"Curb appeal that neighbors notice.",
    desc:"From regular mowing to full seasonal cleanups, we keep your yard looking sharp year-round. No contract required — book as needed.",
    includes:["Lawn mowing & edging","Trimming & shaping shrubs","Leaf & debris removal","Seasonal cleanups","Mulching & bed maintenance"],
    duration:"1–3 hours", ideal:"Weekly or bi-weekly maintenance",
  },
  {
    id:"moving", icon:"📦", label:"Moving Help", from:"$65", popular:true,
    tagline:"Heavy lifting — handled.",
    desc:"Loading, unloading, or rearranging — our crew works fast and handles your belongings with care. No truck needed, just the muscle.",
    includes:["Loading & unloading trucks","Furniture moving & rearranging","Appliance moving","Packing & unpacking assistance","Stair & elevator capable"],
    duration:"2–6 hours", ideal:"Moving day or single room",
  },
  {
    id:"assembly", icon:"🛋️", label:"Furniture Assembly", from:"$45", popular:false,
    tagline:"IKEA? No problem.",
    desc:"Flat-pack furniture, bed frames, desks, shelving — we've built it all. No frustration, no missing pieces, no wasted Sunday afternoon.",
    includes:["IKEA, Wayfair & all major brands","Bed frames & wardrobes","Desks, shelving & TV stands","Outdoor furniture","Disposal of packaging"],
    duration:"1–3 hours", ideal:"New furniture delivery day",
  },
  {
    id:"junk", icon:"🗑️", label:"Junk Removal", from:"$75", popular:false,
    tagline:"Gone in one trip.",
    desc:"Old furniture, appliances, yard waste, garage clutter — we haul it all away. You point, we lift, we're done.",
    includes:["Furniture & appliance removal","Yard waste & debris","Garage & basement cleanouts","Estate cleanouts","Responsible disposal & donation"],
    duration:"1–3 hours", ideal:"One-time cleanout",
  },
];

const Dots = ({ opacity=0.08 }) => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:`radial-gradient(circle,rgba(42,157,92,${opacity}) 1px,transparent 1px)`,
    backgroundSize:"28px 28px" }}/>
);

const Logo = () => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <div style={{ width:34, height:34, background:C.primary, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    </div>
    <div>
      <div style={{ fontSize:15, fontWeight:800, color:"#fff", letterSpacing:"-0.3px", lineHeight:1 }}>Anthony-Teague Inc</div>
      <div style={{ fontSize:10, color:C.greenText, fontWeight:600, letterSpacing:"1px" }}>LOUISVILLE, KY</div>
    </div>
  </div>
);

const Nav = ({ navigate }) => (
  <nav style={{ background:C.darkBg, padding:"0 48px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 }}>
    <div onClick={()=>navigate("/")} style={{ cursor:"pointer" }}><Logo/></div>
    <div style={{ display:"flex", gap:32 }}>
      {[["Services","/services"],["About","/about"],["Reviews","/reviews"],["Contact","/contact"]].map(([l,p])=>(
        <a key={l} onClick={()=>navigate(p)} style={{ fontSize:14, color: p==="/services" ? "#fff" : "#94A3A0", fontWeight: p==="/services" ? 700 : 500, cursor:"pointer", textDecoration:"none" }}>{l}</a>
      ))}
    </div>
    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
      <span style={{ fontSize:14, color:"#fff", fontWeight:600, cursor:"pointer" }}>(502) 536-5571</span>
      <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:14, padding:"10px 20px" }}>Book now</button>
    </div>
  </nav>
);

const Footer = ({ navigate }) => (
  <footer style={{ background:C.deepDark, padding:"44px 48px 24px" }}>
    <div style={{ maxWidth:1160, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:36 }}>
        <div>
          <div style={{ marginBottom:14 }}><Logo/></div>
          <p style={{ fontSize:13, color:C.footerTxt, lineHeight:1.8, maxWidth:220 }}>Locally owned home services — cleaning, landscaping, moving, assembly & junk removal.</p>
        </div>
        {[
          ["SERVICES",["Cleaning","Lawn & Landscaping","Moving Help","Furniture Assembly","Junk Removal"]],
          ["COMPANY", ["About us","How it works","Reviews","Careers"]],
          ["CONTACT", ["(502) 536-5571","hello@teagueinc.com","Louisville, KY","Mon–Sat 7am–7pm"]],
        ].map(([h,items])=>(
          <div key={h}>
            <div style={{ fontSize:11, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:16 }}>{h}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {items.map(i=><a key={i} style={{ fontSize:13, color:C.footerTxt, cursor:"pointer" }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid #0D200F", paddingTop:20, display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontSize:12, color:"#1E3A22" }}>© 2025 Anthony-Teague Inc. All rights reserved.</span>
        <div style={{ display:"flex", gap:20 }}>
          {["Privacy","Terms"].map(t=><span key={t} style={{ fontSize:12, color:"#1E3A22", cursor:"pointer" }}>{t}</span>)}
        </div>
      </div>
    </div>
  </footer>
);

export default function ServicesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily:"system-ui,-apple-system,sans-serif", color:C.text, background:"#fff" }}>
      <Nav navigate={navigate}/>

      {/* Hero */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots/>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1, textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(42,157,92,0.4)", borderRadius:4, padding:"6px 14px", marginBottom:24 }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:C.primary }}/>
            <span style={{ fontSize:12, color:C.greenText, fontWeight:600, letterSpacing:"0.5px" }}>LOUISVILLE, KY · FULLY INSURED</span>
          </div>
          <h1 style={{ fontSize:52, fontWeight:800, color:"#fff", letterSpacing:"-2px", lineHeight:1.06, marginBottom:18 }}>
            Everything your home needs.<br/><span style={{ color:C.primary }}>One crew to handle it.</span>
          </h1>
          <p style={{ fontSize:17, color:C.muted, lineHeight:1.7, maxWidth:520, margin:"0 auto 36px" }}>
            Five focused services, done properly. No subcontractors, no surprises — just Anthony-Teague's team at your door.
          </p>
          <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:16, padding:"16px 36px", display:"inline-flex", alignItems:"center", gap:8 }}>
            Book any service
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>

      {/* Services list */}
      <section style={{ background:"#fff", padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", flexDirection:"column", gap:28 }}>
          {SERVICES.map((s, i)=>(
            <div key={s.id} style={{
              display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:0,
              border:`1.5px solid ${C.border}`, borderRadius:16, overflow:"hidden",
            }}>
              {/* Left panel */}
              <div style={{ background: i%2===0 ? C.darkBg : C.lightBg, padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontSize:44, marginBottom:16 }}>{s.icon}</div>
                  {s.popular && (
                    <div style={{ display:"inline-block", background:C.primary, color:"#fff", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:4, marginBottom:12 }}>MOST POPULAR</div>
                  )}
                  <h2 style={{ fontSize:28, fontWeight:800, color: i%2===0 ? "#fff" : C.text, letterSpacing:"-0.5px", marginBottom:8 }}>{s.label}</h2>
                  <p style={{ fontSize:14, color: i%2===0 ? C.muted : C.bodyMuted, lineHeight:1.65, marginBottom:24 }}>{s.tagline}</p>
                  <div style={{ fontSize:28, fontWeight:800, color:C.primary, marginBottom:4 }}>From {s.from}</div>
                  <div style={{ fontSize:12, color: i%2===0 ? C.muted : C.bodyMuted }}>per hour · pay after job</div>
                </div>
                <div style={{ marginTop:28, display:"flex", flexDirection:"column", gap:10 }}>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                    <span style={{ fontSize:13, color: i%2===0 ? C.muted : C.bodyMuted }}>Estimated time: <strong style={{ color: i%2===0 ? "#fff" : C.text }}>{s.duration}</strong></span>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={{ fontSize:13, color: i%2===0 ? C.muted : C.bodyMuted }}>Ideal for: <strong style={{ color: i%2===0 ? "#fff" : C.text }}>{s.ideal}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right panel */}
              <div style={{ padding:"40px 36px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:15, color:C.bodyMuted, lineHeight:1.75, marginBottom:28 }}>{s.desc}</p>
                  <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:16 }}>WHAT'S INCLUDED</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {s.includes.map(item=>(
                      <div key={item} style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:22, height:22, borderRadius:"50%", background:C.lightBg, border:`1.5px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                        </div>
                        <span style={{ fontSize:14, color:C.text }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginTop:32, display:"flex", gap:12, alignItems:"center" }}>
                  <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:14, padding:"13px 28px", display:"inline-flex", alignItems:"center", gap:8 }}>
                    Book {s.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                  <button onClick={()=>navigate("/contact")} style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.bodyMuted, fontFamily:"inherit", fontWeight:600, cursor:"pointer", borderRadius:6, fontSize:14, padding:"12px 22px" }}>
                    Get a quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots opacity={0.07}/>
        <div style={{ maxWidth:1160, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:40, fontWeight:800, color:"#fff", letterSpacing:"-1px", marginBottom:12 }}>Not sure which service you need?</h2>
          <p style={{ fontSize:16, color:C.muted, marginBottom:32, maxWidth:440, margin:"0 auto 32px" }}>Give us a call or send a message — we'll figure it out together and get you booked fast.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center" }}>
            <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:15, padding:"14px 32px" }}>Book a service</button>
            <button onClick={()=>navigate("/contact")} style={{ background:"transparent", border:"2px solid rgba(255,255,255,0.25)", color:"#fff", fontFamily:"inherit", fontWeight:600, cursor:"pointer", borderRadius:6, fontSize:15, padding:"13px 32px" }}>Contact us</button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </div>
  );
}
