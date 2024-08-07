import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const refreshPage = () => {
    window.location.reload();
  };
  

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
    refreshPage()
  };

  return (
    <>
       <div id="nav">

        {auth ? (
          <>
         
          <div className="inven" style={{ fontSize: "2vh" }}>
            <NavLink id="inv" to="/admin">
              <h3>IMS</h3>
            </NavLink>
          </div>
  
          <div className="link" style={{ fontSize: "2vh" }}>
            <NavLink to="/QR-generator">Generate QR Code</NavLink>
            <NavLink to="/scanner">Scan QR code</NavLink>
          </div>
          <div className="btn">
            <Link to="/logout">
              <button onClick={logOut} className="register">
                logout
              </button>
            </Link>
          </div>
          </>
          
        ) : (
          <div className="rightnav">
            <Link to="/login">
              <button className="login">login</button>
            </Link>
            <Link to="/register">
              <button className="register">Register</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
