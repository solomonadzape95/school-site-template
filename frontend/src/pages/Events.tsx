import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/bus.jpg'

interface EventItem {
  id: string;
  title: string;
  date: string;
  description: string;
  expectedAttendance?: string;
  location: string;
  slug: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState('All');

  // Fetch events data from API
  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      return response.json();
    }
  });

  const filters = ['All', 'Upcoming', 'Past'];

  const filteredEvents = events.filter((event: EventItem) => {
    if (filter === 'All') return true;
    
    const eventDate = new Date(event.date);
    const now = new Date();
    
    if (filter === 'Upcoming') {
      return eventDate >= now;
    }
    if (filter === 'Past') {
      return eventDate < now;
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 overflow-hidden">
          <LazyImage 
            src={classImage}
            alt="School Events"
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
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600 text-lg">Loading events...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 overflow-hidden">
          <LazyImage 
            src={classImage}
            alt="School Events"
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
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            <p className="text-lg">Error loading events: {error.message}</p>
            <p className="text-sm mt-2">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={classImage}
          alt="School Events"
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
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              {filter !== 'All' 
                ? `No ${filter.toLowerCase()} events are currently available.`
                : 'No events are currently scheduled.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredEvents.map((event: EventItem) => (
              <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-[#eb4c37]/20 to-[#eb4c37] flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-[8rem] mb-2">🎉</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.date).toLocaleDateString()}
                    {event.location && (
                      <>
                        <MapPin className="w-4 h-4 ml-4 mr-2" />
                        {event.location}
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                  {event.expectedAttendance && (
                    <p className="text-sm text-gray-500 mb-4">
                      <strong>Expected Attendance:</strong> {event.expectedAttendance}
                    </p>
                  )}
                  <Link 
                    to={`/events/${event.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events; 