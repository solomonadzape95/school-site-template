import express from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = express.Router();
const prisma = new PrismaClient();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const { published, category } = req.query;
    const where: any = {};
    
    if (published === 'true') {
      where.isPublished = true;
    }
    
    if (category) {
      where.category = category;
    }
    
    const gallery = await prisma.gallery.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Get single gallery image
router.get('/:id', async (req, res) => {
  try {
    const image = await prisma.gallery.findUnique({
      where: { id: req.params.id }
    });
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery image' });
  }
});

// Create new gallery image
router.post('/', async (req, res) => {
  try {
    const { title, description, imageUrl, category, isPublished } = req.body;
    const image = await prisma.gallery.create({
      data: {
        title,
        description,
        imageUrl,
        category,
        isPublished: isPublished || false
      }
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// Update gallery image
router.put('/:id', async (req, res) => {
  try {
    const { title, description, imageUrl, category, isPublished } = req.body;
    const image = await prisma.gallery.update({
      where: { id: req.params.id },
      data: {
        title,
        description,
        imageUrl,
        category,
        isPublished
      }
    });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// Delete gallery image
router.delete('/:id', async (req, res) => {
  try {
    await prisma.gallery.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

// Toggle publish status
router.patch('/:id/publish', async (req, res) => {
  try {
    const image = await prisma.gallery.findUnique({
      where: { id: req.params.id }
    });
    if (!image) {
      return res.status(404).json({ error: 'Gallery image not found' });
    }
    
    const updatedImage = await prisma.gallery.update({
      where: { id: req.params.id },
      data: { isPublished: !image.isPublished }
    });
    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle publish status' });
  }
});

// Get categories
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await prisma.gallery.findMany({
      select: { category: true },
      where: { category: { not: null } },
      distinct: ['category']
    });
    const categoryList = categories.map(item => item.category).filter(Boolean);
    res.json(categoryList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

export default router; 