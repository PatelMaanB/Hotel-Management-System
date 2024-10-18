import React from 'react';
import '../style/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <p>&copy; {new Date().getFullYear()} Hotel Paradise. All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a> |
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">Twitter</a> |
          <a href="https://www.instagram.com" target="_blank"rel="noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
