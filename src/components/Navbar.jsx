import React, { useState, useEffect } from 'react';
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
  Grid,
  PlusCircle,
  Search,
  Briefcase,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  
  const user = {
    name: "John Doe",
    avatar: "https://avatars.githubusercontent.com/u/100100154?v=4"
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsProfileMenuOpen(false);
    navigate('/login');
  };

  const NavItem = ({ to, icon: Icon, children, notificationCount }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center justify-center w-14 h-14 rounded-xl transition-colors duration-200 relative ${
          isActive
            ? 'text-[#CC8C87] bg-[#FDF1F2]'
            : 'text-[#242424] hover:bg-[#FDF1F2]'
        }`
      }
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="w-6 h-6" />
      {notificationCount > 0 && (
        <span className="absolute top-1 right-1 bg-[#CC8C87] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {notificationCount}
        </span>
      )}
    </NavLink>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center flex-1">
            <NavLink to="/" className="flex-shrink-0 mr-10">
              <span className="titreSite text-4xl font-bold text-[#CC8C87]">Threadline</span>
            </NavLink>
            <div className="relative hidden sm:block max-w-xs w-full">
              <input
                type="text"
                placeholder="Rechercher sur Theardline"
                className="w-full px-4 py-2 rounded-full bg-[#f4f4f4] text-[#242424] border-none placeholder-[#77696A] focus:outline-none focus:ring-2 focus:ring-[#EAB0B7]"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#77696A]" />
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-center flex-1 space-x-2">
            <NavItem to="/" icon={Layout} />
            <NavItem to="/network" icon={Users} />
            <NavItem to="/messages" icon={Mail} notificationCount={3} />
            <NavItem to="/notifications" icon={Bell} notificationCount={5} />
          </div>

          {/* Profile and More */}
          <div className="flex items-center justify-end flex-1">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center h-10 rounded-full hover:bg-[#FDF1F2] transition-colors duration-200 mr-2 px-2"
                >
                  <img 
                    src={user.avatar}
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover mr-2"
                  />
                  <ChevronDown className="w-4 h-4 text-[#242424]" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FDF1F2] hover:bg-[#EAB0B7] transition-colors duration-200">
                  <Grid className="w-5 h-5 text-[#242424]" />
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-4 top-16 w-96 bg-white rounded-lg shadow-lg py-2 border border-[#EAB0B7]">
                    <div className="px-4 py-3 border-b border-[#EAB0B7]">
                      <div className="flex items-center">
                        <img 
                          src={user.avatar}
                          alt={user.name} 
                          className="w-14 h-14 rounded-full object-cover mr-3"
                        />
                        <div>
                          <p className="font-semibold text-[#242424]">{user.name}</p>
                          <p className="text-sm text-[#77696A]">Voir votre profil</p>
                        </div>
                      </div>
                    </div>
                    <NavLink
                      to="/settings"
                      className="flex items-center px-4 py-3 text-[#242424] hover:bg-[#FDF1F2]"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <div className="bg-[#EAB0B7] p-2 rounded-full mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span>Paramètres et confidentialité</span>
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-3 text-[#242424] hover:bg-[#FDF1F2]"
                    >
                      <div className="bg-[#EAB0B7] p-2 rounded-full mr-3">
                        <LogOut className="w-5 h-5 text-white" />
                      </div>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-4 py-2 bg-[#CC8C87] text-white rounded-md hover:bg-[#EAB0B7] transition-colors duration-200"
              >
                Connexion
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden ml-2 p-2 rounded-full text-[#242424] hover:bg-[#FDF1F2] transition-colors duration-200"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#EAB0B7] py-4">
            <div className="space-y-2 px-2">
              {isAuthenticated && (
                <div className="flex items-center px-3 py-2 border-b border-[#EAB0B7] mb-2">
                  <img 
                    src={user.avatar}
                    alt={user.name} 
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="font-semibold text-[#242424]">{user.name}</span>
                </div>
              )}
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Rechercher sur Theardline"
                  className="w-full px-4 py-2 rounded-full bg-[#FDF1F2] text-[#242424] placeholder-[#77696A] focus:outline-none focus:ring-2 focus:ring-[#EAB0B7]"
                />
              </div>
              <NavLink to="/" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md">
                <Layout className="w-5 h-5 mr-3" />
                Accueil
              </NavLink>
              <NavLink to="/network" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md">
                <Users className="w-5 h-5 mr-3" />
                Mon réseau
              </NavLink>
              <NavLink to="/create" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md">
                <PlusCircle className="w-5 h-5 mr-3" />
                Créer
              </NavLink>
              <NavLink to="/messages" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md">
                <Mail className="w-5 h-5 mr-3" />
                Messages
              </NavLink>
              <NavLink to="/notifications" className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md">
                <Bell className="w-5 h-5 mr-3" />
                Notifications
              </NavLink>
              
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/settings"
                    className="flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Paramètres
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-[#242424] hover:bg-[#FDF1F2] rounded-md"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="flex items-center px-4 py-2 bg-[#CC8C87] text-white rounded-md hover:bg-[#EAB0B7]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;