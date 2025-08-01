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
          alt="The Founder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">The Founder</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Meet the visionary leader who established Lasa Schools
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Founder Profile */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-80 overflow-hidden rounded-lg">
                <LazyImage 
                  src={classImage}
                  alt="Chief Dr. Pius Chinedu Ogbonnia Okoh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Chief Dr. Pius Chinedu Ogbonnia Okoh</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {data.founderBio}
                </p>
                {/* <div className="space-y-3">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Educational Visionary</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Ph.D. in Education</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Community Leader</span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Founder's Message */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Founder's Message</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-xl italic mb-6">
                "Education is the most powerful weapon which you can use to change the world. 
                At Lasa Schools, we believe that every child deserves access to quality education 
                regardless of their financial background."
              </p>
              <p className="mb-6">
                Our journey began with a simple yet powerful vision: to create an educational 
                institution that would not only excel academically but also nurture the character 
                and values of our students. We wanted to build a school where financial constraints 
                would never be a barrier to education.
              </p>
              <p className="mb-6">
                Over the years, we have seen this vision come to life through the dedication of 
                our teachers, the support of our parents, and the hard work of our students. 
                Today, Lasa Schools stands as a testament to what can be achieved when we put 
                education and character development at the forefront of our mission.
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

        {/* Key Achievements */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Key Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <achievement.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Legacy Section */}
        {/* <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">His Legacy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">45+</div>
              <p className="text-gray-600">Years of Educational Excellence</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
              <p className="text-gray-600">Students Impacted</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <p className="text-gray-600">Qualified Teachers</p>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        {/* <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Continue His Legacy</h3>
            <p className="text-xl mb-8 opacity-90">
              Join us in upholding the values and vision of our founder
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

export default Founder; 