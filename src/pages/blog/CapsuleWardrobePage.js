import { Link } from "react-router-dom";
import TopBars from "../../components/TopBars";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";

export default function CapsuleWardrobePage() {
  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:820}}>
        <img src="/blog/capsule.jpg" alt="" style={{width:"100%", borderRadius:12, marginBottom:16}} />
        <h1>How to build a capsule wardrobe</h1>
        <p style={{color:"#666", margin:"6px 0 14px"}}>7/1/2025 · Violet Studio</p>

        <p>A capsule wardrobe focuses on fewer, better pieces that mix and match.
          Start with neutral colors, then layer in 2–3 seasonal highlights.</p>

        <h3 style={{marginTop:16}}>The 12 core pieces</h3>
        <ul>
          <li>2 shirts · white &amp; blue</li>
          <li>1 tee · heavy cotton</li>
          <li>1 blazer · navy</li>
          <li>2 bottoms · denim &amp; tailored</li>
          <li>1 knit · wool or cashmere</li>
          <li>1 coat · trench or parka</li>
          <li>3 shoes · sneakers, boots, loafers</li>
          <li>2 accessories · belt &amp; scarf</li>
        </ul>

        <p>Quality over quantity. Fit over everything.</p>

        <div style={{marginTop:18}}>
          <Link to="/blog" className="btn light">← Back to blog</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
