import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ p }) {
  const { add } = useCart();

  return (
    <div className="pCard">
      <Link to={`/product/${p.id}`} className="pImgWrap">
        <img src={p.images[0]} alt={p.title} className="img1" />
        <img src={p.images[1] || p.images[0]} alt="" className="img2" />
      </Link>

      <div className="pInfo">
        <Link className="pTitle" to={`/product/${p.id}`}>{p.title}</Link>
        <div className="pPrice">Rs. {p.price.toLocaleString()}</div>

        {p.rating ? (
          <div className="rating" aria-label={`Rating ${p.rating} out of 5`}>
            {"★".repeat(Math.round(p.rating))}{"☆".repeat(5 - Math.round(p.rating))}
          </div>
        ) : null}

        <div style={{display:"flex", gap:8, marginTop:8}}>
          <button className="btn dark" onClick={()=>add(p, 1)}>Add to cart</button>
          <Link to={`/product/${p.id}`} className="btn light">View</Link>
        </div>
      </div>
    </div>
  );
}

