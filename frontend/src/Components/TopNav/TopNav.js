import { Link } from "react-router-dom";
import "./_top-nav.scss";
import { useSelector } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";



const TopNav = () => {
  const cartItemCount = useSelector((state) => state.cart.totalItems);
  const [userDetails, setUserDetails] = useState(null);

  const successHandler = (res) => {
    console.log("Google login success:", res);

    // ✅ decode JWT token to extract user info
    const decoded = jwtDecode(res.credential);
    console.log("Decoded user:", decoded);

    setUserDetails(decoded);
  };

  const errorHandler = (err) => {
    console.error("Google login failed:", err);
  };

  return (
    <div>
      <div className="header bg-dark">
        <div className="row top-nav-row">
          <div className="brand my-1">
            <h1> eStore </h1>
          </div>

          <div className="inp-container p-0 my-4 w-50 h-25 bg-white">
            <div className="dropdown m-0 p-0">
              <select className="select-btn w-100 p-0 m-0">
                <option> Men </option>
                <option> Women </option>
                <option> Kids </option>
              </select>
            </div>
            <input className="form-control" placeholder="Search..." />
            <button>
              <i className="fa fa-search" />
            </button>
          </div>

          <div className="login-container p-0">
            <i className="fa fa-user-circle user-icon" />
            <h5>
              {!userDetails ? (
                <GoogleLogin onSuccess={successHandler} onError={errorHandler} />
              ) : (
                <div className="user-info">
                  <img
                    src={userDetails.picture}
                    alt={userDetails.name}
                    style={{ borderRadius: "50%", width: "30px", marginRight: "8px" }}
                  />
                  <span>{userDetails.name}</span>
                </div>
              )}
            </h5>
          </div>

          <div className="cart-wishlist">
            <ul className="p-0">
              <li className="list-icon">
                <i className="fa fa-heart" />
              </li>
              <Link to="/cart">
                <li className="list-icon">
                  <i className="fa fa-shopping-cart" />
                  {cartItemCount !== 0 ? (
                    <div id="cart-item-count">
                      <p>{cartItemCount}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
