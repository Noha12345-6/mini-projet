import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/actions';
import './login.css'; // Assurez-vous que ce fichier contient le CSS adapté

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) {
      setError((prev) => [...prev, 'Veuillez entrer votre email']);
      return;
    }
    if (!password) {
      setError((prev) => [...prev, 'Veuillez entrer votre mot de passe']);
      return;
    }

    
    axios
      .get('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        const user = response.data.find(
          (u) => u.MotDePasse === password && u.email === email
        );

        if (user) {
          axios
            .get(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${user.id}`)
            .then((response) => {
              dispatch(setUser(response.data));
              setError([]);
              navigate(`/user/${user.id}`);
            })
            .catch(() => {
              setError((prev) => [
                ...prev,
                "Erreur lors de la récupération des informations de l'utilisateur",
              ]);
            });
        } else {
          setError((prev) => [...prev, 'Email ou mot de passe incorrect']);
        }
      })
      .catch(() => {
        setError((prev) => [...prev, 'Erreur du serveur']);
      });
  };

  return (
    <div className="login-container">
      <form className="form" onSubmit={handleLogin}>
        <div className="header">Se connecter à votre compte</div>
        <div className="inputs">
          <input
            placeholder="Entrez votre Email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Entrez votre Mot de Passe"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error.length > 0 && (
          <ul className="error-message">
            {error.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <button className="sigin-btn" type="submit">
          Se connecter
        </button>
        <p className="signup-link">
          Vous n'avez pas de compte ? <Link to="/create">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
