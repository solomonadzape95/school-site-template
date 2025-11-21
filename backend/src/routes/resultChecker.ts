import express, { Request, Response } from 'express';

const router = express.Router();
const BASE_URL = 'https://schoolcater.com/api/visitorwebapi';

// Validate student
router.post('/validate-student', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    const response = await fetch(`${BASE_URL}/validateresultchecker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/plain, */*', 'Referer': "https://schoolcater.com/result-checker" },
      body: JSON.stringify(studentId)
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error validating student:', error);
    res.status(500).json({ error: 'Failed to validate student' });
  }
});

// Get school sessions
router.post('/sessions/:schoolId', async (req: Request, res: Response) => {
  try {
    const { schoolId } = req.params;
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    // Send studentId as a JSON string (not wrapped in an object)
    const response = await fetch(`${BASE_URL}/selectschoolsessions/${schoolId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/plain, */*', 'Referer': "https://schoolcater.com/result-checker" },

      body: JSON.stringify(studentId)
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get session terms
router.post('/terms/:sessionId', async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({ error: 'Student ID is required' });
    }

    // Send studentId as a JSON string (not wrapped in an object)
    const response = await fetch(`${BASE_URL}/getsessionterms/${sessionId}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/plain, */*', 'Referer': "https://schoolcater.com/result-checker" },

      body: JSON.stringify(studentId)
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching terms:', error);
    res.status(500).json({ error: 'Failed to fetch terms' });
  }
});

// Verify and get result
router.post('/verify', async (req: Request, res: Response) => {
  try {
    const { studentId, school, session, term, pin, serial } = req.body;

    if (!studentId || !school || !session || !term || !pin || !serial) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const resultChecker = {
      studentId,
      school,
      session,
      term,
      pin,
      serial
    };

    const response = await fetch(`${BASE_URL}/verifyresultcheckercomponents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept': 'application/json, text/plain, */*', 'Referer': "https://schoolcater.com/result-checker" },

      body: JSON.stringify(resultChecker)
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    // The API might return a string token or a JSON object
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If it's not JSON, it's likely a string token
      data = await response.text();
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error verifying result:', error);
    res.status(500).json({ error: 'Failed to verify result' });
  }
});

// Get report sheet
router.get('/report-sheet/:token', async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const response = await fetch(`${BASE_URL}/GetReportSheetInfo/${token}`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://schoolcater.com/result-checker'
      }
    });

    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    // The API returns a JSON string that needs to be parsed
    // Get as text first to handle JSON strings
    const textData = await response.text();
    let parsedData;
    
    try {
      // First parse attempt
      parsedData = JSON.parse(textData);
      
      // If the result is still a string, parse again (double-encoded JSON)
      if (typeof parsedData === 'string') {
        try {
          parsedData = JSON.parse(parsedData);
        } catch (e) {
          // If second parse fails, use the first parse result
          console.log('Second JSON parse failed, using first parse result');
        }
      }
    } catch (parseError) {
      console.error('Error parsing report sheet JSON:', parseError);
      // console.error('Raw text data (first 500 chars):', textData.substring(0, 500));
      throw new Error('Failed to parse report sheet data: ' + parseError);
    }
    
    console.log('Parsed report sheet successfully!');
    // console.log('Has reportSheet property:', parsedData && 'reportSheet' in parsedData);
    // if (parsedData && parsedData.reportSheet) {
    //   console.log('ReportSheet has required fields:', {
    //     hasStudent: !!parsedData.reportSheet.student,
    //     hasTerm: !!parsedData.reportSheet.term,
    //     hasCognitive: !!parsedData.reportSheet.cognitive,
    //     hasSchool: !!parsedData.reportSheet.school,
    //     hasComment: !!parsedData.reportSheet.comment
    //   });
    // }
    
    res.json(parsedData);
  } catch (error) {
    console.error('Error fetching report sheet:', error);
    res.status(500).json({ error: 'Failed to fetch report sheet' });
  }
});

export default router;

