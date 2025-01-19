import React, { useEffect, useState } from 'react';
import LigneUser from './ligneUser';
import "./ListeUser.css"


const ListeUser = () => {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs.');
        return response.json();
      })
      .then((data) => {
        setUsers(data); 
        setFilteredUsers(data); 
      })
      .catch((error) => setError(error.message));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        alert('Utilisateur supprimé avec succès !');
      })
      .catch(() => alert('Erreur lors de la suppression.'));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term); 
    setFilteredUsers(
      users.filter(
        (user) =>
          user.nom.toLowerCase().includes(term) ||
          user.prenom.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
      )
    );
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (filteredUsers.length === 0 && searchTerm === '') {
    return <div className="no-users">Aucun utilisateur trouvé.</div>;
  }

  return (
    <div className="user-list-container">
      <h2>Liste des utilisateurs</h2>

      <input
        type="text"
        placeholder="Rechercher par nom, prénom ou email"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

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
          {filteredUsers.map((user) => (
            <LigneUser key={user.id} user={user} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUser;
