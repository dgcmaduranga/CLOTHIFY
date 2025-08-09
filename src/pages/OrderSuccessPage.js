import { useParams, Link } from "react-router-dom";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { getOrder } from "../services/orders";
import { useEffect, useState } from "react";

export default function OrderSuccessPage() {
  const { id } = useParams();               // <-- must match :id in route
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function run(){
      if (!id) return;                      // guard: nothing to fetch
      try {
        const data = await getOrder(id);
        if (alive) setOrder(data);
      } finally {
        if (alive) setLoading(false);
      }
    }
    run();
    return () => { alive = false; };
  }, [id]);

  if (loading) return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{ padding: "2rem" }}>
        <h2>Loading order…</h2>
      </div>
      <SiteFooter />
    </>
  );

  if (!order) return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{ padding: "2rem" }}>
        <h2>Order not found.</h2>
        <Link to="/orders" className="btn light" style={{marginTop:10}}>Back to My Orders</Link>
      </div>
      <SiteFooter />
    </>
  );

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{ padding: "2rem" }}>
        <h1>Thank you for your order!</h1>
        <p>Your order ID is: <strong>{id}</strong></p>
        <p>Status: <strong>{order.status || "processing"}</strong></p>

        <h3>Order Summary</h3>
        <ul>
          {order.items?.map((item) => (
            <li key={item.id}>
              {item.title} — {item.qty} × Rs.{item.price.toLocaleString()}
            </li>
          ))}
        </ul>
        <p><strong>Total: Rs.{order.totals?.total?.toLocaleString?.() || order.totals?.total}</strong></p>

        <Link to="/orders" className="btn dark" style={{ marginTop: "1rem" }}>
          Back to My Orders
        </Link>
      </div>
      <SiteFooter />
    </>
  );
}
