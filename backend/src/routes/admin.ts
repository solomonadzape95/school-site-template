import express, { Request, Response } from 'express';
import { PrismaClient } from '../../generated/prisma';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Admin login
router.post('/login', async (req : Request, res:Response) => {
  try {
    const { username, password } = req.body;
    
    const admin = await prisma.admin.findUnique({
      where: { username }
    });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });
    
    // Don't send password in response
    const { password: _, ...adminWithoutPassword } = admin;
    res.json(adminWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Create new admin
router.post('/register', async (req : Request, res:Response) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    });
    
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role || 'admin'
      }
    });
    
    // Don't send password in response
    const { password: _, ...adminWithoutPassword } = admin;
    res.status(201).json(adminWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

// Get all admins
router.get('/', async (req : Request, res:Response) => {
  try {
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true
      }
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

// Get single admin
router.get('/:id', async (req : Request, res:Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true
      }
    });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
});

// Update admin
router.put('/:id', async (req : Request, res:Response) => {
  try {
    const { username, email, role } = req.body;
    const admin = await prisma.admin.update({
      where: { id: req.params.id },
      data: {
        username,
        email,
        role
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        lastLogin: true
      }
    });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update admin' });
  }
});

// Change password
router.patch('/:id/password', async (req : Request, res:Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const admin = await prisma.admin.findUnique({
      where: { id: req.params.id }
    });
    
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    
    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, admin.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.admin.update({
      where: { id: req.params.id },
      data: { password: hashedPassword }
    });
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
});

// Delete admin
router.delete('/:id', async (req : Request, res:Response) => {
  try {
    await prisma.admin.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete admin' });
  }
});

export default router; 