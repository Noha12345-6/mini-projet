import React, { useState } from 'react';
import './AjouterUtilisateur.css'; 

const AjouterUtilisateur = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const newUser = { nom, prenom, email };

    fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout de l\'utilisateur.');
        }
        return response.json();
      })
      .then((data) => {
        setMessage('Utilisateur ajouté avec succès !');
        setNom('');
        setPrenom('');
        setEmail('');
        console.log('Utilisateur ajouté:', data);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setMessage('Une erreur est survenue. Veuillez réessayer.');
      });
  };

  return (
    <div className="ajouter-utilisateur-container">
      <h2>Ajouter un Utilisateur</h2>
      <form className="ajouter-utilisateur-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom</label>
          <input
            id="nom"
            type="text"
            className="form-input"
            placeholder="Entrez le nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom</label>
          <input
            id="prenom"
            type="text"
            className="form-input"
            placeholder="Entrez le prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="Entrez l'email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {message && <p className="message">{message}</p>}
        <button type="submit" className="submit-button">Ajouter</button>
      </form>
    </div>
  );
};

export default AjouterUtilisateur;
