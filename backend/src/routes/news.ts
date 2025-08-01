import express from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = express.Router();
const prisma = new PrismaClient();

// Get all published news
router.get('/', async (req, res) => {
  try {
    const { published } = req.query;
    const where = published === 'true' ? { isPublished: true } : {};
    
    const news = await prisma.news.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get single news article
router.get('/:slug', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { slug: req.params.slug }
    });
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news article' });
  }
});

// Create new news article
router.post('/', async (req, res) => {
  try {
    const { title, content, slug, imageUrl, tag, author, isPublished } = req.body;
    const news = await prisma.news.create({
      data: {
        title,
        content,
        slug,
        imageUrl,
        tag,
        author,
        isPublished: isPublished || false
      }
    });
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Update news article
router.put('/:id', async (req, res) => {
  try {
    const { title, content, slug, imageUrl, tag, author, isPublished } = req.body;
    const news = await prisma.news.update({
      where: { id: req.params.id },
      data: {
        title,
        content,
        slug,
        imageUrl,
        tag,
        author,
        isPublished
      }
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news article' });
  }
});

// Delete news article
router.delete('/:id', async (req, res) => {
  try {
    await prisma.news.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news article' });
  }
});

// Toggle publish status
router.patch('/:id/publish', async (req, res) => {
  try {
    const news = await prisma.news.findUnique({
      where: { id: req.params.id }
    });
    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }
    
    const updatedNews = await prisma.news.update({
      where: { id: req.params.id },
      data: { isPublished: !news.isPublished }
    });
    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle publish status' });
  }
});

export default router; 