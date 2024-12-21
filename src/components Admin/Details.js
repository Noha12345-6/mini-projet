import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des détails.');
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Chargement des détails...</div>;
  }

  return (
    <div>
      <h2>Détails de l'utilisateur</h2>
      <p><strong>Nom :</strong> {user.nom}</p>
      <p><strong>Prénom :</strong> {user.prenom}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Âge :</strong> {user.age}</p>
      <p><strong>Couleur préférée :</strong> {user.couleur}</p>
      <p><strong>Pays :</strong> {user.Pays}</p>
    </div>
  );
};

export default Details;
