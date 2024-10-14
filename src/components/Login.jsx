import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Mail, Lock, Facebook, Instagram } from 'lucide-react';
import apiService from '../services/ApiService';
import Loading from './animations/Loading';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(''); // État pour stocker les erreurs
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Réinitialiser l'erreur avant une nouvelle tentative

    try {
      const response = await apiService.request('post', '/users/login', formData);
      const { token, user } = response.data;
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate('/feed');
    } catch (err) {
      console.error(err);
      setError('Erreur de connexion. Veuillez vérifier vos informations et réessayer.'); // Afficher l'erreur
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0]">
      <div className="w-full max-w-4xl m-auto flex shadow-2xl rounded-xl overflow-hidden">
        {/* Left side - decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#CC8C87] p-12 flex-col justify-between items-center">
          <div className="w-full text-white">
            <h1 className="text-4xl font-bold mb-6">Threadline</h1>
            <p className="text-xl">Le réseau social des créateurs de mode</p>
          </div>
          <div className="w-full flex justify-center">
            <Scissors className="text-white" size={120} />
          </div>
          <p className="text-white text-sm">Tissez votre réseau, créez votre style</p>
        </div>

        {/* Right side - login form */}
        <div className="w-full lg:w-1/2 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#CC8C87]">Bienvenue sur Threadline</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange} 
                  placeholder="example@gmail.com"
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out" 
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de Passe</label>
              <div className="relative mb-5">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out" 
                  required
                />
              </div>
              <Link to="/forgot-password" className="text-sm text-[#CC8C87] hover:text-[#EAB0B7] transition-colors duration-300 ease-in-out">Mot de passe oublié ?</Link>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="text-red-600 text-sm text-center mb-4">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className={`w-full bg-[#CC8C87] text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#EAB0B7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC8C87] transition-all duration-300 ease-in-out'} `}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Se connecter"}
            </button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">ou continuer avec</p>
            <div className="mt-4 flex justify-center space-x-4">
              {[Facebook, Instagram].map((Icon, index) => (
                <button 
                  key={index}
                  className="p-2 border border-[#EAB0B7] rounded-full hover:bg-[#FFF5F5] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC8C87]"
                >
                  <Icon size={24} className="text-[#CC8C87]" />
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Nouveau sur Threadline ? {' '}
            <Link to="/register" className="font-medium text-[#CC8C87] hover:text-[#EAB0B7] transition-colors duration-300 ease-in-out">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
