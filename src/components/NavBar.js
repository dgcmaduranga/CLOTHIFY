import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function NavBar(){
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/");
  };

  return (
    <nav className="navbar">
      <div className="inner">
        <div className="brand">MODEX</div>

        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/orders">My orders</NavLink>
        </div>

        <div className="auth">
          {!user ? (
            <>
              <NavLink to="/login" className="btn-ghost">Log in</NavLink>
              <NavLink to="/register" className="btn-solid">Sign up</NavLink>
              {user && <NavLink to="/orders">My orders</NavLink>}
            </>
          ) : (
            <>
              <span style={{alignSelf:"center"}}>Hi, {user.displayName || user.email}</span>
              <button className="btn-ghost" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
