import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BACKEND_URL } from '../../lib/constants';
import { Eye, Download, Filter, Search } from 'lucide-react';

interface Applicant {
  id: string;
  surname: string;
  otherNames: string;
  gender: string;
  dateOfBirth: string;
  placeOfBirth: string;
  stateOfOrigin: string;
  nationality: string;
  religion: string;
  residentialAddress: string;
  presentSchool?: string;
  currentClass?: string;
  bloodGroup?: string;
  genotype?: string;
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail?: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail?: string;
  guardianName?: string;
  guardianAddress?: string;
  guardianOccupation?: string;
  guardianHomePhone?: string;
  guardianOfficePhone?: string;
  guardianEmail?: string;
  hasSiblingsInLASA: string;
  sibling1Name?: string;
  sibling1Class?: string;
  sibling2Name?: string;
  sibling2Class?: string;
  referralSource?: string;
  referredByParent?: string;
  referredByStaff?: string;
  referredByAlumni?: string;
  referredByOthers?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const ApplicantsManagement: React.FC = () => {
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch applicants data
  const { data: applicants = [], isLoading, error } = useQuery({
    queryKey: ['applicants'],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/api/applicants`);
      if (!response.ok) {
        throw new Error('Failed to fetch applicants');
      }
      return response.json();
    }
  });

  // Filter applicants based on search term and status
  const filteredApplicants = applicants.filter((applicant: Applicant) => {
    const fullName = `${applicant.surname} ${applicant.otherNames}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         applicant.fatherPhone.includes(searchTerm) ||
                         applicant.motherPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    const headers = [
      'Full Name',
      'Gender',
      'Date of Birth',
      'State of Origin',
      'Nationality',
      'Religion',
      'Father Name',
      'Father Phone',
      'Mother Name',
      'Mother Phone',
      'Has Siblings in LASA',
      'Status',
      'Application Date'
    ];
    
    const csvData = filteredApplicants.map((applicant: Applicant) => [
      `${applicant.surname} ${applicant.otherNames}`,
      applicant.gender,
      new Date(applicant.dateOfBirth).toLocaleDateString(),
      applicant.stateOfOrigin,
      applicant.nationality,
      applicant.religion,
      applicant.fatherName,
      applicant.fatherPhone,
      applicant.motherName,
      applicant.motherPhone,
      applicant.hasSiblingsInLASA,
      applicant.status,
      new Date(applicant.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row: string[]) => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applicants_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading applicants...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error loading applicants: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Applicants Management</h2>
          <button
            onClick={downloadCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Full Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Father Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mother Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplicants.map((applicant: Applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {applicant.surname} {applicant.otherNames}
                    </div>
                    <div className="text-sm text-gray-500">
                      {applicant.stateOfOrigin}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {applicant.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.fatherPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {applicant.motherPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(applicant.status)}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(applicant.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedApplicant(applicant)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No applicants found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search criteria.' 
                  : 'No applicants have been submitted yet.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Applicant Details
                </h3>
                <button
                  onClick={() => setSelectedApplicant(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Full Name:</span> {selectedApplicant.surname} {selectedApplicant.otherNames}</div>
                    <div><span className="font-medium">Gender:</span> {selectedApplicant.gender}</div>
                    <div><span className="font-medium">Date of Birth:</span> {new Date(selectedApplicant.dateOfBirth).toLocaleDateString()}</div>
                    <div><span className="font-medium">Place of Birth:</span> {selectedApplicant.placeOfBirth}</div>
                    <div><span className="font-medium">State of Origin:</span> {selectedApplicant.stateOfOrigin}</div>
                    <div><span className="font-medium">Nationality:</span> {selectedApplicant.nationality}</div>
                    <div><span className="font-medium">Religion:</span> {selectedApplicant.religion}</div>
                    <div><span className="font-medium">Address:</span> {selectedApplicant.residentialAddress}</div>
                    {selectedApplicant.presentSchool && (
                      <div><span className="font-medium">Present School:</span> {selectedApplicant.presentSchool}</div>
                    )}
                    {selectedApplicant.currentClass && (
                      <div><span className="font-medium">Current Class:</span> {selectedApplicant.currentClass}</div>
                    )}
                    {selectedApplicant.bloodGroup && (
                      <div><span className="font-medium">Blood Group:</span> {selectedApplicant.bloodGroup}</div>
                    )}
                    {selectedApplicant.genotype && (
                      <div><span className="font-medium">Genotype:</span> {selectedApplicant.genotype}</div>
                    )}
                  </div>
                </div>

                {/* Parents Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Parents Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Father:</span> {selectedApplicant.fatherName}</div>
                    <div><span className="font-medium">Father's Occupation:</span> {selectedApplicant.fatherOccupation}</div>
                    <div><span className="font-medium">Father's Phone:</span> {selectedApplicant.fatherPhone}</div>
                    {selectedApplicant.fatherEmail && (
                      <div><span className="font-medium">Father's Email:</span> {selectedApplicant.fatherEmail}</div>
                    )}
                    <div><span className="font-medium">Mother:</span> {selectedApplicant.motherName}</div>
                    <div><span className="font-medium">Mother's Occupation:</span> {selectedApplicant.motherOccupation}</div>
                    <div><span className="font-medium">Mother's Phone:</span> {selectedApplicant.motherPhone}</div>
                    {selectedApplicant.motherEmail && (
                      <div><span className="font-medium">Mother's Email:</span> {selectedApplicant.motherEmail}</div>
                    )}
                  </div>

                  {/* Guardian Information */}
                  {selectedApplicant.guardianName && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Guardian Information</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="font-medium">Guardian:</span> {selectedApplicant.guardianName}</div>
                        {selectedApplicant.guardianOccupation && (
                          <div><span className="font-medium">Occupation:</span> {selectedApplicant.guardianOccupation}</div>
                        )}
                        {selectedApplicant.guardianAddress && (
                          <div><span className="font-medium">Address:</span> {selectedApplicant.guardianAddress}</div>
                        )}
                        {selectedApplicant.guardianHomePhone && (
                          <div><span className="font-medium">Home Phone:</span> {selectedApplicant.guardianHomePhone}</div>
                        )}
                        {selectedApplicant.guardianOfficePhone && (
                          <div><span className="font-medium">Office Phone:</span> {selectedApplicant.guardianOfficePhone}</div>
                        )}
                        {selectedApplicant.guardianEmail && (
                          <div><span className="font-medium">Email:</span> {selectedApplicant.guardianEmail}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Siblings Information */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Siblings Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Has Siblings in LASA:</span> {selectedApplicant.hasSiblingsInLASA}</div>
                    {selectedApplicant.sibling1Name && (
                      <div><span className="font-medium">Sibling 1:</span> {selectedApplicant.sibling1Name} ({selectedApplicant.sibling1Class})</div>
                    )}
                    {selectedApplicant.sibling2Name && (
                      <div><span className="font-medium">Sibling 2:</span> {selectedApplicant.sibling2Name} ({selectedApplicant.sibling2Class})</div>
                    )}
                  </div>

                  {/* Referral Information */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Referral Information</h4>
                    <div className="space-y-2 text-sm">
                      {selectedApplicant.referralSource && (
                        <div><span className="font-medium">Source:</span> {selectedApplicant.referralSource}</div>
                      )}
                      {selectedApplicant.referredByParent && (
                        <div><span className="font-medium">Referred by Parent:</span> {selectedApplicant.referredByParent}</div>
                      )}
                      {selectedApplicant.referredByStaff && (
                        <div><span className="font-medium">Referred by Staff:</span> {selectedApplicant.referredByStaff}</div>
                      )}
                      {selectedApplicant.referredByAlumni && (
                        <div><span className="font-medium">Referred by Alumni:</span> {selectedApplicant.referredByAlumni}</div>
                      )}
                      {selectedApplicant.referredByOthers && (
                        <div><span className="font-medium">Referred by Others:</span> {selectedApplicant.referredByOthers}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Application Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Status:</span> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(selectedApplicant.status)}`}>
                        {selectedApplicant.status}
                      </span>
                    </div>
                    <div><span className="font-medium">Application Date:</span> {new Date(selectedApplicant.createdAt).toLocaleDateString()}</div>
                    <div><span className="font-medium">Last Updated:</span> {new Date(selectedApplicant.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantsManagement; 