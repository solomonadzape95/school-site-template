# School Site Backend API

A Node.js/Express API with Prisma ORM for managing a school website with admin dashboard functionality.

## Features

- **Applicants Management**: Handle student applications
- **News Management**: Create, edit, and publish news articles
- **Events Management**: Manage school events and activities
- **Gallery Management**: Upload and organize school images
- **Admin Authentication**: Secure admin login and user management
- **MongoDB Integration**: Using Prisma ORM with MongoDB

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory:

```env
DATABASE_URL="mongodb://localhost:27017/school-site"
PORT=3000
```

### 3. Database Setup

Generate Prisma client and push schema to database:

```bash
npm run db:generate
npm run db:push
```

### 4. Seed Database

Populate the database with sample data:

```bash
npm run seed
```

This will create:
- Admin user (username: `admin`, password: `admin123`)
- Sample news articles
- Sample events
- Sample gallery images
- Sample applicants

### 5. Start Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/admin/register` - Create new admin

### Applicants
- `GET /api/applicants` - Get all applicants
- `GET /api/applicants/:id` - Get single applicant
- `POST /api/applicants` - Create new applicant
- `PUT /api/applicants/:id` - Update applicant
- `DELETE /api/applicants/:id` - Delete applicant

### News
- `GET /api/news` - Get all news articles
- `GET /api/news?published=true` - Get published news only
- `GET /api/news/:slug` - Get news by slug
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article
- `PATCH /api/news/:id/publish` - Toggle publish status

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:slug` - Get event by slug
- `GET /api/events/date-range/upcoming` - Get upcoming events
- `GET /api/events/date-range/past` - Get past events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Gallery
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery?published=true` - Get published images only
- `GET /api/gallery?category=students` - Filter by category
- `GET /api/gallery/categories/list` - Get all categories
- `GET /api/gallery/:id` - Get single image
- `POST /api/gallery` - Upload new image
- `PUT /api/gallery/:id` - Update image
- `DELETE /api/gallery/:id` - Delete image
- `PATCH /api/gallery/:id/publish` - Toggle publish status

### Admin Management
- `GET /api/admin` - Get all admins
- `GET /api/admin/:id` - Get single admin
- `PUT /api/admin/:id` - Update admin
- `PATCH /api/admin/:id/password` - Change password
- `DELETE /api/admin/:id` - Delete admin

## Database Schema

The application uses the following main models:

- **Applicant**: Student applications
- **News**: News articles with publishing control
- **Event**: School events with dates and locations
- **Gallery**: Image gallery with categories
- **Admin**: Admin users with authentication

## Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database

### File Structure

```
backend/
├── src/
│   ├── routes/          # API route handlers
│   │   ├── applicants.ts
│   │   ├── news.ts
│   │   ├── events.ts
│   │   ├── gallery.ts
│   │   └── admin.ts
│   └── app.ts           # Main application file
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seed file
└── package.json
```

## Security Features

- Password hashing with bcrypt
- CORS enabled for frontend integration
- Input validation and error handling
- Secure admin authentication

## Default Admin Credentials

After running the seed script:
- **Username**: `admin`
- **Password**: `admin123`

**Important**: Change these credentials in production! 