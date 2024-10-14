import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Camera, Scissors } from 'lucide-react';
import apiService from '../services/ApiService';
import Loading from './animations/Loading';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: '',
    phoneNumber: '',
    address: '',
    gender: '',
    photo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const [isLoading, setIsLoading] = useState(false);

  const [loadImage, setLoadImage] = useState(null);

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      photo: e.target.files[0]
    }));

    const file = e.target.files[0];
    if (file) {
      setLoadImage(URL.createObjectURL(file) );
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setIsLoading(true);
    try{
      const response = await apiService.request('post', '/users/register', formData);
      console.log(response);
    }catch(err){
      console.log(err);
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FFF5F5] to-[#FFF0F0]">
      <div className="w-full max-w-6xl m-auto flex shadow-2xl rounded-xl overflow-hidden">
        {/* Left side - decorative */}
        <div className="hidden lg:flex lg:w-1/3 bg-[#CC8C87] p-12 flex-col justify-between items-center">
          <div className="w-full text-white">
            <h1 className="text-4xl font-bold mb-6">Threadline</h1>
            <p className="text-xl">Le réseau social des créateurs de mode</p>
          </div>
          <div className="w-full flex justify-center">
            <Scissors className="text-white" size={120} />
          </div>
          <p className="text-white text-sm">Tissez votre réseau, créez votre style</p>
        </div>
        
        {/* Right side - register form */}
        <div className="w-full lg:w-2/3 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#CC8C87]">Rejoignez l'aventure Threadline !</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-[#EAB0B7] rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={formData.gender === 'MALE'}
                    onChange={handleChange}
                    className="form-radio text-[#CC8C87]"
                    required
                  />
                  <span className="ml-2 text-gray-700">Homme</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={formData.gender === 'FEMALE'}
                    onChange={handleChange}
                    className="form-radio text-[#CC8C87]"
                    required
                  />
                  <span className="ml-2 text-gray-700">Femme</span>
                </label>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo de profil (optionnel)</label>
              <div className="flex items-center">
              <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-[#EAB0B7]">
                  {loadImage ? (
                    <img src={loadImage} alt="Aperçu" className="h-full w-full object-cover" />
                    ) : (
                    <Camera className="h-full w-full text-white p-2" />
                  )}
                </span>
                <label
                  htmlFor="photo"
                  className="ml-5 bg-white py-2 px-3 border border-[#CC8C87] rounded-full shadow-sm text-sm leading-4 font-medium text-[#242424] hover:bg-[#EAB0B7] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC8C87] cursor-pointer transition duration-300"
                >
                  Charger
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#CC8C87] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#EAB0B7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CC8C87] transition-all duration-300 ease-in-out'} `}
                disabled={isLoading}
              >
                {
                  isLoading ? (
                    <Loading/>
                  ) : ("S'inscrire")
                }
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="font-medium text-[#CC8C87] hover:text-[#EAB0B7] transition-colors duration-300 ease-in-out">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;