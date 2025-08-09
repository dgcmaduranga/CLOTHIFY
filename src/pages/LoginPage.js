import { useState } from "react";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function LoginPage(){
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setBusy(true);
    try{
      await login(email, password);
      nav(redirectTo, { replace:true });
    }catch(e){
      setErr(e.message || "Login failed.");
    }finally{ setBusy(false); }
  };

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:520}}>
        <h1>Log in</h1>
        <form onSubmit={onSubmit} style={{display:"grid", gap:12, marginTop:12}}>
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"
                   style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10}} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"
                   style={{width:"100%", padding:10, border:"1px solid #ddd", borderRadius:10}} />
          </div>

          {err && <p style={{color:"#b00020"}}>{err}</p>}
          <button className="btn dark" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
        </form>

        <p style={{marginTop:10}}>
          New here? <Link to="/register" className="btn light">Create account</Link>
        </p>
      </div>
      <SiteFooter />
    </>
  );
}
