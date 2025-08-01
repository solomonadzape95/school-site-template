import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

const ResultChecker: React.FC = () => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    session: '',
    term: '',
    cardPinNumber: '',
    cardSerialNumber: ''
  });
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sessions = ['2024/2025', '2023/2024', '2022/2023'];
  const terms = ['First Term', 'Second Term', 'Third Term'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Result Checker Form */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-10">
            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                RESULT CHECKER
              </h1>
              <div className="flex justify-center">
                <Bookmark className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Enter your registration number"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Session
                </label>
                <select
                  name="session"
                  value={formData.session}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                >
                  <option value="">Select Session</option>
                  {sessions.map(session => (
                    <option key={session} value={session}>{session}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Term
                </label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                >
                  <option value="">Select Term</option>
                  {terms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Card Pin Number
                </label>
                <input
                  type="password"
                  name="cardPinNumber"
                  value={formData.cardPinNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Enter your card pin number"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Card Serial Number
                </label>
                <input
                  type="text"
                  name="cardSerialNumber"
                  value={formData.cardSerialNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="Enter your card serial number"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isLoading ? 'Checking...' : 'Submit'}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-10 pt-8 border-t border-gray-100">
              <p className="text-base text-gray-500">
                powered by <span className="font-medium text-gray-700">School Cater</span>
              </p>
            </div>
          </div>

          {/* Right Section - Guidelines */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Guidelines
              </h2>
              <div className="h-px bg-blue-600 mb-8"></div>
              
              <p className="text-base text-gray-600 mb-8">
                To check your result, follow the simple steps listed below. After checking your result, you can save it or print immediately.
              </p>

              <ol className="space-y-6 text-base text-gray-700">
                <li className="flex">
                  <span className="font-bold mr-4">1.</span>
                  <span>Enter your Registration Number. This will be provided to you by your school as your "Student ID", "Registration Number" or any other similar name.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">2.</span>
                  <span>Select the session in which you want to check your result.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">3.</span>
                  <span>Select the term.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">4.</span>
                  <span>Scratch the hidden area at the back of the scratch card and enter the revealed pin as your card pin number.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">5.</span>
                  <span>Enter the serial number of the scratch card written on the lower side at the back of the scratch card.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">6.</span>
                  <span>Click the Submit button.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Results Display */}
        {showResults && (
          <div className="mt-12 bg-white border border-gray-200 rounded-lg shadow-lg p-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 text-base">
                Results found! You can now view and download your academic performance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultChecker; 