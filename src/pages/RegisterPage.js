import { useState } from "react";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setBusy(true);
    try{
      if (!form.email || !form.password) throw new Error("Email & password required.");
      await register({ name: form.name, email: form.email, password: form.password });
      nav("/"); // go home after register
    }catch(e){
      setErr(e.message || "Failed to register.");
    }finally{ setBusy(false); }
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:520}}>
        <h1>Create account</h1>
        <form onSubmit={onSubmit} style={{display:"grid", gap:12, marginTop:12}}>
          <div>
            <label>Name</label>
            <input value={form.name} onChange={set("name")} placeholder="Full name"
                   style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10}} />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com"
                   style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10}} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={form.password} onChange={set("password")} placeholder="At least 6 characters"
                   style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10}} />
          </div>

          {err && <p style={{color:"#b00020"}}>{err}</p>}

          <button className="btn dark" disabled={busy}>{busy ? "Creating..." : "Create account"}</button>
        </form>

        <p style={{marginTop:10}}>
          Already have an account? <Link to="/login" className="btn light">Log in</Link>
        </p>
      </div>
      <SiteFooter />
    </>
  );
}
