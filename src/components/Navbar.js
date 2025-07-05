import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const HandleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand nav-link" style={{ fontSize: '30px' }} to="/">MyNote</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isLoggedIn && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item" style={{ fontSize: '20px' }}>
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item" style={{ fontSize: '20px' }}>
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
          )}

          {/* Right aligned icon */}
          <div className="d-flex ms-auto align-items-center">
            {!isLoggedIn ? (
              <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tooltip-container" style={{ cursor: 'pointer' }}>
                  <i className="fa-solid fa-circle-user fa-2x" style={{ fontSize: '30px' }}></i>
                  <span className="tooltip-text ms-2">Login</span>
                </div>
              </Link>
            ) : (
              <div className="tooltip-container" onClick={HandleLogout} style={{ cursor: 'pointer' }}>
                <i className="fa-solid fa-right-from-bracket fa-2x" style={{ fontSize: '30px' }}></i>
                <span className="tooltip-text ms-2">Logout</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
