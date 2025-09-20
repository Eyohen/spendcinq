import React, { useState } from 'react';
import {
  DollarSign,
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Users,
  CheckCircle,
  AlertCircle,
  Chrome,
  Apple,
  Github,
  Building,
  Globe,
  Star,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
    const navigate = useNavigate()

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
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      console.log('Sign in attempt:', formData);
      // Handle successful sign in here
    } catch (error) {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider) => {
    console.log(`Sign in with ${provider}`);
    // Handle social sign in
  };

  const stats = [
    { icon: Users, value: "10,000+", label: "Companies" },
    { icon: Star, value: "4.9/5", label: "Rating" },
    { icon: TrendingUp, value: "75%", label: "Time Saved" }
  ];

  const features = [
    "Real-time expense tracking",
    "Automated approval workflows", 
    "Advanced analytics & insights",
    "Enterprise-grade security"
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Sign In Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-[#b892ff] rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">Spendcinq</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-2">
              Sign in to your account to continue managing expenses
            </p>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignIn('google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Chrome className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialSignIn('microsoft')}
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
              <span className="px-4 bg-gray-50 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Sign In Form */}
          <div className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{errors.general}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
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
                  Remember me
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
            //   onClick={handleSubmit}
            onClick={() => navigate('/dashboard')} 
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b892ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button className="text-[#b892ff] hover:text-[#a075ff] font-medium">
                Start free trial
              </button>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Secure Login</p>
                <p className="text-sm text-green-700">Protected by 256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Marketing Content */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-[#b892ff] to-[#8b5cf6] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/20 rounded-full"></div>
        </div>

        <div className="relative flex flex-col justify-center px-12 py-16 text-white">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Trusted by finance teams worldwide
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed">
              Join thousands of companies that have streamlined their expense management with Spendcinq.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-purple-200 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Features */}
          <div className="space-y-4 mb-12">
            <h3 className="text-xl font-semibold mb-6">What you'll get:</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
                <span className="text-purple-100">{feature}</span>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />
              ))}
            </div>
            <p className="text-purple-100 mb-4 italic">
              "Spendcinq transformed our expense management. We reduced processing time by 75% and improved compliance across all departments."
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-semibold">SJ</span>
              </div>
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-purple-200 text-sm">CFO, TechCorp</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-purple-200 text-sm mb-4">Trusted by industry leaders:</p>
            <div className="flex items-center space-x-6 opacity-60">
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;