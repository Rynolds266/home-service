import { useNavigate } from "react-router-dom";

// ── Color tokens ─────────────────────────────────────────────
const C = {
  darkBg:    "#0A1A0D",
  deepDark:  "#060F08",
  primary:   "#2A9D5C",
  lightBg:   "#F3FBF6",
  sectionBg: "#F6FBF7",
  greenText: "#4CAF82",
  muted:     "#7A9A85",
  gold:      "#F4C430",
  border:    "#E2F0E7",
  text:      "#0A1A0D",
  bodyMuted: "#6B7280",
  footerTxt: "#3A5A42",
};

// ── Static data ───────────────────────────────────────────────
const SERVICES = [
  { icon:"✨", label:"Cleaning",            desc:"Standard, deep clean, move-in & move-out", from:"$35" },
  { icon:"🌿", label:"Lawn & Landscaping",  desc:"Mowing, trimming, edging, leaf removal",   from:"$45" },
  { icon:"📦", label:"Moving Help",         desc:"Loading, unloading, local hauls",           from:"$65", popular:true },
  { icon:"🛋️", label:"Furniture Assembly", desc:"IKEA, Wayfair, flat-pack anything",         from:"$45" },
  { icon:"🗑️", label:"Junk Removal",       desc:"Haul away furniture, debris, clutter",      from:"$75" },
];

const WHY = [
  { e:"🕐", t:"On time, every time",     d:"We text before we arrive. No guessing, no waiting.",           gold:false },
  { e:"💲", t:"Clear pricing",           d:"You see the price before we start. Zero surprises.",           gold:false },
  { e:"✅", t:"Satisfaction guaranteed", d:"Not happy? We come back and fix it. No debate.",               gold:false },
  { e:"🏆", t:"4.9★ rated",             d:"200+ verified 5-star reviews from real Louisville customers.",  gold:true  },
];

const STEPS = [
  { n:"1", title:"Pick your service", desc:"Choose from 5 services and describe the job.",   filled:true  },
  { n:"2", title:"Schedule it",       desc:"Pick a date and time that works for you.",        filled:true  },
  { n:"3", title:"We confirm",        desc:"Anthony's team confirms within 1 hour.",          filled:false },
  { n:"4", title:"Job done",          desc:"Crew shows up, works, you pay after.",            filled:false },
];

const REVIEWS = [
  { init:"JT", name:"James T.",  svc:"Moving Help",        hl:false,
    text:"They moved our entire apartment in 3 hours flat. Professional, careful with our furniture, and super friendly. Already booked them again." },
  { init:"MR", name:"Maria R.",  svc:"Lawn & Landscaping", hl:true,
    text:"Our yard looks incredible. They come every two weeks and it's always perfect — edges clean, grass even, no mess left behind. Worth every penny." },
  { init:"DB", name:"David B.",  svc:"Junk Removal",       hl:false,
    text:"Cleared out a whole garage of old furniture in one trip. Fast, fair price, and they swept up after. Will definitely use again." },
];

// ── Tiny shared components ────────────────────────────────────
const Dots = ({ opacity = 0.08 }) => (
  <div style={{
    position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:`radial-gradient(circle,rgba(42,157,92,${opacity}) 1px,transparent 1px)`,
    backgroundSize:"28px 28px",
  }}/>
);

const Label = ({ children }) => (
  <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:10 }}>
    {children}
  </div>
);

const BtnGreen = ({ children, onClick, style: sx = {} }) => (
  <button onClick={onClick} style={{
    background:C.primary, color:"#fff", border:"none",
    fontFamily:"inherit", fontWeight:700, cursor:"pointer",
    borderRadius:6, padding:"14px 28px", fontSize:15,
    display:"inline-flex", alignItems:"center", gap:8,
    ...sx,
  }}>{children}</button>
);

