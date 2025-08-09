import f1 from "../images/feature1.png";
import f2 from "../images/feature2.png";
import f3 from "../images/feature3.png";

export default function FeatureRow(){
  return (
    <div className="container">
      <div className="features">
        <div className="feature">
          <img src={f1} alt="Free shipping"/>
          <h6>Free shipping</h6>
          <small>Over Rs. 7,500</small>
        </div>
        <div className="feature">
          <img src={f2} alt="Money back"/>
          <h6>100% Money back</h6>
          <small>Within 14 days</small>
        </div>
        <div className="feature">
          <img src={f3} alt="Support"/>
          <h6>Online support 24/7</h6>
          <small>We’re here to help</small>
        </div>
      </div>
    </div>
  );
}
