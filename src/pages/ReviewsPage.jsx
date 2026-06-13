import { useNavigate } from "react-router-dom";

const C = {
  darkBg:"#0A1A0D", deepDark:"#060F08", primary:"#2A9D5C",
  lightBg:"#F3FBF6", sectionBg:"#F6FBF7", greenText:"#4CAF82",
  muted:"#7A9A85", gold:"#F4C430", border:"#E2F0E7",
  text:"#0A1A0D", bodyMuted:"#6B7280", footerTxt:"#3A5A42",
};

const REVIEWS = [
  { init:"JT", name:"James T.",    svc:"Moving Help",         rating:5, date:"Mar 2025",
    text:"They moved our entire apartment in 3 hours flat. Professional, careful with our furniture, and super friendly. Already booked them again for the new place." },
  { init:"MR", name:"Maria R.",    svc:"Lawn & Landscaping",  rating:5, date:"Feb 2025",
    text:"Our yard looks incredible. They come every two weeks and it's always perfect — edges clean, grass even, no mess left behind. Worth every penny." },
  { init:"DB", name:"David B.",    svc:"Junk Removal",        rating:5, date:"Feb 2025",
    text:"Cleared out a whole garage of old furniture and appliances in one trip. Fast, fair price, and they even swept up after. Highly recommend." },
  { init:"KL", name:"Karen L.",    svc:"Cleaning",            rating:5, date:"Jan 2025",
    text:"Best cleaning service I've used in Louisville. Sarah was on time, thorough, and left the bathrooms absolutely spotless. Booking monthly from now on." },
  { init:"TP", name:"Tom P.",      svc:"Furniture Assembly",  rating:5, date:"Jan 2025",
    text:"Had 3 IKEA pieces to put together. The guy finished all three in under 90 minutes. I would have been at it all weekend. 100% worth it." },
  { init:"AL", name:"Amy L.",      svc:"Moving Help",         rating:5, date:"Dec 2024",
    text:"Used Anthony-Teague to help load a rental truck for a long-distance move. Showed up early, worked hard, and were incredibly careful with everything." },
  { init:"RC", name:"Robert C.",   svc:"Lawn & Landscaping",  rating:5, date:"Dec 2024",
    text:"Hired them for a big fall cleanup. Left the yard looking better than it did in spring. On time, fast, and the price was very fair." },
  { init:"SP", name:"Sarah P.",    svc:"Cleaning",            rating:5, date:"Nov 2024",
    text:"Move-out clean was perfect. My landlord called to say it was the cleanest he'd seen in years. Got my full deposit back. Thank you!" },
  { init:"BW", name:"Brian W.",    svc:"Junk Removal",        rating:4, date:"Nov 2024",
    text:"Removed a broken treadmill and a bunch of old boxes from the basement. Quick and friendly team. Would use again for larger jobs." },
];

const STATS = [
  { n:"4.9★", l:"Average rating" },
  { n:"200+", l:"Reviews total"  },
  { n:"98%",  l:"Would book again" },
  { n:"5yr",  l:"In business"    },
];

const Dots = ({ opacity=0.08 }) => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:`radial-gradient(circle,rgba(42,157,92,${opacity}) 1px,transparent 1px)`,
    backgroundSize:"28px 28px" }}/>
);

const Stars = ({ n }) => (
  <div style={{ display:"flex", gap:2 }}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i<=n?C.gold:"#E5E7EB"} stroke="none">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ))}
  </div>
);

const Logo = () => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <div style={{ width:34, height:34, background:C.primary, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
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
        <a key={l} onClick={()=>navigate(p)} style={{ fontSize:14, color: p==="/reviews" ? "#fff" : "#94A3A0", fontWeight: p==="/reviews" ? 700 : 500, cursor:"pointer", textDecoration:"none" }}>{l}</a>
      ))}
    </div>
    <div style={{ display:"flex", gap:12, alignItems:"center" }}>
      <span style={{ fontSize:14, color:"#fff", fontWeight:600 }}>(502) 536-5571</span>
      <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:14, padding:"10px 20px" }}>Book now</button>
    </div>
  </nav>
);

