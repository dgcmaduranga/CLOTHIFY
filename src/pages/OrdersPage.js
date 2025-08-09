import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getMyOrders } from "../services/orders";
import { Link } from "react-router-dom";


export default function OrdersPage(){
  const { user } = useAuth();
  const [orders, setOrders] = useState(null); // null = loading

  useEffect(() => {
    let alive = true;
    async function run(){
      if (!user) { setOrders([]); return; }
      const data = await getMyOrders(user.uid);
      if (alive) setOrders(data);
    }
    run();
    return () => { alive = false; };
  }, [user]);

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24}}>
        <h1>My orders</h1>

        {!user && <p style={{marginTop:12}}>Please log in to see your orders.</p>}
        {user && orders === null && <p style={{marginTop:12}}>Loading…</p>}
        {user && orders?.length === 0 && <p style={{marginTop:12}}>No orders yet.</p>}

        {user && orders?.length > 0 && (
          <div style={{marginTop:12, border: "1px solid #eee", borderRadius:12}}>
            {orders.map(o => (
              <div key={o.id} style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12, padding:12, borderBottom:"1px solid #eee"}}>
                <div>
                  <div style={{fontWeight:600}}>#{o.id.slice(0,8)}</div>
                  <div style={{color:"#666"}}>{o.status || "processing"}</div>
                </div>
                <div>Items: {o.totals?.count || 0}</div>
                <div>Total: Rs. {(o.totals?.total || 0).toLocaleString()}</div>
                <div>
                  <Link to={`/order-success/${o.id}`} className="btn light">View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <SiteFooter />
    </>
  );
}

