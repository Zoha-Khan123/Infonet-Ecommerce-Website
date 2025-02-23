import { useContext, useState } from "react";
import "../navbar/navbar.css";
import { Link } from "react-router";
import { IoMdClose } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { AuthContextValue } from "../auth-context/auth-context";
import { CartContextValue } from "../cart-context/cart-context";
import { Badge } from "antd";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {

  // ================= Context Api ===================
  const contextValue = useContext(AuthContextValue)
  const cartContextValue = useContext(CartContextValue);
  const {cartItems} = cartContextValue
 
  const { logOut, loginData } = contextValue;
  
  const [toggle, setToggle] = useState(false);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="nav-logo">
          <h2>
            <Link to="/" className="logo">
              Shophoria
            </Link>
          </h2>
        </div>

        <ul className={`nav-links ${toggle ? "active" : ""}`}>
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/sign-up" className="nav-link">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li>
            {loginData ? (
              <div>
                <button onClick={() => logOut()} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/sign-in" className="logout-btn">
                Login
              </Link>
            )}
          </li>
        </ul>

        {/* User Info */}
        <div className="user-info">
          {loginData && (
            <div className="user-data">
              <div className="user-logo">
                {loginData.image ? (
                  <img
                    src={loginData.image}
                    alt="image"
                    className="user-image"
                  />
                ) : (
                  <span className="user-first-logo">
                    {loginData.name.slice(0, 1).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="user-name">
                <p>{loginData.name}</p>
              </div>

            </div>
          )}
              {/* cart */}
              <div className="cart">
                <Link to="/cart">
                <Badge count={cartItems.length}>
                <CiShoppingCart className="shopping-cart-icon"/>
                </Badge>
                </Link>
              </div>

          {/* Hamburger Menu Button */}
          <div className="hamburger-menu">
            {toggle ? (
              <IoMdClose
                className="open-icon"
                onClick={() => setToggle(false)} // Close the menu
              />
            ) : (
              <FaBars
                className="close-icon"
                onClick={() => setToggle(true)} // Open the menu
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
