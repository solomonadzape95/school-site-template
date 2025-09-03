import express, {Request, Response} from 'express';
import {PrismaClient} from "../../generated/prisma"
import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req: any, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req: any, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Get all images
router.get('/', async(req: Request, res: Response) => {
  try {
const images = await prisma.image.findMany({
      orderBy: {createdAt: 'desc'}
    });
    res.json(images);
  } catch(error) {
    res.status(500).json({error: "Failed to fetch images"});
  }
});

// Get default image
router.get('/default', async(req: Request, res: Response) => {
  try {
    const defaultImage = await prisma.image.findFirst({
      where: { isDefault: true }
    });
    
    if (!defaultImage) {
      return res.status(404).json({error: "No default image found"});
    }
    
    res.json(defaultImage);
  } catch(error) {
    res.status(500).json({error: "Failed to fetch default image"});
  }
});

// Create an image
router.post("/", upload.single('image'), async(req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({error: "No image file provided"});
    }

    const { title, usedAt } = req.body;
    
    if (!title) {
      return res.status(400).json({error: "Title is required"});
    }

    // Check if title already exists
    const existingImage = await prisma.image.findUnique({
      where: { title }
    });

    if (existingImage) {
      return res.status(400).json({error: "Image with this title already exists"});
    }

    // Parse usedAt as array if provided
    const usedAtArray = usedAt ? JSON.parse(usedAt) : [];
    
    // If this is the first image, make it default
    const imageCount = await prisma.image.count();
    const isDefault = imageCount === 0;

    const image = await prisma.image.create({
      data: {
            title,
        imageUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        usedAt: usedAtArray,
        isDefault
      }
    });

    res.status(201).json(image);
  } catch(error) {
    console.error('Error creating image:', error);
    res.status(500).json({error: "Failed to create image"});
  }
});

// Update an image
router.put('/:id', async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, usedAt, isDefault } = req.body;
    
    if (!id) {
      return res.status(400).json({error: "Missing image ID, update failed"});
    }

    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    // Accept both JSON body arrays and stringified arrays (and ignore invalid input gracefully)
    if (usedAt !== undefined) {
      if (Array.isArray(usedAt)) {
        updateData.usedAt = usedAt;
      } else if (typeof usedAt === 'string') {
        try {
          const parsed = JSON.parse(usedAt);
          updateData.usedAt = Array.isArray(parsed) ? parsed : [];
        } catch {
          // If it's a simple comma-separated string or single token, normalize to array
          const trimmed = usedAt.trim();
          updateData.usedAt = trimmed.length > 0 ? trimmed.split(',').map(s => s.trim()).filter(Boolean) : [];
        }
      }
    }
    if (isDefault !== undefined) updateData.isDefault = isDefault;

    // If setting this image as default, unset other defaults
    if (isDefault) {
      await prisma.image.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      });
    }

    const image = await prisma.image.update({
      where: { id },
      data: updateData
    });

    res.json(image);
  } catch(error) {
    console.error('Error updating image:', error);
    res.status(500).json({error: "Failed to update image"});
  }
});

// Delete an image
router.delete('/:id', async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({error: "Missing image ID for deletion"});
    }

    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return res.status(404).json({error: "Image not found"});
    }

    // Don't allow deletion of default image if it's the only image
    const totalImages = await prisma.image.count();
    if (image.isDefault && totalImages === 1) {
      return res.status(400).json({error: "Cannot delete the only default image"});
    }

    // Delete the file from uploads folder
    if (image.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../..', image.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await prisma.image.delete({
      where: { id }
    });

    // If we deleted the default image, make another image default
    if (image.isDefault) {
      const remainingImage = await prisma.image.findFirst();
      if (remainingImage) {
        await prisma.image.update({
          where: { id: remainingImage.id },
          data: { isDefault: true }
        });
      }
    }

    res.status(204).send();
  } catch(error) {
    console.error('Error deleting image:', error);
    res.status(500).json({error: "Failed to delete image"});
  }
});

// Replace an image file
router.put('/:id/replace', upload.single('image'), async(req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({error: "No image file provided"});
    }

    if (!id) {
      return res.status(400).json({error: "Missing image ID"});
    }

    const image = await prisma.image.findUnique({
      where: { id }
    });

    if (!image) {
      return res.status(404).json({error: "Image not found"});
    }

    // Delete old file
    if (image.imageUrl.startsWith('/uploads/')) {
      const filePath = path.join(__dirname, '../..', image.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Update with new file
    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        imageUrl: `/uploads/${req.file.filename}`,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        updatedAt: new Date()
      }
    });

    res.json(updatedImage);
  } catch(error) {
    console.error('Error replacing image:', error);
    res.status(500).json({error: "Failed to replace image"});
  }
});

export default router;