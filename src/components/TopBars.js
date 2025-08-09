// src/components/TopBars.js
export default function TopBars(){
  return (
    <>
      <div className="topbar">
        <div className="inner">
          <div>MODEX· Online Store</div>
          <div>Search or enter website name</div>
        </div>
      </div>

      {/* Announcement bar (NO student discount now) */}
      <div className="ann">
        <div className="inner">
          <div>🚚 Free shipping over Rs. 7,500</div>
          <div>🎁 30% off on dresses · code <b>30OFF</b></div>
        </div>
      </div>
    </>
  );
}

