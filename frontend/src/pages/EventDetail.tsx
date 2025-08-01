import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Share2, Users } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSchool();
  
  // Find the event by ID
  const eventItem = data.events.find(item => item.id === id);

  if (!eventItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-6">The event you're looking for doesn't exist.</p>
          <Link 
            to="/events" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#eb4c37]/50 to-[#eb4c37] text-white py-20">
        <div className="container mx-auto px-6 relative">
        <div className="text-[8rem] mb-2 absolute right-10 -translate-1/2 top-1/2">🎉</div>
                  
          <Link 
            to="/events" 
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{eventItem.title}</h1>
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {eventItem.date}
            </div>
            {eventItem.location && (
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {eventItem.location}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Event Details */}
          <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Date</h3>
                <p className="text-gray-600">{eventItem.date}</p>
              </div>
              
              {eventItem.location && (
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-600">{eventItem.location}</p>
                </div>
              )}
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Expected Attendance</h3>
                <p className="text-gray-600">All Students & Parents</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Description</h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {eventItem.description}
              </p>
            </div>
          </div>

        

          {/* Related Events */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Other Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.events
                .filter(item => item.id !== id)
                .slice(0, 4)
                .map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{item.date}</p>
                    {item.location && (
                      <p className="text-gray-600 text-sm mb-3">{item.location}</p>
                    )}
                    <p className="text-gray-600 text-sm mb-4">{item.description.substring(0, 100)}...</p>
                    <Link 
                      to={`/events/${item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail; 