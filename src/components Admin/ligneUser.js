import React from 'react';
import { Link } from 'react-router-dom';

const LigneUser = ({ user, onDelete }) => {
  return (
    <tr>
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`/admin/details/${user.id}`}>Voir</Link> |{' '}
        <Link to={`/admin/modifier/${user.id}`}>Modifier</Link> |{' '}
        <button onClick={() => onDelete(user.id)}>Supprimer</button>
      </td>
    </tr>
  );
};

export default LigneUser;
