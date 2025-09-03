# Image Management System

This document explains how to use the new image management system in the school website admin dashboard.

## Overview

The image management system allows administrators to:
- Upload new images
- Replace existing images
- Manage where images are used throughout the website
- Set default fallback images
- Organize images by usage locations

## Features

### 1. Image Upload
- Support for JPG, PNG, GIF, and WebP formats
- Maximum file size: 5MB
- Automatic file validation and error handling
- Progress tracking during upload

### 2. Usage Management
Images can be assigned to specific usage locations:

**Available Usage Locations:**
- **Home Page** - Main landing page
- **About Page** - School information page
- **Academics Page** - Academic programs and curriculum
- **Students Page** - Student life and activities
- **Gallery** - Photo gallery and media
- **News Page** - School news and announcements
- **Events Page** - School events and activities
- **Contact Page** - Contact information and form
- **Header** - Website header navigation
- **Footer** - Website footer section
- **Hero Section** - Main banner section
- **Services Section** - School services overview
- **Transportation Page** - Transportation services
- **Sports Page** - Sports and athletics
- **Activities Section** - Extracurricular activities

### 3. Default Image System
- Automatically assigns the first uploaded image as default
- Provides fallback when specific images are not found
- Ensures at least one image is always available
- Prevents deletion of the only default image

### 4. Image Operations
- **Upload**: Add new images to the system
- **Replace**: Update image files while keeping metadata
- **Edit Usage**: Modify where images are used
- **Delete**: Remove images (with safety checks)
- **Download**: Backup images locally

## Usage in Frontend

### Using the Image Component

```tsx
import Image from '../components/common/Image';

// Basic usage
<Image 
  usageId="home" 
  alt="School building" 
  className="w-full h-64 object-cover"
/>

// With custom fallback styling
<Image 
  usageId="hero" 
  alt="Hero image" 
  className="w-full h-96 object-cover"
  fallbackClassName="bg-gradient-to-r from-blue-500 to-purple-600"
  priority="high"
/>
```

### Using Image Utilities

```tsx
import { getImageForUsage, getImageUrl } from '../lib/imageUtils';

// Get image for specific usage
const image = await getImageForUsage('home');
if (image) {
  const imageUrl = getImageUrl(image);
  // Use imageUrl
}

// Get all images for a usage
const images = await getImagesByUsage('gallery');
```

## API Endpoints

### Backend Routes

- `GET /api/images` - Get all images
- `GET /api/images/default` - Get default image
- `POST /api/images` - Upload new image
- `PUT /api/images/:id` - Update image metadata
- `PUT /api/images/:id/replace` - Replace image file
- `DELETE /api/images/:id` - Delete image

### Request/Response Format

**Upload Image:**
```bash
POST /api/images
Content-Type: multipart/form-data

Form data:
- image: File
- title: string
- usedAt: string (JSON array)
```

**Update Image:**
```bash
PUT /api/images/:id
Content-Type: application/json

{
  "title": "New Title",
  "usedAt": ["home", "about"],
  "isDefault": false
}
```

## Database Schema

The `Image` model includes:

```prisma
model Image {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  title     String   @unique
  imageUrl  String
  fileSize  Int
  mimeType  String
  usedAt    String[] @default([])
  isDefault Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## File Storage

- Images are stored in the `backend/uploads/` directory
- Files are served statically via `/uploads/` endpoint
- Automatic cleanup when images are deleted
- Unique filename generation to prevent conflicts

## Caching

- Frontend caches images for 5 minutes to reduce API calls
- Cache is automatically cleared after image operations
- Manual cache clearing available via `clearImagesCache()`

## Error Handling

- Graceful fallback to default images when errors occur
- User-friendly error messages for common issues
- Automatic retry mechanisms for failed operations
- Validation for file types and sizes

## Security

- File type validation (images only)
- File size limits (5MB max)
- Admin authentication required for all operations
- Secure file storage with proper permissions

## Best Practices

1. **Image Optimization**: Use appropriately sized images for web
2. **Descriptive Titles**: Use clear, descriptive titles for images
3. **Usage Assignment**: Assign images to relevant usage locations
4. **Default Image**: Ensure a good default image is always available
5. **Regular Cleanup**: Remove unused images to save storage space

## Troubleshooting

### Common Issues

1. **Image not displaying**: Check if the image is assigned to the correct usage location
2. **Upload failures**: Verify file type and size limits
3. **Missing images**: Ensure default image is set
4. **Cache issues**: Use `clearImagesCache()` to refresh

### Debug Mode

Enable debug logging in the backend to see detailed error information:

```typescript
console.error('Error details:', error);
```

## Future Enhancements

- Image compression and optimization
- Multiple image formats (WebP, AVIF)
- Image cropping and resizing tools
- Bulk upload operations
- Image analytics and usage tracking
- CDN integration for better performance
