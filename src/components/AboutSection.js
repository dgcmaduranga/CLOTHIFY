import aboutImg from "../images/about.jpg";
import { Link } from "react-router-dom";

export default function AboutSection(){
  return (
    <section className="about">
      <div className="aboutGrid">
        <img src={aboutImg} alt="About us" />
        <div>
          <h2>About our brand</h2>
          <p>Minimal styles. Premium fabrics. Ethical production.</p>
          <ul className="points">
            <li><span className="dot"></span><span>Designed for Men · Women · Kids</span></li>
            <li><span className="dot"></span><span>Free shipping & 14-day returns</span></li>
            <li><span className="dot"></span><span>Recyclable packaging</span></li>
          </ul>
          <div style={{marginTop:14, display:"flex", gap:10}}>
            <Link to="/shop" className="btn light" style={{borderColor:"#0a0a0aff"}}>Shop now</Link>
            <Link to="/contact" className="btn" style={{color:"#111", borderColor:"#111"}}>Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
