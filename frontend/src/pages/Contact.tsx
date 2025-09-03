import React, { useState } from 'react';
import {  Send, MapPin, Phone, Mail, Facebook } from 'lucide-react';
import Image from '../components/common/Image';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image 
          usageId="contact"
          alt="Contact LASA"
          className="w-full h-full object-cover"
          priority="high"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Get in touch with us. We're here to help and answer any questions you may have.
          </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Liberal Arts and Science Academy (LASA), Abakaliki is located at the heart of the Capital City of Ebonyi State, 
              Abakaliki, precisely at 17, Chukwuma Ofoke Street, Omege, Abakaliki, Ebonyi State, Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600">17, Chukwuma Ofoke Street, Omege, Abakaliki, Ebonyi State, Nigeria</p>
            </div>

            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Email Address</h3>
              <a href="mailto:lasaabakaliki@gmail.com" className="text-green-600 font-semibold hover:text-green-700">
                lasaabakaliki@gmail.com
              </a>
            </div>

            <div className="text-center p-6 bg-[#eb4c37]/20 rounded-lg">
              <Phone className="w-12 h-12 text-[#eb4c37] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Phone Numbers</h3>
              <div className="space-y-2">
                <a href="tel:+2347037933281" className="text-[#eb4c37] font-semibold hover:text-[#eb4c37]/80 block">
                  +234 703 793 3281
                </a>
                <a href="tel:+2348168418960" className="text-[#eb4c37] font-semibold hover:text-[#eb4c37]/80 block">
                  +234 816 841 8960
                </a>
              </div>
            </div>

            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Facebook className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Facebook</h3>
              <p className="text-gray-600">Liberal Arts and Science Academy, Abakaliki</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {isSubmitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="admission">Admission Inquiry</option>
                      <option value="academic">Academic Information</option>
                      <option value="general">General Inquiry</option>
                      <option value="complaint">Complaint</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your message here..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">School Address</h3>
                      <p className="text-gray-600">
                        17, Chukwuma Ofoke Street, Omege, Abakaliki, Ebonyi State, Nigeria
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Phone Numbers</h3>
                      <div className="space-y-2">
                        <a href="tel:+2347037933281" className="text-green-600 hover:text-green-700 block">
                          +234 703 793 3281
                        </a>
                        <a href="tel:+2348168418960" className="text-green-600 hover:text-green-700 block">
                          +234 816 841 8960
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-[#eb4c37] mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Address</h3>
                      <a href="mailto:lasaabakaliki@gmail.com" className="text-[#eb4c37] hover:text-[#eb4c37]/80">
                        lasaabakaliki@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-start">
                    <Facebook className="w-6 h-6 text-purple-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Facebook</h3>
                      <p className="text-gray-600">Liberal Arts and Science Academy, Abakaliki</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I apply for admission?</h3>
              <p className="text-gray-600">You can apply for admission by visiting our school at 17, Chukwuma Ofoke Street, Omege, Abakaliki, Ebonyi State, Nigeria, or by filling out our online application form. We'll guide you through the entire process.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the school fees?</h3>
              <p className="text-gray-600">School fees vary by class level. Please contact our admissions office for detailed fee structure and payment plans.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How can I check my child's results?</h3>
              <p className="text-gray-600">You can check results through our online result checker portal using your child's student ID and PIN number.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the school hours?</h3>
              <p className="text-gray-600">School hours are from 8:00 AM to 3:00 PM Monday through Friday. Office hours are 8:00 AM to 4:00 PM.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What sections does LASA comprise?</h3>
              <p className="text-gray-600">LASA is a group of schools comprising Nursery, Primary and Secondary schools. The Nursery School comprises of Creche, Pre-Nursery & Nursery 1 – 3 classes, the Primary School comprises of Primary 1 – 5 classes, while the Secondary School comprises of both Junior (JSS1 – JSS3 classes) and Senior (SSS 1 – SSS 3 classes) Schools.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 