import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Share2 } from 'lucide-react';
import { useSchool } from '../context/SchoolContext';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useSchool();
  
  // Find the news item by ID
  const newsItem = data.news.find(item => item.id === id);

  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">News Not Found</h1>
          <p className="text-gray-600 mb-6">The news article you're looking for doesn't exist.</p>
          <Link 
            to="/news" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 relative">
        <div className="text-[10rem] mb-2 absolute right-10 top-1/2 -translate-1/2">📰</div>
          <Link 
            to="/news" 
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{newsItem.title}</h1>
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {newsItem.date}
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              {newsItem.category}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {newsItem.content}
              </p>
              
              {/* Extended content for demonstration */}
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
            
            </div>
          </div>

          {/* Share Section */}
          {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Share this article</h3>
            <div className="flex space-x-4">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                WhatsApp
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Facebook
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
                Twitter
              </button>
            </div>
          </div> */}

          {/* Related News */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.news
                .filter(item => item.id !== id)
                .slice(0, 4)
                .map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{item.date}</p>
                    <p className="text-gray-600 text-sm mb-4">{item.content.substring(0, 100)}...</p>
                    <Link 
                      to={`/news/${item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read More →
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

export default NewsDetail; 