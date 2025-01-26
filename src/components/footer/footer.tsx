import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import './footer.css';

// Import social media icons from react-icons


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <h1>Shophoria</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quia ratione. In similique illo aperiam laborum eaque voluptates odio rem.</p>
        
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