const BtnGhost = ({ children, onClick }) => (
  <button onClick={onClick} style={{
    background:"transparent", border:"2px solid rgba(255,255,255,0.25)",
    color:"#fff", fontFamily:"inherit", fontWeight:600,
    cursor:"pointer", borderRadius:6, fontSize:15, padding:"13px 28px",
  }}>{children}</button>
);

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// ── Logo ──────────────────────────────────────────────────────
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

// ── House SVG ─────────────────────────────────────────────────
const House = () => (
  <svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg" style={{ width:"100%", maxWidth:520, display:"block" }}>
    <defs>
      <linearGradient id="lp-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#0d2818"/>
        <stop offset="100%" stopColor="#1a4a2e"/>
      </linearGradient>
      <linearGradient id="lp-grass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"   stopColor="#2A9D5C"/>
        <stop offset="100%" stopColor="#1e7b45"/>
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="520" height="300" fill="url(#lp-sky)"/>
    {/* Stars */}
    {[[60,40,1.5,.6],[130,25,1,.4],[200,55,1.5,.5],[380,30,1,.6],[480,20,1,.5],[310,15,1.5,.3]].map(([cx,cy,r,o],i)=>(
      <circle key={i} cx={cx} cy={cy} r={r} fill="#fff" opacity={o}/>
    ))}
    {/* Moon */}
    <circle cx="430" cy="55" r="28" fill="#1a4a2e"/>
    <circle cx="415" cy="48" r="24" fill={C.gold} opacity="0.9"/>
    {/* Ground */}
    <rect x="0" y="298" width="520" height="122" fill="url(#lp-grass)"/>
    <ellipse cx="260" cy="298" rx="260" ry="8" fill="#34B870" opacity="0.4"/>
    {/* Driveway */}
    <polygon points="215,420 305,420 288,298 232,298" fill="#0d2818" opacity="0.4"/>
    {/* House body */}
    <rect x="100" y="165" width="320" height="155" fill="#F8F9F7" rx="2"/>
    {/* Roof */}
    <polygon points="80,172 260,70 440,172" fill={C.darkBg}/>
    <line x1="80" y1="172" x2="440" y2="172" stroke="#1a3020" strokeWidth="4"/>
    {/* Chimney */}
    <rect x="308" y="90" width="30" height="78" fill="#1a3020"/>
    <rect x="303" y="84" width="40" height="10" fill={C.darkBg} rx="2"/>
    <circle cx="323" cy="70" r="10" fill={C.greenText} opacity="0.2"/>
    <circle cx="330" cy="55" r="7"  fill={C.greenText} opacity="0.13"/>
    <circle cx="320" cy="43" r="5"  fill={C.greenText} opacity="0.08"/>
    {/* Garage */}
    <rect x="100" y="215" width="108" height="105" fill="#EAECEA"/>
    {[235,255,275].map(y=><line key={y} x1="100" y1={y} x2="208" y2={y} stroke="#C8CCC8" strokeWidth="1"/>)}
    <line x1="154" y1="215" x2="154" y2="320" stroke="#C8CCC8" strokeWidth="1"/>
    {/* Front door */}
    <rect x="225" y="220" width="70" height="100" fill={C.primary} rx="2"/>
    <rect x="233" y="228" width="23" height="32" fill="#1e7b45" rx="2"/>
    <rect x="264" y="228" width="23" height="32" fill="#1e7b45" rx="2"/>
    <rect x="233" y="268" width="23" height="26" fill="#1e7b45" rx="2"/>
    <rect x="264" y="268" width="23" height="26" fill="#1e7b45" rx="2"/>
    <circle cx="289" cy="272" r="5" fill={C.gold}/>
    <path d="M225,222 Q260,205 295,222" fill="#1a7040"/>
    {/* Windows left */}
    <rect x="122" y="175" width="74" height="52" fill="#B8E8CC" rx="3" stroke="#C8CCC8" strokeWidth="1.5"/>
    <line x1="159" y1="175" x2="159" y2="227" stroke="#C8CCC8" strokeWidth="1.5"/>
    <line x1="122" y1="201" x2="196" y2="201" stroke="#C8CCC8" strokeWidth="1.5"/>
    <rect x="118" y="225" width="82" height="6" fill="#D0D4D0" rx="1"/>
    {/* Windows right */}
    <rect x="324" y="175" width="74" height="52" fill="#B8E8CC" rx="3" stroke="#C8CCC8" strokeWidth="1.5"/>
    <line x1="361" y1="175" x2="361" y2="227" stroke="#C8CCC8" strokeWidth="1.5"/>
    <line x1="324" y1="201" x2="398" y2="201" stroke="#C8CCC8" strokeWidth="1.5"/>
    <rect x="320" y="225" width="82" height="6" fill="#D0D4D0" rx="1"/>
    {/* Attic window */}
    <rect x="236" y="110" width="48" height="38" fill="#B8E8CC" rx="3" stroke={C.primary} strokeWidth="1.5"/>
    <line x1="260" y1="110" x2="260" y2="148" stroke="#C8CCC8" strokeWidth="1.5"/>
    <line x1="236" y1="129" x2="284" y2="129" stroke="#C8CCC8" strokeWidth="1.5"/>
    {/* Left tree */}
    <rect x="46" y="200" width="13" height="102" rx="3" fill="#3D2B1A"/>
    <ellipse cx="52" cy="185" rx="30" ry="26" fill="#1e7b45"/>
    <ellipse cx="34" cy="200" rx="22" ry="19" fill={C.primary}/>
    <ellipse cx="70" cy="198" rx="20" ry="18" fill="#1e7b45"/>
    {/* Right tree */}
    <rect x="458" y="215" width="12" height="86" rx="3" fill="#3D2B1A"/>
    <ellipse cx="464" cy="200" rx="28" ry="24" fill={C.primary}/>
    <ellipse cx="447" cy="212" rx="20" ry="17" fill="#1e7b45"/>
    <ellipse cx="480" cy="210" rx="18" ry="16" fill={C.primary}/>
    {/* Left bushes + flowers */}
    <ellipse cx="175" cy="298" rx="28" ry="17" fill={C.primary}/>
    <ellipse cx="200" cy="296" rx="22" ry="16" fill="#1e7b45"/>
    <ellipse cx="152" cy="300" rx="20" ry="14" fill="#34B870"/>
    <circle cx="196" cy="285" r="5" fill={C.gold}/>
    <circle cx="174" cy="288" r="4" fill={C.gold}/>
    {/* Right bushes + flowers */}
    <ellipse cx="340" cy="298" rx="26" ry="16" fill={C.primary}/>
    <ellipse cx="362" cy="296" rx="20" ry="15" fill="#1e7b45"/>
    <ellipse cx="320" cy="300" rx="18" ry="13" fill="#34B870"/>
    <circle cx="346" cy="285" r="5" fill={C.gold}/>
    <circle cx="365" cy="290" r="4" fill={C.gold}/>
    {/* Teague van */}
    <rect x="20" y="270" width="72" height="38" fill={C.darkBg} rx="4"/>
    <rect x="20" y="258" width="42" height="20" fill={C.darkBg} rx="4"/>
    <circle cx="33" cy="310" r="10" fill="#2A2A2A" stroke="#444" strokeWidth="2"/>
    <circle cx="72" cy="310" r="10" fill="#2A2A2A" stroke="#444" strokeWidth="2"/>
    <rect x="54" y="270" width="3" height="38" fill={C.primary} opacity="0.5"/>
    <text x="24" y="292" fontFamily="system-ui" fontSize="8" fontWeight="700" fill={C.primary}>TEAGUE</text>
    {/* Path */}
    <polygon points="238,420 282,420 272,300 248,300" fill="#C8CCC8" opacity="0.4"/>
  </svg>
);

