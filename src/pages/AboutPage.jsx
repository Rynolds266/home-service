import { useNavigate } from "react-router-dom";

const C = {
  darkBg:"#0A1A0D", deepDark:"#060F08", primary:"#2A9D5C",
  lightBg:"#F3FBF6", sectionBg:"#F6FBF7", greenText:"#4CAF82",
  muted:"#7A9A85", gold:"#F4C430", border:"#E2F0E7",
  text:"#0A1A0D", bodyMuted:"#6B7280", footerTxt:"#3A5A42",
};

const TEAM = [
  { init:"AT", name:"Anthony Teague", role:"Founder & Owner", color:"#1e5c30",
    bio:"Anthony started Teague Inc out of a simple belief: home services should be reliable, fairly priced, and done right the first time. Born and raised in Louisville, he's built every client relationship personally." },
  { init:"MJ", name:"Marcus Johnson", role:"Lead Technician", color:"#14532D",
    bio:"Marcus has been with the team since day one. Specializes in furniture assembly, moving, and handyman tasks. Over 500 jobs completed with a perfect rating." },
  { init:"SC", name:"Sarah Chen", role:"Cleaning Specialist", color:"#166534",
    bio:"Sarah leads every cleaning job with a detail-first approach. She's developed our cleaning checklist and trains every new team member personally." },
];

const VALUES = [
  { e:"🤝", t:"Accountability",   d:"We own every job. If something's not right, we fix it — no excuses, no extra charge." },
  { e:"⏱️", t:"Reliability",     d:"We show up on time, every time. You'll get a text when we're on our way." },
  { e:"🏡", t:"Local first",      d:"We're a Louisville business. We reinvest in this community and hire locally." },
  { e:"💬", t:"Communication",    d:"No ghosting. You'll always know the status of your booking and your pro's ETA." },
];

