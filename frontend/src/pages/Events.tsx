import React, { useState } from 'react';
import { useSchool } from '../context/SchoolContext';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/bus.jpg'

const Events: React.FC = () => {
  const { data } = useSchool();
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Upcoming', 'Past'];

  const filteredEvents = data.events.filter(event => {
    if (filter === 'All') return true;
    if (filter === 'Upcoming') {
      // Simple logic - you might want to implement proper date comparison
      return event.date.includes('2025');
    }
    if (filter === 'Past') {
      return event.date.includes('2024');
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover exciting events, celebrations, and activities happening at Lasa Schools
          </p>
        </div>
      </div> */}
 <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="The Founder"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Events</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover exciting events, celebrations, and activities happening at Lasa Schools
          </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex flex-wrap gap-4">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#eb4c37]/20 to-[#eb4c37] flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-[8rem] mb-2">🎉</div>
                  
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {event.date}
                  {event.location && (
                    <>
                      <MapPin className="w-4 h-4 ml-4 mr-2" />
                      {event.location}
                    </>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                <Link 
                  to={`/events/${event.id}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Details <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Events; 