// src/components/PaymentDialog.js
import { useState } from "react";
import { chargeCard, TEST_CARDS } from "../services/payments";

export default function PaymentDialog({ open, amount, onClose, onSuccess }) {
  const [form, setForm] = useState({ number:"", exp:"", cvc:"" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (!open) return null;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const pay = async () => {
    setErr(""); setBusy(true);
    try{
      const res = await chargeCard({ ...form, amount });
      onSuccess(res); // {ok, transactionId, code}
    }catch(e){
      setErr(e.code || "PAYMENT_FAILED");
    }finally{
      setBusy(false);
    }
  };

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div style={styles.sheet} onClick={(e)=>e.stopPropagation()}>
        <h2 style={{marginTop:0}}>Payment</h2>
        <p style={{color:"#666"}}>Amount to pay: <b>Rs. {amount.toLocaleString()}</b></p>

        <div style={{display:"grid", gap:10, marginTop:10}}>
          <Field label="Card number" placeholder="4111 1111 1111 1111" value={form.number} onChange={set("number")} />
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10}}>
            <Field label="Expiry (MM/YY)" placeholder="12/29" value={form.exp} onChange={set("exp")} />
            <Field label="CVC" placeholder="123" value={form.cvc} onChange={set("cvc")} />
          </div>
        </div>

        {err && <p style={{color:"#b00020", marginTop:8}}>Payment error: {err}</p>}

        <div style={{display:"flex", gap:10, marginTop:12}}>
          <button className="btn light" onClick={onClose}>Cancel</button>
          <button className="btn dark" onClick={pay} disabled={busy}>
            {busy ? "Processing..." : "Pay now"}
          </button>
        </div>

        <div style={{marginTop:14}}>
          <small style={{color:"#666"}}>Test cards:</small>
          <ul style={{margin:"6px 0 0 16px", color:"#555"}}>
            {TEST_CARDS.map((c,i)=><li key={i}><code>{c.number}</code> — {c.label}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({label, ...rest}){
  return (
    <label style={{display:"grid", gap:6}}>
      <span style={{fontWeight:600}}>{label}</span>
      <input {...rest} style={{padding:10, border:"1px solid #ddd", borderRadius:10}} />
    </label>
  );
}

const styles = {
  backdrop:{
    position:"fixed", inset:0, background:"rgba(0,0,0,.45)",
    display:"grid", placeItems:"center", zIndex:50
  },
  sheet:{
    width:"min(520px, 92vw)", background:"#fff", borderRadius:14, padding:16,
    boxShadow:"0 8px 40px rgba(0,0,0,.25)"
  }
};
