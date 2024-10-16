import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Layout,
  Users,
  Bell,
  Mail,
  User,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Search,
  ChevronDown,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = (props) => {
  const { user } = props;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let isAuthenticated = false;
  const notificationRef = useRef(null);

  if (user) {
    isAuthenticated = true
  }

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const notifications = [
    { id: 1, content: "Nouveau message de Alice", time: "Il y a 5 minutes", type: "message" },
    { id: 2, content: "Bob a aimé votre publication", time: "Il y a 1 heure", type: "like" },
    { id: 3, content: "Vous avez un nouveau follower", time: "Il y a 2 heures", type: "follow" },
    { id: 4, content: "Rappel : Évènement demain", time: "Il y a 1 jour", type: "event" },
    { id: 5, content: "Nouvelle mise à jour disponible", time: "Il y a 2 jours", type: "update" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, children, notificationCount, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-colors duration-200 relative ${isNotificationsOpen && Icon === Bell
        ? 'text-[#CC8C87] bg-[#FDF1F2]'
        : 'text-[#242424] hover:bg-[#FDF1F2]'
        }`}
    >
      {to ? (
        <NavLink to={to} className="flex items-center justify-center w-full h-full">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </NavLink>
      ) : (
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
      )}
      {notificationCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-0 right-0 bg-[#CC8C87] text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
        >
          {notificationCount}
        </motion.span>
      )}
    </motion.button>
  );

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <Mail className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />;
      case 'like':
        return <svg className="w-4 h-4 md:w-5 md:h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>;
      case 'follow':
        return <Users className="w-4 h-4 md:w-5 md:h-5 text-green-500" />;
      case 'event':
        return <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
      default:
        return <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />;
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'
        }`}
    >
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <NavLink to="/feed" className="flex-shrink-0 mr-4">
              <span className="titreSite text-2xl md:text-4xl font-bold z-20 bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7] text-transparent bg-clip-text">Threadline</span>
            </NavLink>
            <div className="relative hidden md:block max-w-xs w-full">
              <input
                type="text"
                placeholder="Rechercher sur Theardline"
                className="w-full px-4 py-2 rounded-full bg-[#f4f4f4] text-[#242424] border-none placeholder-[#77696A] focus:outline-none focus:ring-2 focus:ring-[#EAB0B7] transition-all duration-300"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#77696A]" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-2">
            <NavItem to="/feed" icon={Layout} />
            <NavItem to="/network" icon={Users} />
            <NavItem to="/messages" icon={Mail} notificationCount={3} />
            <NavItem
              icon={Bell}
              notificationCount={5}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            />
          </div>

          {/* Profile and More */}
          <div className="flex items-center justify-end flex-1">
            {isAuthenticated ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center h-10 rounded-full hover:bg-[#FDF1F2] transition-colors duration-200 mr-2 px-2"
                >
                  <img
                    src={user.photoUrl}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover mr-2 border-2 border-[#EAB0B7]"
                  />
                  <ChevronDown className="w-4 h-4 text-[#242424]" />
                </motion.button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 top-16 w-64 md:w-96 bg-white rounded-lg shadow-xl py-2 border border-[#EAB0B7] overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-[#EAB0B7] bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7]">
                      <div className="flex items-center">
                        <img
                          src={user.photoUrl}
                          alt=""
                          className="w-14 h-14 rounded-full object-cover mr-3 border-2 border-white"
                        />
                        <div>
                          <p className="font-semibold text-white">{user.firstname} {user.lastname}</p>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      to="/settings"
                      className="flex items-center px-4 py-3 text-[#242424] hover:bg-[#FDF1F2] transition-all duration-200"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="bg-[#EAB0B7] p-2 rounded-full mr-3">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <span>Paramètres et confidentialité</span>
                    </NavLink>

                    <button
                      onClick={handleProfileClick}
                      className="w-full flex items-center px-4 py-3 text-[#242424] hover:bg-[#FDF1F2] transition-all duration-200"
                    >
                      <div className="bg-[#EAB0B7] p-2 rounded-full mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span>Voir profil</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-[#242424] hover:bg-[#FDF1F2] transition-all duration-200"
                    >
                      <div className="bg-[#EAB0B7] p-2 rounded-full mr-3">
                        <LogOut className="w-5 h-5 text-white" />
                      </div>
                      <span>Déconnexion</span>
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink
                  to="/login"
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7] text-white rounded-md hover:from-[#EAB0B7] hover:to-[#CC8C87] transition-all duration-300"
                >
                  Connexion
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-2 p-2 rounded-full text-[#242424] hover:bg-[#FDF1F2] transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <motion.div
            ref={notificationRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-16 w-64 md:w-96 bg-white rounded-lg shadow-xl py-2 border border-[#EAB0B7] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-[#EAB0B7] bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7]">
              <h3 className="font-semibold text-lg text-white">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  whileHover={{ backgroundColor: "#FDF1F2" }}
                  className="px-4 py-3 border-b border-[#EAB0B7] transition-all duration-200"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#242424]">{notification.content}</p>
                      <p className="text-xs text-[#77696A] mt-1">{notification.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7]">
              <button className="w-full text-center text-white hover:underline font-medium transition-all duration-200">
                Voir toutes les notifications
              </button>
            </div>
          </motion.div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-[#EAB0B7] py-4"
          >
            <div className="space-y-2 px-2">
              {isAuthenticated && (
                <div className="flex items-center px-3 py-2 border-b border-[#EAB0B7] mb-2">
                  <img
                    src={user.photoUrl}
                    alt=""
                    className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-[#EAB0B7]"
                  />
                  <span className="font-semibold text-[#242424]">{user.firstname}</span>
                </div>
              )}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Rechercher sur Threadline"
                  className="w-full px-4 py-2 rounded-full bg-[#FDF1F2] text-[#242424] placeholder-[#77696A] focus:outline-none focus:ring-2 focus:ring-[#EAB0B7] transition-all duration-300"
                />
              </div>
              <motion.div className="space-y-2">
                <NavLink to="/" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200">
                  <Layout className="w-5 h-5 mr-3 text-[#CC8C87]" />
                  Accueil
                </NavLink>
                <NavLink to="/network" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200">
                  <Users className="w-5 h-5 mr-3 text-[#CC8C87]" />
                  Mon réseau
                </NavLink>
                <NavLink to="/create" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200">
                  <PlusCircle className="w-5 h-5 mr-3 text-[#CC8C87]" />
                  Créer
                </NavLink>
                <NavLink to="/messages" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200">
                  <Mail className="w-5 h-5 mr-3 text-[#CC8C87]" />
                  Messages
                </NavLink>
                <NavLink to="/notifications" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200">
                  <Bell className="w-5 h-5 mr-3 text-[#CC8C87]" />
                  Notifications
                </NavLink>
              </motion.div>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3 text-[#CC8C87]" />
                    Paramètres
                  </NavLink>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5 mr-3 text-[#CC8C87]" />
                    Déconnexion
                  </motion.button>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-[#CC8C87] to-[#EAB0B7] text-white rounded-md hover:from-[#EAB0B7] hover:to-[#CC8C87] transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </NavLink>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;