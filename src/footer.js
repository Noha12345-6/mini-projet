import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-address">Adresse: 123 Rue Exemple, Ville, Pays</p>
      <div className="footer-social-links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-facebook footer-icon"></i> Facebook
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-instagram footer-icon"></i> Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
