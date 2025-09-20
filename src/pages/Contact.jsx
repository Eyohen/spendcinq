import React, { useState } from 'react';
import {
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Users,
  ArrowRight,
  CheckCircle,
  Globe,
  Building,
  Zap,
  Shield,
  Star,
  Calendar,
  FileText,
  Video,
  Coffee
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: 'general',
    message: '',
    hearAboutUs: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: 'general',
        message: '',
        hearAboutUs: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@spendcinq.com',
      action: 'Send Email',
      available: '24/7 Response',
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      available: 'Mon-Fri 9AM-6PM EST',
      color: 'bg-green-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      contact: 'Available on dashboard',
      action: 'Start Chat',
      available: 'Mon-Fri 9AM-9PM EST',
      color: 'bg-[#b892ff]'
    },
    {
      icon: Video,
      title: 'Schedule Demo',
      description: 'Book a personalized demo',
      contact: 'calendly.com/Spendcinq',
      action: 'Book Demo',
      available: 'Flexible scheduling',
      color: 'bg-orange-500'
    }
  ];

  const officeLocations = [
    {
      city: 'Victoria Island',
      address: '123 Financial District',
      phone: '+234 902432762',
      hours: 'Mon-Fri 9AM-6PM EST'
    },
    // {
    //   city: 'San Francisco',
    //   address: '456 Tech Valley, CA 94105',
    //   phone: '+1 (555) 987-6543',
    //   hours: 'Mon-Fri 9AM-6PM PST'
    // },
    // {
    //   city: 'London',
    //   address: '789 Fintech Lane, EC2M 4RH',
    //   phone: '+44 20 7123 4567',
    //   hours: 'Mon-Fri 9AM-6PM GMT'
    // }
  ];

  const faqs = [
    {
      question: 'How quickly can we get started?',
      answer: 'Most companies are up and running within 24 hours. Our onboarding team will guide you through the setup process.'
    },
    {
      question: 'Do you offer training for our team?',
      answer: 'Yes! We provide comprehensive training sessions, video tutorials, and ongoing support to ensure your team maximizes the platform.'
    },
    {
      question: 'What integrations do you support?',
      answer: 'We integrate with 50+ popular business tools including QuickBooks, Slack, Microsoft 365, and many more.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption, SOC 2 compliance, and follow industry best practices for data security.'
    }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[#b892ff] hover:text-[#a075ff] font-medium"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-jakarta">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#b892ff] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Spendcinq</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                Back to Home
              </button>
              <button className="bg-[#b892ff] text-white px-4 py-2 rounded-lg hover:bg-[#a075ff] transition-colors">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#b892ff]/10 via-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Have questions about Spendcinq? Our team is here to help you streamline your expense management and grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#b892ff] text-white px-8 py-4 rounded-xl hover:bg-[#a075ff] transition-colors font-semibold">
              Schedule a Demo
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose How You'd Like to Connect
            </h2>
            <p className="text-lg text-gray-600">
              We're here to help in whatever way works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-3">{method.description}</p>
                  <p className="text-sm font-medium text-gray-900 mb-2">{method.contact}</p>
                  <p className="text-xs text-gray-500 mb-4">{method.available}</p>
                  <button className="w-full bg-gray-100 text-gray-900 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    {method.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                      placeholder="john@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                      placeholder="Acme Corp"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="demo">Request Demo</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Question</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                    placeholder="Tell us about your needs and how we can help..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How did you hear about us?
                  </label>
                  <select
                    name="hearAboutUs"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  >
                    <option value="">Select an option</option>
                    <option value="google">Google Search</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="advertising">Online Advertising</option>
                    <option value="event">Event or Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-[#b892ff] text-white py-3 rounded-lg hover:bg-[#a075ff] transition-colors font-semibold flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Office Locations & FAQ */}
            <div className="space-y-8">
              {/* Office Locations */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Offices</h3>
                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2">{office.city}</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {office.address}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {office.phone}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {office.hours}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-sm text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                <button className="mt-6 text-[#b892ff] hover:text-[#a075ff] font-medium text-sm">
                  View All FAQs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that have streamlined their expense management with Spendcinq.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#b892ff] px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#b892ff] transition-colors font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-[#b892ff] rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">Spendcinq</span>
              </div>
              <p className="text-gray-400">
                Smart expense management for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>support@spendcinq.com</p>
                <p>+1 (555) 123-4567</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Spendcinq. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;