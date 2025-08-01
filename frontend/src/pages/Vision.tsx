import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Target, Eye, Award, Users } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import aboveImage from '../assets/above.jpg';

const Vision: React.FC = () => {
  const { data } = useSchool();

  const visionPillars = [
    {
      icon: Target,
      title: 'Academic Excellence',
      description: 'Maintaining the highest standards of academic achievement and intellectual growth.'
    },
    {
      icon: Eye,
      title: 'Innovation',
      description: 'Embracing modern teaching methods and technology to enhance learning experiences.'
    },
    {
      icon: Award,
      title: 'Character Building',
      description: 'Developing strong moral values, leadership skills, and ethical principles.'
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Instilling a sense of responsibility and commitment to serving society.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={aboveImage}
          alt="Vision and Mission"
          className="w-full h-full object-cover"
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
        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Vision</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {data.vision}
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              To provide quality education that empowers students with knowledge, skills, and values 
              necessary for lifelong learning and responsible citizenship in a global society. 
              We are committed to fostering academic excellence, character development, and spiritual growth 
              while ensuring that financial constraints never become a barrier to education.
            </p>
            <div className="w-24 h-1 bg-[#eb4c37] mx-auto"></div>
          </div>
        </div>

        {/* Vision Pillars */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Pillars of Our Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visionPillars.map((pillar, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Core Values */}
        {/* <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Excellence</h4>
                  <p className="text-gray-600">Striving for the highest standards in all aspects of education and personal development.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Integrity</h4>
                  <p className="text-gray-600">Maintaining honesty, transparency, and ethical behavior in all our actions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Respect</h4>
                  <p className="text-gray-600">Valuing diversity and treating everyone with dignity and consideration.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Innovation</h4>
                  <p className="text-gray-600">Embracing new ideas and methods to enhance learning and growth.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Service</h4>
                  <p className="text-gray-600">Contributing positively to our community and society at large.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">6</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Growth</h4>
                  <p className="text-gray-600">Fostering continuous learning and personal development for all.</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Us in Our Mission</h3>
            <p className="text-xl mb-8 opacity-90">
              Together, we can build a brighter future for our children and our community
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Learn More About Us
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Vision; 