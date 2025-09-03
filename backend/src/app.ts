import express, { Request, Response } from 'express';
import cors from "cors";
import { PrismaClient } from '../generated/prisma';
import path from 'path';

// Import routes
import applicantsRouter from './routes/applicants';
import newsRouter from './routes/news';
import eventsRouter from './routes/events';
import adminRouter from './routes/admin';
import imagesRouter from './routes/images';

// Initialize express
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const port = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req : Request, res:Response) => res.json({ message: 'School Site API is running' }));

// API routes
app.use('/api/applicants', applicantsRouter);
app.use('/api/news', newsRouter);
app.use('/api/events', eventsRouter);
// app.use('/api/gallery', galleryRouter);
app.use('/api/admin', adminRouter);
app.use('/api/images', imagesRouter);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler - catch all unmatched routes
app.use((req : Request, res:Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API available at http://localhost:${port}/api`);
});  