// ════════════════════════════════════════════════════════════════
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily:"system-ui,-apple-system,sans-serif", color:C.text, background:"#fff" }}>

      {/* NAV */}
      <nav style={{
        background:C.darkBg, padding:"0 48px", height:64,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:100,
      }}>
        <Logo/>
        <div style={{ display:"flex", gap:32 }}>

          {[  ["Services", "/services"],
              ["About",    "/about"],
              ["Reviews",  "/reviews"],
              ["Contact",  "/contact"],
                    
        
        ].map(([l,path])=>(
            <a key={l} onClick={()=>navigate(path)} style={{ fontSize:14, color:"#94A3A0", fontWeight:500, cursor:"pointer", textDecoration:"none" }}>{l}</a>
          ))}
        </div>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:14, color:"#fff", fontWeight:600, cursor:"pointer" }}>(502) 536-5571</span>
          <BtnGreen onClick={()=>navigate("/book")} sx={{ padding:"10px 20px", fontSize:14 }}>Book now</BtnGreen>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background:C.darkBg, padding:"80px 48px 0", overflow:"hidden", position:"relative" }}>
        <Dots/>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"end", position:"relative", zIndex:1 }}>

          {/* Left */}
          <div style={{ paddingBottom:80 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, border:"1px solid rgba(42,157,92,0.4)", borderRadius:4, padding:"6px 14px", marginBottom:28 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:C.primary }}/>
              <span style={{ fontSize:12, color:C.greenText, fontWeight:600, letterSpacing:"0.5px" }}>LOCALLY OWNED · LOUISVILLE, KY</span>
            </div>

            <h1 style={{ fontSize:60, fontWeight:800, color:"#fff", lineHeight:1.04, letterSpacing:"-2px", marginBottom:22 }}>
              We handle the<br/>jobs you<br/>
              <span style={{ color:C.primary }}>don't want to.</span>
            </h1>

            <p style={{ fontSize:17, color:C.muted, lineHeight:1.7, marginBottom:40, maxWidth:440 }}>
              Cleaning, landscaping, junk removal, moving, and furniture assembly — done right, on time, guaranteed. Serving Louisville and surrounding areas.
            </p>

            <div style={{ display:"flex", gap:14, alignItems:"center", marginBottom:44 }}>
              <BtnGreen onClick={()=>navigate("/book")} style={{ fontSize:16, padding:"16px 32px" }}>
                Book a service <Arrow/>
              </BtnGreen>
              <BtnGhost onClick={()=>navigate("/book")}>Get a free quote</BtnGhost>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", alignItems:"center", paddingTop:28, borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              {[["500+","JOBS DONE"],["4.9★","AVG RATING"],["5yr","IN BUSINESS"]].map(([n,l],i,arr)=>(
                <div key={l} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ textAlign:"center", paddingRight:28 }}>
                    <div style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:11, color:C.greenText, fontWeight:600, letterSpacing:"0.5px", marginTop:3 }}>{l}</div>
                  </div>
                  {i < arr.length-1 && <div style={{ width:1, height:36, background:"rgba(255,255,255,0.08)", marginRight:28 }}/>}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div style={{ position:"relative", display:"flex", justifyContent:"center" }}>

            <img
               src="/src/images/home-Hero.jpg"
               alt="crew at work"
               style={{
                   width:"100%",
                   maxWidth:520,
                   height:420,
                   objectFit:"cover",
                   borderRadius:"16px 16px 0 0",
                   display:"block",
               }}
            />
            
            
            
            

            {/* Floating: next slot */}
            <div style={{ position:"absolute", bottom:40, left:-20, background:"#fff", borderRadius:12, border:`1px solid ${C.border}`, padding:"14px 18px", width:200 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"#9CA3AF", letterSpacing:"0.5px", marginBottom:8 }}>NEXT AVAILABLE</div>
              <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:2 }}>Today · 2:00 PM</div>
              <div style={{ fontSize:12, color:C.primary, fontWeight:600, marginBottom:10 }}>Lawn & Landscaping</div>
              <button onClick={()=>navigate("/book")} style={{ width:"100%", background:C.primary, border:"none", borderRadius:6, padding:8, cursor:"pointer" }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#fff" }}>Book this slot →</span>
              </button>
            </div>

            {/* Floating: rating */}
            <div style={{ position:"absolute", top:24, right:-10, background:C.darkBg, borderRadius:12, border:"1px solid rgba(42,157,92,0.3)", padding:"12px 18px", textAlign:"center" }}>
              <div style={{ fontSize:11, color:C.greenText, fontWeight:600, letterSpacing:"0.5px", marginBottom:4 }}>RATED</div>
              <div style={{ fontSize:28, fontWeight:800, color:"#fff", lineHeight:1 }}>4.9</div>
              <div style={{ color:C.gold, fontSize:12, marginTop:2 }}>★★★★★</div>
              <div style={{ fontSize:10, color:C.greenText, marginTop:3 }}>200+ reviews</div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background:"#fff", padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40 }}>
            <div>
              <Label>WHAT WE DO</Label>
              <h2 style={{ fontSize:38, fontWeight:800, color:C.text, letterSpacing:"-1px", lineHeight:1.1 }}>Five services.<br/>One trusted crew.</h2>
            </div>
            <a style={{ fontSize:14, fontWeight:600, color:C.primary, cursor:"pointer" }}>View all →</a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
            {SERVICES.map(s=>(
              <div key={s.label} onClick={()=>navigate("/book")} style={{
                border:`${s.popular?"2px":"1.5px"} solid ${s.popular?C.primary:C.border}`,
                borderRadius:12, padding:"24px 18px", cursor:"pointer",
                background:s.popular?C.lightBg:"#fff",
                position:"relative", overflow:"hidden",
              }}>
                {!s.popular && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:C.primary }}/>}
                {s.popular && (
                  <div style={{ position:"absolute", top:12, right:12, background:C.primary, color:"#fff", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4 }}>POPULAR</div>
                )}
                <div style={{ fontSize:32, marginBottom:14 }}>{s.icon}</div>
                <div style={{ fontSize:15, fontWeight:800, color:C.text, marginBottom:6 }}>{s.label}</div>
                <div style={{ fontSize:12, color:C.bodyMuted, lineHeight:1.6, marginBottom:14 }}>{s.desc}</div>
                <div style={{ fontSize:13, fontWeight:700, color:C.primary }}>From {s.from}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TEAGUE */}
      <section style={{ background:C.darkBg, padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div>
            <Label>WHY CHOOSE US</Label>
            <h2 style={{ fontSize:38, fontWeight:800, color:"#fff", letterSpacing:"-1px", lineHeight:1.1, marginBottom:20 }}>Louisville's crew<br/>that shows up.</h2>
            <p style={{ fontSize:16, color:C.muted, lineHeight:1.75, marginBottom:36 }}>
              We're not a marketplace. Anthony-Teague Inc is a real local business — same crew, same number, same accountability every single time.
            </p>
            <BtnGreen onClick={()=>navigate("/book")}>Book a service →</BtnGreen>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            {WHY.map(({e,t,d,gold})=>(
              <div key={t} style={{
                background:gold?"rgba(244,196,48,0.08)":"rgba(42,157,92,0.08)",
                border:`1px solid ${gold?"rgba(244,196,48,0.2)":"rgba(42,157,92,0.2)"}`,
                borderRadius:12, padding:22,
              }}>
                <div style={{ fontSize:24, marginBottom:12 }}>{e}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:6 }}>{t}</div>
                <div style={{ fontSize:13, color:C.muted, lineHeight:1.6 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background:C.sectionBg, padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <Label>THE PROCESS</Label>
            <h2 style={{ fontSize:38, fontWeight:800, color:C.text, letterSpacing:"-1px" }}>Booked in under 2 minutes.</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", position:"relative" }}>
            <div style={{ position:"absolute", top:28, left:"12.5%", right:"12.5%", height:2, background:C.border, zIndex:0 }}/>
            {STEPS.map(({n,title,desc,filled})=>(
              <div key={n} style={{ textAlign:"center", padding:"0 24px", position:"relative", zIndex:1 }}>
                <div style={{
                  width:56, height:56, borderRadius:"50%",
                  background:filled?C.primary:"#fff",
                  border:`2px solid ${filled?C.primary:C.border}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  margin:"0 auto 20px", fontSize:20, fontWeight:800,
                  color:filled?"#fff":"#9CA3AF",
                }}>{n}</div>
                <div style={{ fontSize:16, fontWeight:700, color:C.text, marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:13, color:C.bodyMuted, lineHeight:1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={{ background:"#fff", padding:"72px 48px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40 }}>
            <div>
              <Label>REVIEWS</Label>
              <h2 style={{ fontSize:38, fontWeight:800, color:C.text, letterSpacing:"-1px", lineHeight:1.1 }}>Real customers.<br/>Real results.</h2>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:52, fontWeight:800, color:C.text, lineHeight:1 }}>4.9</div>
              <div style={{ color:C.gold, fontSize:18 }}>★★★★★</div>
              <div style={{ fontSize:13, color:"#9CA3AF", marginTop:4 }}>Based on 200+ reviews</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {REVIEWS.map(({init,name,svc,text,hl})=>(
              <div key={name} style={{ border:`1.5px solid ${C.border}`, borderRadius:14, padding:24, background:hl?C.lightBg:"#fff" }}>
                <div style={{ color:C.gold, fontSize:15, marginBottom:14 }}>★★★★★</div>
                <p style={{ fontSize:14, color:"#374151", lineHeight:1.75, marginBottom:20 }}>"{text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:C.darkBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff", flexShrink:0 }}>{init}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:700, color:C.text }}>{name}</div>
                    <div style={{ fontSize:12, color:C.primary, fontWeight:600 }}>{svc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.darkBg, padding:"80px 48px", position:"relative", overflow:"hidden" }}>
        <Dots opacity={0.07}/>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:32, position:"relative", zIndex:1 }}>
          <div>
            <Label>READY TO START?</Label>
            <h2 style={{ fontSize:44, fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.06, marginBottom:12 }}>
              Stop putting it off.<br/>Book today.
            </h2>
            <p style={{ fontSize:16, color:C.muted, maxWidth:400, lineHeight:1.65 }}>
              Same-day slots available. Anthony's crew is ready — just tell us what you need.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"flex-start" }}>
            <BtnGreen onClick={()=>navigate("/book")} style={{ fontSize:16, padding:"16px 36px" }}>
              Book a service now <Arrow/>
            </BtnGreen>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a2 2 0 011.72-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 7.91A16 16 0 0016.09 17.9l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              <span style={{ fontSize:15, color:"#fff", fontWeight:600 }}>(502) 536-5571</span>
              <span style={{ fontSize:13, color:C.greenText }}>· Mon–Sat, 7am–7pm</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:C.deepDark, padding:"44px 48px 24px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:48, marginBottom:36 }}>
            <div>
              <div style={{ marginBottom:14 }}><Logo/></div>
              <p style={{ fontSize:13, color:C.footerTxt, lineHeight:1.8, maxWidth:220 }}>
                Locally owned home services — cleaning, landscaping, moving, assembly & junk removal.
              </p>
            </div>
            {[
              ["SERVICES", ["Cleaning","Lawn & Landscaping","Moving Help","Furniture Assembly","Junk Removal"]],
              ["COMPANY",  ["About us","How it works","Reviews","Careers"]],
              ["CONTACT",  ["(502) 536-5571","hello@teagueinc.com","Louisville, KY","Mon–Sat 7am–7pm"]],
            ].map(([heading, items])=>(
              <div key={heading}>
                <div style={{ fontSize:11, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:16 }}>{heading}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {items.map(item=>(
                    <a key={item} style={{ fontSize:13, color:C.footerTxt, cursor:"pointer" }}>{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #0D200F", paddingTop:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:12, color:"#1E3A22" }}>© 2025 Anthony-Teague Inc. All rights reserved.</span>
            <div style={{ display:"flex", gap:20 }}>
              {["Privacy","Terms"].map(t=>(
                <span key={t} style={{ fontSize:12, color:"#1E3A22", cursor:"pointer" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
