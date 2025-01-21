import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Dashboard.css'; 

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    fetch('https://670ed5b73e7151861655eaa3.mockapi.io/Stagiaire')
      .then((response) => {
        if (!response.ok) throw new Error('Erreur lors de la récupération des utilisateurs.');
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error-message">Erreur : {error}</div>;
  }

 
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.admin).length;
  const usersByCountry = users.reduce((acc, user) => {
    acc[user.Pays] = (acc[user.Pays] || 0) + 1;
    return acc;
  }, {});

  const countriesData = Object.keys(usersByCountry).map((country) => ({
    name: country,
    value: usersByCountry[country],
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-container">
  <h2 className="dashboard-title">Tableau de Bord</h2>

  <div className="dashboard-grid">

    <div className="dashboard-card stats-card">
      <h3>Statistiques Générales</h3>
      <p><strong>Total des utilisateurs :</strong> {totalUsers}</p>
      <p><strong>Utilisateurs actifs (admin) :</strong> {activeUsers}</p>
    </div>

    <div className="dashboard-card chart-card">
      <h3>Répartition par Pays</h3>
      <PieChart width={350} height={350}>
        <Pie
          data={countriesData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          dataKey="value"
        >
          {countriesData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>

   
    <div className="dashboard-card chart-card bar-chart">
      <h3>Répartition par Pays (Graphique en barres)</h3>
      <BarChart width={500} height={250} data={countriesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  </div>
</div>

  );
};

export default Dashboard;
