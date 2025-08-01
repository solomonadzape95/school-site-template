import React from 'react';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/class.jpg';


const Curricular: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', icon: '🔢', description: 'Advanced mathematics including algebra, geometry, calculus, and statistics.' },
    { name: 'English Language', icon: '📚', description: 'Comprehensive English language studies including literature, grammar, and composition.' },
    { name: 'Sciences', icon: '🔬', description: 'Physics, Chemistry, and Biology with practical laboratory sessions.' },
    { name: 'Social Studies', icon: '🌍', description: 'History, Geography, Government, and Economics.' },
    { name: 'Computer Science', icon: '💻', description: 'Programming, ICT, and digital literacy skills.' },
    { name: 'Languages', icon: '🗣️', description: 'French, Igbo, and other local and international languages.' },
    { name: 'Arts & Music', icon: '🎨', description: 'Creative arts, music appreciation, and cultural studies.' },
    { name: 'Physical Education', icon: '⚽', description: 'Sports, fitness, and health education.' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
    
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="The Founder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Curricular Activities</h1>
          <p className="text-xl">Comprehensive Academic Excellence</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Introduction */}
          {/* <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Academic Curriculum</h2>
              <p className="text-lg text-gray-600">
                We offer a comprehensive curriculum designed to develop well-rounded individuals 
                with strong academic foundations, critical thinking skills, and practical knowledge 
                for future success.
              </p>
            </div>
          </div> */}

      
          {/* Subjects */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Core Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{subject.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
                  <p className="text-sm text-gray-600">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>

       
        </div>
      </section>
    </div>
  );
};

export default Curricular; 