import React from 'react';
import { Trophy, Music, Award } from 'lucide-react';
import classImage from '../assets/class.jpg';
import LazyImage from '../components/LazyImage';

const Extracurricular: React.FC = () => {
  const activities = [
    {
      title: 'Sports & Athletics',
      icon: Trophy,
      description: 'Comprehensive sports program including football, basketball, athletics, swimming, and table tennis. Students participate in inter-house competitions and represent the school in regional tournaments.',
    
    },
    {
      title: 'Arts & Culture',
      icon: Music,
      description: 'Creative arts program encompassing music, drama, dance, visual arts, and cultural activities. Students showcase their talents through annual performances and exhibitions.',
     
    },
    {
      title: 'Academic Competitions',
      icon: Award,
      description: 'Participation in academic competitions such as quiz competitions, science fairs, mathematics olympiads, and essay writing contests at local and national levels.',
      
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="The Founder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Extra-curricular Activities</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Beyond academics: Developing well-rounded individuals through diverse activities and experiences
          </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-10">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center mr-6`}>
                  <activity.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{activity.title}</h3>
              </div>
              
              <p className="text-gray-600 mb-8 text-base leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Extracurricular; 