import  { useEffect, useState } from 'react'
import '../navbar/navbar.css'
import {Link} from 'react-router'
import {GiHamburgerMenu} from 'react-icons/gi'

const Navbar = () => {
  const [toggle,setToggle] = useState(true);

  const handleSetToggle = () => {
    setToggle(!toggle);
  }
   // Set toggle based on window width
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 750) {
        setToggle(true); // Set to true for larger screens
      } else {
        setToggle(false); // Set to false for smaller screens
      }
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Set the initial state based on current window width
    handleResize();

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="navbar">
      <div className='nav-container'>
      <div>
        <h2>
          <Link to="/" className="logo">Shophoria</Link>
        </h2>
      </div>
      <div className="hamburger-menu" onClick={handleSetToggle}>
        <GiHamburgerMenu />
      </div>
      </div>
    {
      toggle && (
      <ul className="nav-links">
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
      </ul>
      )
    }
    </div>
  )
}

export default Navbar
