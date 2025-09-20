import React, { useState } from 'react';
import {
  DollarSign,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Shield,
  Zap,
  Users,
  CheckCircle,
  AlertCircle,
  Chrome,
  Building,
  User,
  Phone,
  MapPin,
  Upload,
  FileText,
  Download,
  X,
  Check,
  Star,
  Globe,
  Calendar,
  CreditCard,
  Target
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    
    // Step 2: Company Info
    companyName: '',
    industry: '',
    companySize: '',
    role: '',
    phone: '',
    country: '',
    
    // Step 3: General Ledger
    useTemplate: 'default', // 'default', 'upload', 'skip'
    uploadedFile: null,
    
    // Step 4: Plan Selection
    selectedPlan: 'professional'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        break;
        
      case 2:
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Industry is required';
        if (!formData.companySize) newErrors.companySize = 'Company size is required';
        if (!formData.role) newErrors.role = 'Role is required';
        break;
        
      case 3:
        if (formData.useTemplate === 'upload' && !formData.uploadedFile) {
          newErrors.uploadedFile = 'Please upload a general ledger template';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      // Validate file type
      const validTypes = ['.xlsx', '.xls', '.csv'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      
      if (!validTypes.includes(fileExtension)) {
        setErrors({ uploadedFile: 'Please upload an Excel (.xlsx, .xls) or CSV file' });
        return;
      }
      
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors({ uploadedFile: 'File size must be less than 10MB' });
        return;
      }
      
      setFormData(prev => ({ ...prev, uploadedFile: file }));
      setErrors(prev => ({ ...prev, uploadedFile: '' }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Registration complete:', formData);
      // Redirect to dashboard or success page
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 4500,
      description: 'Perfect for small teams',
      features: ['Up to 10 employees', '500 transactions/month', 'Basic analytics', 'Email support'],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 15000,
      description: 'Most popular for growing companies',
      features: ['Up to 50 employees', 'Unlimited transactions', 'Advanced analytics', 'Priority support', 'API access'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 27000,
      description: 'For large organizations',
      features: ['Unlimited employees', 'Advanced security', 'Dedicated manager', 'Custom integrations', 'SLA guarantee'],
      popular: false
    }
  ];

  const industries = [
    'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing', 
    'Retail', 'Consulting', 'Real Estate', 'Non-profit', 'Other'
  ];

  const companySizes = [
    '1-10 employees', '11-50 employees', '51-200 employees', 
    '201-1000 employees', '1000+ employees'
  ];

  const roles = [
    'CEO/Founder', 'CFO', 'Finance Manager', 'Accountant', 
    'Operations Manager', 'Business Owner', 'Other'
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Your Account</h2>
        <p className="text-gray-600 mt-2">Join thousands of companies using Spendcinq</p>
      </div>

      {/* Social Sign Up */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSocialSignUp('google')}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Chrome className="w-5 h-5 mr-3" />
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialSignUp('microsoft')}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Building className="w-5 h-5 mr-3" />
          Continue with Microsoft
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">Or create account with email</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.firstName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="John"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.lastName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Doe"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="john@company.com"
          />
        </div>
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-start">
        <input
          type="checkbox"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleInputChange}
          className="mt-1 h-4 w-4 text-[#b892ff] focus:ring-[#b892ff] border-gray-300 rounded"
        />
        <label className="ml-3 text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="text-[#b892ff] hover:text-[#a075ff]">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-[#b892ff] hover:text-[#a075ff]">Privacy Policy</a>
        </label>
      </div>
      {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Company Information</h2>
        <p className="text-gray-600 mt-2">Help us customize your experience</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.companyName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Acme Corporation"
          />
        </div>
        {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.industry ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && <p className="mt-1 text-sm text-red-600">{errors.industry}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.companySize ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Size</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {errors.companySize && <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Your Role *</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent ${
              errors.role ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Your Role</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
        {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            >
              <option value="">Select Country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">General Ledger Setup</h2>
        <p className="text-gray-600 mt-2">Choose how you'd like to set up your chart of accounts</p>
      </div>

      <div className="space-y-4">
        {/* Default Template Option */}
        <div
          className={`p-6 border rounded-xl cursor-pointer transition-all ${
            formData.useTemplate === 'default'
              ? 'border-[#b892ff] bg-[#b892ff]/5 ring-2 ring-[#b892ff]/20'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData(prev => ({ ...prev, useTemplate: 'default', uploadedFile: null }))}
        >
          <div className="flex items-start">
            <input
              type="radio"
              name="useTemplate"
              value="default"
              checked={formData.useTemplate === 'default'}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-[#b892ff] focus:ring-[#b892ff]"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center mb-2">
                <FileText className="w-5 h-5 text-[#b892ff] mr-2" />
                <h3 className="font-medium text-gray-900">Use Default Template</h3>
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Recommended</span>
              </div>
              <p className="text-gray-600 text-sm">
                Start with our pre-built chart of accounts that works for most businesses. You can customize it later.
              </p>
              <div className="mt-3 flex items-center text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>Industry-standard account structure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Template Option */}
        <div
          className={`p-6 border rounded-xl cursor-pointer transition-all ${
            formData.useTemplate === 'upload'
              ? 'border-[#b892ff] bg-[#b892ff]/5 ring-2 ring-[#b892ff]/20'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData(prev => ({ ...prev, useTemplate: 'upload' }))}
        >
          <div className="flex items-start">
            <input
              type="radio"
              name="useTemplate"
              value="upload"
              checked={formData.useTemplate === 'upload'}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-[#b892ff] focus:ring-[#b892ff]"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center mb-2">
                <Upload className="w-5 h-5 text-[#b892ff] mr-2" />
                <h3 className="font-medium text-gray-900">Upload Your Template</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Upload your existing general ledger or chart of accounts template to maintain consistency.
              </p>
              
              {formData.useTemplate === 'upload' && (
                <div className="space-y-4">
                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive
                        ? 'border-[#b892ff] bg-[#b892ff]/5'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {formData.uploadedFile ? (
                      <div className="space-y-2">
                        <FileText className="w-8 h-8 text-green-500 mx-auto" />
                        <p className="font-medium text-gray-900">{formData.uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(formData.uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, uploadedFile: null }));
                          }}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                        <p className="font-medium text-gray-900">Drop your file here</p>
                        <p className="text-sm text-gray-500">or click to browse</p>
                        <input
                          type="file"
                          accept=".xlsx,.xls,.csv"
                          onChange={(e) => handleFileUpload(e.target.files)}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="inline-block px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors cursor-pointer"
                        >
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>Supported formats: Excel (.xlsx, .xls) or CSV files</p>
                    <p>Maximum file size: 10MB</p>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button className="flex items-center text-[#b892ff] hover:text-[#a075ff] text-sm font-medium">
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample Template
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Skip Option */}
        <div
          className={`p-6 border rounded-xl cursor-pointer transition-all ${
            formData.useTemplate === 'skip'
              ? 'border-[#b892ff] bg-[#b892ff]/5 ring-2 ring-[#b892ff]/20'
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setFormData(prev => ({ ...prev, useTemplate: 'skip', uploadedFile: null }))}
        >
          <div className="flex items-start">
            <input
              type="radio"
              name="useTemplate"
              value="skip"
              checked={formData.useTemplate === 'skip'}
              onChange={handleInputChange}
              className="mt-1 h-4 w-4 text-[#b892ff] focus:ring-[#b892ff]"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center mb-2">
                <ArrowRight className="w-5 h-5 text-[#b892ff] mr-2" />
                <h3 className="font-medium text-gray-900">Set Up Later</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Skip this step and set up your chart of accounts from within the application.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {errors.uploadedFile && (
        <p className="text-sm text-red-600 text-center">{errors.uploadedFile}</p>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-gray-600 mt-2">Start with a 30-day free trial, upgrade or downgrade anytime</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
              formData.selectedPlan === plan.id
                ? 'border-[#b892ff] ring-2 ring-[#b892ff]/20'
                : 'border-gray-200 hover:border-gray-300'
            } ${plan.popular ? 'scale-105' : ''}`}
            onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-[#b892ff] text-white px-2 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-gray-900">₦{plan.price}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <input
                type="radio"
                name="selectedPlan"
                value={plan.id}
                checked={formData.selectedPlan === plan.id}
                onChange={handleInputChange}
                className="h-4 w-4 text-[#b892ff] focus:ring-[#b892ff]"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 space-y-2">
        <p>✓ 30-day free trial on all plans</p>
        <p>✓ No setup fees • Cancel anytime</p>
        <p>✓ All plans include SSL security and 24/7 support</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-3xl">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-[#b892ff] rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">Spendcinq</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#b892ff] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="min-h-[600px]">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors font-semibold"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="flex items-center px-6 py-3 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button onClick={() => navigate('/sign-in')} className="text-[#b892ff] hover:text-[#a075ff] font-medium">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#b892ff] to-[#8b5cf6] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
        </div>

        <div className="relative flex flex-col justify-center px-12 py-16 text-white">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Join 10,000+ Companies
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              Streamline your expense management and take control of your finances with Spendcinq.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">75% Time Saved</h3>
                <p className="text-purple-200 text-sm">Automate expense processing and approvals</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Bank-Level Security</h3>
                <p className="text-purple-200 text-sm">Your data is protected with enterprise-grade encryption</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Team Collaboration</h3>
                <p className="text-purple-200 text-sm">Seamless approval workflows and real-time visibility</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="text-purple-100 mb-4 italic">
              "Setup was incredibly easy. Our entire team was processing expenses efficiently within hours, not days."
            </p>
            <div className="font-medium">David Kim, CFO at GrowthCorp</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;