import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifierUser.css'; // Ajoutez votre fichier CSS

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
    return <div className="error">{error}</div>;
  }

  return (
    <div className="modifier-container">
      <h2>Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit} className="modifier-form">
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            type="text"
            placeholder="Nom"
            value={user.nom}
            onChange={(e) => setUser({ ...user, nom: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            type="text"
            placeholder="Prénom"
            value={user.prenom}
            onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Âge</label>
          <input
            id="age"
            type="number"
            placeholder="Âge"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="couleur">Couleur préférée</label>
          <input
            id="couleur"
            type="text"
            placeholder="Couleur préférée"
            value={user.couleur}
            onChange={(e) => setUser({ ...user, couleur: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Pays">Pays</label>
          <input
            id="Pays"
            type="text"
            placeholder="Pays"
            value={user.Pays}
            onChange={(e) => setUser({ ...user, Pays: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-btn">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierUser;
