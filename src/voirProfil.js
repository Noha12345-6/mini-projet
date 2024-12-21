import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';  
import './voirProfil.css';  

const VoirMonProfile = () => {
  const [userData, setUserData] = useState(null); 
  const userId = useSelector((state) => state.user.id); 

  useEffect(() => {
    if (userId) {
      fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data); 
        })
        .catch((error) => console.error('Erreur lors de la récupération des données:', error));
    }
  }, [userId]);

  if (!userData) {
    return <div>Chargement des informations...</div>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-header">Mon Profil</h2>
      <div className="profile-item-center">
        {userData.photo && <img src={userData.photo} alt="Profil" className="profile-image" />} 
      </div>
      <div className="profile-details">
        <div className="profile-item">
          <strong>Nom :</strong> {userData.nom || 'Non spécifié'} 
        </div>
        <div className="profile-item">
          <strong>Prénom :</strong> {userData.prenom || 'Non spécifié'}
        </div>
        <div className="profile-item">
          <strong>Email :</strong> {userData.email || 'Non spécifié'}
        </div>
        <div className="profile-item">
          <strong>Âge :</strong> {userData.age || 'Non spécifié'}
        </div>
        <div className="profile-item">
          <strong>Pays :</strong> {userData.pays || 'Non spécifié'} 
        </div>
        <div className="profile-item">
          <strong>Couleur préférée :</strong> {userData.couleur || 'Non spécifié'}
        </div>
      </div>
    </div>
  );
};

export default VoirMonProfile;