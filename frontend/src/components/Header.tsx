import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  ChevronDown, Menu, X } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate()

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
          <div className="flex items-center cursor:pointer" onClick={() => {navigate('/')}}>
            <img src={logo} width={50} height={50} alt="LASA Logo" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">LASA</h1>
              <p className="text-xs text-gray-600">Liberal Arts and Science Academy</p>
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

              {/* Our School Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('school')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/about') || isActive('/vision') || isActive('/founder') || isActive('/dress-code') || isActive('/daily-schedule') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  OUR SCHOOL
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>
                {activeDropdown === 'school' && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-gray-800 text-white rounded-md shadow-lg py-2">
                    <Link to="/about" className="block px-4 py-2 hover:bg-gray-700">About Us</Link>
                    <Link to="/vision" className="block px-4 py-2 hover:bg-gray-700">Our Vision and Mission</Link>
                    <Link to="/dress-code" className="block px-4 py-2 hover:bg-gray-700">Dress Code</Link>
                    <Link to="/daily-schedule" className="block px-4 py-2 hover:bg-gray-700">Daily Schedule</Link>
                  </div>
                )}
              </div>

              <Link 
                to="/admissions" 
                className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/admissions') ? 'text-blue-600 border-blue-600' : ''}`}
              >
                ADMISSIONS
              </Link>

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
                    <Link to="/extracurricular" className="block px-4 py-2 hover:bg-gray-700">Extra-Curricular</Link>
                  </div>
                )}
              </div>

              {/* News & Events Dropdown */}
              <div 
                className="relative group h-full" 
                onMouseEnter={() => setActiveDropdown('news')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`h-full flex items-center px-4 text-gray-800 hover:text-blue-600 transition-colors border-b-2 border-transparent hover:border-blue-600 ${isActive('/news') || isActive('/events') ? 'text-blue-600 border-blue-600' : ''}`}
                >
                  NEWS AND EVENTS
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

              {/* Our School Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('school-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/about') || isActive('/vision') || isActive('/founder') || isActive('/dress-code') || isActive('/daily-schedule') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  OUR SCHOOL
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'school-mobile' ? 'rotate-180' : ''}`} />
                </button>
                {activeDropdown === 'school-mobile' && (
                  <div className="pl-4 space-y-1">
                    <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">About Us</Link>
                    <Link to="/vision" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Our Vision and Mission</Link>
                    <Link to="/dress-code" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Dress Code</Link>
                    <Link to="/daily-schedule" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Daily Schedule</Link>
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
                    <Link to="/extracurricular" onClick={closeMobileMenu} className="block px-3 py-2 text-sm text-gray-600 hover:text-blue-600">Extra-Curricular</Link>
                  </div>
                )}
              </div>

              {/* News & Events Mobile */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('news-mobile')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between ${isActive('/news') || isActive('/events') ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'}`}
                >
                  NEWS AND EVENTS
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