import React, { useState, useCallback, useEffect } from 'react';
import { Bookmark, X, AlertCircle, CheckCircle, Loader2, Printer, Download } from 'lucide-react';
import { BACKEND_URL } from '../lib/constants';

// API Service
const resultCheckerApi = {
  validateStudent: async (studentId: string) => {
    const response = await fetch(`${BACKEND_URL}/api/result-checker/validate-student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  },

  getSchoolSessions: async (schoolId: string, studentId: string) => {
    const response = await fetch(`${BACKEND_URL}/api/result-checker/sessions/${schoolId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  },

  getSessionTerms: async (sessionId: string, studentId: string) => {
    const response = await fetch(`${BACKEND_URL}/api/result-checker/terms/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId })
    });
    if (!response.ok) throw await response.json();
    return response.json();
  },

  verifyAndGetResult: async (resultChecker: any) => {
    const response = await fetch(`${BACKEND_URL}/api/result-checker/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultChecker)
    });
    if (!response.ok) throw await response.json();
    return response.json();
  },

  getReportSheet: async (token: string) => {
    const response = await fetch(`${BACKEND_URL}/api/result-checker/report-sheet/${token}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw await response.json();
    
    // Get the response as text first to handle potential JSON strings
    const textData = await response.text();
    let data;
    try {
      // Try parsing as JSON
      data = JSON.parse(textData);
      // If the parsed data is still a string, parse it again
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
    } catch (e) {
      // If parsing fails, try to use it as-is
      console.error('Error parsing report sheet data:', e);
      throw new Error('Failed to parse report sheet data');
    }
    
    return data;
  }
};

// Confirmation Modal Component
const ConfirmationModal: React.FC<{
  student: any;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ student, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Continue as {student.lastName} {student.firstName}
          </h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">
          Do you want to continue checking the result of {student.lastName} {student.firstName}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to sort test types (matching display_result.js)
const insertionSortTestTypes = (testTypes: any[]) => {
  if (!testTypes || !Array.isArray(testTypes)) return [];
  
  // Mark original positions
  const marked = testTypes.map((test, index) => ({
    ...test,
    originalIndex: index
  }));
  
  // Sort by percentage
  let i = 1;
  while (i < marked.length) {
    const x = marked[i];
    let j = i - 1;
    while (j >= 0 && marked[j].percentage > x.percentage) {
      marked[j + 1] = marked[j];
      j--;
    }
    marked[j + 1] = x;
    i++;
  }
  
  return marked;
};

// Result Display Component
const ResultDisplay: React.FC<{ reportSheet: any; onBack: () => void }> = ({ reportSheet, onBack }) => {
  if (!reportSheet) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Error: No report sheet data available</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // console.log('ResultDisplay - reportSheet:', reportSheet);
  // console.log('ResultDisplay - reportSheet keys:', Object.keys(reportSheet));

  const { student, term, cognitiveSummary, cognitive, school, comment } = reportSheet;
  
  // Log what we have
  // console.log('ResultDisplay - Extracted data:', {
  //   hasStudent: !!student,
  //   hasTerm: !!term,
  //   hasCognitiveSummary: !!cognitiveSummary,
  //   hasCognitive: !!cognitive,
  //   hasSchool: !!school,
  //   hasComment: !!comment
  // });
  if (!student || !term || !cognitiveSummary || !cognitive || !school || !comment) {
    console.error('Missing required data:', { student, term, cognitiveSummary, cognitive, school, comment });
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-red-600">
          <AlertCircle className="w-12 h-12 mx-auto mb-4" />
          <p>Error: Incomplete report sheet data</p>
          <p className="text-sm mt-2">Missing: {[
            !student && 'student',
            !term && 'term',
            !cognitiveSummary && 'cognitiveSummary',
            !cognitive && 'cognitive',
            !school && 'school',
            !comment && 'comment'
          ].filter(Boolean).join(', ')}</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isJunior = student.class && (student.class.indexOf('J') !== -1 || student.class.indexOf('j') !== -1);
  const reportType = isJunior ? 'Junior Secondary' : 'Senior Secondary';
  
  // Sort recorded test types
  const recordedTestTypes = reportSheet.recordedTestTypes 
    ? insertionSortTestTypes([...reportSheet.recordedTestTypes])
    : [];
  
  const handlePrint = () => {
    window.print();
  };

  const handleSavePDF = async () => {
    try {
      const element = document.getElementById('report-sheet-content');
      if (!element) {
        alert('Error: Could not find report content to save as PDF');
        return;
      }

      // Show loading indicator
      const loadingMsg = document.createElement('div');
      loadingMsg.id = 'pdf-loading-msg';
      loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(0,0,0,0.8);color:white;padding:20px;border-radius:8px;z-index:10000;font-size:16px;';
      loadingMsg.textContent = 'Generating PDF... Please wait';
      document.body.appendChild(loadingMsg);

      // Store original console.error to restore later
      const originalError = console.error;
      
      try {
        // Dynamically import html2pdf.js
        const html2pdfModule = await import('html2pdf.js');
        const html2pdf = html2pdfModule.default || html2pdfModule;

        // Suppress console errors from html2canvas about oklch colors
        console.error = (...args: any[]) => {
          // Filter out oklch color parsing errors
          const errorMsg = args.join(' ');
          if (errorMsg.includes('oklch') || errorMsg.includes('color parsing')) {
            return; // Suppress these errors
          }
          originalError.apply(console, args);
        };

        const opt = {
          margin: [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
          filename: `${student.lastName}_${student.firstName}_${term.name}_${term.session.replace(/\//g, '-')}.pdf`,
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: false,
            letterRendering: true,
            backgroundColor: '#ffffff',
            allowTaint: false,
            // Suppress color parsing by using a custom onclone
            onclone: (clonedDoc: Document) => {
              // Add a style that forces RGB colors
              const style = clonedDoc.createElement('style');
              style.textContent = `
                * {
                  /* Convert any oklch colors to fallback RGB */
                  color: rgb(0, 0, 0) !important;
                }
                [style*="oklch"] {
                  /* Remove inline oklch styles */
                  color: inherit !important;
                }
              `;
              clonedDoc.head.appendChild(style);
              
              // Force computed styles to RGB
              const walker = clonedDoc.createTreeWalker(
                clonedDoc.body,
                NodeFilter.SHOW_ELEMENT,
                null
              );
              
              let node;
              while (node = walker.nextNode()) {
                const el = node as HTMLElement;
                try {
                  // Get computed styles and force to RGB
                  const styles = window.getComputedStyle(el);
                  if (styles.color) {
                    el.style.color = styles.color;
                  }
                  if (styles.backgroundColor && styles.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                    el.style.backgroundColor = styles.backgroundColor;
                  }
                } catch (e) {
                  // Ignore errors
                }
              }
            }
          },
          jsPDF: { 
            unit: 'in' as const, 
            format: 'letter' as const, 
            orientation: 'portrait' as const
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] as any }
        };

        const worker = html2pdf().set(opt).from(element);
        
        await worker.save();
        
        // Restore console.error
        console.error = originalError;
        
        // Remove loading indicator
        const loadingEl = document.getElementById('pdf-loading-msg');
        if (loadingEl) {
          document.body.removeChild(loadingEl);
        }
      } catch (error: any) {
        // Restore console.error
        console.error = originalError;
        
        // Remove loading indicator
        const loadingEl = document.getElementById('pdf-loading-msg');
        if (loadingEl) {
          document.body.removeChild(loadingEl);
        }
        
        console.error('Error generating PDF:', error);
        
        // Provide helpful error message
        const errorMsg = error?.message || String(error);
        if (errorMsg.includes('oklch') || errorMsg.includes('color')) {
          alert('PDF generation encountered a color format issue. Using print dialog instead...');
          // Fallback to print
          setTimeout(() => window.print(), 100);
        } else {
          alert('Error generating PDF. Opening print dialog instead...');
          setTimeout(() => window.print(), 100);
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Opening print dialog instead...');
      setTimeout(() => window.print(), 100);
    }
  };

  const nonCognitive = reportSheet.nonCognitiveAssessment;

  return (
    <div id="report-sheet-content" className="bg-white rounded-lg shadow-lg overflow-hidden print:shadow-none">
      {/* Action Buttons - Top */}
      <div className="bg-gray-100 p-4 print:hidden border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Result Report</h2>
          <div className="flex gap-2">
            <button
              onClick={handleSavePDF}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Save as PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* School Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b-4 border-blue-600">
        <div className="text-center">
          {/* School Logo */}
          {school.id && (
            <div className="mb-4 flex justify-center">
              <img
                src={`https://schoolcater.com/api/visitorwebapi/getimage/${school.id}/SCHOOL/logo/`}
                alt={`${school.name} Logo`}
                className="h-24 w-24 md:h-32 md:w-32 object-contain bg-white rounded-full p-2 shadow-md"
                onError={(e) => {
                  // Try alternative logo path if first fails
                  const img = e.target as HTMLImageElement;
                  if (!img.dataset.retried) {
                    img.dataset.retried = 'true';
                    img.src = `https://schoolcater.com/api/visitorwebapi/getimage/${school.id}/SCHOOL/logo`;
                  } else {
                    // Hide logo if both attempts fail
                    img.style.display = 'none';
                  }
                }}
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
            {school.name || 'School Name'}
          </h1>
          <div className="mt-4 space-y-1 text-sm md:text-base text-gray-700">
            {school.address && (
              <p className="font-medium">{school.address}</p>
            )}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {school.email && (
                <p className="text-blue-700 hover:text-blue-900">
                  <span className="font-semibold">Email:</span> {school.email}
                </p>
              )}
              {school.phone && (
                <p className="text-blue-700 hover:text-blue-900">
                  <span className="font-semibold">Phone:</span> {school.phone}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-300">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900">
              {reportType} {cognitive.cumulative ? 'Annual Report' : 'Termly Report'}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Student Information */}
        <div className="bg-gray-50 rounded-lg p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="ml-2 text-gray-900">{student.lastName} {student.firstName}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Student ID:</span>
              <span className="ml-2 text-gray-900">{student.regNo}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Class:</span>
              <span className="ml-2 text-gray-900">{student.class}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Session:</span>
              <span className="ml-2 text-gray-900">{term.session}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Term:</span>
              <span className="ml-2 text-gray-900">{term.name}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Position:</span>
              <span className="ml-2 text-gray-900">
                {cognitiveSummary.posInArm?.position.replace(/Position in Arm:\s*/i, '') || 'N/A'}
               
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Total Score:</span>
              <span className="ml-2 text-gray-900">{cognitiveSummary.finalScore}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Average:</span>
              <span className="ml-2 text-gray-900">{cognitiveSummary.finalAvgScore}%</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Number in Class:</span>
              <span className="ml-2 text-gray-900"> {cognitiveSummary.posInArm?.outOf && ` ${cognitiveSummary.posInArm.outOf.replace(/No\. in Arm:\s*/i, '')}`}</span>
            </div>
          </div>
        </div>

        {/* Academic Performance Table */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-3 text-left font-semibold">#</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Subject</th>
                  {recordedTestTypes.map((test: any, idx: number) => {
                    const testName = test.name || 'Test';
                    const nameParts = testName.split(' ');
                    return (
                      <th key={idx} className="border border-gray-300 p-3 text-center font-semibold text-sm">
                        {nameParts.length > 1 ? (
                          <>
                            {nameParts[0]}<br />{nameParts.slice(1).join(' ')}
                          </>
                        ) : (
                          testName
                        )}
                        <br />({test.percentage || 0}%)
                      </th>
                    );
                  })}
                  <th className="border border-gray-300 p-3 text-center font-semibold">Total<br />(100%)</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Class<br />Average</th>
                  <th className="border border-gray-300 p-3 text-center font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {cognitive.subjects && cognitive.subjects.length > 0 ? (
                  cognitive.subjects.map((subject: any, index: number) => {
                    // Sort tests to match recordedTestTypes order
                    const sortedTests = subject.currentTerm?.tests 
                      ? insertionSortTestTypes([...subject.currentTerm.tests])
                      : [];
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3">{index + 1}</td>
                        <td className="border border-gray-300 p-3 font-medium">{subject.name || 'N/A'}</td>
                        {recordedTestTypes.map((testType: any, idx: number) => {
                          const test = sortedTests[testType.originalIndex] || sortedTests[idx];
                          return (
                            <td key={idx} className="border border-gray-300 p-3 text-center">
                              {test?.score || '-'}
                            </td>
                          );
                        })}
                        <td className="border border-gray-300 p-3 text-center font-semibold">
                          {subject.currentTerm?.totalScore || '-'}
                        </td>
                        <td className="border border-gray-300 p-3 text-center">
                          {subject.classArmAverage || '-'}
                        </td>
                        <td className="border border-gray-300 p-3 text-center font-bold text-blue-600">
                          {subject.grade || '-'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5 + recordedTestTypes.length} className="border border-gray-300 p-3 text-center text-gray-500">
                      No subjects found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grading Key */}
        {reportSheet.gradeKey && reportSheet.gradeKey.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Key to Grades</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportSheet.gradeKey.map((grade: any, idx: number) => {
                // Parse the grade string which may contain newlines and formatting
                const gradeText = grade.grade || '';
                // Clean up the text - replace \r\n with spaces, clean up multiple spaces
                const cleanedText = gradeText
                  .replace(/\\r\\n/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim();
                
                // Try to extract score range and grade description
                const parts = cleanedText.split('=').map((p: string) => p.trim());
                const scoreRange = parts[0] || '';
                const gradeDesc = parts[1] || '';
                
                return (
                  <div 
                    key={idx} 
                    className="bg-white rounded-lg p-4 border-2 border-blue-300 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-blue-900 text-lg mb-1">
                          {scoreRange}
                        </div>
                        <div className="text-gray-700 text-sm leading-relaxed">
                          {gradeDesc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Behavioral & Skill Assessment */}
        {nonCognitive && nonCognitive.selected && nonCognitive.domains && nonCognitive.domains.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Behavioral & Skill Assessment</h2>
            
            {/* Rating Key */}
            <div className="mb-6 bg-white rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-gray-800 mb-3 text-center">Key to Ratings</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                <div className="text-center p-2 bg-green-100 rounded">
                  <span className="font-bold text-green-800">5</span> - <span className="text-green-700">Excellent</span>
                </div>
                <div className="text-center p-2 bg-blue-100 rounded">
                  <span className="font-bold text-blue-800">4</span> - <span className="text-blue-700">Good</span>
                </div>
                <div className="text-center p-2 bg-yellow-100 rounded">
                  <span className="font-bold text-yellow-800">3</span> - <span className="text-yellow-700">Fair</span>
                </div>
                <div className="text-center p-2 bg-orange-100 rounded">
                  <span className="font-bold text-orange-800">2</span> - <span className="text-orange-700">Poor</span>
                </div>
                <div className="text-center p-2 bg-red-100 rounded">
                  <span className="font-bold text-red-800">1</span> - <span className="text-red-700">Very Poor</span>
                </div>
              </div>
            </div>

            {/* Assessment Domains */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nonCognitive.domains.map((domain: any, domainIdx: number) => (
                <div key={domainIdx} className="bg-white rounded-lg p-5 border-2 border-purple-200 shadow-sm">
                  <h3 className="text-xl font-bold text-purple-900 mb-4 text-center border-b-2 border-purple-300 pb-2">
                    {domain.name}
                  </h3>
                  <div className="space-y-2">
                    {domain.criteria && domain.criteria.map((criterion: any, critIdx: number) => {
                      const rating = criterion.value;
                      const ratingColor = 
                        rating === 5 ? 'bg-green-100 text-green-800 border-green-300' :
                        rating === 4 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                        rating === 3 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                        rating === 2 ? 'bg-orange-100 text-orange-800 border-orange-300' :
                        'bg-red-100 text-red-800 border-red-300';
                      
                      return (
                        <div key={critIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <span className="font-medium text-gray-800 flex-1">
                            {critIdx + 1}. {criterion.name}
                          </span>
                          <span className={`px-4 py-1 rounded-full font-bold border-2 ${ratingColor} min-w-[3rem] text-center`}>
                            {rating}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {comment.classTeacher && comment.classTeacherComment && (
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 border-2 border-yellow-300 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-yellow-600 rounded"></div>
                <h3 className="text-xl font-bold text-gray-800">Class Teacher's Comment</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-4 bg-white p-4 rounded-lg border border-yellow-200">
                {comment.classTeacherComment}
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-yellow-300">
                <span className="text-sm font-semibold text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-800">{term.endDate}</span>
              </div>
            </div>
          )}
          
          {comment.headTeacher && comment.headTeacherComment && (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-2 border-green-300 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-green-600 rounded"></div>
                <h3 className="text-xl font-bold text-gray-800">Head Teacher's Comment</h3>
              </div>
              <p className="text-gray-700 text-base leading-relaxed mb-4 bg-white p-4 rounded-lg border border-green-200">
                {comment.headTeacherComment}
              </p>
              <div className="flex justify-between items-center pt-3 border-t border-green-300">
                <span className="text-sm font-semibold text-gray-600">Date:</span>
                <span className="text-sm font-medium text-gray-800">{term.endDate}</span>
              </div>
              {comment.headTeacherSignature && (
                <div className="mt-4 pt-4 border-t border-green-300">
                  <img 
                    src={`https://schoolcater.com/${comment.headTeacherSignature}`}
                    alt="Head Teacher Signature"
                    className="h-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Next Term Info */}
        {term.nextTerm && (
          <div className="bg-purple-50 rounded-lg p-4">
            <span className="font-semibold text-gray-800">Next Term Begins:</span>
            <span className="ml-2 text-gray-900">{term.nextTerm}</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const ResultChecker: React.FC = () => {
  // Load persisted report sheet from localStorage on mount
  const loadPersistedReport = () => {
    try {
      const saved = localStorage.getItem('resultChecker_reportSheet');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check if it's not too old (e.g., 24 hours)
        const savedTime = localStorage.getItem('resultChecker_reportSheet_time');
        if (savedTime) {
          const age = Date.now() - parseInt(savedTime);
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours
          if (age < maxAge) {
            return parsed;
          } else {
            // Clear old data
            localStorage.removeItem('resultChecker_reportSheet');
            localStorage.removeItem('resultChecker_reportSheet_time');
          }
        }
      }
    } catch (e) {
      console.error('Error loading persisted report:', e);
    }
    return null;
  };

  const persistedReport = loadPersistedReport();

  const [formData, setFormData] = useState({
    registrationNumber: '',
    session: '',
    term: '',
    cardPinNumber: '',
    cardSerialNumber: ''
  });
  const [step, setStep] = useState<'input' | 'results'>(persistedReport ? 'results' : 'input');
  const [isLoading, setIsLoading] = useState(false);
  const [validating, setValidating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [studentInfo, setStudentInfo] = useState<any>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const [sessions, setSessions] = useState<any[]>([]);
  const [terms, setTerms] = useState<any[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reportSheet, setReportSheet] = useState<any>(persistedReport);
  const [validated, setValidated] = useState(false);

  // Restore step if we have persisted report
  useEffect(() => {
    if (persistedReport && step !== 'results') {
      setStep('results');
    }
  }, []); // Only run on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const oldValue = formData[name as keyof typeof formData];
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Reset validation state when student ID changes
    if (name === 'registrationNumber' && value !== oldValue) {
      setValidated(false);
      setStudentInfo(null);
      setSessions([]);
      setTerms([]);
      setSchoolId('');
    }
  };

  // Memoized validation function
  const validateStudentId = useCallback(async (studentId: string) => {
    if (!studentId.trim()) return null;

    try {
      const response = await resultCheckerApi.validateStudent(studentId);
      return response;
    } catch (error: any) {
      throw error;
    }
  }, []);

  const handleStudentIdBlur = useCallback(async () => {
    const studentId = formData.registrationNumber.trim();
    if (!studentId || validated) return;

    setValidating(true);
    setErrors({});

    try {
      const response = await validateStudentId(studentId);
      if (response) {
        setStudentInfo(response.student);
        setSchoolId(response.schools[0].id);
        setShowConfirmModal(true);
        setValidated(true);
      }
    } catch (error: any) {
      const errorMsg = error['resultChecker.StudentId']?.errors[0]?.errorMessage 
        || 'Invalid student ID. Please check and try again.';
      setErrors({ registrationNumber: errorMsg });
      setSessions([]);
      setTerms([]);
      setStudentInfo(null);
      setValidated(false);
    } finally {
      setValidating(false);
    }
  }, [formData.registrationNumber, validated, validateStudentId]);

  const handleContinue = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);

    try {
      const sessionsData = await resultCheckerApi.getSchoolSessions(
        schoolId, 
        formData.registrationNumber
      );
      setSessions(sessionsData);
    } catch (error: any) {
      const errorMsg = error['resultChecker.School']?.errors[0]?.errorMessage 
        || 'Failed to load sessions';
      setErrors({ session: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setFormData({ ...formData, registrationNumber: '' });
    setStudentInfo(null);
    setValidated(false);
  };

  const handleSessionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sessionId = e.target.value;
    setFormData({ ...formData, session: sessionId, term: '' });
    
    if (!sessionId) {
      setTerms([]);
      return;
    }

    setIsLoading(true);
    setErrors({ ...errors, session: '', term: '' });

    try {
      const termsData = await resultCheckerApi.getSessionTerms(
        sessionId,
        formData.registrationNumber
      );
      setTerms(termsData);
    } catch (error: any) {
      const errorMsg = error['resultChecker.Session']?.errors[0]?.errorMessage 
        || 'Failed to load terms';
      setErrors({ ...errors, session: errorMsg });
      setTerms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    const resultChecker = {
      studentId: formData.registrationNumber,
      school: schoolId,
      session: formData.session,
      term: formData.term,
      pin: formData.cardPinNumber,
      serial: formData.cardSerialNumber
    };

    try {
      const verifyResponse = await resultCheckerApi.verifyAndGetResult(resultChecker);
      
      // Handle completeProfile case (if user needs to complete profile)
      if (verifyResponse && verifyResponse.completeProfile) {
        // TODO: Handle profile completion if needed
        throw new Error('Profile completion required');
      }
      
      // The verify response is the token (could be a string or object with token)
      const token = typeof verifyResponse === 'string' 
        ? verifyResponse 
        : (verifyResponse?.token || verifyResponse);
      
      if (!token) {
        throw new Error('No token received from verification');
      }
      
      // Fetch the actual report sheet
      const reportData = await resultCheckerApi.getReportSheet(token);
      
      console.log('Report data received:', reportData);
      console.log('Report data type:', typeof reportData);
      console.log('Has reportSheet property:', 'reportSheet' in reportData);
      
      if (reportData && reportData.error) {
        throw new Error(reportData.error.message || 'Failed to retrieve report sheet');
      }
      
      // The report sheet data might be nested under reportSheet or at the root
      // Based on display_result.js, the structure is: { sessions, terms, selectedSession, selectedTerm, reportSheet }
      const finalReportSheet = reportData?.reportSheet || reportData;
      
      console.log('Final report sheet:', finalReportSheet);
      console.log('Final report sheet keys:', finalReportSheet ? Object.keys(finalReportSheet) : 'null');
      
      if (!finalReportSheet) {
        console.error('Invalid report sheet data:', reportData);
        throw new Error('Invalid report sheet data received');
      }
      
      // Validate that we have the required fields
      if (!finalReportSheet.student || !finalReportSheet.term || !finalReportSheet.cognitive || !finalReportSheet.school || !finalReportSheet.comment) {
        console.error('Missing required fields in report sheet:', {
          hasStudent: !!finalReportSheet.student,
          hasTerm: !!finalReportSheet.term,
          hasCognitive: !!finalReportSheet.cognitive,
          hasSchool: !!finalReportSheet.school,
          hasComment: !!finalReportSheet.comment,
          keys: Object.keys(finalReportSheet)
        });
      }
      
      // Save to localStorage for persistence
      localStorage.setItem('resultChecker_reportSheet', JSON.stringify(finalReportSheet));
      localStorage.setItem('resultChecker_reportSheet_time', Date.now().toString());
      
      setReportSheet(finalReportSheet);
      setStep('results');
      
    } catch (error: any) {
      console.error('Error in handleSubmit:', error);
      const newErrors: Record<string, string> = {};
      
      // Handle API validation errors
      if (error && typeof error === 'object') {
        if (error['resultChecker.StudentId']) {
          newErrors.registrationNumber = error['resultChecker.StudentId'].errors[0].errorMessage;
        }
        if (error['resultChecker.Session']) {
          newErrors.session = error['resultChecker.Session'].errors[0].errorMessage;
        }
        if (error['resultChecker.Term']) {
          newErrors.term = error['resultChecker.Term'].errors[0].errorMessage;
        }
        if (error['resultChecker.Serial']) {
          newErrors.cardSerialNumber = error['resultChecker.Serial'].errors[0].errorMessage;
          newErrors.cardPinNumber = 'Invalid PIN/Serial combination';
        }
      }
      
      // If no specific errors found, show a generic error
      if (Object.keys(newErrors).length === 0) {
        const errorMessage = error?.message || error?.error || 'An error occurred while checking your result. Please try again.';
        newErrors.general = errorMessage;
        console.error('General error:', errorMessage, error);
      }
      
      setErrors(newErrors);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Clear persisted data when going back
    localStorage.removeItem('resultChecker_reportSheet');
    localStorage.removeItem('resultChecker_reportSheet_time');
    
    setStep('input');
    setReportSheet(null);
  };

  if (step === 'results' && reportSheet) {
    return (
      <>
        <style>{`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-container, .print-container * {
              visibility: visible;
            }
            .print-container {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .print\\:hidden {
              display: none !important;
            }
            .print\\:bg-blue-600 {
              background-color: #2563eb !important;
            }
            .print\\:shadow-none {
              box-shadow: none !important;
            }
            @page {
              margin: 1cm;
            }
          }
        `}</style>
        <div className="min-h-screen bg-gray-50 py-12 px-6 print:py-0 print:px-0">
          <div className="container mx-auto max-w-6xl print-container">
            <ResultDisplay reportSheet={reportSheet} onBack={handleBack} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section - Result Checker Form */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-10">
            {/* Title */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                RESULT CHECKER
              </h1>
              <div className="flex justify-center">
                <Bookmark className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            {/* Form */}
            <div className="space-y-8">
              {/* Registration Number */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Registration Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    onBlur={handleStudentIdBlur}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base ${
                      errors.registrationNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your registration number"
                  />
                  {validating && (
                    <div className="absolute right-3 top-3">
                      <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                  )}
                </div>
                {errors.registrationNumber && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.registrationNumber}</span>
                  </div>
                )}
                {studentInfo && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Student Verified</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Name:</span> {studentInfo.lastName} {studentInfo.firstName}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Class:</span> {studentInfo.class.name} {studentInfo.classArm.name}
                    </p>
                  </div>
                )}
              </div>

              {/* Session */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Session
                </label>
                <select
                  name="session"
                  value={formData.session}
                  onChange={handleSessionChange}
                  disabled={!studentInfo || sessions.length === 0}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.session ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">----- Select Session -----</option>
                  {sessions.map(session => (
                    <option key={session.id} value={session.id}>{session.name}</option>
                  ))}
                </select>
                {errors.session && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.session}</span>
                  </div>
                )}
              </div>

              {/* Term */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Term
                </label>
                <div className="relative">
                  <select
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    disabled={!formData.session || terms.length === 0}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-100 disabled:cursor-not-allowed ${
                      errors.term ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">----- Select Term -----</option>
                    {terms.map(term => (
                      <option key={term.id} value={term.id}>{term.name}</option>
                    ))}
                  </select>
                  {isLoading && formData.session && (
                    <div className="absolute right-3 top-3">
                      <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                    </div>
                  )}
                </div>
                {errors.term && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.term}</span>
                  </div>
                )}
              </div>

              {/* Card Pin Number */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Card Pin Number
                </label>
                <input
                  type="password"
                  name="cardPinNumber"
                  value={formData.cardPinNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base ${
                    errors.cardPinNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your card pin number"
                />
                {errors.cardPinNumber && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.cardPinNumber}</span>
                  </div>
                )}
              </div>

              {/* Card Serial Number */}
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">
                  Card Serial Number
                </label>
                <input
                  type="text"
                  name="cardSerialNumber"
                  value={formData.cardSerialNumber}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base ${
                    errors.cardSerialNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your card serial number"
                />
                {errors.cardSerialNumber && (
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.cardSerialNumber}</span>
                  </div>
                )}
              </div>

              {/* General Error Display */}
              {errors.general && (
                <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{errors.general}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading || !studentInfo}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-10 pt-8 border-t border-gray-100">
              <p className="text-base text-gray-500">
                powered by <span className="font-medium text-gray-700">School Cater</span>
              </p>
            </div>
          </div>

          {/* Right Section - Guidelines */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Guidelines
              </h2>
              <div className="h-px bg-blue-600 mb-8"></div>
              
              <p className="text-base text-gray-600 mb-8">
                To check your result, follow the simple steps listed below. After checking your result, you can save it or print immediately.
              </p>

              <ol className="space-y-6 text-base text-gray-700">
                <li className="flex">
                  <span className="font-bold mr-4">1.</span>
                  <span>Enter your Registration Number. This will be provided to you by your school as your "Student ID", "Registration Number" or any other similar name.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">2.</span>
                  <span>Select the session in which you want to check your result.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">3.</span>
                  <span>Select the term.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">4.</span>
                  <span>Scratch the hidden area at the back of the scratch card and enter the revealed pin as your card pin number.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">5.</span>
                  <span>Enter the serial number of the scratch card written on the lower side at the back of the scratch card.</span>
                </li>
                <li className="flex">
                  <span className="font-bold mr-4">6.</span>
                  <span>Click the Submit button.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && studentInfo && (
        <ConfirmationModal
          student={studentInfo}
          onConfirm={handleContinue}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ResultChecker;