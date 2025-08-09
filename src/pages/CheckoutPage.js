import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { createOrder } from "../services/orders";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PaymentDialog from "../components/PaymentDialog";

const LS_ADDR = "violet_checkout_addr";

export default function CheckoutPage(){
  const { items, totals } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();

  const [addr, setAddr] = useState({ name:"", phone:"", email:"", line1:"", line2:"", city:"", zip:"" });
  const [touched, setTouched] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(LS_ADDR); if (raw) setAddr(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    localStorage.setItem(LS_ADDR, JSON.stringify(addr));
  }, [addr]);

  const missing = () => {
    const req = ["name","phone","line1","city","zip"];
    return req.filter(k => !String(addr[k] || "").trim());
  };

  const startPayment = () => {
    setTouched(true);
    if (items.length === 0 || missing().length) return;
    setPayOpen(true);
  };

  const onPaid = async (payment) => {
    // payment = { ok:true, transactionId, code }
    setPayOpen(false);
    setPlacing(true);
    try{
      const cleanItems = items.map(x => ({ id:x.id, title:x.title, price:x.price, qty:x.qty, image:x.image }));
      const id = await createOrder({
        user,
        address: { ...addr, paymentTxn: payment.transactionId, paymentCode: payment.code },
        items: cleanItems,
        totals
      });
      nav(`/order-success/${id}`);
    }catch(e){
      console.error(e);
      alert("Order could not be saved. Please contact support.");
    }finally{
      setPlacing(false);
    }
  };

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24}}>
        <h1>Checkout</h1>

        {items.length === 0 ? (
          <p style={{marginTop:12}}>
            Your cart is empty.{" "}
            <Link to="/shop" className="btn light">Go shopping</Link>
          </p>
        ) : (
          <div style={{display:"grid", gridTemplateColumns:"1.4fr .9fr", gap:18}}>
            {/* Address form */}
            <div>
              <Section title="Shipping details">
                <Grid cols={2}>
                  <Field label="Full name *"  value={addr.name}  onChange={v=>setAddr({...addr,name:v})}  err={touched && !addr.name}/>
                  <Field label="Phone *"      value={addr.phone} onChange={v=>setAddr({...addr,phone:v})} err={touched && !addr.phone}/>
                </Grid>
                <Field label="Email"   value={addr.email} onChange={v=>setAddr({...addr,email:v})}/>
                <Field label="Address line 1 *" value={addr.line1} onChange={v=>setAddr({...addr,line1:v})} err={touched && !addr.line1}/>
                <Field label="Address line 2"  value={addr.line2} onChange={v=>setAddr({...addr,line2:v})}/>
                <Grid cols={2}>
                  <Field label="City *" value={addr.city} onChange={v=>setAddr({...addr,city:v})} err={touched && !addr.city}/>
                  <Field label="ZIP / Postal *" value={addr.zip} onChange={v=>setAddr({...addr,zip:v})} err={touched && !addr.zip}/>
                </Grid>
              </Section>

              <Section title="Order items">
                {items.map(it => (
                  <div key={it.id} style={{display:"grid", gridTemplateColumns:"72px 1fr 120px", gap:12, alignItems:"center", borderBottom:"1px solid #eee", padding:"10px 0"}}>
                    <img src={it.image} alt="" style={{width:72, height:72, objectFit:"cover", borderRadius:8}} />
                    <div>
                      <div style={{fontWeight:600}}>{it.title}</div>
                      <div style={{color:"#666"}}>Qty {it.qty}</div>
                    </div>
                    <div style={{textAlign:"right"}}>Rs. {(it.qty * it.price).toLocaleString()}</div>
                  </div>
                ))}
              </Section>
            </div>

            {/* Summary */}
            <div style={{border:"1px solid #eee", borderRadius:12, padding:16, height:"fit-content"}}>
              <h3>Summary</h3>
              <Row label="Items">{items.length}</Row>
              <Row label="Subtotal">Rs. {totals.subtotal.toLocaleString()}</Row>
              <Row label="Shipping">{totals.shipping ? `Rs. ${totals.shipping.toLocaleString()}` : "Free"}</Row>
              <hr/>
              <Row label={<b>Total</b>}><b>Rs. {totals.total.toLocaleString()}</b></Row>

              {touched && missing().length ? (
                <p style={{color:"#b00020", marginTop:10}}>Please fill all required fields (marked with *).</p>
              ) : null}

              <button className="btn dark" onClick={startPayment} disabled={placing} style={{marginTop:12, width:"100%"}}>
                {placing ? "Placing…" : "Pay & place order"}
              </button>
            </div>
          </div>
        )}
      </div>

      <PaymentDialog
        open={payOpen}
        amount={totals.total}
        onClose={() => setPayOpen(false)}
        onSuccess={onPaid}
      />

      <SiteFooter />
    </>
  );
}

function Section({title, children}){
  return (
    <section style={{margin:"14px 0 16px"}}>
      <h3 style={{margin:"0 0 10px"}}>{title}</h3>
      {children}
    </section>
  );
}
function Grid({cols=2, children}){
  return <div style={{display:"grid", gridTemplateColumns:`repeat(${cols},1fr)`, gap:12}}>{children}</div>;
}
function Field({label, value, onChange, err, placeholder}){
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width:"100%", padding:10, borderRadius:10,
          border: err ? "1px solid #b00020" : "1px solid #ddd"
        }}
      />
    </div>
  );
}
function Row({label, children}){
  return (
    <div style={{display:"flex", justifyContent:"space-between", marginTop:8}}>
      <span style={{color:"#666"}}>{label}</span>
      <span>{children}</span>
    </div>
  );
}
