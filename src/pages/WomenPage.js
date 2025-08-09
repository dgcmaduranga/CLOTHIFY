import TopBars from "../components/TopBars";
import NavBar from "../components/NavBar";
import SiteFooter from "../components/SiteFooter";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useMemo, useState } from "react";

export default function WomenPage(){
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    let arr = products.filter(p => p.gender === "women");
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter(p => p.title.toLowerCase().includes(s));
    }
    if (sort === "priceAsc") arr.sort((a,b)=>a.price-b.price);
    if (sort === "priceDesc") arr.sort((a,b)=>b.price-a.price);
    if (sort === "rating") arr.sort((a,b)=>(b.rating||0)-(a.rating||0));
    return arr;
  }, [q, sort]);

  return (
    <>
      <TopBars /><NavBar />
      <div className="container" style={{paddingBlock:24}}>
        <div style={{display:"flex", gap:12, alignItems:"center", marginBottom:16, flexWrap:"wrap"}}>
          <h1 style={{margin:"0 12px 0 0"}}>Women <span style={{color:"#888", fontSize:18}}>({list.length})</span></h1>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search"
                 style={{padding:"10px 12px", border:"1px solid #ddd", borderRadius:10}}/>
          <select value={sort} onChange={e=>setSort(e.target.value)}
                  style={{padding:"10px 12px", border:"1px solid #ddd", borderRadius:10}}>
            <option value="popular">Sort: Popular</option>
            <option value="priceAsc">Price: Low → High</option>
            <option value="priceDesc">Price: High → Low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>

        <div className="pGrid">{list.map(p => <ProductCard key={p.id} p={p} />)}</div>
      </div>
      <SiteFooter />
    </>
  );
}
