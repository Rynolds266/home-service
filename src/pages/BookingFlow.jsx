import { useState } from "react";
import { supabase } from "../lib/supabase";

const SERVICES = [
  { id: "cleaning", icon: "✨", label: "Cleaning", desc: "Standard & deep clean", from: "$35" },
  { id: "lawn", icon: "🌿", label: "Lawn & Landscaping", desc: "Mowing, trimming, design", from: "$45" },
  { id: "moving", icon: "📦", label: "Moving Help", desc: "Local & long-distance", from: "$65" },
  { id: "assembly", icon: "🛋️", label: "Furniture Assembly", desc: "IKEA, Wayfair & more", from: "$45" },
  { id: "junk", icon: "🗑️", label: "Junk Removal", desc: "Haul away anything", from: "$75" },
];

const DAYS = [
  { label: "Mon", date: "Apr 21" },
  { label: "Tue", date: "Apr 22" },
  { label: "Wed", date: "Apr 23" },
  { label: "Thu", date: "Apr 24" },
  { label: "Fri", date: "Apr 25" },
  { label: "Sat", date: "Apr 26" },
];

const SLOTS_AM = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"];
const SLOTS_PM = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const STEP_LABELS = ["Service", "Details", "Schedule", "Your Info", "Confirm"];

const initialState = {
  step: 1,
  service: "cleaning",
  desc: "",
  address: "",
  propertyType: "Single family home",
  urgency: "Flexible (within a week)",
  day: 0,
  slot: "10:00 AM",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function BookingFlow() {
  const [state, setState] = useState(initialState);

  const update = (patch) => setState((prev) => ({ ...prev, ...patch }));

  const confirm = async ()=>{
  console.log("confirm clicked")
  console.log("state:", state)
  
  const selectedDay = DAYS[state.day]
  console.log("selectedDay:", selectedDay)

    const {data , error} = await supabase.from('Bookings').insert({
       service:        state.service,
        name:           state.name,
        email:          state.email,
        telephone:      state.phone,
        address:        state.address,
        description:    state.desc,
        scheduled_date: `${selectedDay.label} ${selectedDay.date}`,
        scheduled_time: state.slot,
        property_type:  state.propertyType,
        urgency:        state.urgency,
        notes:          state.notes,
        status:         "pending",
    })

    console.log("data:", data)
    console.log("error:", error)

    if (error){
        console.error("Booking error:", error)
      alert("Something went wrong. Please try again.")
    
      return
    }
     
     update({ step: 6 })
      
  }


  const next = () => update({ step: state.step + 1 });
  const back = () => update({ step: state.step - 1 });

  const selectedService = SERVICES.find((s) => s.id === state.service);
  const selectedDay = DAYS[state.day];

  // ── Shared styles ──────────────────────────────────────────────
  const btnGreen = {
    background: "#1E7B4B", color: "#fff", border: "none",
    fontFamily: "inherit", fontWeight: 700, cursor: "pointer",
    borderRadius: 10, fontSize: 15, padding: "13px 30px",
  };
  const btnGhost = {
    background: "transparent", border: "1.5px solid #DFF0E6",
    color: "#4A5568", fontFamily: "inherit", fontWeight: 600,
    cursor: "pointer", borderRadius: 10, fontSize: 14, padding: "12px 22px",
  };
  const inputStyle = {
    width: "100%", border: "1.5px solid #DFF0E6", borderRadius: 10,
    padding: "12px 14px", fontSize: 14, fontWeight: 600, color: "#0D1F12",
    outline: "none", fontFamily: "inherit", background: "#fff",
    boxSizing: "border-box",
  };
  const card = {
    background: "#fff", borderRadius: 16, border: "1.5px solid #DFF0E6", padding: 24,
  };

  // ── Step bar ───────────────────────────────────────────────────
  const StepBar = () => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = state.step > n;
        const active = state.step === n;
        return (
          <div key={n} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 13,
                fontWeight: 800, flexShrink: 0,
                background: done || active ? "#1E7B4B" : "#fff",
                color: done || active ? "#fff" : "#9CA3AF",
                border: `2px solid ${done || active ? "#1E7B4B" : "#DFF0E6"}`,
              }}>
                {done ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                ) : n}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, whiteSpace: "nowrap",
                color: active ? "#1E7B4B" : done ? "#9CA3AF" : "#CBD5E1",
              }}>{label}</span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: "0 4px", marginBottom: 18,
                background: done ? "#1E7B4B" : "#DFF0E6",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Sidebar ────────────────────────────────────────────────────
  const Sidebar = () => (
    <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={card}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: 16 }}>
          YOUR BOOKING
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: 12,
          background: "#F0FAF4", borderRadius: 10, marginBottom: 12,
        }}>
          <span style={{ fontSize: 22 }}>{selectedService.icon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1F12" }}>{selectedService.label}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>Starting from {selectedService.from}</div>
          </div>
        </div>

        {state.step >= 3 && state.slot && (
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "#F0FAF4", borderRadius: 8, padding: "10px 12px", marginBottom: 12,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E7B4B" strokeWidth="2.2" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12" }}>
              {selectedDay.label}, {selectedDay.date} · {state.slot}
            </span>
          </div>
        )}

        {state.address && (
          <div style={{ fontSize: 12, color: "#6B7280", marginBottom: 12, display: "flex", gap: 6, alignItems: "flex-start" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E7B4B" strokeWidth="2.2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>{state.address}</span>
          </div>
        )}

        <div style={{ borderTop: "1px solid #F0FAF4", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: "#6B7280" }}>Service fee</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12" }}>$0.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #F0FAF4", paddingTop: 10, marginTop: 4 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0D1F12" }}>Pay after job</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1E7B4B" }}>Est. {selectedService.from}</span>
          </div>
        </div>
      </div>

      <div style={{ ...card, padding: 16 }}>
        {[
          ["🛡️", "Background checked & insured"],
          ["💳", "Pay only after job is done"],
          ["✅", "Satisfaction guarantee"],
        ].map(([icon, text]) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, lastChild: { marginBottom: 0 } }}>
            <span style={{ fontSize: 14 }}>{icon}</span>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 600 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Step 1: Choose service ─────────────────────────────────────
  const Step1 = () => (
    <div style={card}>
      <StepBar />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px", marginBottom: 6 }}>
        What do you need help with?
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        Select the service that best fits your needs.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
        {SERVICES.map((s) => (
          <div key={s.id} onClick={() => update({ service: s.id })} style={{
            border: `2px solid ${state.service === s.id ? "#1E7B4B" : "#DFF0E6"}`,
            borderRadius: 14, padding: 16, cursor: "pointer",
            background: state.service === s.id ? "#F0FAF4" : "#fff",
            transition: "border-color .15s",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1F12", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>{s.desc}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1E7B4B" }}>From {s.from}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={btnGreen} onClick={next}>Continue →</button>
      </div>
    </div>
  );

  // ── Step 2: Job details ────────────────────────────────────────
  const Step2 = () => (
    <div style={card}>
      <StepBar />
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: "#E8F5EE", borderRadius: 100, padding: "6px 14px", marginBottom: 20,
      }}>
        <span style={{ fontSize: 16 }}>{selectedService.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1A6636" }}>{selectedService.label}</span>
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px", marginBottom: 6 }}>
        Tell us about the job
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        The more detail you give, the better we can match you with the right pro.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>
            Describe the job
          </label>
          <textarea
            style={{ ...inputStyle, resize: "none" }}
            rows={3}
            placeholder="e.g. Need front lawn mowed, edges trimmed, and leaves cleared from the back yard..."
            value={state.desc}
            onChange={(e) => update({ desc: e.target.value })}
          />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>
            Service address
          </label>
          <input
            style={inputStyle}
            placeholder="123 Main St, Louisville, KY 40202"
            value={state.address}
            onChange={(e) => update({ address: e.target.value })}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>
              Property type
            </label>
            <select
              style={inputStyle}
              value={state.propertyType}
              onChange={(e) => update({ propertyType: e.target.value })}
            >
              <option>Single family home</option>
              <option>Apartment / Condo</option>
              <option>Townhouse</option>
              <option>Commercial</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>
              Urgency
            </label>
            <select
              style={inputStyle}
              value={state.urgency}
              onChange={(e) => update({ urgency: e.target.value })}
            >
              <option>Flexible (within a week)</option>
              <option>Soon (2–3 days)</option>
              <option>Urgent (today or tomorrow)</option>
              <option>Emergency</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={btnGhost} onClick={back}>← Back</button>
        <button style={btnGreen} onClick={next}>Continue →</button>
      </div>
    </div>
  );

  // ── Step 3: Date & time ────────────────────────────────────────
  const Step3 = () => (
    <div style={card}>
      <StepBar />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px", marginBottom: 6 }}>
        Pick a date & time
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>All times are Eastern Time (ET).</p>

      <p style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", marginBottom: 12 }}>Select a day</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {DAYS.map((d, i) => (
          <div key={i} onClick={() => update({ day: i })} style={{
            border: `1.5px solid ${state.day === i ? "#1E7B4B" : "#DFF0E6"}`,
            borderRadius: 10, padding: "10px 8px", cursor: "pointer",
            fontSize: 12, fontWeight: 700, color: state.day === i ? "#fff" : "#4A5568",
            background: state.day === i ? "#1E7B4B" : "#fff",
            textAlign: "center", minWidth: 52,
          }}>
            <div style={{ fontSize: 11, marginBottom: 2 }}>{d.label}</div>
            <div>{d.date}</div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", marginBottom: 12 }}>Morning</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
        {SLOTS_AM.map((s) => (
          <div key={s} onClick={() => update({ slot: s })} style={{
            border: `1.5px solid ${state.slot === s ? "#1E7B4B" : "#DFF0E6"}`,
            borderRadius: 8, padding: "9px 0", cursor: "pointer",
            fontSize: 13, fontWeight: 700, textAlign: "center",
            background: state.slot === s ? "#1E7B4B" : "#fff",
            color: state.slot === s ? "#fff" : "#0D1F12",
          }}>{s}</div>
        ))}
      </div>

      <p style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", marginBottom: 12 }}>Afternoon</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 24 }}>
        {SLOTS_PM.map((s) => (
          <div key={s} onClick={() => update({ slot: s })} style={{
            border: `1.5px solid ${state.slot === s ? "#1E7B4B" : "#DFF0E6"}`,
            borderRadius: 8, padding: "9px 0", cursor: "pointer",
            fontSize: 13, fontWeight: 700, textAlign: "center",
            background: state.slot === s ? "#1E7B4B" : "#fff",
            color: state.slot === s ? "#fff" : "#0D1F12",
          }}>{s}</div>
        ))}
      </div>

      <div style={{
        background: "#F0FAF4", borderRadius: 10, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10, marginBottom: 24,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E7B4B" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
        </svg>
        <span style={{ fontSize: 13, color: "#1A6636", fontWeight: 600 }}>
          Your pro will arrive within a 1-hour window of your selected time.
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={btnGhost} onClick={back}>← Back</button>
        <button style={btnGreen} onClick={next}>Continue →</button>
      </div>
    </div>
  );

  // ── Step 4: Contact info ───────────────────────────────────────
  const Step4 = () => (
    <div style={card}>
      <StepBar />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px", marginBottom: 6 }}>
        Your details
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>
        We'll use this to confirm your booking and send updates.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>First name</label>
            <input style={inputStyle} placeholder="John"
              value={state.name.split(" ")[0] || ""}
              onChange={(e) => update({ name: `${e.target.value} ${state.name.split(" ")[1] || ""}`.trim() })} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>Last name</label>
            <input style={inputStyle} placeholder="Smith"
              value={state.name.split(" ")[1] || ""}
              onChange={(e) => update({ name: `${state.name.split(" ")[0] || ""} ${e.target.value}`.trim() })} />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>Email address</label>
          <input style={inputStyle} type="email" placeholder="john@email.com"
            value={state.email} onChange={(e) => update({ email: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>Phone number</label>
          <input style={inputStyle} placeholder="(502) 555-0123"
            value={state.phone} onChange={(e) => update({ phone: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", display: "block", marginBottom: 6 }}>
            Additional notes <span style={{ fontWeight: 400, color: "#9CA3AF" }}>(optional)</span>
          </label>
          <textarea style={{ ...inputStyle, resize: "none" }} rows={2}
            placeholder="Gate code, access instructions, anything the pro should know..."
            value={state.notes} onChange={(e) => update({ notes: e.target.value })} />
        </div>
      </div>

      <div style={{
        background: "#E8F5EE", borderRadius: 10, padding: "12px 16px",
        display: "flex", alignItems: "center", gap: 10, marginBottom: 24,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1E7B4B" strokeWidth="2.2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span style={{ fontSize: 12, color: "#1A6636", fontWeight: 600 }}>
          You won't be charged until after the job is complete. 100% satisfaction guaranteed.
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={btnGhost} onClick={back}>← Back</button>
        <button style={btnGreen} onClick={next}>Review booking →</button>
      </div>
    </div>
  );

  // ── Step 5: Review & confirm ───────────────────────────────────
  const Step5 = () => (
    <div style={card}>
      <StepBar />
      <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px", marginBottom: 6 }}>
        Review your booking
      </h2>
      <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 24 }}>Looks good? Hit confirm and we'll lock it in.</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {[
          { label: "Service", value: `${selectedService.icon} ${selectedService.label}` },
          { label: "Address", value: state.address || "—" },
          { label: "Date & time", value: state.slot ? `${selectedDay.label}, ${selectedDay.date} · ${state.slot}` : "—" },
          { label: "Name", value: state.name || "—" },
          { label: "Email", value: state.email || "—" },
          { label: "Phone", value: state.phone || "—" },
          { label: "Notes", value: state.notes || "None" },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            padding: "12px 0", borderBottom: "1px solid #F0FAF4",
          }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF", minWidth: 110 }}>{label}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1F12", textAlign: "right", maxWidth: 280 }}>{value}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button style={btnGhost} onClick={back}>← Edit</button>
        <button style={{ ...btnGreen, background: "#1E7B4B", padding: "14px 36px", fontSize: 16 }}
          onClick={confirm}>
          Confirm booking ✓
        </button>
      </div>
    </div>
  );

  // ── Step 6: Confirmation ───────────────────────────────────────
  const Confirmation = () => (
    <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%", background: "#1E7B4B",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
        }}>
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0D1F12", letterSpacing: "-1px", marginBottom: 8 }}>
          Booking confirmed!
        </h2>
        <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.6, marginBottom: 32 }}>
          You'll receive a confirmation text and email shortly.
        </p>

        <div style={{ ...card, textAlign: "left", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.5px", marginBottom: 16 }}>
            BOOKING SUMMARY
          </div>
          {[
            ["Service", `${selectedService.icon} ${selectedService.label}`],
            ["Date & time", `${selectedDay.label}, ${selectedDay.date} · ${state.slot}`],
            ["Address", state.address || "—"],
            ["Name", state.name || "—"],
          ].map(([label, value]) => (
            <div key={label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #F0FAF4",
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF" }}>{label}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0D1F12" }}>{value}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#9CA3AF" }}>Booking ID</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#0D1F12", fontFamily: "monospace" }}>
              #TI-{Math.floor(Math.random() * 9000) + 1000}
            </span>
          </div>
        </div>

        {/* Status tracker */}
        <div style={{ ...card, textAlign: "left", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#0D1F12", marginBottom: 16 }}>What happens next</div>
          {[
            { done: true, label: "Booking received", sub: "Just now" },
            { done: true, label: "Team notified", sub: "Anthony Teague's crew is reviewing" },
            { done: false, label: "Confirmation call", sub: "We'll call to confirm within 1 hour" },
            { done: false, label: "Job day", sub: `${selectedDay.label}, ${selectedDay.date} at ${state.slot}` },
          ].map(({ done, label, sub }, i, arr) => (
            <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  background: done ? "#1E7B4B" : "#F0FAF4",
                  border: done ? "none" : "2px solid #DFF0E6",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {done ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  ) : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C5E8D2" }} />}
                </div>
                {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: "#DFF0E6", minHeight: 20, marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: done ? "#0D1F12" : "#9CA3AF" }}>{label}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 1 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={btnGreen} onClick={() => setState(initialState)}>Book another service</button>
          <button style={{ ...btnGhost, border: "2px solid #1E7B4B", color: "#1E7B4B" }}>View my bookings</button>
        </div>
      </div>
    </div>
  );

  // ── Layout ─────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", color: "#0D1F12", background: "#F0FAF4", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{
        background: "#fff", borderBottom: "1px solid #DFF0E6",
        padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1E7B4B" />
            <path d="M6 16L16 7L26 16V26H20V20H12V26H6V16Z" fill="white" />
          </svg>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#0D1F12", letterSpacing: "-0.5px" }}>
            Anthony-Teague Inc
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E7B4B" strokeWidth="2.2" strokeLinecap="round">
            <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1E7B4B" }}>Secure booking</span>
        </div>
      </nav>

      {/* Page header */}
      <div style={{ background: "#1E7B4B", padding: "28px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#A7D5B8", letterSpacing: "0.5px", marginBottom: 4 }}>
            Louisville, KY
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 4 }}>
            Book a service
          </h1>
          <p style={{ fontSize: 15, color: "#A7D5B8" }}>
            Takes under 2 minutes. We'll confirm within 1 hour.
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div style={{
        maxWidth: 1100, margin: "0 auto", padding: "32px 40px 80px",
        display: state.step === 6 ? "block" : "grid",
        gridTemplateColumns: "1fr 320px",
        gap: 28,
        alignItems: "start",
      }}>
        {state.step === 1 && <Step1 />}
        {state.step === 2 && <Step2 />}
        {state.step === 3 && <Step3 />}
        {state.step === 4 && <Step4 />}
        {state.step === 5 && <Step5 />}
        {state.step === 6 && <Confirmation />}
        {state.step < 6 && <Sidebar />}
      </div>
    </div>
  );
}
