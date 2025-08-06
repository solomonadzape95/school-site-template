import express, { Request, Response } from 'express';

import { PrismaClient } from '../../generated/prisma';

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
    const {
      // Student Information
      surname,
      otherNames,
      gender,
      dateOfBirth,
      placeOfBirth,
      stateOfOrigin,
      nationality,
      religion,
      residentialAddress,
      presentSchool,
      currentClass,
      bloodGroup,
      genotype,
      
      // Parents Information
      fatherName,
      fatherOccupation,
      fatherPhone,
      fatherEmail,
      motherName,
      motherOccupation,
      motherPhone,
      motherEmail,
      
      // Guardian Information
      guardianName,
      guardianAddress,
      guardianOccupation,
      guardianHomePhone,
      guardianOfficePhone,
      guardianEmail,
      
      // Siblings Information
      hasSiblingsInLASA,
      sibling1Name,
      sibling1Class,
      sibling2Name,
      sibling2Class,
      
      // Referral Information
      referralSource,
      referredByParent,
      referredByStaff,
      referredByAlumni,
      referredByOthers
    } = req.body;

    // Validation for required fields
    const requiredFields = {
      surname,
      otherNames,
      gender,
      dateOfBirth,
      placeOfBirth,
      stateOfOrigin,
      nationality,
      religion,
      residentialAddress,
      fatherName,
      fatherOccupation,
      fatherPhone,
      motherName,
      motherOccupation,
      motherPhone,
      hasSiblingsInLASA
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.trim() === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }

    // Validate gender
    if (!['male', 'female'].includes(gender.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Gender must be either "male" or "female"' 
      });
    }

    // Validate hasSiblingsInLASA
    if (!['yes', 'no'].includes(hasSiblingsInLASA.toLowerCase())) {
      return res.status(400).json({ 
        error: 'Has siblings in LASA must be either "yes" or "no"' 
      });
    }

    // Check if applicant with same name combination already exists
    const existingApplicant = await prisma.applicant.findFirst({
      where: {
        AND: [
          {
            surname: {
              equals: surname.trim(),
              mode: 'insensitive'
            }
          },
          {
            otherNames: {
              equals: otherNames.trim(),
              mode: 'insensitive'
            }
          }
        ]
      }
    });

    if (existingApplicant) {
      return res.status(400).json({ 
        error: 'An application with this name combination already exists. Please contact the school directly if you need to update your application.' 
      });
    }

    // Create applicant
    const applicant = await prisma.applicant.create({
      data: {
        // Student Information
        surname: surname.trim(),
        otherNames: otherNames.trim(),
        gender: gender.toLowerCase(),
        dateOfBirth: new Date(dateOfBirth),
        placeOfBirth: placeOfBirth.trim(),
        stateOfOrigin: stateOfOrigin.trim(),
        nationality: nationality.trim(),
        religion: religion.trim(),
        residentialAddress: residentialAddress.trim(),
        presentSchool: presentSchool?.trim() || null,
        currentClass: currentClass?.trim() || null,
        bloodGroup: bloodGroup?.trim() || null,
        genotype: genotype?.trim() || null,
        
        // Parents Information
        fatherName: fatherName.trim(),
        fatherOccupation: fatherOccupation.trim(),
        fatherPhone: fatherPhone.trim(),
        fatherEmail: fatherEmail?.trim() || null,
        motherName: motherName.trim(),
        motherOccupation: motherOccupation.trim(),
        motherPhone: motherPhone.trim(),
        motherEmail: motherEmail?.trim() || null,
        
        // Guardian Information
        guardianName: guardianName?.trim() || null,
        guardianAddress: guardianAddress?.trim() || null,
        guardianOccupation: guardianOccupation?.trim() || null,
        guardianHomePhone: guardianHomePhone?.trim() || null,
        guardianOfficePhone: guardianOfficePhone?.trim() || null,
        guardianEmail: guardianEmail?.trim() || null,
        
        // Siblings Information
        hasSiblingsInLASA: hasSiblingsInLASA.toLowerCase(),
        sibling1Name: sibling1Name?.trim() || null,
        sibling1Class: sibling1Class?.trim() || null,
        sibling2Name: sibling2Name?.trim() || null,
        sibling2Class: sibling2Class?.trim() || null,
        
        // Referral Information
        referralSource: referralSource?.trim() || null,
        referredByParent: referredByParent?.trim() || null,
        referredByStaff: referredByStaff?.trim() || null,
        referredByAlumni: referredByAlumni?.trim() || null,
        referredByOthers: referredByOthers?.trim() || null
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
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Missing applicant id" });
    
    const {
      // Student Information
      surname,
      otherNames,
      gender,
      dateOfBirth,
      placeOfBirth,
      stateOfOrigin,
      nationality,
      religion,
      residentialAddress,
      presentSchool,
      currentClass,
      bloodGroup,
      genotype,
      
      // Parents Information
      fatherName,
      fatherOccupation,
      fatherPhone,
      fatherEmail,
      motherName,
      motherOccupation,
      motherPhone,
      motherEmail,
      
      // Guardian Information
      guardianName,
      guardianAddress,
      guardianOccupation,
      guardianHomePhone,
      guardianOfficePhone,
      guardianEmail,
      
      // Siblings Information
      hasSiblingsInLASA,
      sibling1Name,
      sibling1Class,
      sibling2Name,
      sibling2Class,
      
      // Referral Information
      referralSource,
      referredByParent,
      referredByStaff,
      referredByAlumni,
      referredByOthers,
      
      // Status
      status
    } = req.body;

    const updateData: any = {};
    
    // Only include fields that are provided
    if (surname !== undefined) updateData.surname = surname.trim();
    if (otherNames !== undefined) updateData.otherNames = otherNames.trim();
    if (gender !== undefined) updateData.gender = gender.toLowerCase();
    if (dateOfBirth !== undefined) updateData.dateOfBirth = new Date(dateOfBirth);
    if (placeOfBirth !== undefined) updateData.placeOfBirth = placeOfBirth.trim();
    if (stateOfOrigin !== undefined) updateData.stateOfOrigin = stateOfOrigin.trim();
    if (nationality !== undefined) updateData.nationality = nationality.trim();
    if (religion !== undefined) updateData.religion = religion.trim();
    if (residentialAddress !== undefined) updateData.residentialAddress = residentialAddress.trim();
    if (presentSchool !== undefined) updateData.presentSchool = presentSchool.trim();
    if (currentClass !== undefined) updateData.currentClass = currentClass.trim();
    if (bloodGroup !== undefined) updateData.bloodGroup = bloodGroup.trim();
    if (genotype !== undefined) updateData.genotype = genotype.trim();
    
    // Parents Information
    if (fatherName !== undefined) updateData.fatherName = fatherName.trim();
    if (fatherOccupation !== undefined) updateData.fatherOccupation = fatherOccupation.trim();
    if (fatherPhone !== undefined) updateData.fatherPhone = fatherPhone.trim();
    if (fatherEmail !== undefined) updateData.fatherEmail = fatherEmail.trim();
    if (motherName !== undefined) updateData.motherName = motherName.trim();
    if (motherOccupation !== undefined) updateData.motherOccupation = motherOccupation.trim();
    if (motherPhone !== undefined) updateData.motherPhone = motherPhone.trim();
    if (motherEmail !== undefined) updateData.motherEmail = motherEmail.trim();
    
    // Guardian Information
    if (guardianName !== undefined) updateData.guardianName = guardianName.trim();
    if (guardianAddress !== undefined) updateData.guardianAddress = guardianAddress.trim();
    if (guardianOccupation !== undefined) updateData.guardianOccupation = guardianOccupation.trim();
    if (guardianHomePhone !== undefined) updateData.guardianHomePhone = guardianHomePhone.trim();
    if (guardianOfficePhone !== undefined) updateData.guardianOfficePhone = guardianOfficePhone.trim();
    if (guardianEmail !== undefined) updateData.guardianEmail = guardianEmail.trim();
    
    // Siblings Information
    if (hasSiblingsInLASA !== undefined) updateData.hasSiblingsInLASA = hasSiblingsInLASA.toLowerCase();
    if (sibling1Name !== undefined) updateData.sibling1Name = sibling1Name.trim();
    if (sibling1Class !== undefined) updateData.sibling1Class = sibling1Class.trim();
    if (sibling2Name !== undefined) updateData.sibling2Name = sibling2Name.trim();
    if (sibling2Class !== undefined) updateData.sibling2Class = sibling2Class.trim();
    
    // Referral Information
    if (referralSource !== undefined) updateData.referralSource = referralSource.trim();
    if (referredByParent !== undefined) updateData.referredByParent = referredByParent.trim();
    if (referredByStaff !== undefined) updateData.referredByStaff = referredByStaff.trim();
    if (referredByAlumni !== undefined) updateData.referredByAlumni = referredByAlumni.trim();
    if (referredByOthers !== undefined) updateData.referredByOthers = referredByOthers.trim();
    
    // Status
    if (status !== undefined) updateData.status = status.toLowerCase();

    const applicant = await prisma.applicant.update({
      where: { id: id },
      data: updateData
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