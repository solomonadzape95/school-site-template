import React from 'react';
import { Trophy, Music, Award, Users, Heart, BookOpen, Palette, Globe } from 'lucide-react';
import Image from '../components/common/Image';

const Extracurricular: React.FC = () => {
  const activities = [
    {
      title: 'Sports & Athletics',
      icon: Trophy,
      description: 'Comprehensive sports program including football, basketball, athletics, swimming, and table tennis. Students participate in inter-house competitions and represent the school in regional tournaments.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Arts & Culture',
      icon: Music,
      description: 'Creative arts program encompassing music, drama, dance, visual arts, and cultural activities. Students showcase their talents through annual performances and exhibitions.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Academic Competitions',
      icon: Award,
      description: 'Participation in academic competitions such as quiz competitions, science fairs, mathematics olympiads, and essay writing contests at local and national levels.',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Leadership & Service',
      icon: Users,
      description: 'Student government, prefect system, and community service programs that develop leadership skills and social responsibility.',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Health & Wellness',
      icon: Heart,
      description: 'Health education, fitness programs, and wellness activities that promote physical and mental well-being.',
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Technology & Innovation',
      icon: BookOpen,
      description: 'Coding clubs, robotics, and technology workshops that foster innovation and digital literacy skills.',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Creative Arts',
      icon: Palette,
      description: 'Visual arts, crafts, and creative expression activities that nurture artistic talents and creativity.',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      title: 'Cultural Exchange',
      icon: Globe,
      description: 'International cultural programs, language clubs, and cultural exchange activities that promote global awareness.',
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  const benefits = [
    'Develops leadership and teamwork skills',
    'Enhances creativity and artistic expression',
    'Promotes physical fitness and health',
    'Builds confidence and self-esteem',
    'Fosters social skills and friendships',
    'Provides opportunities for personal growth',
    'Encourages community involvement',
    'Prepares students for future challenges'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image 
          usageId="extracurriculars"
          alt="LASA Extra-curricular Activities"
          className="w-full h-full object-cover"
          priority="high"
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
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Holistic Development</h2>
            <p className="text-lg text-gray-600 mb-4">
              At LASA, we believe that education extends far beyond the classroom. Our comprehensive extra-curricular 
              program is designed to develop well-rounded individuals who are not only academically excellent but also 
              socially responsible, physically fit, and creatively expressive.
            </p>
            <p className="text-lg text-gray-600">
              We teach character, respect, and moral values that stay with our learners for life, helping them grow 
              in excellence, confidence, and purpose. Our activities promote health, sports, and team spirit – because 
              education is beyond books.
            </p>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${activity.color} rounded-lg flex items-center justify-center mr-4`}>
                    <activity.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Benefits of Extra-curricular Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Philosophy</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-6 text-center">
              We believe that a well-rounded education includes experience in the sciences, arts, sports and variety 
              of extra-curricular activities. At LASA, we emphasize both academic attainment and character development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-xl font-semibold mb-2">Academic Excellence</h3>
                <p className="opacity-90">Strong foundation in core subjects with innovative teaching methods</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Character Development</h3>
                <p className="opacity-90">Building moral values, integrity, and leadership skills</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Holistic Growth</h3>
                <p className="opacity-90">Physical, emotional, social, and intellectual development</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extracurricular; 