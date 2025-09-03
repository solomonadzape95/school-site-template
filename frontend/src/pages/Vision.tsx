import React from 'react';
// import { Target, Eye, Award, Users } from 'lucide-react';
import Image from '../components/common/Image';

const Vision: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image 
          usageId="vision"
          alt="Vision and Mission"
          className="w-full h-full object-cover"
          priority="high"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Vision & Mission</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our guiding principles that shape the future of education
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Motto Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Motto</h2>
            <p className="text-4xl font-bold text-blue-600 leading-relaxed mb-8">
              Think, Act, Live
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To raise generations who will critically and creatively think, skilfully and rightly act, 
              and comfortably live with excellence in a competitive and rapidly changing world.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To set a positive example in education by promoting self-discipline and excellence in learning 
              in order to develop a sense of uniqueness in our learners and by so doing become self-reliant 
              and role model for others.
            </p>
            <div className="w-24 h-1 bg-[#eb4c37] mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vision; 