'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, CreditCard, Shield, Scale, AlertTriangle, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const page = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div><Header />
    <div className="min-h-screen bg-gradient-to-br mt-30 from-slate-50 to-indigo-50">
      
      {/* Header */}
      <motion.div 
        className="bg-white mt-16 shadow-lg border-b-4 border-indigo-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div className="flex items-center space-x-4 mb-4" {...fadeInUp}>
            <Scale className="h-12 w-12 text-indigo-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Terms & Conditions</h1>
              <p className="text-lg text-gray-600">Boldly Creative - Service Agreement</p>
            </div>
          </motion.div>
          <motion.p 
            className="text-sm text-gray-500 flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar className="h-4 w-4" />
            <span>Last Updated: December 2024</span>
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div variants={staggerChildren} initial="initial" animate="animate">
          
          {/* Introduction */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Agreement Overview</h2>
            </div>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 rounded-r-lg mb-6">
              <p className="text-indigo-800 font-medium">
                This is a legally binding contract between you (the "Client") and Boldly Creative ("Company").
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing our website <span className="font-semibold text-indigo-600">https://www.boldlycreative.com</span> 
              and using our services, you agree to be bound by these Terms & Conditions, our Privacy Policy, 
              and any additional service-specific agreements.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our services are available only to individuals and entities who can form legally binding 
              contracts under the Indian Contract Act, 1872. If you do not agree to these terms, 
              please do not use our services.
            </p>
          </motion.section>

          {/* Services */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Users className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Our Services</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Creative Services</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Video Production & Post-Production</li>
                  <li>• Professional Photography Services</li>
                  <li>• Graphics Design & Branding</li>
                  <li>• Digital Marketing Materials</li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Services</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Website Design & Development</li>
                  <li>• E-commerce Solutions</li>
                  <li>• Mobile App Development</li>
                  <li>• Digital Strategy Consulting</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">
                <strong>Note:</strong> Specific service details, timelines, and deliverables will be outlined 
                in individual project agreements or Statements of Work (SOW).
              </p>
            </div>
          </motion.section>

          {/* Client Obligations */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Client Obligations</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Information</h3>
                  <p className="text-gray-700">Provide truthful, complete, and accurate information about your project requirements, business details, and contact information.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Timely Cooperation</h3>
                  <p className="text-gray-700">Provide necessary materials, content, feedback, and approvals within agreed timelines to ensure project completion.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                  <p className="text-gray-700">Ensure all provided content and requested services comply with applicable Indian laws and do not infringe third-party rights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Obligations</h3>
                  <p className="text-gray-700">Make payments according to agreed terms and schedules as outlined in project agreements.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Intellectual Property */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Intellectual Property Rights</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Our Rights</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• All website content, logos, and proprietary materials belong to Boldly Creative</li>
                    <li>• We retain rights to our methodologies, processes, and know-how</li>
                    <li>• Right to use completed work for portfolio and promotional purposes (unless NDA applies)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Rights</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Upon full payment, you receive agreed rights to final deliverables</li>
                    <li>• Ownership or license terms specified in individual project agreements</li>
                    <li>• Right to request removal from our portfolio (reasonable notice required)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800">
                <strong>Important:</strong> Third-party materials (stock photos, fonts, etc.) may require 
                separate licensing. We'll clearly identify such materials and associated costs.
              </p>
            </div>
          </motion.section>

          {/* Payment Terms */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <CreditCard className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Payment Terms</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-emerald-600 font-bold text-xl">₹</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Currency</h4>
                <p className="text-sm text-gray-600">All payments in Indian Rupees (INR) unless specified otherwise</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Schedule</h4>
                <p className="text-sm text-gray-600">Milestone-based payments as per project agreement</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Late Payment</h4>
                <p className="text-sm text-gray-600">2% per month interest on overdue amounts</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Standard Payment Terms:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• 50% advance payment to initiate project</li>
                  <li>• Remaining payments as per milestone completion</li>
                  <li>• Final payment before delivery of completed work</li>
                  <li>• Payment due within 15 days of invoice date</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Limitation of Liability */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-3">Important Legal Notice</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                To the maximum extent permitted by Indian law, Boldly Creative's total liability 
                for any claims arising from our services shall not exceed the amount paid by 
                the client for the specific service in question.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-gray-400 pl-4">
                <h4 className="font-semibold text-gray-900">We Are Not Liable For:</h4>
                <ul className="text-gray-700 text-sm mt-2 space-y-1">
                  <li>• Indirect, incidental, or consequential damages</li>
                  <li>• Loss of profits, data, or business opportunities</li>
                  <li>• Third-party actions or content</li>
                  <li>• Force majeure events beyond our control</li>
                  <li>• Client's failure to backup or secure their data</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="font-semibold text-gray-900">Our Commitment:</h4>
                <p className="text-gray-700 text-sm mt-2">
                  We will use reasonable skill and care in performing our services and will 
                  work to resolve any issues that arise during the project lifecycle.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Indemnity */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Indemnification</h2>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <p className="text-orange-800 mb-4">
                <strong>Client Indemnity:</strong> You agree to indemnify and hold harmless Boldly Creative, 
                its employees, and agents from any claims, damages, liabilities, costs, and expenses 
                (including reasonable legal fees) arising from:
              </p>
              <ul className="space-y-2 text-orange-700 text-sm">
                <li>• Your use of our services in violation of these terms</li>
                <li>• Content you provide that infringes third-party rights</li>
                <li>• Your breach of any representation or warranty</li>
                <li>• Any negligent or wrongful act on your part</li>
              </ul>
            </div>
          </motion.section>

          {/* Termination */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Service Termination</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">By Company</h3>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm mb-3">We may terminate services immediately for:</p>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Breach of these terms</li>
                    <li>• Non-payment of fees</li>
                    <li>• Illegal or harmful activities</li>
                    <li>• Violation of our policies</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">By Client</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm mb-3">You may terminate with:</p>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• 30 days written notice (ongoing services)</li>
                    <li>• Payment for completed work</li>
                    <li>• Settlement of outstanding invoices</li>
                    <li>• Return of our proprietary materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Governing Law */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Scale className="h-6 w-6 text-indigo-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Governing Law & Jurisdiction</h2>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">Applicable Law</h4>
                  <p className="text-indigo-800 text-sm">
                    These Terms & Conditions are governed by the laws of India, including:
                  </p>
                  <ul className="text-indigo-700 text-sm mt-2 space-y-1">
                    <li>• Indian Contract Act, 1872</li>
                    <li>• Information Technology Act, 2000</li>
                    <li>• Consumer Protection Act, 2019</li>
                    <li>• Digital Personal Data Protection Act, 2023</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 mb-2">Dispute Resolution</h4>
                  <p className="text-indigo-800 text-sm">
                    Any disputes will be subject to the exclusive jurisdiction of courts in 
                    <strong> New Delhi, Delhi</strong>.
                  </p>
                  <p className="text-indigo-700 text-sm mt-2">
                    We encourage resolving disputes through mutual discussion before 
                    pursuing legal remedies.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Modifications */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Terms Modification</h2>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these Terms & Conditions at any time. Changes will be 
                effective immediately upon posting on our website. Material changes will be communicated 
                to active clients via email or through our website notifications.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Your Responsibility:</strong> It's your responsibility to review these terms 
                  periodically. Continued use of our services after changes constitutes acceptance 
                  of the modified terms.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Contact Information */}
          <motion.section variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get In Touch</h3>
                <p className="text-gray-700 mb-6">
                  For questions about these Terms & Conditions or our services, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-800">boldlycreativemedia@gmail.com  </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-800">+91-96506 76241</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-800">[Plot 14, Akash Nagar, Ghaziabad, Uttar Pradesh 201013]</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="text-gray-900 font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Response time: Within 24 hours on business days
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
              <p className="text-indigo-800 font-medium">
                Thank you for choosing Boldly Creative. We look forward to working with you!
              </p>
            </div>
          </motion.section>

        </motion.div>
      </div>
      <Footer/>
    </div>
    </div>
  );
};

export default page;