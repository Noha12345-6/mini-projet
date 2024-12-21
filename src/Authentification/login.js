import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser  } from '../store/actions';
import "../Authentification/login.css";

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
    } else if (!password) {
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
             
              dispatch(setUser (response.data));
              setError([]);  
              navigate(`/user/${user.id}`); 
            })
            .catch(() => {
              setError((prev) => [...prev, 'Erreur lors de la récupération des informations de l\'utilisateur']);
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
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="form">
        <h2 className="text-center">Se connecter à votre compte</h2>
        <form onSubmit={handleLogin}>
          <div className="flex-column mb-3">
            <label htmlFor="email">Email</label>
            <div className="inputForm">
              <input
                type="email"
                id="email"
                placeholder="Entrez votre Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-column mb-3">
            <label htmlFor="password">Mot de passe</label>
            <div className="inputForm">
              <input
                type="password"
                id="password"
                placeholder="Entrez votre mot de passe"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="button-submit" >
            Se connecter
          </button>

          <Link to="/create" className="span">
            Créer un compte
          </Link>
        </form>

        <ul className="error-messages">
          {error.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Login;