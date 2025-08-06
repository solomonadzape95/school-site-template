const BACKEND_URL = 'http://localhost:3000';

async function testApplicantAPI() {
  console.log('Testing Applicant API...\n');

  // Test 1: Create a valid applicant
  console.log('Test 1: Creating a valid applicant...');
  const validApplicant = {
    surname: 'Doe',
    otherNames: 'John Smith',
    gender: 'male',
    dateOfBirth: '2010-05-15',
    placeOfBirth: 'Abakaliki',
    stateOfOrigin: 'Ebonyi',
    nationality: 'Nigerian',
    religion: 'Christianity',
    residentialAddress: '123 Main Street, Abakaliki, Ebonyi State',
    presentSchool: 'Previous School',
    currentClass: 'Primary 5',
    bloodGroup: 'O+',
    genotype: 'AA',
    fatherName: 'John Doe Senior',
    fatherOccupation: 'Engineer',
    fatherPhone: '08012345678',
    fatherEmail: 'father@example.com',
    motherName: 'Jane Doe',
    motherOccupation: 'Teacher',
    motherPhone: '08087654321',
    motherEmail: 'mother@example.com',
    guardianName: 'Guardian Name',
    guardianAddress: 'Guardian Address',
    guardianOccupation: 'Guardian Occupation',
    guardianHomePhone: '08011111111',
    guardianOfficePhone: '08022222222',
    guardianEmail: 'guardian@example.com',
    hasSiblingsInLASA: 'yes',
    sibling1Name: 'Sibling One',
    sibling1Class: 'JSS 2',
    sibling2Name: 'Sibling Two',
    sibling2Class: 'Primary 6',
    referralSource: 'social-media',
    referredByParent: 'Parent Referrer',
    referredByStaff: 'Staff Referrer',
    referredByAlumni: 'Alumni Referrer',
    referredByOthers: 'Other Referrer'
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validApplicant),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Valid applicant created successfully');
      console.log('Applicant ID:', result.id);
      console.log('Status:', result.status);
    } else {
      const error = await response.json();
      console.log('❌ Failed to create valid applicant:', error.error);
    }
  } catch (error) {
    console.log('❌ Error creating valid applicant:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Try to create duplicate applicant (should fail)
  console.log('Test 2: Attempting to create duplicate applicant...');
  try {
    const response = await fetch(`${BACKEND_URL}/api/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validApplicant),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('✅ Duplicate applicant correctly rejected:', error.error);
    } else {
      console.log('❌ Duplicate applicant was not rejected');
    }
  } catch (error) {
    console.log('❌ Error testing duplicate applicant:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Try to create applicant with missing required fields
  console.log('Test 3: Attempting to create applicant with missing fields...');
  const invalidApplicant = {
    surname: 'Test',
    otherNames: 'Missing Fields',
    // Missing required fields
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidApplicant),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('✅ Invalid applicant correctly rejected:', error.error);
    } else {
      console.log('❌ Invalid applicant was not rejected');
    }
  } catch (error) {
    console.log('❌ Error testing invalid applicant:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Test invalid gender
  console.log('Test 4: Attempting to create applicant with invalid gender...');
  const invalidGenderApplicant = {
    ...validApplicant,
    surname: 'Invalid',
    otherNames: 'Gender Test',
    gender: 'invalid'
  };

  try {
    const response = await fetch(`${BACKEND_URL}/api/applicants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidGenderApplicant),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log('✅ Invalid gender correctly rejected:', error.error);
    } else {
      console.log('❌ Invalid gender was not rejected');
    }
  } catch (error) {
    console.log('❌ Error testing invalid gender:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 5: Get all applicants
  console.log('Test 5: Fetching all applicants...');
  try {
    const response = await fetch(`${BACKEND_URL}/api/applicants`);
    if (response.ok) {
      const applicants = await response.json();
      console.log(`✅ Successfully fetched ${applicants.length} applicants`);
      if (applicants.length > 0) {
        console.log('Sample applicant:', {
          id: applicants[0].id,
          name: `${applicants[0].surname} ${applicants[0].otherNames}`,
          status: applicants[0].status,
          createdAt: applicants[0].createdAt
        });
      }
    } else {
      console.log('❌ Failed to fetch applicants');
    }
  } catch (error) {
    console.log('❌ Error fetching applicants:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');
  console.log('API Testing completed!');
}

// Run the test
testApplicantAPI().catch(console.error); 