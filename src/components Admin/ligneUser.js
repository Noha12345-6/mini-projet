import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './LigneUser.css'; 

const LigneUser = ({ user, onDelete }) => {

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimez-le !",
      cancelButtonText: "Non, annulez !",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        onDelete(id);
        
        swalWithBootstrapButtons.fire({
          title: "Supprimé !",
          text: "L'utilisateur a été supprimé.",
          icon: "success"
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Annulé",
          text: "L'utilisateur est en sécurité ",
          icon: "error"
        });
      }
    });
  };

  return (
    <tr className="user-row">
      <td>{user.nom}</td>
      <td>{user.prenom}</td>
      <td>{user.email}</td>
      <td className="actions">
        <Link to={`/admin/details/${user.id}`} className="btn-view">Voir</Link> |{' '}
        <Link to={`/admin/modifier/${user.id}`} className="btn-edit">Modifier</Link> |{' '}
        <button onClick={() => handleDelete(user.id)} className="btn-delete">Supprimer</button>
      </td>
    </tr>
  );
};

export default LigneUser;
