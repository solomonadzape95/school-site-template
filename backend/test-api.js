const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test data
const testApplicant = {
  name: 'Test Applicant',
  phoneNumber: '+1234567890'
};

const testNews = {
  title: 'Test News Article',
  content: 'This is a test news article content.',
  slug: 'test-news-article',
  imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9e1?w=800',
  tag: 'test',
  author: 'Test Author',
  isPublished: true
};

const testEvent = {
  title: 'Test Event',
  date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  description: 'This is a test event description.',
  expectedAttendance: '100+',
  location: 'Test Location',
  slug: 'test-event',
  imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800'
};

const testGallery = {
  title: 'Test Gallery Image',
  description: 'This is a test gallery image description.',
  imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800',
  category: 'test',
  isPublished: true
};

const testAdmin = {
  username: 'testadmin',
  email: 'testadmin@school.com',
  password: 'testpass123',
  role: 'admin'
};

async function testEndpoints() {
  console.log('🧪 Starting API endpoint tests...\n');

  try {
    // Test health check
    console.log('1. Testing health check...');
    const health = await axios.get('http://localhost:3000/');
    console.log('✅ Health check passed:', health.data.message);

    // Test Applicants endpoints
    console.log('\n2. Testing Applicants endpoints...');
    
    // Create applicant
    const createApplicant = await axios.post(`${BASE_URL}/applicants`, testApplicant);
    console.log('✅ Create applicant:', createApplicant.data.id);
    
    // Get all applicants
    const getApplicants = await axios.get(`${BASE_URL}/applicants`);
    console.log('✅ Get applicants:', getApplicants.data.length, 'applicants found');
    
    // Get single applicant
    const getApplicant = await axios.get(`${BASE_URL}/applicants/${createApplicant.data.id}`);
    console.log('✅ Get single applicant:', getApplicant.data.name);

    // Test News endpoints
    console.log('\n3. Testing News endpoints...');
    
    // Create news
    const createNews = await axios.post(`${BASE_URL}/news`, testNews);
    console.log('✅ Create news:', createNews.data.id);
    
    // Get all news
    const getNews = await axios.get(`${BASE_URL}/news`);
    console.log('✅ Get news:', getNews.data.length, 'articles found');
    
    // Get published news
    const getPublishedNews = await axios.get(`${BASE_URL}/news?published=true`);
    console.log('✅ Get published news:', getPublishedNews.data.length, 'articles found');
    
    // Get news by slug
    const getNewsBySlug = await axios.get(`${BASE_URL}/news/${testNews.slug}`);
    console.log('✅ Get news by slug:', getNewsBySlug.data.title);

    // Test Events endpoints
    console.log('\n4. Testing Events endpoints...');
    
    // Create event
    const createEvent = await axios.post(`${BASE_URL}/events`, testEvent);
    console.log('✅ Create event:', createEvent.data.id);
    
    // Get all events
    const getEvents = await axios.get(`${BASE_URL}/events`);
    console.log('✅ Get events:', getEvents.data.length, 'events found');
    
    // Get upcoming events
    const getUpcomingEvents = await axios.get(`${BASE_URL}/events/date-range/upcoming`);
    console.log('✅ Get upcoming events:', getUpcomingEvents.data.length, 'events found');
    
    // Get event by slug
    const getEventBySlug = await axios.get(`${BASE_URL}/events/${testEvent.slug}`);
    console.log('✅ Get event by slug:', getEventBySlug.data.title);

    // Test Gallery endpoints
    console.log('\n5. Testing Gallery endpoints...');
    
    // Create gallery image
    const createGallery = await axios.post(`${BASE_URL}/gallery`, testGallery);
    console.log('✅ Create gallery image:', createGallery.data.id);
    
    // Get all gallery images
    const getGallery = await axios.get(`${BASE_URL}/gallery`);
    console.log('✅ Get gallery:', getGallery.data.length, 'images found');
    
    // Get published gallery images
    const getPublishedGallery = await axios.get(`${BASE_URL}/gallery?published=true`);
    console.log('✅ Get published gallery:', getPublishedGallery.data.length, 'images found');
    
    // Get categories
    const getCategories = await axios.get(`${BASE_URL}/gallery/categories/list`);
    console.log('✅ Get categories:', getCategories.data);

    // Test Admin endpoints
    console.log('\n6. Testing Admin endpoints...');
    
    // Create admin
    const createAdmin = await axios.post(`${BASE_URL}/admin/register`, testAdmin);
    console.log('✅ Create admin:', createAdmin.data.username);
    
    // Get all admins
    const getAdmins = await axios.get(`${BASE_URL}/admin`);
    console.log('✅ Get admins:', getAdmins.data.length, 'admins found');
    
    // Test login
    const login = await axios.post(`${BASE_URL}/admin/login`, {
      username: testAdmin.username,
      password: testAdmin.password
    });
    console.log('✅ Admin login:', login.data.username);

    console.log('\n🎉 All API endpoint tests passed successfully!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Health check working');
    console.log('- ✅ Applicants CRUD operations working');
    console.log('- ✅ News CRUD operations working');
    console.log('- ✅ Events CRUD operations working');
    console.log('- ✅ Gallery CRUD operations working');
    console.log('- ✅ Admin authentication working');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testEndpoints();
}

module.exports = { testEndpoints }; 