import express from 'express';
import { PrismaClient } from '../../generated/prisma';

const router = express.Router();
const prisma = new PrismaClient();

// Get all applicants
router.get('/', async (req, res) => {
  try {
    const applicants = await prisma.applicant.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// Get single applicant
router.get('/:id', async (req, res) => {
  try {
    const applicant = await prisma.applicant.findUnique({
      where: { id: req.params.id }
    });
    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicant' });
  }
});

// Create new applicant
router.post('/', async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const applicant = await prisma.applicant.create({
      data: {
        name,
        phoneNumber
      }
    });
    res.status(201).json(applicant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create applicant' });
  }
});

// Update applicant
router.put('/:id', async (req, res) => {
  try {
    const { name, phoneNumber } = req.body;
    const applicant = await prisma.applicant.update({
      where: { id: req.params.id },
      data: {
        name,
        phoneNumber
      }
    });
    res.json(applicant);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update applicant' });
  }
});

// Delete applicant
router.delete('/:id', async (req, res) => {
  try {
    await prisma.applicant.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
});

export default router; 