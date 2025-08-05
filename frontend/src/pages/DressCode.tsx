import React from 'react';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/class.jpg';

const DressCode: React.FC = () => {
  const uniformSections = [
    {
      title: 'Nursery School',
      mainUniform: {
        description: 'Pink shirt on dark blue short/skirt with customized bow tie and black shoes with milk-coloured stockings.',
        image: '👶'
      },
      sportsWear: {
        description: 'Fully customized with dark blue and pink colours and white canvas shoes with milk-coloured stockings.',
        image: '⚽'
      },
      ceremonialWear: {
        description: 'Customized ceremonial wear and black shoes with milk-coloured stockings.',
        image: '🎩'
      }
    },
    {
      title: 'Primary School',
      mainUniform: {
        description: 'White shirt on dark blue short/skirt with customized long tie and black shoes with white stockings.',
        image: '👔'
      },
      sportsWear: {
        description: 'Fully customized with dark blue and white colours and white canvas shoes with white stockings.',
        image: '🏃'
      },
      ceremonialWear: {
        description: 'Customized ceremonial wear and black shoes with white stockings.',
        image: '🎓'
      }
    },
    {
      title: 'Secondary School',
      mainUniform: {
        description: 'White shirt on dark blue trouser/skirt with customized long tie and black shoes with white stockings.',
        image: '🎒'
      },
      sportsWear: {
        description: 'Fully customized with dark blue and white colours and white canvas shoes with white stockings.',
        image: '🏀'
      },
      ceremonialWear: {
        description: 'Customized ceremonial wear and black shoes with white stockings.',
        image: '🎭'
      }
    }
  ];

  const dressCodeSchedule = [
    { day: 'Mondays and Wednesdays', uniform: 'Main Uniform' },
    { day: 'Tuesdays and Thursdays', uniform: 'Sports Wear' },
    { day: 'Fridays', uniform: 'Ceremonial Wear' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="LASA Dress Code"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Dress Code</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our dress code highlights the dignity and seriousness of purpose with which we regard our education
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">School Uniform Policy</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our dress code highlights the dignity and seriousness of purpose with which we regard our education. 
              Students are expected to arrive in school each day wearing an approved school uniform.
            </p>
            <p className="text-lg text-gray-600">
              All students must come to class each day in clean and neat school uniform. All our school uniforms 
              are fully customized and are available in our school for purchasing. Different sections of our school 
              wear different designs of our uniform.
            </p>
          </div>
        </div>

        {/* Dress Code Schedule */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Dress Code Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dressCodeSchedule.map((schedule, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl mb-4">
                  {index === 0 ? '👔' : index === 1 ? '⚽' : '🎩'}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{schedule.day}</h3>
                <p className="text-gray-600 font-medium">{schedule.uniform}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Uniform Sections */}
        <div className="space-y-12">
          {uniformSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{section.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Uniform */}
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <div className="text-4xl mb-4">{section.mainUniform.image}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Main Uniform</h3>
                  <p className="text-gray-600 text-sm">{section.mainUniform.description}</p>
                </div>

                {/* Sports Wear */}
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-4xl mb-4">{section.sportsWear.image}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Sports Wear</h3>
                  <p className="text-gray-600 text-sm">{section.sportsWear.description}</p>
                </div>

                {/* Ceremonial Wear */}
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <div className="text-4xl mb-4">{section.ceremonialWear.image}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Ceremonial Wear</h3>
                  <p className="text-gray-600 text-sm">{section.ceremonialWear.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Important Notes</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
              <p className="text-gray-700">All uniforms must be clean, neat, and properly ironed.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
              <p className="text-gray-700">Shoes must be clean and properly maintained.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
              <p className="text-gray-700">Stockings must be the correct color for each section.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
              <p className="text-gray-700">All uniforms are available for purchase at the school.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
              <p className="text-gray-700">Students must adhere to the dress code schedule strictly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DressCode; 