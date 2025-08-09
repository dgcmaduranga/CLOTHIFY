import { useState } from "react";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { addMessage } from "../services/messages";
import { useAuth } from "../contexts/AuthContext";

export default function ContactPage(){
  const { user } = useAuth();
  const [form, setForm] = useState({ name:"", email:"", body:"" });
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState("");

  const set = k => e => setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setOk("");
    try{
      await addMessage({ ...form, userId: user?.uid || null });
      setOk("Message sent. We'll reply within 24h.");
      setForm({ name:"", email:"", body:"" });
    }catch(err){
      alert("Failed to send. Try again.");
      console.error(err);
    }finally{ setBusy(false); }
  };

  return (
    <>
      <TopBars/><NavBar/>
      <div className="container" style={{paddingBlock:24, maxWidth:720}}>
        <h1>Contact</h1>
        <p>Say hello — we usually reply within 24h.</p>

        <form onSubmit={onSubmit} style={{display:"grid", gap:12, marginTop:10}}>
          <input placeholder="Your name" value={form.name} onChange={set("name")}
                 style={{padding:12, border:"1px solid #ddd", borderRadius:10}} />
          <input placeholder="Email" value={form.email} onChange={set("email")}
                 style={{padding:12, border:"1px solid #ddd", borderRadius:10}} />
          <textarea placeholder="Message" value={form.body} onChange={set("body")} rows={6}
                    style={{padding:12, border:"1px solid #ddd", borderRadius:10}} />
          <button className="btn dark" disabled={busy}>{busy ? "Sending…" : "Send"}</button>
        </form>

        {ok && <p style={{color:"#0a7", marginTop:8}}>{ok}</p>}
      </div>
      <SiteFooter/>
    </>
  );
}
