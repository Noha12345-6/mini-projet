import React from 'react';
import "./footer.css"

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.address}>Adresse: 123 Rue Exemple, Ville, Pays</p>
      <div style={styles.socialLinks}>
        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
        >
          <i className="fab fa-facebook" style={styles.icon}></i> Facebook
        </a>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.link}
        >
          <i className="fab fa-instagram" style={styles.icon}></i> Instagram
        </a>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#007bff', 
    padding: '20px',
    textAlign: 'center',
    color: '#fff',
    boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  address: {
    fontSize: '16px',
    marginBottom: '15px',
    fontWeight: '600',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '10px',
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  linkHover: {
    backgroundColor: '#0056b3', // Couleur plus sombre au survol
    transform: 'scale(1.1)',
  },
  icon: {
    marginRight: '8px',
    fontSize: '18px',
  },
};

export default Footer;