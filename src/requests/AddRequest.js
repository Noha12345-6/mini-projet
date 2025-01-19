import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './AddRequest.css'; 

const DemandeForm = () => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    if (!userId) {
      setError('Utilisateur non identifié.');
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('Utilisateur non identifié, impossible de soumettre la demande.');
      return;
    }

    const requestData = {
      titre,
      description,
      user_id: userId,
    };

    try {
      const response = await axios.post(
        'http://localhost/ApiDemande/api.php',
        requestData
      );

      if (response.data.success) {
        alert('Demande ajoutée avec succès !');
        setTitre('');
        setDescription('');
      } else {
        throw new Error(response.data.message || 'Erreur inconnue.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la demande :", error);
      alert("Une erreur s'est produite lors de la soumission de la demande.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Ajouter une Demande</h2>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="titre" className="form-label">
            Titre :
          </label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description :
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!userId}
          className={`form-button ${!userId ? 'form-button-disabled' : ''}`}
        >
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default DemandeForm;
