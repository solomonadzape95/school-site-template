import express, { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all applicants
router.get('/', async (req : Request, res:Response) => {
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
router.get('/:id', async (req : Request, res:Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing applicant id" });
    const applicant = await prisma.applicant.findUnique({
      where: { id: id }
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
router.post('/', async (req : Request, res:Response) => {
  try {
    const { name, phoneNumber } = req.body;

    // Check if name already exists
    const existingApplicant = await prisma.applicant.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive' // Case-insensitive search
        }
      }
    });

    if (existingApplicant) {
      return res.status(400).json({ 
        error: 'An application with this name already exists. Please contact the school directly if you need to update your application.' 
      });
    }

    const applicant = await prisma.applicant.create({
      data: {
        name,
        phoneNumber
      }
    });
    res.status(201).json(applicant);
  } catch (error) {
    console.error('Error creating applicant:', error);
    res.status(500).json({ error: 'Failed to create applicant' });
  }
});

// Update applicant
router.put('/:id', async (req : Request, res:Response) => {
  try {
    const { name, phoneNumber } = req.body;
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing applicant id" });
    const applicant = await prisma.applicant.update({
      where: { id: id },
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
router.delete('/:id', async (req : Request, res:Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing applicant id" });
    await prisma.applicant.delete({
      where: { id: id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete applicant' });
  }
});

export default router; 