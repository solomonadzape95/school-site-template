import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* School Info */}
          <div className='lg:col-span-3'>
            <img src={logo} width={60} height={60} alt="LASA Logo"/>
            <h3 className="text-2xl font-bold mb-6 mt-2">LASA</h3>
            <p className="text-sm text-gray-400 mb-2">Liberal Arts and Science Academy</p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Excellence in Education Since 2021. We are committed to providing quality education 
              and fostering academic excellence, character development, and self-reliance.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              At LASA, we take education beyond the classroom. We build strong foundation in arts, 
              science and technology in a safe and supportive environment. We are known for our unique 
              academic superbness, innovative curriculum, and practical entrepreneurial life skills development for self-reliance.
            </p>
           
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  Our School
                </Link>
              </li>
              <li>
                <Link to="/admissions" className="text-gray-300 hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link to="/curricular" className="text-gray-300 hover:text-white transition-colors">
                  Academics
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
             
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">17, Chukwuma Ofoke Street</p>
                  <p className="text-gray-300">Omege, Abakaliki</p>
                  <p className="text-gray-300">Ebonyi State, Nigeria</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <div>
                  <a href="tel:+2347037933281" className="text-gray-300 hover:text-white transition-colors block">
                    +234 703 793 3281
                  </a>
                  <a href="tel:+2348168418960" className="text-gray-300 hover:text-white transition-colors block">
                    +234 816 841 8960
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:lasaabakaliki@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  lasaabakaliki@gmail.com
                </a>
              </div>
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Mon - Fri: 8:00 AM - 3:00 PM</p>
                  <p className="text-gray-300">Office: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          {/* <div>
            <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to stay updated with the latest news and events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © {currentYear} LASA - Liberal Arts and Science Academy. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Motto: Think, Act, Live
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-300 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 