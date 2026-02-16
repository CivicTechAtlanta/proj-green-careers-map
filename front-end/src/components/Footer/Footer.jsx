import { useState } from "react";
import "./Footer.css";
import prcLogo from "../../assets/images/logo/PRC Logo Horizontal.svg";

function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(""); // Clear input after submit
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo Section */}
        <div className="footer__logo-section">
          <img src={prcLogo} alt="Peoplestown Revitalization Corporation" className="footer__logo-img" />
        </div>

        {/* Contact Section */}
        <div className="footer__contact-section">
          <h2 className="footer__heading">Contact Us</h2>
          <address className="footer__contact-info">
            <p className="footer__org-name">Peoplestown Revitalization Corporation</p>
            <p className="footer__address">
              <svg className="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              30 Haygood Ave SW, Atlanta, GA 30315
            </p>
            <p className="footer__email">
              <svg className="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email: <a href="mailto:peoplestown.prc@gmail.com" className="footer__link">peoplestown.prc@gmail.com</a>
            </p>
            <p className="footer__phone">
              <svg className="footer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Phone: (404) 797-1195
            </p>
          </address>

          {/* Social Media Icons */}
          <div className="footer__social-icons">
            <a href="https://nextdoor.com/page/peoplestown-revitalization-corporation-atlanta-ga" className="footer__social-btn" aria-label="Nextdoor" target="_blank" rel="noopener noreferrer">
              <svg className="footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .915L0 10.647h2.903v12.438h6.86V16.1h4.473v6.985h6.861V10.647H24L12 .915zm5.192 16.269h-.96v-6.985H7.769v6.985h-.961V9.25L12 4.476l5.192 4.774v7.934z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/peoplestownprc" className="footer__social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg className="footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/peoplestownprc/" className="footer__social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg className="footer__social-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mailing List Section */}
        <div className="footer__mailing-section">
          <h2 className="footer__heading">Join our mailing list!</h2>
          <form className="footer__mailing-form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="footer__email-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="footer__submit-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
