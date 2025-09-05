import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User, CheckCircle, FileText, PhoneCall, Loader2, AlertCircle, Mail, Users, BookOpen } from 'lucide-react';
// import Image from '../components/common/Image';
import LazyImage from '../components/LazyImage';
import school from '../assets/school.jpg';
import { BACKEND_URL } from '../lib/constants';

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    // Student Information
    surname: '',
    otherNames: '',
    gender: '',
    dateOfBirth: '',
    placeOfBirth: '',
    stateOfOrigin: '',
    nationality: '',
    religion: '',
    residentialAddress: '',
    presentSchool: '',
    currentClass: '',
    bloodGroup: '',
    genotype: '',
    
    // Parents Information
    fatherName: '',
    fatherOccupation: '',
    fatherPhone: '',
    fatherEmail: '',
    motherName: '',
    motherOccupation: '',
    motherPhone: '',
    motherEmail: '',
    
    // Guardian Information (where applicable)
    guardianName: '',
    guardianAddress: '',
    guardianOccupation: '',
    guardianHomePhone: '',
    guardianOfficePhone: '',
    guardianEmail: '',
    
    // Siblings Information
    hasSiblingsInLASA: '',
    sibling1Name: '',
    sibling1Class: '',
    sibling2Name: '',
    sibling2Class: '',
    
    // Referral Information
    referralSource: '',
    referredByParent: '',
    referredByStaff: '',
    referredByAlumni: '',
    referredByOthers: '',
    
    // Declaration
    declaration: false
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Create applicant mutation
  const createApplicantMutation = useMutation({
    mutationFn: async (applicantData: any) => {
      const response = await fetch(`${BACKEND_URL}/api/applicants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setError('');
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          surname: '',
          otherNames: '',
          gender: '',
          dateOfBirth: '',
          placeOfBirth: '',
          stateOfOrigin: '',
          nationality: '',
          religion: '',
          residentialAddress: '',
          presentSchool: '',
          currentClass: '',
          bloodGroup: '',
          genotype: '',
          fatherName: '',
          fatherOccupation: '',
          fatherPhone: '',
          fatherEmail: '',
          motherName: '',
          motherOccupation: '',
          motherPhone: '',
          motherEmail: '',
          guardianName: '',
          guardianAddress: '',
          guardianOccupation: '',
          guardianHomePhone: '',
          guardianOfficePhone: '',
          guardianEmail: '',
          hasSiblingsInLASA: '',
          sibling1Name: '',
          sibling1Class: '',
          sibling2Name: '',
          sibling2Class: '',
          referralSource: '',
          referredByParent: '',
          referredByStaff: '',
          referredByAlumni: '',
          referredByOthers: '',
          declaration: false
        });
      }, 5000);
    },
    onError: (error: Error) => {
      console.error('Error submitting application:', error);
      setError(error.message);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createApplicantMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <LazyImage 
          src={school}
          alt="Admissions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join LASA and embark on a journey of academic excellence and personal growth
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Form</h2>
              <p className="text-lg text-gray-600">
                Liberal Arts and Science Academy, Abakaliki
              </p>
              <p className="text-sm text-gray-500 mt-2">
                17 Chukwuma Ofoke Street, Abakaliki Ebonyi State
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Application Error</p>
                      <p className="text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                {/* Student Information */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    A. Student's Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Surname
                      </label>
                      <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter surname"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Other Names
                      </label>
                      <input
                        type="text"
                        name="otherNames"
                        value={formData.otherNames}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter other names"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleInputChange}
                            required
                            className="mr-2"
                          />
                          Male
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleInputChange}
                            required
                            className="mr-2"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Place of Birth
                      </label>
                      <input
                        type="text"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter place of birth"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State of Origin
                      </label>
                      <input
                        type="text"
                        name="stateOfOrigin"
                        value={formData.stateOfOrigin}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter state of origin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter nationality"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Religion
                      </label>
                      <input
                        type="text"
                        name="religion"
                        value={formData.religion}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter religion"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Residential Address
                      </label>
                      <textarea
                        name="residentialAddress"
                        value={formData.residentialAddress}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter residential address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Present School
                      </label>
                      <input
                        type="text"
                        name="presentSchool"
                        value={formData.presentSchool}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter present school (if any)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Class
                      </label>
                      <input
                        type="text"
                        name="currentClass"
                        value={formData.currentClass}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter current class"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Group
                      </label>
                      <select
                        name="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Genotype
                      </label>
                      <select
                        name="genotype"
                        value={formData.genotype}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Genotype</option>
                        <option value="AA">AA</option>
                        <option value="AS">AS</option>
                        <option value="SS">SS</option>
                        <option value="AC">AC</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Parents Information */}
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    B. Parents' Information
                  </h3>
                  
                  {/* Father's Information */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Father's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Father's Name
                        </label>
                        <input
                          type="text"
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter father's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="fatherOccupation"
                          value={formData.fatherOccupation}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter occupation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="fatherPhone"
                          value={formData.fatherPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="fatherEmail"
                          value={formData.fatherEmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mother's Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Mother's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mother's Name
                        </label>
                        <input
                          type="text"
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter mother's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Occupation
                        </label>
                        <input
                          type="text"
                          name="motherOccupation"
                          value={formData.motherOccupation}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter occupation"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="motherPhone"
                          value={formData.motherPhone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="motherEmail"
                          value={formData.motherEmail}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Guardian Information (where applicable)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name of Guardian
                      </label>
                      <input
                        type="text"
                        name="guardianName"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter guardian's name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Occupation
                      </label>
                      <input
                        type="text"
                        name="guardianOccupation"
                        value={formData.guardianOccupation}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter occupation"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address of Guardian
                      </label>
                      <textarea
                        name="guardianAddress"
                        value={formData.guardianAddress}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter guardian's address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tel. No. (Home)
                      </label>
                      <input
                        type="tel"
                        name="guardianHomePhone"
                        value={formData.guardianHomePhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter home phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tel. No. (Office)
                      </label>
                      <input
                        type="tel"
                        name="guardianOfficePhone"
                        value={formData.guardianOfficePhone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter office phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="guardianEmail"
                        value={formData.guardianEmail}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Siblings Information */}
                <div className="bg-pink-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Siblings in LASA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Do you have sibling(s) in LASA?
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasSiblingsInLASA"
                            value="yes"
                            checked={formData.hasSiblingsInLASA === 'yes'}
                            onChange={handleInputChange}
                            required
                            className="mr-2"
                          />
                          Yes
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="hasSiblingsInLASA"
                            value="no"
                            checked={formData.hasSiblingsInLASA === 'no'}
                            onChange={handleInputChange}
                            required
                            className="mr-2"
                          />
                          No
                        </label>
                      </div>
                    </div>
                    
                    {formData.hasSiblingsInLASA === 'yes' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sibling 1 Name
                          </label>
                          <input
                            type="text"
                            name="sibling1Name"
                            value={formData.sibling1Name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter sibling's name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sibling 1 Class
                          </label>
                          <input
                            type="text"
                            name="sibling1Class"
                            value={formData.sibling1Class}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter class"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sibling 2 Name
                          </label>
                          <input
                            type="text"
                            name="sibling2Name"
                            value={formData.sibling2Name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter sibling's name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sibling 2 Class
                          </label>
                          <input
                            type="text"
                            name="sibling2Class"
                            value={formData.sibling2Class}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter class"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Referral Information */}
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    C. Referral Record
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        How did you hear about us?
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="referralSource"
                            value="social-media"
                            checked={formData.referralSource === 'social-media'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Social media
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="referralSource"
                            value="radio-station"
                            checked={formData.referralSource === 'radio-station'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Radio station
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="referralSource"
                            value="others"
                            checked={formData.referralSource === 'others'}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Others
                        </label>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parents: Please share name
                        </label>
                        <input
                          type="text"
                          name="referredByParent"
                          value={formData.referredByParent}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter parent's name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Staff: Please share name
                        </label>
                        <input
                          type="text"
                          name="referredByStaff"
                          value={formData.referredByStaff}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter staff name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alumni: Please share name
                        </label>
                        <input
                          type="text"
                          name="referredByAlumni"
                          value={formData.referredByAlumni}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter alumni name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Others: Specify
                        </label>
                        <input
                          type="text"
                          name="referredByOthers"
                          value={formData.referredByOthers}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Specify other source"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declaration */}
                <div className="bg-red-50 p-6 rounded-lg">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="declaration"
                      checked={formData.declaration}
                      onChange={handleInputChange}
                      required
                      className="mr-3 mt-1"
                    />
                    <label className="text-sm text-gray-700">
                      I certify that the above information is correct.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={createApplicantMutation.isPending}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-base disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {createApplicantMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Thank you for applying to LASA. We have received your application and will reach out to you soon.
                </p>
                <p className="text-base text-gray-500">
                  Our admissions team will contact you within 2-3 business days to discuss the next steps.
                </p>
              </div>
            )}
          </div>

          {/* Requirements Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Requirements</h2>
              <p className="text-lg text-gray-600">
                The requirements for admission are as follows:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Entrance Examination</h4>
                    <p className="text-gray-600">A pass of the entrance examination.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transfer Certificate</h4>
                    <p className="text-gray-600">Transfer certificate from the last school attended or the last result obtained from such school.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Birth Certificate</h4>
                    <p className="text-gray-600">Birth certificate/Age declaration/Baptismal certificate.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Passport Photographs</h4>
                    <p className="text-gray-600">2 passport photographs.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Letter of Undertaking</h4>
                    <p className="text-gray-600">Letter of undertaking by parent/guardian.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Medical Certificate</h4>
                    <p className="text-gray-600">Medical certificate from any government approved hospital.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">7</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Admission Form</h4>
                    <p className="text-gray-600">Successful filling of our admission form.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">On registration, the following will be provided:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Registration Number</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">School prospectus</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">List of textbooks</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Assembly manual</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Three sets of school uniform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School Location */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Visit Our School</h2>
              <p className="text-lg text-gray-600">
                To apply into Liberal Arts and Science Academy, Abakaliki, kindly visit our school
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <PhoneCall className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Numbers</h3>
                <p className="text-gray-600 mb-4">For admissions inquiries</p>
                <div className="space-y-2">
                  <a href="tel:+2347037933281" className="text-blue-600 font-semibold text-lg hover:text-blue-700 block">
                    +234 703 793 3281
                  </a>
                  <a href="tel:+2348168418960" className="text-blue-600 font-semibold text-lg hover:text-blue-700 block">
                    +234 816 841 8960
                  </a>
                </div>
              </div>

              <div className="text-center p-6 bg-[#eb4c37]/20 rounded-lg">
                <Mail className="w-12 h-12 text-[#eb4c37] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Contact</h3>
                <p className="text-gray-600 mb-4">Send us an email</p>
                <a href="mailto:lasaabakaliki@gmail.com" className="text-[#eb4c37] font-semibold text-lg hover:text-[#eb4c37]/80">
                  lasaabakaliki@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions; 