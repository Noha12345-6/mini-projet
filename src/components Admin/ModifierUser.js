import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ModifierUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    nom: '',
    prenom: '',
    email: '',
    age: '',
    couleur: '',
    Pays: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des données.');
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((error) => setError(error.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        alert('Utilisateur modifié avec succès !');
        navigate('/admin/liste'); 
      })
      .catch(() => alert('Erreur lors de la modification.'));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={user.nom}
          onChange={(e) => setUser({ ...user, nom: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={user.prenom}
          onChange={(e) => setUser({ ...user, prenom: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Âge"
          value={user.age}
          onChange={(e) => setUser({ ...user, age: e.target.value })}
        />
        <input
          type="text"
          placeholder="Couleur préférée"
          value={user.couleur}
          onChange={(e) => setUser({ ...user, couleur: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pays"
          value={user.Pays}
          onChange={(e) => setUser({ ...user, Pays: e.target.value })}
        />
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierUser;
