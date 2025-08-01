import React, { useState } from 'react';
import { Image, Filter, Download, Eye, Calendar } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = ['All', 'Campus', 'Events', 'Students', 'Sports', 'Arts', 'Academic'];

  const galleryImages = [
    { id: 1, src: '/placeholder-campus.jpg', alt: 'School Campus', category: 'Campus', date: '2024', description: 'Beautiful view of our school campus' },
    { id: 2, src: '/placeholder-events.jpg', alt: 'Annual Sports Day', category: 'Events', date: '2024', description: 'Students participating in annual sports competition' },
    { id: 3, src: '/placeholder-students.jpg', alt: 'Students in Class', category: 'Students', date: '2024', description: 'Students engaged in classroom activities' },
    { id: 4, src: '/placeholder-sports.jpg', alt: 'Football Match', category: 'Sports', date: '2024', description: 'Inter-house football competition' },
    { id: 5, src: '/placeholder-arts.jpg', alt: 'Art Exhibition', category: 'Arts', date: '2024', description: 'Student artwork on display' },
    { id: 6, src: '/placeholder-academic.jpg', alt: 'Science Lab', category: 'Academic', date: '2024', description: 'Students conducting science experiments' },
    { id: 7, src: '/placeholder-campus2.jpg', alt: 'Library', category: 'Campus', date: '2024', description: 'Well-equipped school library' },
    { id: 8, src: '/placeholder-events2.jpg', alt: 'Graduation Ceremony', category: 'Events', date: '2024', description: 'Annual graduation ceremony' },
    { id: 9, src: '/placeholder-students2.jpg', alt: 'Group Study', category: 'Students', date: '2024', description: 'Students working together on projects' },
    { id: 10, src: '/placeholder-sports2.jpg', alt: 'Basketball Team', category: 'Sports', date: '2024', description: 'School basketball team' },
    { id: 11, src: '/placeholder-arts2.jpg', alt: 'Music Performance', category: 'Arts', date: '2024', description: 'School choir performance' },
    { id: 12, src: '/placeholder-academic2.jpg', alt: 'Computer Class', category: 'Academic', date: '2024', description: 'Students learning computer skills' },
  ];

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (id: number) => {
    setSelectedImage(id);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Explore our school through beautiful photographs capturing moments of learning, growth, and achievement
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filter by Category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <Image className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No images found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <div key={image.id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                    <div className="text-white text-center">
                      <Image className="w-12 h-12 mx-auto mb-2 opacity-75" />
                      <p className="text-sm opacity-75">{image.alt}</p>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button
                          onClick={() => openModal(image.id)}
                          className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-white bg-opacity-90 text-indigo-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {image.category}
                    </div>
                  </div>

                  {/* Image Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{image.alt}</h3>
                    <p className="text-gray-600 text-sm mb-2">{image.description}</p>
                    <div className="flex items-center text-gray-500 text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      {image.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="relative">
              {/* Modal Image */}
              <div className="aspect-video bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-center">
                  <Image className="w-16 h-16 mx-auto mb-4 opacity-75" />
                  <p className="text-lg opacity-75">Full Size Image</p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {galleryImages.find(img => img.id === selectedImage)?.alt}
              </h3>
              <p className="text-gray-600 mb-4">
                {galleryImages.find(img => img.id === selectedImage)?.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  {galleryImages.find(img => img.id === selectedImage)?.date}
                </div>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery; 