import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const C = {
  darkBg:"#0A1A0D", deepDark:"#060F08", primary:"#2A9D5C",
  lightBg:"#F3FBF6", sectionBg:"#F6FBF7", greenText:"#4CAF82",
  muted:"#7A9A85", gold:"#F4C430", border:"#E2F0E7",
  text:"#0A1A0D", bodyMuted:"#6B7280", footerTxt:"#3A5A42",
};

const SERVICES = ["Cleaning","Lawn & Landscaping","Moving Help","Furniture Assembly","Junk Removal","Not sure yet"];

const Dots = ({ opacity=0.08 }) => (
  <div style={{ position:"absolute", inset:0, pointerEvents:"none",
    backgroundImage:`radial-gradient(circle,rgba(42,157,92,${opacity}) 1px,transparent 1px)`,
    backgroundSize:"28px 28px" }}/>
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
        <a key={l} onClick={()=>navigate(p)} style={{ fontSize:14, color: p==="/contact" ? "#fff" : "#94A3A0", fontWeight: p==="/contact" ? 700 : 500, cursor:"pointer", textDecoration:"none" }}>{l}</a>
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
        <div><div style={{ marginBottom:14 }}><Logo/></div><p style={{ fontSize:13, color:C.footerTxt, lineHeight:1.8, maxWidth:220 }}>Locally owned home services cleaning, landscaping, moving, assembly & junk removal.</p></div>
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

const inputStyle = {
  width:"100%", border:`1.5px solid ${C.border}`, borderRadius:10,
  padding:"12px 14px", fontSize:14, fontWeight:500, color:C.text,
  outline:"none", fontFamily:"inherit", background:"#fff",
};

export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", message:"" });
  const [sent, setSent] = useState(false);

  const update = (k,v) => setForm(p=>({...p,[k]:v}));

  const handleSubmit = async () => {
   
   const {error} = await supabase.from("messages").insert({
      name:        form.name,
      email:       form.email,
      messageText: form.message,
      topic:       form.service,
   })

  if (error) {
    console.error("Message error:", error)
    alert("Something went wrong. Please try again.")
    return
  }

    setSent(true);
  };

  return (
    <div style={{ fontFamily:"system-ui,-apple-system,sans-serif", color:C.text, background:"#fff" }}>
      <Nav navigate={navigate}/>

      {/* Hero */}
      <section style={{ background:C.darkBg, padding:"72px 48px 56px", position:"relative", overflow:"hidden" }}>
        <Dots/>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:12 }}>GET IN TOUCH</div>
          <h1 style={{ fontSize:50, fontWeight:800, color:"#fff", letterSpacing:"-1.5px", lineHeight:1.06, marginBottom:16 }}>
            We'd love to hear from you.
          </h1>
          <p style={{ fontSize:16, color:C.muted, lineHeight:1.75, maxWidth:480 }}>
            Have a question, need a custom quote, or just want to talk through what you need? Fill out the form or call us directly we respond fast.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ background:"#fff", padding:"64px 48px 80px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:64, alignItems:"start" }}>

          {/* Left: contact info */}
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:C.primary, letterSpacing:"1px", marginBottom:20 }}>CONTACT INFO</div>

            {[
              { icon:(
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a2 2 0 011.72-2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 7.91A16 16 0 0016.09 17.9l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                ), label:"Phone", value:"(502) 536-5571", sub:"Call or text anytime" },
              { icon:(
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                ), label:"Email", value:"hello@teagueinc.com", sub:"We reply within 2 hours" },
              { icon:(
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ), label:"Service area", value:"Louisville, KY & surrounding areas", sub:"Jeffersontown, St. Matthews, Okolona & more" },
              { icon:(
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                ), label:"Hours", value:"Monday – Saturday, 7am – 7pm", sub:"Sunday by appointment" },
            ].map(({icon,label,value,sub})=>(
              <div key={label} style={{ display:"flex", gap:16, alignItems:"flex-start", padding:"18px 0", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:44, height:44, border:`1.5px solid ${C.border}`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, background:C.lightBg }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#9CA3AF", letterSpacing:"0.5px", marginBottom:3 }}>{label.toUpperCase()}</div>
                  <div style={{ fontSize:15, fontWeight:700, color:C.text, marginBottom:2 }}>{value}</div>
                  <div style={{ fontSize:13, color:C.bodyMuted }}>{sub}</div>
                </div>
              </div>
            ))}

            {/* Quick book nudge */}
            <div style={{ background:C.lightBg, border:`1.5px solid ${C.border}`, borderRadius:14, padding:24, marginTop:28 }}>
              <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:8 }}>Ready to book directly?</div>
              <p style={{ fontSize:13, color:C.bodyMuted, lineHeight:1.65, marginBottom:16 }}>Skip the message book online and we'll confirm within 1 hour.</p>
              <button onClick={()=>navigate("/book")} style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:6, fontSize:14, padding:"12px 22px", display:"inline-flex", alignItems:"center", gap:8 }}>
                Book a service
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>

          {/* Right: form */}
          <div style={{ background:"#fff", border:`1.5px solid ${C.border}`, borderRadius:16, padding:36 }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:64, height:64, background:C.primary, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <h3 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:8 }}>Message sent!</h3>
                <p style={{ fontSize:15, color:C.bodyMuted, lineHeight:1.65, maxWidth:300, margin:"0 auto 24px" }}>We'll get back to you within 2 hours. Check your email for a confirmation.</p>
                <button onClick={()=>setSent(false)} style={{ background:"transparent", border:`1.5px solid ${C.border}`, color:C.bodyMuted, fontFamily:"inherit", fontWeight:600, cursor:"pointer", borderRadius:6, fontSize:14, padding:"10px 22px" }}>Send another message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize:22, fontWeight:800, color:C.text, marginBottom:6 }}>Send us a message</h2>
                <p style={{ fontSize:14, color:C.bodyMuted, marginBottom:28 }}>We'll reply within 2 hours during business hours.</p>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div>
                      <label style={{ fontSize:13, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Full name</label>
                      <input style={inputStyle} placeholder="John Smith" value={form.name} onChange={e=>update("name",e.target.value)}/>
                    </div>
                    <div>
                      <label style={{ fontSize:13, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Phone number</label>
                      <input style={inputStyle} placeholder="(502) 555-0123" value={form.phone} onChange={e=>update("phone",e.target.value)}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Email address</label>
                    <input style={inputStyle} type="email" placeholder="john@email.com" value={form.email} onChange={e=>update("email",e.target.value)}/>
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Service interested in</label>
                    <select style={inputStyle} value={form.service} onChange={e=>update("service",e.target.value)}>
                      <option value="">Select a service...</option>
                      {SERVICES.map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:700, color:C.text, display:"block", marginBottom:6 }}>Message</label>
                    <textarea
                      style={{ ...inputStyle, resize:"none" }}
                      rows={4}
                      placeholder="Tell us what you need, when, and any other details..."
                      value={form.message}
                      onChange={e=>update("message",e.target.value)}
                    />
                  </div>
                  <div style={{ background:C.lightBg, borderRadius:10, padding:"12px 16px", display:"flex", gap:10, alignItems:"center" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2.2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span style={{ fontSize:12, color:"#1A6636", fontWeight:600 }}>Your info is private and never shared with third parties.</span>
                  </div>
                  <button
                    onClick={handleSubmit}
                    style={{ background:C.primary, color:"#fff", border:"none", fontFamily:"inherit", fontWeight:700, cursor:"pointer", borderRadius:10, fontSize:15, padding:"15px", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
                  >
                    Send message
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </div>
  );
}
