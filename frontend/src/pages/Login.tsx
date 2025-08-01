import React, { useState } from 'react';
import { User, Lock, Bookmark } from 'lucide-react';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-600 mb-3">
              PORTAL LOGIN
            </h1>
            <div className="relative">
              <div className="h-px bg-blue-600"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Bookmark className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email/Phone Field */}
            <div>
              <div className="flex items-center mb-3">
                <User className="w-5 h-5 text-gray-600 mr-3" />
                <label className="text-base font-medium text-gray-700">
                  Email/Phone Number
                </label>
              </div>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b-2 border-blue-600 focus:outline-none focus:border-blue-700 text-base"
                placeholder="Enter your email or phone number"
              />
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center mb-3">
                <Lock className="w-5 h-5 text-gray-600 mr-3" />
                <label className="text-base font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-b-2 border-blue-600 focus:outline-none focus:border-blue-700 text-base"
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-base text-gray-600 hover:text-blue-600 transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors uppercase tracking-wide text-base"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-10 pt-8 border-t border-gray-100">
            <p className="text-base text-gray-500">
              powered by <span className="font-medium text-gray-700">School Cater</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 