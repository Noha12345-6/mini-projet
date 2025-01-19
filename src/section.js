import React from 'react';
import { useSelector } from 'react-redux';

const SectionContent = ({ children }) => {
  const userColor = useSelector((state) => state.user.couleur); 

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: userColor,
        height: '100vh',
      }}
    >
      <center>
        <h1>Bienvenue sur la plateforme</h1>
      </center>
      <div
        style={{
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: userColor,
          height: '100px',
        }}
      >
        {children} 
      </div>
    </div>
  );
};
export default SectionContent;

