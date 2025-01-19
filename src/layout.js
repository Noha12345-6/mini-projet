import React, { useState } from 'react';
import Header from './header/header';
import NavigationBar from './nav/navigation';
import Index from './nav/index1';
import Footer from './footer';
import SectionContent from './section';
import Modifier from './modifierCouleur';
import VoirMonProfile from './voirProfil'; 

const Layout = () => {
  const [activeSection, setActiveSection] = useState(null); 

  return (
    
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <Header />
      <NavigationBar action={setActiveSection} />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '40%', padding: '10px', backgroundColor: '#f0f0f0' }}>
          <Index />
        </div>
        <div style={{ flex: 1, padding: '10px', height: '400px' }}>
          <SectionContent>
            {activeSection === 'profile' && <VoirMonProfile />}
            {activeSection === 'modifier' && <Modifier />}
          </SectionContent>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