const TIMELINE = [
  { year:"2019", event:"Founded", desc:"Anthony starts the business out of his truck, doing lawn care and moving help on weekends." },
  { year:"2021", event:"Expanded", desc:"Added cleaning and furniture assembly services. Hired first two full-time team members." },
  { year:"2023", event:"200 jobs", desc:"Hit 200 completed jobs and launched online booking. 4.9★ average across all platforms." },
  { year:"2025", event:"Today", desc:"500+ jobs, 5 services, serving all of Louisville and surrounding areas." },
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
        <a key={l} onClick={()=>navigate(p)} style={{ fontSize:14, color: p==="/about" ? "#fff" : "#94A3A0", fontWeight: p==="/about" ? 700 : 500, cursor:"pointer", textDecoration:"none" }}>{l}</a>
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

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily:"system-ui,-apple-system,sans-serif", color:C.text, background:"#fff" }}>
      <Nav navigate={navigate}/>

      {/* Hero */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots/>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center", position:"relative", zIndex:1 }}>
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:12 }}>OUR STORY</div>
            <h1 style={{ fontSize:50, fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.06, marginBottom:20 }}>
              Built on showing up<br/><span style={{ color:C.primary }}>when it matters.</span>
            </h1>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.75, marginBottom:28 }}>
              Anthony-Teague Inc started with one guy, one truck, and a commitment to do home services the right way. No excuses, no no-shows, no surprises. Six years later, that's still the whole story.
            </p>
            <div style={{ display:"flex", gap:28 }}>
              {[["500+","Jobs done"],["4.9★","Rating"],["6yr","In business"]].map(([n,l],i,arr)=>(
                <div key={l} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ textAlign:"center", paddingRight: i<arr.length-1 ? 28 : 0 }}>
                    <div style={{ fontSize:26, fontWeight:800, color:"#fff" }}>{n}</div>
                    <div style={{ fontSize:11, color:C.greenText, fontWeight:600, letterSpacing:"0.5px", marginTop:2 }}>{l}</div>
                  </div>
                  {i<arr.length-1 && <div style={{ width:1, height:32, background:"rgba(255,255,255,0.08)", marginRight:28 }}/>}
                </div>
              ))}
            </div>
          </div>
          {/* Anthony quote card */}
          <div style={{ background:"rgba(42,157,92,0.08)", border:"1px solid rgba(42,157,92,0.2)", borderRadius:16, padding:36 }}>
            <div style={{ fontSize:32, color:C.primary, fontWeight:800, lineHeight:1, marginBottom:20 }}>"</div>
            <p style={{ fontSize:18, color:"#fff", lineHeight:1.7, fontStyle:"italic", marginBottom:28 }}>
              I started this business because I was tired of calling services that never showed up or charged double what they quoted. I built the company I wished existed.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:48, height:48, borderRadius:"50%", background:C.primary, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#fff", flexShrink:0 }}>AT</div>
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff" }}>Anthony Teague</div>
                <div style={{ fontSize:13, color:C.greenText }}>Founder & Owner</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background:C.sectionBg, padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:10 }}>HOW WE OPERATE</div>
          <h2 style={{ fontSize:36, fontWeight:800, color:C.text, letterSpacing:"-1px", marginBottom:40 }}>The values behind every job.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {VALUES.map(({e,t,d})=>(
              <div key={t} style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:14, padding:24, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:C.primary }}/>
                <div style={{ fontSize:32, marginBottom:14 }}>{e}</div>
                <div style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:8 }}>{t}</div>
                <div style={{ fontSize:13, color:C.bodyMuted, lineHeight:1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background:"#fff", padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:10 }}>THE CREW</div>
          <h2 style={{ fontSize:36, fontWeight:800, color:C.text, letterSpacing:"-1px", marginBottom:40 }}>The people at your door.</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {TEAM.map(({init,name,role,color,bio})=>(
              <div key={name} style={{ border:`1.5px solid ${C.border}`, borderRadius:16, overflow:"hidden" }}>
                <div style={{ background:color, padding:"32px 28px 24px", display:"flex", alignItems:"flex-end", gap:16 }}>
                  <div style={{ width:64, height:64, borderRadius:14, background:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, color:"#fff", flexShrink:0 }}>{init}</div>
                  <div>
                    <div style={{ fontSize:18, fontWeight:800, color:"#fff", letterSpacing:"-0.5px" }}>{name}</div>
                    <div style={{ fontSize:13, color:"rgba(255,255,255,0.65)", marginTop:3 }}>{role}</div>
                  </div>
                </div>
                <div style={{ padding:"22px 28px" }}>
                  <p style={{ fontSize:14, color:C.bodyMuted, lineHeight:1.75 }}>{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background:C.darkBg, padding:"72px 48px", position:"relative", overflow:"hidden" }}>
        <Dots opacity={0.06}/>
        <div style={{ maxWidth:860, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:10, textAlign:"center" }}>OUR JOURNEY</div>
          <h2 style={{ fontSize:36, fontWeight:800, color:"#fff", letterSpacing:"-1px", marginBottom:52, textAlign:"center" }}>Six years of showing up.</h2>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", left:119, top:0, bottom:0, width:2, background:"rgba(42,157,92,0.2)" }}/>
            {TIMELINE.map(({year,event,desc},i)=>(
              <div key={year} style={{ display:"flex", gap:32, alignItems:"flex-start", marginBottom: i<TIMELINE.length-1 ? 36 : 0 }}>
                <div style={{ textAlign:"right", minWidth:88, paddingTop:4 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:C.primary, lineHeight:1 }}>{year}</div>
                </div>
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:20, height:20, borderRadius:"50%", background:C.primary, border:`3px solid ${C.darkBg}`, marginTop:3, position:"relative", zIndex:1 }}/>
                </div>
                <div style={{ background:"rgba(42,157,92,0.07)", border:"1px solid rgba(42,157,92,0.15)", borderRadius:12, padding:"16px 20px", flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>{event}</div>
                  <div style={{ fontSize:13, color:C.muted, lineHeight:1.65 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.lightBg, padding:"72px 48px", borderTop:`1.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:32 }}>
          <div>
            <h2 style={{ fontSize:36, fontWeight:800, color:C.text, letterSpacing:"-1px", marginBottom:10 }}>Ready to meet the crew?</h2>
            <p style={{ fontSize:16, color:C.bodyMuted, maxWidth:400, lineHeight:1.65 }}>Book any service and Anthony's team will be at your door — on time, ready to work.</p>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:15, padding:"14px 32px" }}>Book a service →</button>
            <button onClick={()=>navigate("/contact")} style={{ background:"transparent", border:`2px solid ${C.primary}`, color:C.primary, fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:15, padding:"13px 28px" }}>Get in touch</button>
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </div>
  );
}
