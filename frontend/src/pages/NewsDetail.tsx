import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag,  Loader2 } from 'lucide-react';
import type { NewsItem } from '../lib/types';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../lib/constants';

const NewsDetail: React.FC = () => {
  const { newsSlug } = useParams<{ newsSlug: string }>();

  // Fetch news data from API
  const { data: news = [] as NewsItem[], isLoading, error } = useQuery({
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
console.log(news, newsSlug)
  // Find the specific news item by slug
  const newsItem = news.find((n: NewsItem) => n.slug === newsSlug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Error Loading News</h1>
          <p className="text-gray-600 mb-6">Failed to load the news article. Please try again later.</p>
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

  // Check if news content contains the word "result"
  const containsResult = (content: string) => {
    return content.toLowerCase().includes('result');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 relative">
          <div className="text-[10rem] mb-2 absolute right-10 top-1/2 -translate-y-1/2">📰</div>
          <Link 
            to="/news" 
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to News
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 w-2/3">{newsItem.title}</h1>
          <div className="flex items-center space-x-6 text-lg">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {new Date(newsItem.createdAt).toLocaleDateString()}
            </div>
            {newsItem.tag && (
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-2" />
                {newsItem.tag}
              </div>
            )}
            {newsItem.author && (
              <div className="flex items-center">
                <span className="text-blue-200">By {newsItem.author.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Content */}
          <div className="bg-white rounded-lg shadow-lg p-10 mb-8">
            <div className="prose prose-lg max-w-none">
              <div className="text-xl text-gray-700 leading-relaxed mb-8 whitespace-pre-wrap">
                {newsItem.content}
              </div>
              
              {/* Special handling for result-related news */}
              {containsResult(newsItem.content) && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">
                    📊 Results are now available!
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Check your academic results using our result checker portal.
                  </p>
                  <Link 
                    to="/result-checker"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Check Your Result
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Related News */}
          {news.length > 1 && <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news
                .filter((item: NewsItem) => item.slug !== newsSlug)
                .slice(0, 4)
                .map((item: NewsItem) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {item.content.substring(0, 100)}...
                    </p>
                    <Link 
                      to={`/news/${item.slug}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                ))}
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 