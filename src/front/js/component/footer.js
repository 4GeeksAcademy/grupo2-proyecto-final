import React from "react";

export const Footer = () => (
  <footer className="movie-footer">
    <div className="footer-content">
      <div className="footer-logo">
        <img src="https://github.com/4GeeksAcademy/grupo2-proyecto-final/blob/main/src/front/img/moon%2B.jpeg" alt="Movie Site Logo" />
      </div>
      <div className="footer-links">
        <a href="/terms-of-use">Terms of Use</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/faqs">FAQs</a>
      </div>
    </div>
    <div className="attribution">
      <p>
        &copy; {new Date().getFullYear()} Moon+ | All rights reserved
      </p>
    </div>
  </footer>
);