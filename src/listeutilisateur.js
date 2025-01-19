import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./List.css"


const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); 

  const handleDelete = (id) => {
    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        alert('Utilisateur supprimé avec succès !');
      })
      .catch((error) => console.error('Erreur lors de la suppression:', error));
  };
  
  useEffect(() => {
    fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message)); 
  }, []);

  return (
    <div className="container">
      <h2>Liste des Utilisateurs</h2>
      {error && <p className="error-message">{error}</p>} 
      
      <table className="users-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/modifier-utilisateur/${user.id}`} className="edit-button">Modifier</Link> 
                <button className="delete-button" onClick={() => handleDelete(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;
