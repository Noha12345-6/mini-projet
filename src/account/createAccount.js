import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../account/account.css'; 

const CreateAccount = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    nom: '',
    age: '',
    admin: false,
    MotDePasse: '',
    pseudo: '',
    prenom: '',
    couleur: '',
    Devise: '',
    Pays: '',
    avatar: '',
    email: '',
    photo: '',
    id: '',
  });

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (formData.MotDePasse !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    
    if (!validatePassword(formData.MotDePasse)) {
      setError('Le mot de passe doit contenir au moins : une majuscule, une minuscule, un chiffre, un caractère spécial et avoir au moins 8 caractères.');
      return;
    }

   
    axios.post('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire', formData)
      .then(() => {
        setError('');
        alert('Compte créé avec succès');
        navigate('/login');  
      })
      .catch(() => setError('Erreur lors de la création du compte.'));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="title">S'inscrire</p>
      <p className="message">Inscrivez-vous maintenant et obtenez un accès complet à notre application.</p>
      <div className="flex">
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          />
          <span>Prénom</span>
        </label>
        <label>
          <input
            className="input"
            type="text"
            placeholder=""
            required
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
          />
          <span>Nom</span>
        </label>
      </div>

     
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.pseudo}
          onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
        />
        <span>Pseudo</span>
      </label>
      <label>
        <input
          className="input"
          type="number"
          placeholder=""
          required
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        />
        <span>Âge</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.couleur}
          onChange={(e) => setFormData({ ...formData, couleur: e.target.value })}
        />
        <span>Couleur préférée</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.Devise}
          onChange={(e) => setFormData({ ...formData, Devise: e.target.value })}
        />
        <span>Devise</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.Pays}
          onChange={(e) => setFormData({ ...formData, Pays: e.target.value })}
        />
        <span>Pays</span>
      </label>
      <label>
        <input
          className="input"
          type="email"
          placeholder=""
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <span>Email</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.avatar}
          onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        />
        <span>URL de l'avatar</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
        />
        <span>URL de la photo</span>
      </label>
      <label>
        <input
          className="input"
          type="text"
          placeholder=""
          required
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
        <span>ID</span>
      </label>

     
      <label>
        <input
          className="input"
          type="password"
          placeholder=""
          required
          value={formData.MotDePasse}
          onChange={(e) => setFormData({ ...formData, MotDePasse: e.target.value })}
        />
        <span>Mot de passe</span>
      </label>
      <label>
        <input
          className="input"
          type="password"
          placeholder=""
          required
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <span>Confirmer le mot de passe</span>
      </label>

    
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className="submit" type="submit">Soumettre</button>
    </form>
  );
};

export default CreateAccount;