'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, FileText, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div><Header/>
    <div className="min-h-screen bg-gradient-to-br mt-30 from-slate-50 to-blue-50">
      
      {/* Header */}
      <motion.div 
        className="bg-white shadow-lg border-b-4  border-blue-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div className="flex items-center space-x-4 mb-4" {...fadeInUp}>
            <Shield className="h-12 w-12 text-blue-600" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-lg text-gray-600">Boldly Creative - Protecting Your Privacy</p>
            </div>
          </motion.div>
          <motion.p 
            className="text-sm text-gray-500 flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Calendar className="h-4 w-4" />
            <span>Last Updated: September 2025</span>
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div variants={staggerChildren} initial="initial" animate="animate">
          
          {/* Introduction */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Boldly Creative ("we," "us," or "our") is an advertising and creative services company registered in India, 
              providing video production, photography, graphics & design, and website development services. We are 
              committed to protecting the privacy of our website visitors and clients in accordance with Indian laws 
              including the Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act, 2000.
            </p>
            <p className="text-gray-700 leading-relaxed">
              By using our website <span className="font-semibold text-blue-600">https://www.boldlycreative.com</span>, 
              you signify your acceptance of this Privacy Policy. If you do not agree with these terms, 
              please do not use our website or services.
            </p>
          </motion.section>

          {/* Consent */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Consent Framework</h2>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-6">
              <p className="text-gray-800 font-medium">
                Your consent is the foundation of our data processing activities.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              By providing your personal data through our website, contact forms, or service inquiries, 
              you provide your free, specific, informed, and unambiguous consent to the collection, 
              processing, and use of your data as described in this Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Right to Withdraw:</strong> You can withdraw your consent at any time by contacting 
              our Grievance Officer. Upon withdrawal, we will cease processing your data for the purposes 
              you've withdrawn consent for, except where legally required to retain it.
            </p>
          </motion.section>

          {/* Information We Collect */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                  Personal Data
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Full name and contact details</li>
                  <li>• Email address and phone number</li>
                  <li>• Company/organization information</li>
                  <li>• Project requirements and communications</li>
                  <li>• Payment and billing information</li>
                  <li>• Any voluntary information in inquiries</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                  Technical Data
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• IP address and location data</li>
                  <li>• Browser type and version</li>
                  <li>• Device information</li>
                  <li>• Website usage analytics</li>
                  <li>• Cookies and tracking data</li>
                  <li>• Referral sources</li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* How We Use Information */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">How We Use Your Information</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Delivery</h3>
                <p className="text-gray-700">Responding to inquiries, providing quotes, managing projects, and delivering requested services.</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-700">Sending updates, invoices, project communications, and responding to your queries.</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Marketing (with consent)</h3>
                <p className="text-gray-700">Sending information about new services, offers, and company updates. You can opt out anytime.</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Improvement</h3>
                <p className="text-gray-700">Analyzing website traffic and user behavior to improve functionality and content.</p>
              </div>
              
              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Compliance</h3>
                <p className="text-gray-700">Processing data to comply with Indian laws, court orders, and government requests.</p>
              </div>
            </div>
          </motion.section>

          {/* Data Security */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Security & Protection</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <p className="text-gray-800 leading-relaxed">
                We implement industry-standard security measures including encryption, secure servers, 
                access controls, and regular security audits. However, no internet transmission or 
                electronic storage is 100% secure. We cannot guarantee absolute security but continuously 
                work to protect your data.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Encryption</h4>
                <p className="text-sm text-gray-600">Data encrypted in transit and at rest</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Access Control</h4>
                <p className="text-sm text-gray-600">Limited access on need-to-know basis</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900">Monitoring</h4>
                <p className="text-sm text-gray-600">Regular security audits and monitoring</p>
              </div>
            </div>
          </motion.section>

          {/* Your Rights */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Rights Under DPDP Act 2023</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Access</h4>
                    <p className="text-gray-600 text-sm">Request access to your personal data we hold</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Correction</h4>
                    <p className="text-gray-600 text-sm">Request correction of inaccurate data</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Erasure</h4>
                    <p className="text-gray-600 text-sm">Request deletion when no longer needed</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Withdraw Consent</h4>
                    <p className="text-gray-600 text-sm">Withdraw consent for data processing anytime</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Grievance Redressal</h4>
                    <p className="text-gray-600 text-sm">Contact our Grievance Officer for complaints</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Right to Nominate</h4>
                    <p className="text-gray-600 text-sm">Nominate someone to exercise your rights</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Grievance Officer */}
          <motion.section variants={fadeInUp} className="mb-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Grievance Officer</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                In compliance with the DPDP Act 2023 and IT Rules, we have appointed a Grievance Officer 
                to address your privacy concerns and complaints.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-800"><strong>Email:</strong> boldlycreativemedia@gmail.com  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-800"><strong>Phone:</strong> +91-96506 76241</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-800"><strong>Address:</strong> [Plot 14, Akash Nagar, Ghaziabad, Uttar Pradesh 201013]</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <strong>Response Time:</strong> Acknowledgment within 24 hours, resolution within 30 days from receipt.
              </p>
            </div>
          </motion.section>

          {/* Updates */}
          <motion.section variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices, 
              technology, legal requirements, or other factors. We will notify you of material 
              changes by posting the updated policy on our website with a new "Last Updated" date. 
              Your continued use of our services after such changes constitutes acceptance of the 
              updated policy.
            </p>
          </motion.section>

        </motion.div>
      </div>
      <Footer />
    </div>
    </div>
  );
};

export default page;