import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminRequests.css'; 

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestsAndUsers = async () => {
      try {
        const requestsResponse = await axios.get('http://localhost/ApiDemande/api.php?action=getAllRequests');
        console.log('Données des demandes:', requestsResponse.data);
        const requestsData = requestsResponse.data.requests || [];
    
        const usersResponse = await axios.get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire');
        console.log('Données des utilisateurs:', usersResponse.data);
        const usersData = usersResponse.data;
    
        const combinedData = requestsData.map(request => {
          const user = usersData.find(user => String(user.id) === String(request.user_id));
          return { ...request, userName: user ? `${user.nom} ${user.prenom}` : 'Utilisateur inconnu' };
        });
    
        setRequests(combinedData);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };
    fetchRequestsAndUsers();
  }, []);
  
  

  const changeRequestStatus = async (requestId, status) => {
    try {
    
      const response = await axios.put(`http://localhost/ApiDemande/api.php/${requestId}`, {
        statut: status,
      });

      console.log('API Response:', response.data); 

      if (response.data.message) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? { ...request, statut: status } : request
          )
        );
        alert('Statut mis à jour avec succès.');
      } else {
        setError(response.data.message || 'Erreur lors de la mise à jour du statut.');
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du statut:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="admin-requests">
      <h2>Gestion des Demandes</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Statut</th>
            <th>Utilisateur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.titre}</td>
                <td>{request.description}</td>
                <td>{request.statut}</td>
                <td>{request.userName}</td>
                <td>
                  {request.statut === 'en attente' && (
                    <div>
                      <button onClick={() => changeRequestStatus(request.id, 'approuvée')}>Approuver</button>
                      <button 
                        onClick={() => changeRequestStatus(request.id, 'rejetée')} 
                        className="reject-button"
                      >
                        Rejeter
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucune demande trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequests;
