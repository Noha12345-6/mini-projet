import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../nav/nav.css';

const NavigationBar = ({ setShowModifier, onProfileClick }) => {
  const user = useSelector((state) => state.user); 

  const handleModifierClick = () => {
    setShowModifier((prev) => !prev); 
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
     
        <li>
          <Link to="/">Accueil</Link>
        </li>
        {!user.admin && (
          <>
            <li>
              <button className="nav-button" onClick={onProfileClick}>
                Voir Mon Profil
              </button> 
            </li>

            <li>
              <button className="nav-button" onClick={handleModifierClick}>
                Modifier Couleur
              </button>
            </li>
            <li>
              <Link to={`/add-request/${user.id}`}>Ajouter une Demande</Link>
            </li>
            <li>
              <Link to={`/my-requests/${user.id}`}>Mes Demandes</Link> 
            </li>
          </>
        )}

        
        {user.admin && (
          <>
            <li>
              <Link to="/admin/liste">Liste Utilisateurs</Link>
            </li>
            <li>
              <Link to="/admin/ajouter">Ajouter Utilisateur</Link>
            </li>
            <li>
              <Link to="/admin/dashboard">Tableau de bord</Link>
            </li>
            <li>
              <Link to="/admin-requests">Gérer les Demandes</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
