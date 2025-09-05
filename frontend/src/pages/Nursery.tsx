import React from 'react';
import { Baby, Heart,  BookOpen, Play, Shield } from 'lucide-react';
// import Image from '../components/common/Image';
import LazyImage from '../components/LazyImage';
import children from '../assets/nursery.jpg';
import play from '../assets/playing.jpg';
import classImg from '../assets/class.jpg';
import class2 from '../assets/children.jpg';

const Nursery: React.FC = () => {
  const features = [
    {
      icon: Baby,
      title: 'Day-Care & Creche',
      description: 'Specialized care for our youngest learners with dedicated care-givers ensuring individual attention and nurturing.'
    },
    {
      icon: BookOpen,
      title: 'Pre-Nursery & Nursery 1-3',
      description: 'Structured learning programs designed to stimulate cognitive development and prepare children for primary education.'
    },
    {
      icon: Play,
      title: 'Play-Based Learning',
      description: 'Learning through play with both outdoor and indoor activities, story-telling, music, and educative videos.'
    },
    {
      icon: Heart,
      title: 'Character Development',
      description: 'Focus on speech, character, and mental development to build a strong foundation for future learning.'
    }
  ];

  // const scheduleItems = [
  //   {
  //     icon: Clock,
  //     title: 'Physical Activities',
  //     description: 'Plenty of time for active play and movement to support physical development.'
  //   },
  //   {
  //     icon: BookOpen,
  //     title: 'Learning Sessions',
  //     description: 'Daily learning sessions for both groups and individuals to cater to different learning styles.'
  //   },
  //   {
  //     icon: Users,
  //     title: 'Group Activities',
  //     description: 'Collaborative activities that promote social skills and teamwork.'
  //   },
  //   {
  //     icon: Utensils,
  //     title: 'Meals & Snacks',
  //     description: 'Nutritious meals and snacks provided with proper care and attention.'
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
                 <LazyImage 
           src={children}
           alt="LASA Nursery School - Children playing and learning"
           className="w-full h-full object-cover"
         />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Nursery School</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nurturing young minds with love, care, and quality early childhood education
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Overview Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Early Years Foundation</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              LASA Nursery School encompasses our Day-Care, Creche, Pre-Nursery and Nursery 1 – 3 classes. 
              Considering the importance of the early years for children's physical, social, emotional and 
              cognitive development, Nursery school runs a curriculum in child care, speech, character and 
              mental development, geared towards a well-planned mind formation and wonderful educational experiences.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Curriculum</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              We have a well-thought-out curriculum that stimulates a child's development and makes daily life 
              of children lively and fun-filled. At the Nursery section, we have structural schedules that include 
              plenty of time for physical activities, quiet time (including daily learning sessions for groups and 
              individuals), group activities, individual activities, meals, snacks and free time for break.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Television and videos are also provided as part of the curriculum with utmost respect to children's age. 
              In our curriculum, time is designated for both outdoor and indoor play, story-telling, music, educative 
              videos, and more; and for routines like eating, toileting and resting.
            </p>
          </div>
        </div>

        {/* Daily Schedule */}
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Daily Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {scheduleItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div> */}

                 {/* Staff Structure Section */}
         <div className="bg-gradient-to-r from-pink-50 to-blue-50 rounded-lg shadow-lg p-12 mb-16">
           <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Dedicated Staff Structure</h2>
           <div className="max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Care-Givers */}
               <div className="bg-white rounded-lg p-6 shadow-md">
                 <div className="text-center mb-4">
                   <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Heart className="w-8 h-8 text-pink-600" />
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Care-Givers</h3>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Dedicated staff who provide quality attention to each child in Day-Care and Pre-Nursery classes. 
                   They focus on routine care-giving activities and individual child needs, ensuring a nurturing environment.
                 </p>
               </div>

               {/* Class Teachers */}
               <div className="bg-white rounded-lg p-6 shadow-md">
                 <div className="text-center mb-4">
                   <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <BookOpen className="w-8 h-8 text-blue-600" />
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Class Teachers</h3>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Qualified educators who oversee academic activities and structured learning sessions. 
                   They work alongside Care-Givers to provide comprehensive education and development.
                 </p>
               </div>

               {/* Cleaners */}
               <div className="bg-white rounded-lg p-6 shadow-md">
                 <div className="text-center mb-4">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Shield className="w-8 h-8 text-green-600" />
                   </div>
                   <h3 className="text-xl font-semibold text-gray-800 mb-3">Cleaners</h3>
                 </div>
                 <p className="text-gray-600 text-sm leading-relaxed">
                   Support staff who maintain hygiene and cleanliness standards. They ensure a safe, 
                   clean environment for our youngest learners throughout the day.
                 </p>
               </div>
             </div>
             
             <div className="mt-8 text-center">
               <p className="text-lg text-gray-700 leading-relaxed">
                 This three-tier staff structure ensures that each child receives comprehensive care, 
                 quality education, and maintains a clean, safe environment throughout their day at LASA Nursery.
               </p>
             </div>
           </div>
         </div>

        {/* Image Gallery */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Nursery Life</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <LazyImage 
                 src={play}
                 alt="Nursery children playing in outdoor playground"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Play Time</h3>
                 <p className="text-gray-600">Learning through structured and free play activities</p>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <LazyImage 
                 src={classImg}
                 alt="Nursery classroom with children learning"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Learning Activities</h3>
                 <p className="text-gray-600">Engaging educational activities for young minds</p>
               </div>
             </div>
             <div className="bg-white rounded-lg shadow-lg overflow-hidden">
               <LazyImage 
                 src={class2}
                 alt="Nursery children having nutritious meals"
                 className="w-full h-64 object-cover"
               />
               <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">Meal Time</h3>
                 <p className="text-gray-600">Nutritious meals in a caring environment</p>
               </div>
             </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-pink-600 rounded-lg shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Enroll Your Child?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Give your child the best start in life with our comprehensive nursery program designed 
            for their holistic development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/admissions" 
              className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Apply Now
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nursery;
