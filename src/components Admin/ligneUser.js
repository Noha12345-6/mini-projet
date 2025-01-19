import React from 'react';
import { Link } from 'react-router-dom';
import './LigneUser.css'; 

const LigneUser = ({ user, onDelete }) => {
  return (
    <tr className="user-row">
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.email}</td>
      <td className="actions">
        <Link to={`/admin/details/${user.id}`} className="btn-view">Voir</Link> |{' '}
        <Link to={`/admin/modifier/${user.id}`} className="btn-edit">Modifier</Link> |{' '}
        <button onClick={() => onDelete(user.id)} className="btn-delete">Supprimer</button>
      </td>
    </tr>
  );
};

export default LigneUser;
