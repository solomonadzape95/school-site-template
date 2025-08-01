import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Calendar, Tag, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import LazyImage from '../components/LazyImage';
import classImage from '../assets/school.jpg'
import type { NewsItem } from '../lib/types';
import { BACKEND_URL } from '../lib/constants';



const News: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetch news data from API
  const { data: news = [], isLoading, error } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/news`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      // Only return published news
      return data.filter((item: NewsItem) => item.isPublished);
    }
  });

  // Get unique categories from news data
  const categories = ['All', ...Array.from(new Set(news.map((item: NewsItem) => item.tag).filter(Boolean) as string[]))];

  const filteredNews = news.filter((item: NewsItem) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.tag === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Check if news content contains the word "result"
  const containsResult = (content: string) => {
    return content.toLowerCase().includes('result');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-96 overflow-hidden">
          <LazyImage 
            src={classImage}
            alt="School News"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">School News</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Stay updated with the latest news, achievements, and happenings at Lasa Schools
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mr-3" />
            <span className="text-gray-600 text-lg">Loading news...</span>
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
            alt="School News"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">School News</h1>
              <p className="text-xl max-w-3xl mx-auto">
                Stay updated with the latest news, achievements, and happenings at Lasa Schools
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 py-16">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center">
            <p className="text-lg">Error loading news: {error.message}</p>
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
          alt="School News"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">School News</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Stay updated with the latest news, achievements, and happenings at Lasa Schools
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-16">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No news articles are currently available.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                         {filteredNews.map((news: NewsItem) => (
              <div key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-[10rem] mb-2">📰</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(news.createdAt).toLocaleDateString()}
                    {news.tag && (
                      <>
                        <Tag className="w-4 h-4 ml-4 mr-2" />
                        {news.tag}
                      </>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{news.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{news.content}</p>
                  
                  {/* Special handling for result-related news */}
                  {containsResult(news.content) && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-800 text-sm font-medium mb-2">
                        📊 Results are now available!
                      </p>
                      <Link 
                        to="/result-checker"
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Click here to check your result <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </div>
                  )}
                  
                  <Link 
                    to={`/news/${news.slug}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
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

export default News; 