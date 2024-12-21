import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profile.jpeg';
import resourceIcon from '../images/resources.jpeg';
import helpIcon from '../images/help.jpeg';
import statistique from '../images/statistique.png'; 
import liste from '../images/liste.jpeg';
import ajouteruser from '../images/ajouteruser.png';
const Index = () => {
  const user = useSelector((state) => state.user); 

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <p style={styles.subtitle}>
          {user.admin ? "Gérez les utilisateurs et consultez les statistiques" : "Découvrez les fonctionnalités qui sont disponibles"}
        </p>
      </header>

      <main style={styles.main}>
        <div style={styles.cardContainer}>
         
          {!user.admin && (
            <>
              <div className="accueil-card">
                <Link to="/profile" style={styles.card}>
                  <img src={profileIcon} alt="Mon Profil" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Mon Profil</h3>
                  <p style={styles.cardDescription}>Consultez et modifiez vos informations personnelles.</p>
                </Link>
              </div>

              <div className="accueil-card">
                <Link to="/resources" style={styles.card}>
                  <img src={resourceIcon} alt="Ressources" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Ressources</h3>
                  <p style={styles.cardDescription}>Accédez à des documents et outils utiles pour votre parcours.</p>
                </Link>
              </div>

              <div className="accueil-card">
                <Link to="/help" style={styles.card}>
                  <img src={helpIcon} alt="Assistance" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Assistance</h3>
                  <p style={styles.cardDescription}>Trouvez des réponses à vos questions et obtenez de l'aide.</p>
                </Link>
              </div>
            </>
          )}

          
          {user.admin && (
            <>
              <div className="accueil-card">
                <Link to="/admin/dashboard" style={styles.card}>
                  <img src={statistique} alt="Dashboard" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Tableau de bord</h3>
                  <p style={styles.cardDescription}>Consultez les statistiques et la gestion de la plateforme.</p>
                </Link>
              </div>

              <div className="accueil-card">
                <Link to="/admin/liste" style={styles.card}>
                  <img src={liste} alt="Utilisateurs" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Liste des utilisateurs</h3>
                  <p style={styles.cardDescription}>Gérez les utilisateurs de la plateforme.</p>
                </Link>
              </div>

              <div className="accueil-card">
                <Link to="/admin/ajouter" style={styles.card}>
                  <img src={ajouteruser} alt="Ajouter Utilisateur" style={styles.cardImage} />
                  <h3 style={styles.cardTitle}>Ajouter un utilisateur</h3>
                  <p style={styles.cardDescription}>Ajoutez de nouveaux utilisateurs à la plateforme.</p>
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    margin: '10px 0 0',
  },
  main: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#333',
    padding: '20px',
    width: '200px',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardImage: {
    width: '100%',
    height: '280px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    margin: '15px 0 10px',
    color: '#007bff',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#777',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
  },
};

export default Index;
