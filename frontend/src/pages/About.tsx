import React from 'react';
import { Users, Award, BookOpen, Heart, Target, Zap, Shield } from 'lucide-react';
import Image from '../components/common/Image';

const About: React.FC = () => {

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'Maintaining honesty, transparency, and ethical behavior in all our actions.'
    },
    {
      icon: Award,
      title: 'Diligence',
      description: 'Striving for academic excellence and personal achievement in all our endeavors.'
    },
    {
      icon: Zap,
      title: 'Creativity',
      description: 'Embracing new ideas and methods to enhance learning experiences.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for the highest standards in all aspects of education and personal development.'
    },
    {
      icon: BookOpen,
      title: 'Innovation',
      description: 'Embracing new ideas and methods to enhance learning experiences.'
    },
    {
      icon: Users,
      title: 'Self-reliance',
      description: 'Fostering independence and confidence in our students.'
    },
    {
      icon: Heart,
      title: 'Leadership',
      description: 'Building strong moral character and developing leadership skills.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image 
          usageId="about"
          alt="About LASA"
          className="w-full h-full object-cover"
          priority="high"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our School</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the rich history and values that make LASA a place of excellence
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* School Overview */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome to LASA</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Liberal Arts and Science Academy (LASA) is a unique and fast-growing prestigious citadel of learning, 
              situated in a serene and conducive environment, at the heart of the Capital City of Ebonyi State, 
              Abakaliki, Nigeria, where children are specially groomed and trained for greater exploits in future.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              LASA is a group of schools comprising of Nursery, Primary and Secondary schools. The Nursery School 
              comprises of Creche, Pre-Nursery & Nursery 1 – 3 classes, the Primary School comprises of Primary 1 – 5 classes, 
              while the Secondary School comprises of both Junior (JSS1 – JSS3 classes) and Senior (SSS 1 – SSS 3 classes) Schools.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              Excellence in Education Since 2021. We are committed to providing quality education and fostering 
              academic excellence, character development, and self-reliance.
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

        {/* Philosophy Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Philosophy</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              We see our learners as unique individuals who need a secure, caring and stimulating environment 
              in which to grow and mature emotionally, intellectually, physically and socially. At LASA, 
              we emphasize both academic attainment and character development. We also believe that a well-rounded 
              education includes experience in the sciences, arts, sports and variety of extra-curricular activities.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in the philosophy that learning styles differ. In this regard, we design our teaching 
              and learning process to accommodate the different learning styles of our learners through a 
              well-planned personalized learning.
            </p>
          </div>
        </div>

        {/* Aims and Objectives */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Aims and Objectives</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                  <p className="text-gray-700">To create a happy, secure and stimulating environment where each child, irrespective of gender, race, religion and family background is taught how to bring out the best of his/her abilities.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                  <p className="text-gray-700">To encourage creativity, curiosity and analytical thoughts; fostering an environment or mindset where individuals are motivated to explore new ideas, ask questions, and think critically.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                  <p className="text-gray-700">To promote self-confidence and self-esteem in each child through participation in wide range of time-tabled and extra-curricular activities.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                  <p className="text-gray-700">To develop loyalty, leadership, tolerance and a sense of responsibility and respect for others.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                  <p className="text-gray-700">To encourage self-discipline and high standards of behaviour and attainment.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">6</div>
                  <p className="text-gray-700">To nurture the physical, intellectual, emotional, social, and moral development of each learner.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">7</div>
                  <p className="text-gray-700">To provide our learners a world-class quality education, through our modern tech-driven hybrid curriculum.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">8</div>
                  <p className="text-gray-700">To inspire students to become lifelong learners who are adaptable in a changing world, academically, socially, technologically, etc.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">9</div>
                  <p className="text-gray-700">To instil in our learners, values such as integrity, responsibility, respect, and empathy.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">10</div>
                  <p className="text-gray-700">To develop learners' ability to analyse, evaluate, and make reasoned decisions.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">11</div>
                  <p className="text-gray-700">To raise generations who are technology compliant and enthusiast, who can become self-reliant with their digital skills.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">12</div>
                  <p className="text-gray-700">To provide continuous training for teachers and other staff, to keep them updated with best and latest practices.</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">13</div>
                  <p className="text-gray-700">To raise a generation of self-reliant youths through life-changing entrepreneurial skills.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 