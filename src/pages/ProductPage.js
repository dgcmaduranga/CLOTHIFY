// src/pages/ProductPage.js
import { useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { products } from "../data/products";
import RatingStars from "../components/RatingStars";
import { useCart } from "../contexts/CartContext";

const LS_KEY = "reviews_v1";

export default function ProductPage(){
  const { id } = useParams();
  const { add } = useCart(); // cart add()

  const base = useMemo(() => products.find(x => x.id === id), [id]);

  const [img, setImg]     = useState(base?.images?.[0] || "");
  const [size, setSize]   = useState(base?.sizes?.[0] || "");
  const [color, setColor] = useState(base?.colors?.[0] || "");
  const [avg, setAvg]     = useState(base?.rating || 0);
  const [count, setCount] = useState(base?.reviews || 0);
  const [myRating, setMyRating] = useState(0);
  const [text, setText] = useState("");
  const [justAdded, setJustAdded] = useState(false); // subtle confirmation

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const all = JSON.parse(raw);
    const r = all[id];
    if (r) { setAvg(r.avg); setCount(r.count); }
  }, [id]);

  // if product not found
  if (!base) {
    return <div className="container" style={{ padding: "2rem" }}>Product not found.</div>;
  }

  const submitReview = () => {
    if (!myRating) return;
    const raw = localStorage.getItem(LS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    const current = all[id] || { avg: base.rating || 0, count: base.reviews || 0 };
    const newCount = current.count + 1;
    const newAvg = +(((current.avg * current.count) + myRating) / newCount).toFixed(1);
    all[id] = { avg: newAvg, count: newCount };
    localStorage.setItem(LS_KEY, JSON.stringify(all));
    setAvg(newAvg); setCount(newCount);
    setMyRating(0); setText("");
  };

  // Add to cart (no alert)
  const handleAddToCart = () => {
    if (!size || !color) return; // keep simple guard
    add(base, 1, { size, color }); // variants supported by CartContext
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
        {/* Images */}
        <div>
          <img src={img} alt={base.title} style={{width:"100%", borderRadius:12}} />
          <div style={{display:"flex", gap:8, marginTop:12}}>
            {base.images.map((src, i) => (
              <button key={i} onClick={()=>setImg(src)}
                style={{
                  width:72, height:72, overflow:"hidden", borderRadius:8,
                  border: src===img ? "2px solid #111" : "1px solid #e5e5e5", padding:0, background:"#fff"
                }}>
                <img src={src} alt="" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1>{base.title}</h1>
          <div style={{display:"flex", alignItems:"center", gap:8, margin:"4px 0 10px"}}>
            <RatingStars value={avg} size={18}/>
            <small style={{color:"#777"}}>{avg} · {count} reviews</small>
          </div>
          <div style={{margin:"6px 0 16px", fontSize:18, fontWeight:700}}>
            Rs. {base.price.toLocaleString()}
          </div>

          <div style={{display:"grid", gap:14, maxWidth:360}}>
            <div>
              <label>Size</label>
              <select value={size} onChange={e=>setSize(e.target.value)}
                      style={{width:"100%", padding:10, borderRadius:10, border:"1px solid #ddd"}}>
                {base.sizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label>Color</label>
              <select value={color} onChange={e=>setColor(e.target.value)}
                      style={{width:"100%", padding:10, borderRadius:10, border:"1px solid #ddd"}}>
                {base.colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <button
              className="btn light"
              style={{borderColor:"#111", color:"#111", width:"100%"}}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>

            {justAdded && (
              <div style={{color:"#0a7a2f", fontWeight:600}}>Added to cart ✓</div>
            )}
          </div>

          {/* Review box */}
          <div style={{marginTop:24, paddingTop:16, borderTop:"1px solid #eee", maxWidth:420}}>
            <h3 style={{margin:"0 0 8px"}}>Write a review</h3>
            <RatingStars value={myRating} onChange={setMyRating} size={22}/>
            <textarea value={text} onChange={e=>setText(e.target.value)}
              rows={3} placeholder="Tell us about the fit, fabric, etc."
              style={{width:"100%", marginTop:10, padding:10, borderRadius:10, border:"1px solid #ddd"}}/>
            <button onClick={submitReview}
              className="btn light" style={{borderColor:"#111", color:"#111", marginTop:10}}>
              Submit review
            </button>
            <p style={{color:"#666", marginTop:8}}>This updates locally. We’ll sync to Firebase later.</p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
