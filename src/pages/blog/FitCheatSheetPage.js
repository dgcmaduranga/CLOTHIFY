import { Link } from "react-router-dom";
import TopBars from "../../components/TopBars";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";

export default function FitCheatSheetPage() {
  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:820}}>
        <img src="/blog/fit.jpg" alt="" style={{width:"100%", borderRadius:12, marginBottom:16}} />
        <h1>The fit cheat sheet</h1>
        <p style={{color:"#666", margin:"6px 0 14px"}}>5/30/2025 · Violet Tailors</p>

        <p>Fit is 80% of style. Look for clean lines and comfort in motion.</p>
        <p>Shoulders should sit at the bone. Pants skim the shoe. Sleeves show
          0.5–1 cm of shirt cuff under a blazer.</p>

        <div style={{marginTop:18}}>
          <Link to="/blog" className="btn light">← Back to blog</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
