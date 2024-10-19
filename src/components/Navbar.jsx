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
  Settings,
  Heart,
  UserPlus,
  MessageCircle,
  Flag,
  Edit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ user = null }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState('all');
  const [scrolled, setScrolled] = useState(false);
  const notificationRef = useRef(null);

  const isAuthenticated = !!user;

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const notifications = {
    all: [
      { id: 1, type: 'message', user: 'Alice Durand', content: 'vous a envoyé un message', time: '5 min ago', userImage: '/placeholder.svg?height=40&width=40' },
      { id: 2, type: 'abonnement', user: 'Bob Martin', content: 's\'est abonné à vous', time: '30 min ago', userImage: '/placeholder.svg?height=40&width=40' },
      { id: 3, type: 'signalement', user: 'Charlie Dupont', content: 'a signalé votre publication', time: '1 h ago', userImage: '/placeholder.svg?height=40&width=40' },
      { id: 4, type: 'like', users: ['David Lefebvre', 'Emma Moreau'], othersCount: 3, content: 'ont aimé votre publication', time: '2 h ago', userImages: ['/placeholder.svg?height=40&width=40', '/placeholder.svg?height=40&width=40'] },
      { id: 5, type: 'commentaire', user: 'Franck Dubois', content: 'a commenté votre publication', time: '3 h ago', userImage: '/placeholder.svg?height=40&width=40' },
    ],
    messages: [],
    abonnements: [],
    signalements: [],
  };

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
        return <Mail className="w-5 h-5 text-[#CC8C87]" />;
      case 'abonnement':
        return <UserPlus className="w-5 h-5 text-[#EAB0B7]" />;
      case 'signalement':
        return <Flag className="w-5 h-5 text-[#CC8C87]" />;
      case 'like':
        return <Heart className="w-5 h-5 text-[#EAB0B7]" />;
      case 'commentaire':
        return <MessageCircle className="w-5 h-5 text-[#CC8C87]" />;
      default:
        return <Bell className="w-5 h-5 text-[#CC8C87]" />;
    }
  };

  const NotificationTab = ({ type, isActive, onClick, count }) => (
    <button
      onClick={onClick}
      className={`flex-1 py-2 px-3 text-sm font-medium transition-colors duration-200 ${isActive
          ? 'text-[#CC8C87] border-b-2 border-[#CC8C87]'
          : 'text-[#77696A] hover:text-[#CC8C87]'
        }`}
    >
      <span className="capitalize">{type}</span>
      {count > 0 && <span className="ml-1 text-xs bg-[#CC8C87] text-white rounded-full px-2 py-1">{count}</span>}
    </button>
  );

  const NotificationItem = ({ notification }) => (
    <div className="py-3 px-4 border-b border-gray-200 hover:bg-[#FDF1F2] transition-colors duration-200">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {notification.type === 'like' ? (
            <div className="relative w-10 h-10">
              <img src={notification.userImages[0]} alt="" className="w-8 h-8 rounded-full absolute top-0 left-0" />
              <img src={notification.userImages[1]} alt="" className="w-8 h-8 rounded-full absolute bottom-0 right-0" />
            </div>
          ) : (
            <img src={notification.userImage} alt="" className="w-10 h-10 rounded-full" />
          )}
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-sm text-[#242424]">
            <span className="font-semibold">
              {notification.type === 'like'
                ? `${notification.users[0]}, ${notification.users[1]} et ${notification.othersCount} autres `
                : `${notification.user} `}
            </span>
            {notification.content}
          </p>
          <p className="mt-1 text-xs text-[#77696A]">{notification.time}</p>
        </div>
        <div className="flex-shrink-0 ml-3">
          {getNotificationIcon(notification.type)}
        </div>
      </div>
    </div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white'}`}
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
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-colors duration-200 ${isNotificationsOpen ? 'bg-[#FDF1F2] text-[#CC8C87]' : 'hover:bg-[#FDF1F2]'
                  }`}
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                {notifications.all.length > 0 && (
                  <span className="absolute top-0 right-0 bg-[#CC8C87] text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                    {notifications.all.length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    ref={notificationRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[400px] bg-white rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-[#242424]">Notifications</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setIsNotificationsOpen(false)}
                          className="text-[#77696A] hover:text-[#CC8C87]"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex border-b border-gray-200">
                      <NotificationTab
                        type="Tout"
                        isActive={activeNotificationTab === 'all'}
                        onClick={() => setActiveNotificationTab('all')}
                        count={notifications.all.length}
                      />
                      <NotificationTab
                        type="Messages"
                        isActive={activeNotificationTab === 'messages'}
                        onClick={() => setActiveNotificationTab('messages')}
                        count={notifications.messages.length}
                      />
                      <NotificationTab
                        type="Abonnements"
                        isActive={activeNotificationTab === 'abonnements'}
                        onClick={() => setActiveNotificationTab('abonnements')}
                        count={notifications.abonnements.length}
                      />
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications[activeNotificationTab].map((notification) => (
                        <NotificationItem key={notification.id} notification={notification} />
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                      <button className="px-4 py-2 bg-[#CC8C87] text-white rounded-md hover:bg-[#EAB0B7] transition-colors duration-200 text-sm font-medium">
                        Tout marquer comme lu
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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