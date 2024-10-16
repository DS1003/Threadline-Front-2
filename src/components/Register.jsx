import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, Camera, Scissors } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiService from '../services/ApiService';
import Loading from './animations/Loading';
import Alert from './ui/Alert';

const Register = () => {
  const navigate = useNavigate();
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

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loadImage, setLoadImage] = useState(null);
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const photo = e.target.files[0];
    if (photo && (photo.type.startsWith('image/'))) {
      setFormData(prevState => ({ ...prevState, photo: photo }));
      setLoadImage(URL.createObjectURL(photo));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = "Le prénom est requis";
    if (!formData.lastname) newErrors.lastname = "Le nom est requis";
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = "Les mots de passe ne correspondent pas";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Le numéro de téléphone est requis";
    if (!formData.address) newErrors.address = "L'adresse est requise";
    if (!formData.gender) newErrors.gender = "Le genre est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setGeneralError('');
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
          data.append(key, formData[key]);
      }); 
      const response = await apiService.request('post', '/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      toast.success('Inscription réussie ! Redirection vers la page de connexion...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setErrors(err.response.data);
      } else {
        setGeneralError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name, label, icon, type = 'text') => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {icon}
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`pl-10 w-full px-4 py-2 border ${errors[name] ? 'border-red-500' : 'border-[#EAB0B7]'} rounded-md focus:ring-[#CC8C87] focus:border-[#CC8C87] transition-all duration-300 ease-in-out`}
        />
      </div>
      {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name]}</p>}
    </div>
  );

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
            <img src="https://res.cloudinary.com/drxouwbms/image/upload/v1729028749/ThreadLogo_vejh4o.png" className="text-white" size={120} />
          </div>
          <p className="text-white text-sm">Tissez votre réseau, créez votre style</p>
        </div>
        
        {/* Right side - register form */}
        <div className="w-full lg:w-2/3 bg-white p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#CC8C87]">Rejoignez l'aventure Threadline !</h2>
          {generalError && <Alert variant="error">{generalError}</Alert>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderInput('firstname', 'Prénom', <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />)}
            {renderInput('lastname', 'Nom', <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />)}
            {renderInput('password', 'Mot de passe', <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />, 'password')}
            {renderInput('confirm_password', 'Confirmer le mot de passe', <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />, 'password')}
            {renderInput('email', 'Email', <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />, 'email')}
            {renderInput('phoneNumber', 'Numéro de téléphone', <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />, 'tel')}
            {renderInput('address', 'Adresse', <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#CC8C87]" size={18} />)}
            
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
                  />
                  <span className="ml-2 text-gray-700">Femme</span>
                </label>
              </div>
              {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
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
                {isLoading ? <Loading /> : "S'inscrire"}
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
      <ToastContainer />
    </div>
  );
};

export default Register;