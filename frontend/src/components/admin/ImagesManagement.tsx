import React, { useState, useRef, useEffect } from 'react';
import { Upload, Trash2, Download, RefreshCw, X, Edit, Save, Plus, Minus } from 'lucide-react';
import { clearImagesCache } from '../../lib/imageUtils';
import { BACKEND_URL } from '../../lib/constants';
import { type ImageInfo } from '../../lib/types';

interface UsageLocation {
  id: string;
  name: string;
  description: string;
}

const ImagesManagement: React.FC = () => {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [editingUsage, setEditingUsage] = useState<string[]>([]);
  
  // Predefined usage locations for the website
  const availableUsageLocations: UsageLocation[] = [
    { id: 'home', name: 'Home Page', description: 'Main landing page' },
    { id: 'about', name: 'About Page', description: 'School information page' },
    { id: 'vision', name: 'Vision Page', description: 'Vision and mission page' },
    { id: 'dress-code', name: 'Dress Code Page', description: 'Dress code guidelines' },
    { id: 'daily-schedule', name: 'Daily Schedule Page', description: 'Daily timetable and schedules' },
    { id: 'curriculars', name: 'Curriculars Page', description: 'Curricular activities and programs' },
    { id: 'extracurriculars', name: 'Extracurriculars Page', description: 'Extracurricular activities' },
    { id: 'news', name: 'News Page', description: 'School news and announcements' },
    { id: 'events', name: 'Events Page', description: 'School events and activities' },
    { id: 'admissions', name: 'Admissions Page', description: 'Admissions information' },
    { id: 'contact', name: 'Contact Page', description: 'Contact information and form' },
  ];

  const [selectedImage, setSelectedImage] = useState<ImageInfo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch images from backend
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/images`);
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error('Failed to fetch images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image: ImageInfo) => {
    setSelectedImage(image);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove file extension for title
      formData.append('usedAt', JSON.stringify([]));

      const response = await fetch(`${BACKEND_URL}/api/images`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages(prev => [newImage, ...prev]);
        clearImagesCache(); // Clear cache after upload
        alert('Image uploaded successfully!');
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleReplaceImage = async (oldImage: ImageInfo, newFile: File) => {
    // Validate file type and size
    if (!newFile.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (newFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', newFile);

      const response = await fetch(`${BACKEND_URL}/api/images/${oldImage.id}/replace`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setImages(prev => prev.map(img => 
          img.id === oldImage.id ? updatedImage : img
        ));
        clearImagesCache(); // Clear cache after replace
        alert('Image replaced successfully!');
      } else {
        const error = await response.json();
        alert(`Replace failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Replace error:', error);
      alert('Replace failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleUpdateUsage = async (imageId: string, usedAt: string[]) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/images/${imageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usedAt }),
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setImages(prev => prev.map(img => 
          img.id === imageId ? updatedImage : img
        ));
        clearImagesCache(); // Clear cache after update
        setEditingImage(null);
        setEditingUsage([]);
        alert('Usage updated successfully!');
      } else {
        const error = await response.json();
        alert(`Update failed: ${error.error}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed. Please try again.');
    }
  };

  const startEditingUsage = (image: ImageInfo) => {
    setEditingImage(image.id);
    setEditingUsage([...image.usedAt]);
  };

  const addUsageLocation = (locationId: string) => {
    if (!editingUsage.includes(locationId)) {
      setEditingUsage([...editingUsage, locationId]);
    }
  };

  const removeUsageLocation = (locationId: string) => {
    setEditingUsage(editingUsage.filter(id => id !== locationId));
  };

  const handleDeleteImage = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    if (window.confirm(`Are you sure you want to delete ${image.title}? This action cannot be undone.`)) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/images/${imageId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setImages(prev => prev.filter(img => img.id !== imageId));
          if (selectedImage?.id === imageId) {
            setSelectedImage(null);
          }
          clearImagesCache(); // Clear cache after delete
          alert('Image deleted successfully!');
        } else {
          const error = await response.json();
          alert(`Delete failed: ${error.error}`);
        }
      } catch (error) {
        console.error('Delete error:', error);
        alert('Delete failed. Please try again.');
      }
    }
  };

  const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes >= 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(1)}MB`;
    }
    return `${(sizeInBytes / 1024).toFixed(0)}KB`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900">Upload New Images</h3>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
        
        <div className="text-sm text-blue-700">
          <p>Supported formats: JPG, PNG, GIF, WebP</p>
          <p>Maximum file size: 5MB</p>
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-blue-700 mb-2">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden relative">
              {image.isDefault && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                  Default
                </div>
              )}
              <img
                src={image.imageUrl.startsWith('http') ? image.imageUrl : `${BACKEND_URL}${image.imageUrl}`}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full flex items-center justify-center text-gray-400';
                  fallback.innerHTML = '<span>Image not found</span>';
                  target.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 truncate">{image.title}</h4>
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditingUsage(image);
                    }}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                    title="Edit usage"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Trigger file input for replacement
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.onchange = (event) => {
                        const file = (event.target as HTMLInputElement).files?.[0];
                        if (file) handleReplaceImage(image, file);
                      };
                      input.click();
                    }}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Replace image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteImage(image.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                    title="Delete image"
                    disabled={image.isDefault && images.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <p>Size: {formatFileSize(image.fileSize)}</p>
                <p>Modified: {new Date(image.updatedAt).toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-1">
                  {image.usedAt.map((usageId, index) => {
                    const location = availableUsageLocations.find(loc => loc.id === usageId);
                    return location ? (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        title={location.description}
                      >
                        {location.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Usage Editing Modal */}
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Edit Image Usage</h3>
                <button
                  onClick={() => {
                    setEditingImage(null);
                    setEditingUsage([]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Select where this image should be used:</h4>
                  
                  {/* Available locations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {availableUsageLocations.map((location) => (
                      <div key={location.id} className="flex items-center space-x-3">
                        <button
                          onClick={() => addUsageLocation(location.id)}
                          disabled={editingUsage.includes(location.id)}
                          className={`p-2 rounded-lg border transition-colors ${
                            editingUsage.includes(location.id)
                              ? 'bg-blue-100 border-blue-300 text-blue-700'
                              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                          } ${editingUsage.includes(location.id) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{location.name}</p>
                          <p className="text-xs text-gray-500">{location.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected locations */}
                  {editingUsage.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Currently selected:</h5>
                      <div className="flex flex-wrap gap-2">
                        {editingUsage.map((usageId) => {
                          const location = availableUsageLocations.find(loc => loc.id === usageId);
                          return location ? (
                            <span
                              key={usageId}
                              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {location.name}
                              <button
                                onClick={() => removeUsageLocation(usageId)}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setEditingImage(null);
                      setEditingUsage([]);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateUsage(editingImage, editingUsage)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4 inline mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{selectedImage.title}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedImage.imageUrl.startsWith('http') ? selectedImage.imageUrl : `${BACKEND_URL}${selectedImage.imageUrl}`}
                    alt={selectedImage.title}
                    className="w-full rounded-lg border border-gray-200"
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Image Details</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Title:</span> {selectedImage.title}</p>
                      <p><span className="font-medium">Size:</span> {formatFileSize(selectedImage.fileSize)}</p>
                      <p><span className="font-medium">Type:</span> {selectedImage.mimeType}</p>
                      <p><span className="font-medium">Last Modified:</span> {new Date(selectedImage.updatedAt).toLocaleDateString()}</p>
                      {selectedImage.isDefault && (
                        <p><span className="font-medium">Status:</span> <span className="text-green-600">Default Image</span></p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Usage</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.usedAt.map((usageId, index) => {
                        const location = availableUsageLocations.find(loc => loc.id === usageId);
                        return location ? (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            title={location.description}
                          >
                            {location.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => startEditingUsage(selectedImage)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Usage
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedImage.imageUrl.startsWith('http') ? selectedImage.imageUrl : `${BACKEND_URL}${selectedImage.imageUrl}`;
                        link.download = selectedImage.title;
                        link.click();
                      }}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (event) => {
                          const file = (event.target as HTMLInputElement).files?.[0];
                          if (file) handleReplaceImage(selectedImage, file);
                        };
                        input.click();
                      }}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Replace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesManagement;
