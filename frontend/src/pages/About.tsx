import React from 'react';
import { useSchool } from '../context/SchoolContext';
import { Users, Award, BookOpen, Heart } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import schoolImage from '../assets/school.jpg';

const About: React.FC = () => {
  const { data } = useSchool();

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for academic excellence and personal achievement in all our endeavors.'
    },
    {
      icon: Heart,
      title: 'Character',
      description: 'Building strong moral character and ethical values in our students.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Fostering a sense of belonging and mutual respect among all members.'
    },
    {
      icon: BookOpen,
      title: 'Innovation',
      description: 'Embracing new ideas and methods to enhance learning experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={schoolImage}
          alt="About Lasa Schools"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our School</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the rich history and values that make Lasa Schools a place of excellence
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* School Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.aboutSchool}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission and Vision */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide quality education that empowers students with knowledge, skills, and values 
              necessary for lifelong learning and responsible citizenship in a global society.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              {data.vision}
            </p>
          </div>
        </div> */}

        {/* School Activities */}
       

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
            <p className="text-xl mb-8 opacity-90">
              Be part of our journey in shaping the future leaders of tomorrow
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Apply Now
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default About; 