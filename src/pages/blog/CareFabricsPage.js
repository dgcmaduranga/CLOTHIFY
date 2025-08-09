import { Link } from "react-router-dom";
import TopBars from "../../components/TopBars";
import NavBar from "../../components/NavBar";
import SiteFooter from "../../components/SiteFooter";

export default function CareFabricsPage() {
  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24, maxWidth:820}}>
        <img src="/blog/care.jpg" alt="" style={{width:"100%", borderRadius:12, marginBottom:16}} />
        <h1>Fabric care: make clothes last longer</h1>
        <p style={{color:"#666", margin:"6px 0 14px"}}>6/18/2025 · Violet Care Team</p>

        <p>Wash less, air more. Cold water saves color and fabric life.</p>
        <ul>
          <li><b>Wool:</b> hand wash or gentle cycle; lay flat to dry.</li>
          <li><b>Denim:</b> turn inside out; wash cold; skip the dryer.</li>
          <li><b>Silk:</b> delicate bag; mild detergent; no wringing.</li>
        </ul>
        <p>Always read the care label — it's there for a reason.</p>

        <div style={{marginTop:18}}>
          <Link to="/blog" className="btn light">← Back to blog</Link>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
