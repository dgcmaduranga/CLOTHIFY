import men from "../images/men.jpg";
import women from "../images/women.jpg";
import kids from "../images/kids.jpg";
import { Link } from "react-router-dom";

export default function CategoryStrip(){
  return (
    <div className="container">
      <div className="grid">
        <Link to="/men" className="tile">
          <img src={men} alt="Men"/><div className="label">Men</div>
        </Link>
        <Link to="/women" className="tile">
          <img src={women} alt="Women"/><div className="label">Women</div>
        </Link>
        <Link to="/kids" className="tile">
          <img src={kids} alt="Kids"/><div className="label">Kids</div>
        </Link>
      </div>
    </div>
  );
}
