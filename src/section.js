import React from 'react';
const SectionContent = ({backgroundColor}) => {
  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: backgroundColor,
      }}
    >
     <center> <h1>Bienvenue sur la platforme </h1> </center>
    </div>
  );
};
export default SectionContent;