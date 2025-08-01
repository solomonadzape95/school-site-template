import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import type { NewsItem, EventItem } from '../lib/types';

// Import images from assets
import classImage from '../assets/class.jpg';
import logo from '../assets/logo.jpg';
import childrenImage from '../assets/children.jpg';
import aboveImage from '../assets/above.jpg';
import schoolImage from '../assets/school.jpg';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch recent news from API
  const { data: news = [] as NewsItem[] } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/news');
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      return data
        .sort((a: NewsItem, b: NewsItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 22);
      }
  });

  // Fetch recent events from API
  const { data: events = [] as EventItem[] } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      // Sort by date and get upcoming events first, then recent past events
      // Ensure date is parsed as a number for comparison
      return data
        .sort((a: EventItem, b: EventItem) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 2);
    }
  });

  // Carousel images with dynamic titles and subtitles
  const carouselImages = [
    {
      url: schoolImage,
      title: 'Welcome To Lasa Schools',
      subtitle: 'Excellence in Education Since 1975'
    },
    {
      url: aboveImage,
      title: 'State-of-the-Art Facilities',
      subtitle: 'Modern classrooms and learning environments'
    },
    {
      url: childrenImage,
      title: 'Holistic Development',
      subtitle: 'Academic excellence and character building'
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen">
      {/* Banner Carousel Section */}
      <section className="relative h-[45vh] overflow-hidden">
        {/* Carousel Images */}
        <div className="relative h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* <div className="relative h-full flex items-center z-50 bg-transparent  justify-center"> */}
                <div className="text-center text-white px-6 bg-transaparent absolute bottom-1/4 mx-auto w-full z-50">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-trasnparent">{image.title}</h1>
                  <p className="text-lg md:text-xl max-w-3xl mx-auto">
                    {image.subtitle}
                  </p>
                </div>
              {/* </div> */}
              <LazyImage 
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60"></div>
              
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <img src={logo} width={80} height={80} className='mx-auto my-2' alt="Lasa Schools Logo"/>
            <h2 className="text-3xl font-bold text-[#eb4c37] mb-4">Welcome To Lasa Schools</h2>
            <div className="relative mb-8">
              <div className="h-px bg-[#eb4c37]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-[#eb4c37] transform rotate-45"></div>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              We work endlessly to provide an education friendly environment for skill and knowledge acquisition, 
              development of good behaviour, attitude and provide virtues needed for sound growth and finance 
              will never be a barrier for education.
            </p>
          </div>
        </div>
      </section>

      {/* School Information Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Our School */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <LazyImage 
                  src={schoolImage}
                  alt="Our School"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 relative flex-1">
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  Lasa Schools is committed to providing quality education in a nurturing environment. 
                  Our dedicated teachers and staff work together to ensure every student reaches their full potential.
                </p>
                <Link 
                  to="/about" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors absolute bottom-8"
                >
                  READ MORE
                </Link>
              </div>
            </div>

            {/* Vision and Mission */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden">
                <LazyImage 
                  src={aboveImage}
                  alt="Vision and Mission"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex-1 relative">
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  Our vision is to be a leading educational institution that nurtures academic excellence, 
                  character development, and prepares students for future success in a global society.
                </p>
                <Link 
                  to="/vision" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors absolute bottom-8"
                >
                  READ MORE
                </Link>
              </div>
            </div>

            {/* Our Activities */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-[30rem]">
              <div className="h-48 overflow-hidden">
                <LazyImage 
                  src={childrenImage}
                  alt="Our Activities"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 relative flex-1">
                <p className="text-gray-600 mb-10 text-base leading-relaxed">
                  We offer a comprehensive curriculum that includes both academic and extracurricular activities. 
                  From sports to arts, we encourage students to explore their talents and develop new skills.
                </p>
                <Link 
                  to="/curricular" 
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors absolute bottom-8"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News and Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Latest News */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest News</h2>
              {news.length > 0 ? (
                <>
                  <div className="space-y-6">
                    {news.map((newsItem: NewsItem) => (
                      <div key={newsItem.id} className="bg-white rounded-lg relative shadow-lg p-6 overflow-hidden">
                         <div className="text-[8rem] mb-2 bg-blue-600 absolute right-0 top-0 grid place-content-center h-full w-2/5">📰</div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">{newsItem.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(newsItem.createdAt).toLocaleDateString()}
                          {newsItem.tag && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {newsItem.tag}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-gray-600 text-base mb-4">
                          {newsItem.content.substring(0, 120)}...
                        </p>
                        <Link 
                          to={`/news/${newsItem.slug}`}
                          className="text-[#eb4c37] hover:text-[#eb4c37]/70 font-medium"
                        >
                          Read Full Article →
                        </Link>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/news" 
                    className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    VIEW ALL NEWS
                  </Link>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <p className="text-gray-500">No recent news available.</p>
                  <Link 
                    to="/news" 
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    VIEW ALL NEWS
                  </Link>
                </div>
              )}
            </div>

            {/* Latest Events */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Events</h2>
              {events.length > 0 ? (
                <>
                  <div className="space-y-6">
                    {events.map((event: EventItem) => (
                      <div key={event.id} className="bg-white rounded-lg  relative shadow-lg p-6 overflow-hidden">
                         <div className="text-[8rem] mb-2 bg-[#eb4c37] absolute right-0 top-0 grid place-content-center h-full w-2/5">🎉</div>
                        <h3 className="font-semibold text-gray-800 mb-3 text-lg">{event.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                          {event.location && (
                            <>
                              <MapPin className="w-4 h-4 ml-4 mr-2" />
                              {event.location}
                            </>
                          )}
                        </div>
                        <p className="text-gray-600 text-base mb-4">
                          {event.description.substring(0, 120)}...
                        </p>
                        <Link 
                          to={`/events/${event.slug}`}
                          className="text-[#eb4c37] hover:text-[#eb4c37]/70 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    ))}
                  </div>
                  <Link 
                    to="/events" 
                    className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    VIEW ALL EVENTS
                  </Link>
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                  <p className="text-gray-500">No upcoming events available.</p>
                  <Link 
                    to="/events" 
                    className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    VIEW ALL EVENTS
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">The Founder</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Learn about the visionary leader who established Lasa Schools
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="h-64 overflow-hidden rounded-lg">
                <LazyImage 
                  src={classImage}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Chief Dr. Pius Chinedu Ogbonnia Okoh</h3>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  A visionary educator and philanthropist, Chief Dr. Pius Chinedu Ogbonnia Okoh founded Lasa Schools 
                  with the mission to provide quality education accessible to all. His dedication to academic excellence 
                  and character development has shaped the lives of thousands of students.
                </p>
                <Link 
                  to="/founder" 
                  className="inline-block mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  READ MORE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 