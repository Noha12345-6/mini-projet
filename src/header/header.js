import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser  } from '../store/actions';
import { useNavigate } from 'react-router-dom';
import "../header/header.css";  

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser ());  
    navigate('/login');  
  };

  return (
    <div className="header-container">
      <div className="logo">
        <img src={user.photo} alt="Logo" className="logo-image" />
      </div>
      <div className="welcome-message">
        <h1>{`Bienvenue, ${user.prenom} ${user.nom}!`}</h1> 
      </div>
      <div className="logout-button">
        <button onClick={handleLogout}>Se déconnecter</button>
      </div>
    </div>
  );
};

export default Header;