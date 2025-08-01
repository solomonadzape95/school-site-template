import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { User, Phone, CheckCircle, FileText, PhoneCall, Loader2, AlertCircle } from 'lucide-react';
import LazyImage from '../components/LazyImage';
import classImage from'../assets/play.jpeg'

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Create applicant mutation
  const createApplicantMutation = useMutation({
    mutationFn: async (applicantData: { name: string; phoneNumber: string }) => {
      const response = await fetch('http://localhost:3000/api/applicants', {
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
        setFormData({ name: '', phoneNumber: '' });
      }, 5000);
    },
    onError: (error: Error) => {
      console.error('Error submitting application:', error);
      setError(error.message);
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
          src={classImage}
          alt="Admissions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join Lasa Schools and embark on a journey of academic excellence and personal growth
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="gap-10 mx-auto space-y-16 grid grid-cols-1 lg:grid-cols-2">
          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Apply Now</h2>
              <p className="text-lg text-gray-600">
                Start your child's educational journey with Lasa Schools
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-8">
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

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Student's Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Enter student's full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-3">
                    Parent's Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="Enter parent's phone number"
                    />
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
                      Submitting...
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
                  Thank you for applying to Lasa Schools. We have received your application and will reach out to you soon.
                </p>
                <p className="text-base text-gray-500">
                  Our admissions team will contact you within 2-3 business days to discuss the next steps.
                </p>
              </div>
            )}
          </div>

          {/* Requirements Section */}
          <div className="bg-white rounded-lg shadow-lg p-10">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Admission Requirements</h2>
              <p className="text-lg text-gray-600">
                The requirements for admission are as follows:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">School Examination and Interview</h4>
                    <p className="text-gray-600">A pass of the school examination and interview.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Transfer Certificate</h4>
                    <p className="text-gray-600">Transfer certificate from the last school attended with last promotion result.</p>
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
                    <p className="text-gray-600">4 passport photographs.</p>
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
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">On registration, the following will be provided:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">School prospectus and book list</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">School files</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Assembly manual</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Cumulative assessment record folder</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Students clearance booklet</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">School uniform</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Boarding prospectus</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">Copy of students guide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-lg shadow-lg p-10 lg:col-span-2">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Emergency Contact</h2>
              <p className="text-lg text-gray-600">
                For urgent admissions inquiries and support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <PhoneCall className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Admissions Office</h3>
                <p className="text-gray-600 mb-4">For general admissions inquiries</p>
                <a href="tel:+2348012345678" className="text-blue-600 font-semibold text-lg hover:text-blue-700">
                  +234 801 234 5678
                </a>
              </div>

              <div className="text-center p-6 bg-[#eb4c37]/20 rounded-lg">
                <PhoneCall className="w-12 h-12 text-[#eb4c37] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Hotline</h3>
                <p className="text-gray-600 mb-4">24/7 emergency support</p>
                <a href="tel:+2348098765432" className="text-[#eb4c37] font-semibold text-lg hover:[#eb4c37]/80">
                  +234 809 876 5432
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