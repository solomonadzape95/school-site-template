import React from 'react';
import { BookOpen, Target, Zap, Brain } from 'lucide-react';
import Image from '../components/common/Image';

const Primary: React.FC = () => {
  const curriculumFeatures = [
    {
      icon: BookOpen,
      title: 'Integrated Thematic Approach',
      description: 'Subject areas taught within an integrated, thematic approach for better understanding and retention.'
    },
    {
      icon: Brain,
      title: 'Cross-Curricular Development',
      description: 'Literacy and numeracy skills developed across all subjects for comprehensive learning.'
    },
    {
      icon: Zap,
      title: 'Tech & Entrepreneurial Skills',
      description: 'Infusion of technology and entrepreneurial skills development for future readiness.'
    },
    {
      icon: Target,
      title: 'Liberal Choice Assessment',
      description: 'Unique weekly Liberal Choice Assessment (LCA) prioritizing assessment for learning.'
    }
  ];

  // const values = [
  //   {
  //     icon: Heart,
  //     title: 'Core Values Development',
  //     description: 'Conscious development of core values, character development and citizenship education.'
  //   },
  //   {
  //     icon: Users,
  //     title: 'Customized Learning',
  //     description: 'Differentiated instruction to meet the needs of a range of students, taking cognizance of their strengths and weaknesses.'
  //   },
  //   {
  //     icon: Globe,
  //     title: 'Global Citizenship',
  //     description: 'Nurturing caring, respectful and socially conscious citizens for the world stage.'
  //   },
  //   {
  //     icon: Award,
  //     title: 'Academic Excellence',
  //     description: 'Preparing children with requisite knowledge, skills and dispositions for secondary education.'
  //   }
  // ];

  const classes = [
    { grade: 'Primary 1', age: '5-6 years', focus: 'Foundation building and basic literacy' },
    { grade: 'Primary 2', age: '6-7 years', focus: 'Reading fluency and numeracy skills' },
    { grade: 'Primary 3', age: '7-8 years', focus: 'Critical thinking and problem solving' },
    { grade: 'Primary 4', age: '8-9 years', focus: 'Advanced concepts and independent learning' },
    { grade: 'Primary 5', age: '9-10 years', focus: 'Secondary school preparation' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
                 <Image 
           usageId="primary-hero"
           alt="LASA Primary School - Students in modern classroom"
           className="w-full h-full object-cover"
           priority="high"
         />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Primary School</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Building strong foundations for lifelong learning and global citizenship
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Primary Education Excellence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our primary school is designed to prepare the children with the requisite knowledge, skills and 
              dispositions to optimize their own development and prepare them for secondary school education. 
              We also nurture them to imbibe and constitute a caring, respectful and socially conscious citizenry 
              that will lead our country onto the world stage.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 leading-relaxed">
              We have primary one to primary five classes, using a hybrid of a British and Nigerian well blended 
              curriculum to actualize the vision of our school.
            </p>
          </div>
        </div>

        {/* Curriculum Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Curriculum Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {curriculumFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Educational Approach</h2>
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
        </div> */}

        {/* Class Structure */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Primary Classes</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((classInfo, index) => (
                <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{classInfo.grade}</h3>
                  <p className="text-green-600 font-semibold mb-3">{classInfo.age}</p>
                  <p className="text-gray-600">{classInfo.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Primary School Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <Image 
                 usageId="primary-classroom"
                 alt="Primary students engaged in active learning"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Active Learning</h3>
                 <p className="text-gray-600">Engaging lessons that promote critical thinking and creativity</p>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <Image 
                 usageId="primary-sports"
                 alt="Primary students participating in sports activities"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Extracurricular Activities</h3>
                 <p className="text-gray-600">Diverse activities to develop well-rounded individuals</p>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <Image 
                 usageId="primary-computer-lab"
                 alt="Primary students using computers and technology"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Technology Integration</h3>
                 <p className="text-gray-600">Modern technology to enhance learning experiences</p>
               </div>
             </div>
          </div>
        </div>

        {/* Assessment Information */}
        {/* <div className="bg-blue-600 rounded-lg shadow-lg p-12 mb-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Liberal Choice Assessment (LCA)</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Our unique weekly assessment system focuses on learning rather than just testing. 
            The LCA helps us understand each child's progress and tailor our teaching to their individual needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Formative Assessment</h3>
              <p className="text-blue-100">Continuous evaluation to guide learning</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Individual Focus</h3>
              <p className="text-blue-100">Personalized feedback for each student</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-blue-100">Regular monitoring of academic growth</p>
            </div>
          </div>
        </div> */}

        {/* Call to Action */}
        <div className="bg-green-600 rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Primary School</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Give your child the foundation they need for academic success and personal growth 
            in our comprehensive primary education program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admissions" 
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Primary;
