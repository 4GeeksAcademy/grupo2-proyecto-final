import React from "react";
import mov_iconlogo from "../../img/mov+icon.png";
import "../../styles/footer.css";


export const Footer = () => (
  <footer className="movie-footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src={mov_iconlogo} />
      </div>
      <div className="footer-links">
        <a href="/terms-of-use">Terms of Use</a>
      </div>
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <div className="footer-links">
        <a href="/faqs">FAQs</a>
      </div>
    </div>
    <div className="attribution">
      <p>&copy; {new Date().getFullYear()} MOV+ | All rights reserved</p>
    </div>
  </footer>
);
