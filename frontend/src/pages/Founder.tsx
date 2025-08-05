import React from 'react';
import { useSchool } from '../context/SchoolContext';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/class.jpg';

const Founder: React.FC = () => {
  const { data } = useSchool();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="LASA Leadership"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Leadership</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet the visionary leaders who established LASA
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* School Leadership */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-80 overflow-hidden rounded-lg">
                <LazyImage 
                  src={classImage}
                  alt="LASA Leadership Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">LASA Leadership Team</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  LASA was founded in 2021 with a vision to provide quality education that empowers students 
                  with knowledge, skills, and values necessary for lifelong learning and responsible citizenship 
                  in a global society.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our leadership team is committed to upholding the school's motto "Think, Act, Live" and 
                  ensuring that every student receives the best possible education in a nurturing and 
                  supportive environment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Educational Excellence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Character Development</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700">Innovation in Education</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Our Vision</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl italic mb-6 text-center">
                "To raise generations who will critically and creatively think, skilfully and rightly act, 
                and comfortably live with excellence in a competitive and rapidly changing world."
              </p>
              <p className="mb-6">
                Our journey began with a simple yet powerful vision: to create an educational 
                institution that would not only excel academically but also nurture the character 
                and values of our students. We wanted to build a school where children are specially 
                groomed and trained for greater exploits in future.
              </p>
              <p className="mb-6">
                At LASA, we take education beyond the classroom. We build strong foundation in arts, 
                science and technology in a safe and supportive environment. We are known for our unique 
                academic superbness, innovative curriculum, and practical entrepreneurial life skills 
                development for self-reliance.
              </p>
              <p>
                As we look to the future, we remain committed to our founding principles while 
                embracing innovation and modern educational practices. Our goal is to continue 
                providing excellence in education and preparing our students for the challenges 
                and opportunities of tomorrow.
              </p>
            </div>
          </div>
        </div>

        {/* School Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2021</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Founded</h3>
              <p className="text-gray-600">LASA was established with a vision for educational excellence</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">School Sections</h3>
              <p className="text-gray-600">Nursery, Primary, and Secondary schools under one institution</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Faculties</h3>
              <p className="text-gray-600">Comprehensive academic structure for secondary education</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
            <p className="text-xl mb-8 opacity-90">
              Be part of our journey in shaping the future leaders of tomorrow
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder; 