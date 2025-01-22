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
      statut: 'En attente'
    };

    try {
      const response = await axios.post(
        'https://67575d82c0a427baf94c94da.mockapi.io/dev101/ApiDemande/apiphp/demande', 
        requestData
      );
      console.log(response.data);

      if (response.status === 201 || response.status === 200) {
        alert('Demande ajoutée avec succès !');
        setTitre('');
        setDescription('');
      } else {
        throw new Error('Erreur inattendue lors de la soumission.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la demande :", error);
      const errorMessage = error.response?.data?.message || 'Une erreur s\'est produite.';
      alert(errorMessage);
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
