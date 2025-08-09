import { useEffect, useState } from "react";
import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import { fetchAllMessages, markMessageRead } from "../services/messages";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ADMIN_UID = "REPLACE_WITH_YOUR_UID"; // <-- put your Firebase user UID

export default function AdminMessagesPage(){
  const { user, loading } = useAuth();
  const [list, setList] = useState(null);

  useEffect(() => {
    let alive = true;
    async function run(){
      const data = await fetchAllMessages();
      if (alive) setList(data);
    }
    run();
    return () => { alive = false; };
  }, []);

  if (loading) return null;
  if (!user || user.uid !== ADMIN_UID) return <Navigate to="/" replace />;

  return (
    <>
      <TopBars/><NavBar/>
      <div className="container" style={{paddingBlock:24}}>
        <h1>Admin · Messages</h1>
        {list === null && <p>Loading…</p>}
        {list?.length === 0 && <p>No messages yet.</p>}

        <div style={{display:"grid", gap:12}}>
          {list?.map(m => (
            <div key={m.id} style={{border:"1px solid #eee", borderRadius:12, padding:12}}>
              <div style={{display:"flex", justifyContent:"space-between", gap:10}}>
                <div>
                  <b>{m.name || "Anonymous"}</b> · <span style={{color:"#666"}}>{m.email || "no email"}</span>
                </div>
                <span style={{
                  padding:"4px 8px", borderRadius:999,
                  background: m.status === "new" ? "#ffe9cc" : "#e9f7ef",
                  color: m.status === "new" ? "#8a4b00" : "#0b6"
                }}>
                  {m.status || "new"}
                </span>
              </div>

              <p style={{margin:"8px 0 0"}}>{m.body}</p>

              <div style={{marginTop:8}}>
                {m.status !== "read" && (
                  <button
                    className="btn light"
                    onClick={async () => {
                      await markMessageRead(m.id);
                      setList(list.map(x => x.id === m.id ? { ...x, status:"read" } : x));
                    }}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter/>
    </>
  );
}
