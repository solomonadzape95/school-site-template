# School Site API Endpoints Documentation

## Base URL
`http://localhost:3000/api`

## Authentication
All admin endpoints require proper authentication.

---

## 1. Applicants Endpoints

### GET /api/applicants
Get all applicants
```json
Response: [
  {
    "id": "string",
    "name": "string",
    "phoneNumber": "string",
    "createdAt": "datetime"
  }
]
```

### GET /api/applicants/:id
Get single applicant by ID
```json
Response: {
  "id": "string",
  "name": "string",
  "phoneNumber": "string",
  "createdAt": "datetime"
}
```

### POST /api/applicants
Create new applicant
```json
Request: {
  "name": "string",
  "phoneNumber": "string"
}
```

### PUT /api/applicants/:id
Update applicant
```json
Request: {
  "name": "string",
  "phoneNumber": "string"
}
```

### DELETE /api/applicants/:id
Delete applicant

---

## 2. News Endpoints

### GET /api/news
Get all news articles
```json
Response: [
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "slug": "string",
    "imageUrl": "string?",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "tag": "string?",
    "isPublished": "boolean",
    "author": "string?"
  }
]
```

### GET /api/news?published=true
Get only published news articles

### GET /api/news/:slug
Get news article by slug

### POST /api/news
Create news article
```json
Request: {
  "title": "string",
  "content": "string",
  "slug": "string",
  "imageUrl": "string?",
  "tag": "string?",
  "author": "string?",
  "isPublished": "boolean?"
}
```

### PUT /api/news/:id
Update news article
```json
Request: {
  "title": "string",
  "content": "string",
  "slug": "string",
  "imageUrl": "string?",
  "tag": "string?",
  "author": "string?",
  "isPublished": "boolean"
}
```

### DELETE /api/news/:id
Delete news article

### PATCH /api/news/:id/publish
Toggle publish status

---

## 3. Events Endpoints

### GET /api/events
Get all events
```json
Response: [
  {
    "id": "string",
    "title": "string",
    "date": "datetime",
    "description": "string",
    "expectedAttendance": "string?",
    "location": "string",
    "slug": "string",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "imageUrl": "string?"
  }
]
```

### GET /api/events/:slug
Get event by slug

### GET /api/events/date-range/upcoming
Get upcoming events (date >= today)

### GET /api/events/date-range/past
Get past events (date < today)

### POST /api/events
Create event
```json
Request: {
  "title": "string",
  "date": "datetime",
  "description": "string",
  "expectedAttendance": "string?",
  "location": "string",
  "slug": "string",
  "imageUrl": "string?"
}
```

### PUT /api/events/:id
Update event
```json
Request: {
  "title": "string",
  "date": "datetime",
  "description": "string",
  "expectedAttendance": "string?",
  "location": "string",
  "slug": "string",
  "imageUrl": "string?"
}
```

### DELETE /api/events/:id
Delete event

---

## 4. Gallery Endpoints

### GET /api/gallery
Get all gallery images
```json
Response: [
  {
    "id": "string",
    "title": "string",
    "description": "string?",
    "imageUrl": "string",
    "category": "string?",
    "createdAt": "datetime",
    "isPublished": "boolean"
  }
]
```

### GET /api/gallery?published=true
Get only published images

### GET /api/gallery?category=students
Filter by category

### GET /api/gallery/categories/list
Get all available categories
```json
Response: ["students", "facilities", "activities", "events"]
```

### GET /api/gallery/:id
Get single image by ID

### POST /api/gallery
Create gallery image
```json
Request: {
  "title": "string",
  "description": "string?",
  "imageUrl": "string",
  "category": "string?",
  "isPublished": "boolean?"
}
```

### PUT /api/gallery/:id
Update gallery image
```json
Request: {
  "title": "string",
  "description": "string?",
  "imageUrl": "string",
  "category": "string?",
  "isPublished": "boolean"
}
```

### DELETE /api/gallery/:id
Delete gallery image

### PATCH /api/gallery/:id/publish
Toggle publish status

---

## 5. Admin Endpoints

### POST /api/admin/login
Admin login
```json
Request: {
  "username": "string",
  "password": "string"
}
Response: {
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "createdAt": "datetime",
  "lastLogin": "datetime?"
}
```

### POST /api/admin/register
Create new admin
```json
Request: {
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string?"
}
```

### GET /api/admin
Get all admins (without passwords)

### GET /api/admin/:id
Get single admin (without password)

### PUT /api/admin/:id
Update admin
```json
Request: {
  "username": "string",
  "email": "string",
  "role": "string"
}
```

### PATCH /api/admin/:id/password
Change password
```json
Request: {
  "currentPassword": "string",
  "newPassword": "string"
}
```

### DELETE /api/admin/:id
Delete admin

---

## Schema Properties Summary

### Applicant Model
- `id`: String (ObjectId)
- `name`: String
- `phoneNumber`: String
- `createdAt`: DateTime

### News Model
- `id`: String (ObjectId)
- `title`: String
- `content`: String
- `slug`: String (unique)
- `imageUrl`: String? (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `tag`: String? (optional)
- `isPublished`: Boolean (default: false)
- `author`: String? (optional)

### Event Model
- `id`: String (ObjectId)
- `title`: String
- `date`: DateTime
- `description`: String
- `expectedAttendance`: String? (optional)
- `location`: String
- `slug`: String (unique)
- `createdAt`: DateTime
- `updatedAt`: DateTime
- `imageUrl`: String? (optional)

### Gallery Model
- `id`: String (ObjectId)
- `title`: String
- `description`: String? (optional)
- `imageUrl`: String
- `category`: String? (optional)
- `createdAt`: DateTime
- `isPublished`: Boolean (default: false)

### Admin Model
- `id`: String (ObjectId)
- `username`: String (unique)
- `email`: String (unique)
- `password`: String (hashed)
- `role`: String (default: "admin")
- `createdAt`: DateTime
- `lastLogin`: DateTime? (optional)

---

## Testing

Run the API tests:
```bash
npm run test:api
```

This will test all endpoints and verify they work correctly with the actual schema. 