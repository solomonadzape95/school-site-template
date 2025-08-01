import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} width={50} height={50} alt="Lasa Schools Logo" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">LASA SCHOOLS</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center h-full">
            <div className="flex items-center h-full space-x-1">
              <Link 
                to="/" 
                className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/') ? 'text-blue-600 border-blue-600' : ''}`}
              >
                HOME
              </Link>

              {/* About Us Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/about') || isActive('/vision') || isActive('/founder') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  ABOUT US
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeDropdown === 'about' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                    <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">Our School</Link>
                    <Link to="/vision" className="block px-4 py-2 hover:bg-gray-700">Vision and Mission</Link>
                    <Link to="/founder" className="block px-4 py-2 hover:bg-gray-700">The Founder</Link>
                  </div>
                )}
              </div>

              {/* Academics Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('academics')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/curricular') || isActive('/extracurricular') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  ACADEMICS
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeDropdown === 'academics' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                    <Link to="/curricular" className="block px-4 py-2 hover:bg-gray-700">Curricular Activities</Link>
                    <Link to="/extracurricular" className="block px-4 py-2 hover:bg-gray-700">Extra-curricular Activities</Link>
                  </div>
                )}
              </div>

              <Link 
                to="/admissions" 
                className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/admissions') ? 'text-blue-600 border-blue-600' : ''}`}
              >
                ADMISSIONS
              </Link>

              {/* News & Events Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('news')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/news') || isActive('/events') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  NEWS & EVENTS
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeDropdown === 'news' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                    <Link to="/news" className="block px-4 py-2 hover:bg-gray-700">News</Link>
                    <Link to="/events" className="block px-4 py-2 hover:bg-gray-700">Events</Link>
                  </div>
                )}
              </div>

              {/* Portal Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('portal')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/login') || isActive('/result-checker') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  PORTAL
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeDropdown === 'portal' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                    <Link to="/login" className="block px-4 py-2 hover:bg-gray-700">Login</Link>
                    <Link to="/result-checker" className="block px-4 py-2 hover:bg-gray-700">Result Checker</Link>
                  </div>
                )}
              </div>

              <Link 
                to="/contact" 
                className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/contact') ? 'text-blue-600 border-blue-600' : ''}`}
              >
                CONTACT US
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
              >
                HOME
              </Link>

              {/* About Us Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('about-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/about') || isActive('/vision') || isActive('/founder') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  ABOUT US
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'about-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'about-mobile' && (
                  <div className="pl-4 space-y-1">
                    <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Our School</Link>
                    <Link to="/vision" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Vision and Mission</Link>
                    <Link to="/founder" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">The Founder</Link>
                  </div>
                )}
              </div>

              {/* Academics Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('academics-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/curricular') || isActive('/extracurricular') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  ACADEMICS
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'academics-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'academics-mobile' && (
                  <div className="pl-4 space-y-1">
                    <Link to="/curricular" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Curricular Activities</Link>
                    <Link to="/extracurricular" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Extra-curricular Activities</Link>
                  </div>
                )}
              </div>

              <Link 
                to="/admissions" 
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/admissions') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
              >
                ADMISSIONS
              </Link>

              {/* News & Events Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('news-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/news') || isActive('/events') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  NEWS & EVENTS
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'news-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'news-mobile' && (
                  <div className="pl-4 space-y-1">
                    <Link to="/news" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">News</Link>
                    <Link to="/events" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Events</Link>
                  </div>
                )}
              </div>

              {/* Portal Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('portal-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/login') || isActive('/result-checker') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  PORTAL
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'portal-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'portal-mobile' && (
                  <div className="pl-4 space-y-1">
                    <Link to="/login" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Login</Link>
                    <Link to="/result-checker" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Result Checker</Link>
                  </div>
                )}
              </div>

              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
              >
                CONTACT US
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 