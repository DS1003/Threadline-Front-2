import React from 'react';
import withAuth from '../hoc/withAuth';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  LogOut
} from 'lucide-react';

// Données simulées pour les graphiques
const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Fév', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Avr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const visitorData = [
  { name: 'Lun', value: 1000 },
  { name: 'Mar', value: 1200 },
  { name: 'Mer', value: 1500 },
  { name: 'Jeu', value: 1300 },
  { name: 'Ven', value: 1700 },
  { name: 'Sam', value: 1400 },
  { name: 'Dim', value: 1100 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% depuis le mois dernier
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Admin</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Bienvenue dans votre espace administrateur</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Utilisateurs totaux"
            value="2,451"
            icon={Users}
            trend={12}
            color="bg-blue-600"
          />
          <StatCard
            title="Revenus"
            value="$45,251"
            icon={DollarSign}
            trend={8.1}
            color="bg-green-600"
          />
          <StatCard
            title="Commandes"
            value="456"
            icon={ShoppingCart}
            trend={-3.2}
            color="bg-purple-600"
          />
          <StatCard
            title="Taux de conversion"
            value="3.2%"
            icon={Activity}
            trend={2.4}
            color="bg-orange-600"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ventes mensuelles</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    fill="#EEF2FF" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Visitors Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Visiteurs hebdomadaires</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#4F46E5" 
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Activité récente</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { user: 'Jean Dupont', action: 'a créé un nouveau compte', time: 'Il y a 2 minutes' },
              { user: 'Marie Martin', action: 'a effectué une commande', time: 'Il y a 5 minutes' },
              { user: 'Pierre dubois', action: 'a modifié son profil', time: 'Il y a 12 minutes' },
            ].map((activity, index) => (
              <div key={index} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600"> {activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);