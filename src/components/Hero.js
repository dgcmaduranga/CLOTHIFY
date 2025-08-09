import { Link } from "react-router-dom";
import hero from "../images/hero.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <img src={hero} alt="" className="hero-bg" />
      <div className="hero-shade" />
      <div className="hero-content">
        <h1>Lookbook 2025</h1>
        <p>Clean silhouettes. Premium fabrics. Weekly drops.</p>

        <div className="hero-actions">
          <Link to="/shop" className="btn dark" aria-label="Shop all products">
            Shop now
          </Link>
          <Link to="/about" className="btn light" aria-label="Learn about our brand">
            See more
          </Link>
        </div>
      </div>
    </section>
  );
}

