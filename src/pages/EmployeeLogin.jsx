import React, { useState } from 'react';
import {
  DollarSign,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  User,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  Receipt,
  CreditCard,
  BarChart3,
  Smartphone,
  HelpCircle,
  Users,
  Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    employeeId: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee ID is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Employee sign in:', formData);
      // Handle successful employee sign in here
    } catch (error) {
      setErrors({ general: 'Invalid Employee ID or password. Please try again or contact your manager.' });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Receipt,
      title: "Submit Expenses",
      description: "Easily submit receipts and expense reports"
    },
    {
      icon: Clock,
      title: "Track Status",
      description: "Monitor approval status in real-time"
    },
    {
      icon: CreditCard,
      title: "Reimbursements",
      description: "View and track your reimbursement history"
    },
    {
      icon: BarChart3,
      title: "Personal Analytics",
      description: "See your spending patterns and budgets"
    }
  ];

  const quickTips = [
    "Take clear photos of receipts for faster processing",
    "Submit expenses within 30 days for auto-approval",
    "Use the mobile app for on-the-go submissions",
    "Set up spending alerts to stay within budget"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Employee Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo and Employee Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#b892ff] rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">Spendcinq</span>
            </div>
            <div className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Employee Portal
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">
              Sign in to manage your expenses and reimbursements
            </p>
          </div>

          {/* Employee Login Form */}
          <div className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-red-700 text-sm">{errors.general}</span>
                  <p className="text-red-600 text-xs mt-1">
                    Need help? Contact your finance manager or IT support.
                  </p>
                </div>
              </div>
            )}

            {/* Employee ID Field */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  autoComplete="username"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent transition-colors ${
                    errors.employeeId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your Employee ID"
                />
              </div>
              {errors.employeeId && (
                <p className="mt-2 text-sm text-red-600">{errors.employeeId}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Don't know your Employee ID? Contact your manager.
              </p>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-[#b892ff] focus:ring-[#b892ff] border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              <button
                type="button"
                className="text-sm text-[#b892ff] hover:text-[#a075ff] font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => navigate('/employee-portal')}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b892ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign in to your account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Need Help?</p>
                <p className="text-sm text-blue-700 mt-1">
                  If you're having trouble signing in, contact your finance manager or IT support team.
                </p>
                <div className="mt-2 space-x-4 text-xs">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Contact Support
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    User Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Secure Employee Portal</p>
                <p className="text-sm text-green-700">Your data is protected and monitored for security</p>
              </div>
            </div>
          </div>

          {/* Admin Portal Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Are you a finance manager?{' '}
              <button className="text-[#b892ff] hover:text-[#a075ff] font-medium">
                Access Admin Portal
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Employee Features & Tips */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/20 rounded-full"></div>
        </div>

        <div className="relative flex flex-col justify-center px-12 py-16 text-white">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <Users className="w-8 h-8 mr-3" />
              <span className="text-xl font-semibold">Employee Portal</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Manage Your Expenses
              <span className="block text-blue-100">With Ease</span>
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Submit expenses, track approvals, and get reimbursed faster than ever before.
            </p>
          </div>

          {/* Features for Employees */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <Icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Tips */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h3 className="text-lg font-semibold mb-4">💡 Quick Tips for Employees</h3>
            <div className="space-y-3">
              {quickTips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-300 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-100 text-sm">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employee Success Story */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="text-blue-100 mb-4 italic">
              "I love how easy it is to submit expenses now. No more paperwork or waiting weeks for reimbursement!"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-semibold">AJ</span>
              </div>
              <div>
                <div className="font-medium">Alex Johnson</div>
                <div className="text-blue-200 text-sm">Sales Representative</div>
              </div>
            </div>
          </div>

          {/* Mobile App Promotion */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center">
              <Smartphone className="w-6 h-6 mr-3" />
              <div>
                <p className="font-medium">Get the Mobile App</p>
                <p className="text-blue-200 text-sm">Submit expenses on the go</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;