import express from "express";
import cors from "cors";
import { PrismaClient } from '../generated/prisma';

// Import routes
import applicantsRouter from './routes/applicants';
import newsRouter from './routes/news';
import eventsRouter from './routes/events';
import galleryRouter from './routes/gallery';
import adminRouter from './routes/admin';

// Initialize express
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => res.json({ message: 'School Site API is running' }));

// API routes
app.use('/api/applicants', applicantsRouter);
app.use('/api/news', newsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/admin', adminRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});  