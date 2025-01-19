import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../nav/nav.css';

const NavigationBar = ({ action }) => {
  const user = useSelector((state) => state.user);
  
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {!user.admin && (
          <>
            <li>
              <button onClick={() => action('profile')}>Voir le profil</button>
            </li>
            <li>
              <button onClick={() => action('modifier')}>Modifier</button>
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
