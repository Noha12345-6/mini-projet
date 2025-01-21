import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Authentification/login';
import CreateAccount from "./account/createAccount";
import Layout from './layout'; 
import ListeUser from './components Admin/listeUsers';
import AjouterUtilisateur from './ajouterUtilisateur';
import Details from './components Admin/Details';
import ModifierUser from './components Admin/ModifierUser';
import Dashboard from './components Admin/Dashboard';
import AddRequest from './requests/AddRequest';  
import MyRequests from './requests/MyRequests';  
import AdminRequests from './requests/AdminRequests'; 
import Header from './header/header';
import NavigationBar from './nav/navigation';
import Footer from './footer';
import VoirMonProfile from './voirProfil';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Navigate to="/login" />} />

       
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/user/:id" element={<Layout />} />

       
        <Route 
          path="/add-request/:userId" 
          element={
            <>
              <Header />
              <AddRequest />
              <Footer />
            </>
          }
        />
        <Route 
          path="/my-requests/:userId" 
          element={
            <>
              <Header />
              <MyRequests />
              <Footer />
            </>
          }
        />
        
        
        <Route
          path="/*"
          element={
            <>
              <Header />
              <NavigationBar />
              <Routes>
                <Route path="/admin/liste" element={<ListeUser />} />
                <Route path="/admin/ajouter" element={<AjouterUtilisateur />} />
                <Route path="/admin/details/:id" element={<Details />} />
                <Route path="/admin/modifier/:id" element={<ModifierUser />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin-requests" element={<AdminRequests />} />
                <Route path="/MonProfil" element={<VoirMonProfile />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
