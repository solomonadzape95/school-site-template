import express from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = express.Router();
const prisma = new PrismaClient();

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:slug', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { slug: req.params.slug }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      date, 
      description, 
      expectedAttendance, 
      location, 
      slug, 
      imageUrl 
    } = req.body;
    
    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        description,
        expectedAttendance,
        location,
        slug,
        imageUrl
      }
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const { 
      title, 
      date, 
      description, 
      expectedAttendance, 
      location, 
      slug, 
      imageUrl 
    } = req.body;
    
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title,
        date: new Date(date),
        description,
        expectedAttendance,
        location,
        slug,
        imageUrl
      }
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    await prisma.event.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Get events by date range
router.get('/date-range/upcoming', async (req, res) => {
  try {
    const today = new Date();
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: today
        }
      },
      orderBy: { date: 'asc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
  }
});

// Get events by date range
router.get('/date-range/past', async (req, res) => {
  try {
    const today = new Date();
    const events = await prisma.event.findMany({
      where: {
        date: {
          lt: today
        }
      },
      orderBy: { date: 'desc' }
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch past events' });
  }
});

export default router; 