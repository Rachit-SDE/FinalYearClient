import { useState } from 'react'
import './Navbar.css';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { assets } from "../../assets/assets";
const Navbar = () => {

  const [menu,setMenu] = useState("home")
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  console.log(isLoggedIn);

  return (
    <div className="navbar">
      <div className="inner-navbar">
        <div className="navbar-logo"><img src={assets.SiteLogo} alt="" /></div>
        <div className="navbar-links">
          <Link to ="/" onClick={()=>setMenu("home")} className={`navbar-link ${menu==="home"?"active":""}`}>Home</Link>
          <Link to="/#" onClick={()=>setMenu("menu")} className={`navbar-link ${menu==="menu"?"active":""}`}>About</Link>
          <Link to="/#" onClick={()=>setMenu("Blog")}className={`navbar-link ${menu==="Blog"?"active":""}`}>Blogs</Link>
          <Link to="/#" onClick={()=>setMenu("contact us")}className={`navbar-link ${menu==="contact us"?"active":""}`}>Contact</Link>
        </div>
        <div className="navbar-login">
          {!isLoggedIn ? (
            <div className='login-outer'>
              <Link className="navbar-login-button" to="/login">
                Login
              </Link>
            </div> // Show login button if not logged in
          ) : (
            <>
              <div className='account-profile'>
                <Link  to ="/dashboard/profile" className="navbar-logout-button">
                  <img src={assets.account} alt="" />
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