const Footer = ({ navigate }) => (
  <footer style={{ background:C.deepDark, padding:"44px 48px 24px" }}>
    <div style={{ maxWidth:1160, margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:36 }}>
        <div><div style={{ marginBottom:14 }}><Logo/></div><p style={{ fontSize:13, color:C.footerTxt, lineHeight:1.8, maxWidth:220 }}>Locally owned home services — cleaning, landscaping, moving, assembly & junk removal.</p></div>
        {[["SERVICES",["Cleaning","Lawn & Landscaping","Moving Help","Furniture Assembly","Junk Removal"]],["COMPANY",["About us","How it works","Reviews","Careers"]],["CONTACT",["(502) 536-5571","hello@teagueinc.com","Louisville, KY","Mon–Sat 7am–7pm"]]].map(([h,items])=>(
          <div key={h}><div style={{ fontSize:11, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:16 }}>{h}</div><div style={{ display:"flex", flexDirection:"column", gap:10 }}>{items.map(i=><a key={i} style={{ fontSize:13, color:C.footerTxt, cursor:"pointer" }}>{i}</a>)}</div></div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid #0D200F", paddingTop:20, display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontSize:12, color:"#1E3A22" }}>© 2025 Anthony-Teague Inc. All rights reserved.</span>
        <div style={{ display:"flex", gap:20 }}>{["Privacy","Terms"].map(t=><span key={t} style={{ fontSize:12, color:"#1E3A22", cursor:"pointer" }}>{t}</span>)}</div>
      </div>
    </div>
  </footer>
);

export default function ReviewsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily:"system-ui,-apple-system,sans-serif", color:C.text, background:"#fff" }}>
      <Nav navigate={navigate}/>

      {/* Hero */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots/>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center", position:"relative", zIndex:1 }}>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:12 }}>WHAT CUSTOMERS SAY</div>
            <h1 style={{ fontSize:50, fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.06, marginBottom:20 }}>
              Real jobs.<br/><span style={{ color:C.primary }}>Real reviews.</span>
            </h1>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.75, maxWidth:420 }}>
              Every review here comes from a real Louisville customer. No paid placements, no edited feedback — just what people say after we finish the job.
            </p>
          </div>
          {/* Stats grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {STATS.map(({n,l})=>(
              <div key={l} style={{ background:"rgba(42,157,92,0.08)", border:"1px solid rgba(42,157,92,0.2)", borderRadius:14, padding:"24px 20px", textAlign:"center" }}>
                <div style={{ fontSize:36, fontWeight:800, color:"#fff", letterSpacing:"-1px", lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:12, color:C.greenText, fontWeight:600, letterSpacing:"0.5px", marginTop:6 }}>{l.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rating bar */}
      <section style={{ background:C.lightBg, padding:"32px 48px", borderBottom:`1.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", alignItems:"center", gap:48, flexWrap:"wrap" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:12 }}>
            <div style={{ fontSize:64, fontWeight:800, color:C.text, lineHeight:1 }}>4.9</div>
            <div>
              <Stars n={5}/>
              <div style={{ fontSize:13, color:C.bodyMuted, marginTop:4 }}>out of 5 · 200+ reviews</div>
            </div>
          </div>
          <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8, maxWidth:400 }}>
            {[[5,92],[4,6],[3,2],[2,0],[1,0]].map(([star,pct])=>(
              <div key={star} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:12, color:C.bodyMuted, fontWeight:600, minWidth:12 }}>{star}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={C.gold}><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                <div style={{ flex:1, height:6, background:"#E2F0E7", borderRadius:4, overflow:"hidden" }}>
                  <div style={{ width:`${pct}%`, height:"100%", background:C.primary, borderRadius:4 }}/>
                </div>
                <span style={{ fontSize:12, color:C.bodyMuted, minWidth:28 }}>{pct}%</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {["All","Cleaning","Lawn","Moving","Assembly","Junk Removal"].map((f,i)=>(
              <button key={f} style={{ background: i===0 ? C.primary : "#fff", color: i===0 ? "#fff" : C.bodyMuted, border:`1.5px solid ${i===0 ? C.primary : C.border}`, fontFamily:"inherit", fontWeight:600, cursor:"pointer", borderRadius:100, fontSize:13, padding:"7px 16px" }}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section style={{ background:"#fff", padding:"60px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ columns:3, columnGap:20 }}>
            {REVIEWS.map(({init,name,svc,rating,date,text},i)=>(
              <div key={name} style={{ breakInside:"avoid", marginBottom:20, border:`1.5px solid ${C.border}`, borderRadius:14, padding:22, background: i%5===1 ? C.lightBg : "#fff" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", background:C.darkBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff", flexShrink:0 }}>{init}</div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{name}</div>
                      <div style={{ fontSize:12, color:C.primary, fontWeight:600 }}>{svc}</div>
                    </div>
                  </div>
                  <span style={{ fontSize:11, color:"#9CA3AF", whiteSpace:"nowrap" }}>{date}</span>
                </div>
                <Stars n={rating}/>
                <p style={{ fontSize:14, color:"#374151", lineHeight:1.75, marginTop:10 }}>"{text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots opacity={0.07}/>
        <div style={{ maxWidth:1160, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <h2 style={{ fontSize:40, fontWeight:800, color:"#fff", letterSpacing:"-1px", marginBottom:12 }}>Had a great experience?</h2>
          <p style={{ fontSize:16, color:C.muted, maxWidth:440, margin:"0 auto 32px", lineHeight:1.65 }}>Leave us a Google review — it helps other Louisville homeowners find us and helps our crew grow.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center" }}>
            <button style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:15, padding:"14px 32px" }}>Leave a Google review</button>
            <button onClick={()=>navigate("/book")} style={{ background:"transparent", border:"2px solid rgba(255,255,255,0.25)", color:"#fff", fontFamily:"inherit", fontWeight:600, cursor:"pointer", borderRadius:6, fontSize:15, padding:"13px 32px" }}>Book a service</button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </div>
  );
}
