import React from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="movie-footer">
    <div className="footer-content">
      <div className="footer-logo">
        {/* <img src="https://github.com/4GeeksAcademy/grupo2-proyecto-final/blob/main/src/front/img/moon%2B.jpeg" alt="Movie Site Logo" /> */}
        <img src={rigoImageUrl} />
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
      <p>
        &copy; {new Date().getFullYear()} Moon+ | All rights reserved
      </p>
    </div>
  </footer>
);