import React from 'react';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/class.jpg';
import { Calendar, Clock, FileText } from 'lucide-react';

const DailySchedule: React.FC = () => {
  const scheduleComponents = [
    {
      icon: Calendar,
      title: 'School Calendar',
      description: 'Our school calendar comes per session, in line with directives of Ebonyi State Ministry of Education.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: FileText,
      title: 'Termly Schedule of Activities',
      description: 'Our internal memo that details a day-to-day planned activities of the school for each term, released by school management before the beginning of each term.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Clock,
      title: 'School Timetable',
      description: 'Released at least two days before resumption date of each term, to enable stakeholders prepare well for teaching and learning activities.',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="LASA Daily Schedule"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Daily Schedule</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Our daily schedule is based on school calendar, termly activities, and school timetable
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">School Schedule Overview</h2>
            <p className="text-lg text-gray-600 mb-4">
              Our daily schedule in LASA is always based on the following three key components:
            </p>
            <p className="text-lg text-gray-600">
              We ensure that all stakeholders, especially teachers, are well-prepared for the teaching 
              and learning activities for each term through proper planning and communication.
            </p>
          </div>
        </div>

        {/* Schedule Components */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Schedule Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scheduleComponents.map((component, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center">
                <div className={`w-16 h-16 ${component.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <component.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{component.title}</h3>
                <p className="text-gray-600">{component.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Important Information */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Important Information</h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
              <p className="text-gray-700">School hours are from 8:00 AM to 3:00 PM Monday through Friday.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
              <p className="text-gray-700">Office hours are 8:00 AM to 4:00 PM.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
              <p className="text-gray-700">All schedules are subject to change based on school events and activities.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
              <p className="text-gray-700">Parents will be notified of any schedule changes in advance.</p>
            </div>
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
              <p className="text-gray-700">The school calendar follows the directives of Ebonyi State Ministry of Education.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySchedule; 