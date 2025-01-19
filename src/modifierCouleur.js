import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from './store/actions';
import './Modifier.css';

const Modifier = () => {
  const currentColor = useSelector((state) => state.user.couleur);
  const [newColor, setNewColor] = useState(currentColor); 
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  useEffect(() => {
    setNewColor(currentColor); 
  }, [currentColor]);

  const handleColorChange = () => {
    if (!userId) {
      alert('Utilisateur non connecté');
      return;
    }

    fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ couleur: newColor }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour de la couleur');
        }
        return response.json();
      })
      .then(() => {
        dispatch(changeColor(newColor));  
        alert('Couleur modifiée avec succès !');
      })
      .catch((error) => {
        console.error('Erreur lors de la modification de la couleur:', error);
        alert('Une erreur est survenue lors de la modification de la couleur.');
      });
  };

  return (
    <div className="modifier-container">
      <h3>Modifier la couleur</h3>
      <select 
        className="select-color"
        value={newColor} 
        onChange={(e) => setNewColor(e.target.value)} 
      >
        <option value="red">Rouge</option>
        <option value="blue">Bleu</option>
        <option value="green">Vert</option>
        <option value="yellow">Jaune</option>
      </select>
      <button onClick={handleColorChange}>Enregistrer la couleur</button>
    </div>
  );
};

export default Modifier;
