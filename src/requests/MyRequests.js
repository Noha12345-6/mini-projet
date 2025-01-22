import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './MyRequests.css';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      setError('Utilisateur non identifié.');
      return;
    }
    setIsLoading(true);
   
    axios
      .get(`https://67575d82c0a427baf94c94da.mockapi.io/dev101/ApiDemande/apiphp/demande?user_id=${userId}`)
      .then((response) => {
       
        if (Array.isArray(response.data)) { 
          setRequests(response.data); 
          setError('');
        } else {
          setError('Aucune demande trouvée pour cet utilisateur.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des demandes:', error);
        setError('Une erreur est survenue. Veuillez réessayer.');
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleDeleteRequest = (requestId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      axios
        .delete(`https://67575d82c0a427baf94c94da.mockapi.io/dev101/ApiDemande/apiphp/demande/${requestId}`)
        .then(() => {
          setRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
          alert('La demande a été supprimée avec succès !');
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Une erreur est survenue lors de la suppression de la demande.');
        });
    }
  };

  return (
    <div className="requests-container">
      <h2>Mes Demandes</h2>
      {isLoading && <p>Chargement en cours...</p>}
      {error && !isLoading && <p className="error-message">{error}</p>}
      <div className="requests-list">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.id} className="request-card">
              <h3>{request.titre}</h3>
              <p>{request.description}</p>
              <p className={`status ${request.statut?.replace(' ', '-').toLowerCase()}`}>Statut: {request.statut}</p>
              <button
                className="delete-button"
                onClick={() => handleDeleteRequest(request.id)}
                disabled={request.statut === 'Annulée'}
              >
                Supprimer la demande
              </button>
            </div>
          ))
        ) : (
          !isLoading && <p>Aucune demande trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default MyRequests;
