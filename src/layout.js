import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from './header/header';
import NavigationBar from './nav/navigation';
import Index from './nav/index1';
import Footer from './footer';
import SectionContent from './section';
import { changeColor } from './store/actions'; 
import Modifier from './modifierCouleur';
import VoirMonProfile from './voirProfil'; 
import ListeUtilisateurs from './components Admin/listeUsers';

const Layout = () => {
  const dispatch = useDispatch();
  const userColor = useSelector((state) => state.user.couleur ); 
  const userId = useSelector((state) => state.user?.id); 

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (userId) {
      fetch(`https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données utilisateur');
          }
          return response.json();
        })
        .then((data) => {
          if (data.couleur) {
            dispatch(changeColor(data.couleur)); 
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des données utilisateur:', error);
        });
    }
  }, [dispatch, userId]);

  const handleProfileClick = () => {
    setActiveSection('profile');
  };

  const handleModifierClick = () => {
    setActiveSection('modifier');
  };

  const handleUsersClick = () => {
    setActiveSection('users');
  };

  return (
    <div style={{ backgroundColor: userColor, minHeight: '100vh', padding: '20px' }}>
      <Header />
      <NavigationBar 
        setShowModifier={handleModifierClick} 
        onProfileClick={handleProfileClick} 
        onUsersClick={handleUsersClick}
      />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '40%', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Index />
        </div>
        <div style={{ flex: 1, padding: '10px', backgroundColor:userColor }}>
          <SectionContent backgroundColor={userColor} />
          {activeSection === 'profile' && <VoirMonProfile />}
          {activeSection === 'modifier' && <Modifier currentColor={userColor} />}
          {activeSection === 'users' && <ListeUtilisateurs />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
