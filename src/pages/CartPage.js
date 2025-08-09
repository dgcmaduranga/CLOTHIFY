// src/pages/CartPage.js
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartPage(){
  const { items, setQty, remove, clear, totals } = useCart();

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24}}>
        <h1>Cart</h1>

        {items.length === 0 ? (
          <p style={{marginTop:12}}>
            Your cart is empty.{" "}
            <Link to="/shop" className="btn light">Go shopping</Link>
          </p>
        ) : (
          <div style={{display:"grid", gridTemplateColumns:"1.6fr .8fr", gap:18}}>
            {/* Items */}
            <div>
              {items.map(it => (
                <div key={it.key}
                  style={{
                    display:"grid",
                    gridTemplateColumns:"80px 1fr 140px 90px",
                    gap:12, alignItems:"center",
                    borderBottom:"1px solid #eee", padding:"12px 0"
                  }}>
                  <img src={it.image} alt=""
                       style={{width:80, height:80, objectFit:"cover", borderRadius:8}} />
                  <div>
                    <div style={{fontWeight:600}}>{it.title}</div>
                    {(it.size || it.color) && (
                      <div style={{color:"#666", fontSize:13, marginTop:2}}>
                        {it.size ? `Size: ${it.size}` : ""}
                        {it.size && it.color ? " · " : ""}
                        {it.color ? `Color: ${it.color}` : ""}
                      </div>
                    )}
                    <div style={{color:"#666"}}>Rs. {it.price.toLocaleString()}</div>
                  </div>

                  <div>
                    <label>Qty</label>
                    <input
                      type="number" min="1" value={it.qty}
                      onChange={e=>setQty(it.key, parseInt(e.target.value || "1",10))}
                      style={{width:72, padding:8, border:"1px solid #ddd", borderRadius:10}}
                    />
                  </div>

                  <button className="btn light" onClick={()=>remove(it.key)}>Remove</button>
                </div>
              ))}

              <button className="btn light" onClick={clear} style={{marginTop:10}}>
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div style={{border:"1px solid #eee", borderRadius:12, padding:16, height:"fit-content"}}>
              <h3>Summary</h3>
              <div style={{display:"grid", gap:6, marginTop:10}}>
                <Row label="Items">{totals.count}</Row>
                <Row label="Subtotal">Rs. {totals.subtotal.toLocaleString()}</Row>
                <Row label="Shipping">{totals.shipping ? `Rs. ${totals.shipping.toLocaleString()}` : "Free"}</Row>
                <hr />
                <Row label={<b>Total</b>}><b>Rs. {totals.total.toLocaleString()}</b></Row>
              </div>

              <Link to="/checkout" className="btn dark"
                    style={{marginTop:12, width:"100%", textAlign:"center"}}>
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
      <SiteFooter />
    </>
  );
}

function Row({label, children}){
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
      <span style={{color:"#666"}}>{label}</span>
      <span>{children}</span>
    </div>
  );
}
