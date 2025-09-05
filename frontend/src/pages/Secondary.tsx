import React from 'react';
import { GraduationCap, Microscope, BookOpen, Briefcase, Users, Target, Globe, Award } from 'lucide-react';
import Image from '../components/common/Image';

const Secondary: React.FC = () => {
  const faculties = [
    {
      icon: Microscope,
      title: 'Faculty of Pure Sciences/Technical Education',
      description: 'Mathematics, Physics, Chemistry, Biology, Computer Science, Technical Drawing, and other science subjects.',
      color: 'blue'
    },
    {
      icon: BookOpen,
      title: 'Faculty of Arts and Humanities',
      description: 'English Language, Literature, History, Government, Christian Religious Studies, and other arts subjects.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Faculty of Social Sciences and Commercials',
      description: 'Economics, Commerce, Accounting, Geography, Social Studies, and other commercial subjects.',
      color: 'purple'
    },
    {
      icon: Briefcase,
      title: 'Vocational/Entrepreneurship Studies',
      description: 'Practical skills development, entrepreneurship training, and vocational education for self-reliance.',
      color: 'orange'
    }
  ];

  const features = [
    {
      icon: Target,
      title: 'World-Class Preparation',
      description: 'Comprehensive training to prepare students to rule their world and succeed in life.'
    },
    {
      icon: Globe,
      title: 'Global Readiness',
      description: 'Education that prepares students for both higher institutions and technical/vocational disciplines.'
    },
    {
      icon: Award,
      title: 'Academic Excellence',
      description: 'Rigorous academic program designed to achieve outstanding results in national examinations.'
    },
    {
      icon: Users,
      title: 'Leadership Development',
      description: 'Programs designed to develop leadership skills and character for future success.'
    }
  ];

  const levels = [
    { 
      level: 'Junior Secondary School (JSS)', 
      classes: 'JSS1 - JSS3', 
      age: '10-13 years',
      focus: 'Foundation building and subject exploration',
      description: 'Students explore various subjects to identify their interests and strengths while building strong academic foundations.'
    },
    { 
      level: 'Senior Secondary School (SSS)', 
      classes: 'SSS1 - SSS3', 
      age: '13-16 years',
      focus: 'Specialization and career preparation',
      description: 'Students specialize in their chosen faculty while preparing for university admission and career paths.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
                 <Image 
           usageId="secondary-hero"
           alt="LASA Secondary School - Students in modern science laboratory"
           className="w-full h-full object-cover"
           priority="high"
         />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Secondary School</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Preparing students to rule their world through comprehensive education and character development
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Secondary Education Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              LASA Secondary School is a platform for preparing students to rule their world. We endeavour to give 
              our students all the training they need to succeed in life. Whether they decide to go further to the 
              higher institutions or go into technical and vocational discipline, our trainings are quite sufficient 
              for them to do exploits in their different areas of choice.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Four Major Faculties */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Four Major Faculties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faculties.map((faculty, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-8 border-l-4 border-${faculty.color}-500`}>
                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-${faculty.color}-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0`}>
                    <faculty.icon className={`w-6 h-6 text-${faculty.color}-600`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{faculty.title}</h3>
                    <p className="text-gray-600">{faculty.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Levels */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">School Levels</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {levels.map((level, index) => (
                <div key={index} className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-8 h-8 text-indigo-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-800">{level.level}</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-indigo-600 font-semibold">{level.classes} • {level.age}</p>
                    <p className="text-gray-700 font-medium">{level.focus}</p>
                    <p className="text-gray-600">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Secondary School Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image 
                usageId="secondary-chemistry-lab"
                alt="Secondary students conducting chemistry experiments"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Science Laboratory</h3>
                <p className="text-gray-600">Hands-on experiments and practical learning in our well-equipped labs</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image 
                usageId="secondary-library"
                alt="Secondary students studying in the school library"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Library & Research</h3>
                <p className="text-gray-600">Extensive resources for research and independent study</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Image 
                usageId="secondary-sports-field"
                alt="Secondary students participating in sports activities"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Sports & Activities</h3>
                <p className="text-gray-600">Comprehensive sports program and extracurricular activities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-600 rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Secondary School</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Prepare your child for success in higher education and beyond with our comprehensive 
            secondary education program designed for future leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admissions" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secondary;
