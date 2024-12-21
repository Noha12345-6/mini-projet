import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


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

 

const App = () => {
 
  return (
    <Router>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/user/:id" element={<Layout />} />
        <Route path="/admin/liste" element={<ListeUser />} />
        <Route path="/admin/ajouter" element={<AjouterUtilisateur />} />

        <Route path="/admin/details/:id" element={<Details />} />
        <Route path="/admin/modifier/:id" element={<ModifierUser />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/add-request/:userId" element={<AddRequest />} />
          <Route path="/my-requests/:userId" element={<MyRequests />} />

        <Route path="/admin-requests" element={<AdminRequests />} />

        
      </Routes>
    </Router>
  );
};

export default App;