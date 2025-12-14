import { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { URL } from '../url';
import {
  DollarSign,
  Camera,
  Upload,
  Plus,
  Receipt,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  LogOut,
  Bell,
  Search,
  Download,
  X,
  AlertCircle,
  FileText,
  Smartphone,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Wallet,
  ChevronRight
} from 'lucide-react';

const EmployeePortal = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
    merchant: '',
    paymentMethod: 'Personal Card',
    notes: ''
  });

  const [editForm, setEditForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
    merchant: '',
    paymentMethod: '',
    notes: ''
  });

  // Employee data from localStorage
  const [employee, setEmployee] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  // Expenses data from API
  const [expenses, setExpenses] = useState([]);
  const [stats, setStats] = useState({
    pendingApproval: 0,
    thisMonth: 0,
    reimbursed: 0
  });

  // Fetch employee transactions on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmployee({
        name: `${user.firstName} ${user.lastName}`,
        id: user.employeeId || user.id,
        department: user.department?.name || 'N/A',
        profilePicture: null
      });
      setCompanyId(user.companyId);
      fetchTransactions(user.companyId, user.id);
      fetchReimbursementSummary(user.id);
    }
  }, [statusFilter]);

  const fetchTransactions = async (companyId, employeeId) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      setLoading(true);

      let queryString = `?employeeId=${employeeId}`;
      if (statusFilter !== 'all') queryString += `&status=${statusFilter}`;

      const response = await axios.get(
        `${URL}/api/transactions/company/${companyId}${queryString}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const transactions = response.data.transactions.map(t => {
          // Extract category from notes if no category association exists
          let categoryName = t.category?.name;

          if (t.notes && t.notes.startsWith('Category:')) {
            const newlineIndex = t.notes.indexOf('\n');
            if (newlineIndex !== -1) {
              if (!categoryName) {
                categoryName = t.notes.substring(10, newlineIndex).trim();
              }
            } else {
              if (!categoryName) {
                categoryName = t.notes.substring(10).trim();
              }
            }
          }

          return {
            id: t.id,
            transactionNumber: t.transactionNumber,
            amount: parseFloat(t.amount),
            category: categoryName || 'Uncategorized',
            description: t.description,
            date: new Date(t.transactionDate).toISOString().split('T')[0],
            merchant: t.merchantName,
            status: t.status,
            receipt: t.receipts && t.receipts.length > 0,
            submittedDate: new Date(t.createdAt).toISOString().split('T')[0],
            paymentMethod: t.paymentMethod
          };
        });
        setExpenses(transactions);

        // Calculate stats
        const pending = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
        const thisMonth = transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).reduce((sum, t) => sum + t.amount, 0);
        setStats(prev => ({ ...prev, pendingApproval: pending, thisMonth }));
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReimbursementSummary = async (employeeId) => {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await axios.get(
        `${URL}/api/reimbursements/employee/${employeeId}/summary`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setStats(prev => ({
          ...prev,
          reimbursed: response.data.summary.lastPayment?.amount || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching reimbursement summary:', error);
    }
  };

  const handleSubmitExpense = async () => {
    // Prevent double submission
    if (loading) return;

    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!expenseForm.amount || !expenseForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);

      // Prepare the payload with proper data types
      const payload = {
        companyId: user.companyId,
        employeeId: user.id,
        departmentId: user.department?.id || null,
        categoryId: null, // We'll use category name in notes for now
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        merchantName: expenseForm.merchant || null,
        paymentMethod: expenseForm.paymentMethod,
        transactionDate: expenseForm.date || new Date().toISOString().split('T')[0],
        notes: expenseForm.category
          ? `Category: ${expenseForm.category}\n${expenseForm.notes || ''}`.trim()
          : expenseForm.notes || null
      };

      console.log('Submitting transaction:', payload);

      const response = await axios.post(
        `${URL}/api/transactions`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // If there's a file, upload the receipt
        if (uploadedFile) {
          const formData = new FormData();
          formData.append('receipt', uploadedFile);
          formData.append('transactionId', response.data.transaction.id);
          formData.append('uploadedBy', user.id);

          await axios.post(
            `${URL}/api/receipts/upload`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
              }
            }
          );
        }

        // Show success toast
        toast.success('Expense submitted successfully! Your expense is now pending approval.', {
          duration: 4000,
          position: 'top-center',
        });

        // Reset form and refresh
        setExpenseForm({
          amount: '',
          category: '',
          description: '',
          date: '',
          merchant: '',
          paymentMethod: 'Personal Card',
          notes: ''
        });
        setUploadedFile(null);
        setShowSubmitModal(false);
        fetchTransactions(user.companyId, user.id);
      }
    } catch (error) {
      console.error('Error submitting expense:', error);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || 'Failed to submit expense';
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  // Open edit modal with expense data
  const handleEditClick = (expense) => {
    setEditingExpense(expense);
    setEditForm({
      amount: expense.amount.toString(),
      category: expense.category !== 'Uncategorized' ? expense.category : '',
      description: expense.description,
      date: expense.date,
      merchant: expense.merchant || '',
      paymentMethod: expense.paymentMethod || 'Personal Card',
      notes: ''
    });
    setShowEditModal(true);
  };

  // Handle update expense
  const handleUpdateExpense = async () => {
    if (updating) return;

    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!editForm.amount || !editForm.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setUpdating(true);

      const payload = {
        description: editForm.description,
        amount: parseFloat(editForm.amount),
        merchantName: editForm.merchant || null,
        paymentMethod: editForm.paymentMethod,
        transactionDate: editForm.date || new Date().toISOString().split('T')[0],
        notes: editForm.category
          ? `Category: ${editForm.category}\n${editForm.notes || ''}`.trim()
          : editForm.notes || null
      };

      const response = await axios.put(
        `${URL}/api/transactions/${editingExpense.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success('Expense updated successfully!', {
          duration: 4000,
          position: 'top-center',
        });

        setShowEditModal(false);
        setEditingExpense(null);
        setEditForm({
          amount: '',
          category: '',
          description: '',
          date: '',
          merchant: '',
          paymentMethod: '',
          notes: ''
        });
        fetchTransactions(user.companyId, user.id);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || 'Failed to update expense';
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
      });
    } finally {
      setUpdating(false);
    }
  };

  const categories = [
    'Transportation',
    'Client Lunch',
    'Office Supplies',
    'Software',
    'Internet',
    'Phone',
    'Travel',
    'Equipment',
    'Training',
    'Other'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'approved': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'reconciled': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'rejected': return 'text-rose-700 bg-rose-50 border-rose-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-3.5 h-3.5" />;
      case 'approved': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'reconciled': return <CheckCircle className="w-3.5 h-3.5" />;
      case 'rejected': return <XCircle className="w-3.5 h-3.5" />;
      default: return <AlertCircle className="w-3.5 h-3.5" />;
    }
  };

  const handleFileUpload = (files) => {
    const file = files[0];
    if (file) {
      setUploadedFile(file);
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

  const totalPending = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0);
  const totalThisMonth = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const approvedCount = expenses.filter(exp => exp.status === 'approved' || exp.status === 'reconciled').length;

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = (expense.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (expense.merchant?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (expense.category?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get current time greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Show loading state while employee data is being fetched
  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200">Loading your portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-slate-100">
      {/* Toast notifications */}
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: '#10B981',
              color: '#fff',
              fontWeight: '500',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
              fontWeight: '500',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#b892ff] to-[#8b5cf6] rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Spendcinq</span>
                <span className="ml-2 px-2.5 py-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 rounded-full text-xs font-semibold border border-purple-200/50">
                  Employee
                </span>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold shadow-lg shadow-purple-500/25">
                  {employee.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{employee.name || 'Employee'}</p>
                  <p className="text-xs text-gray-500">{employee.department || 'N/A'}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Welcome Section */}
        <div className="relative mb-8 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#b892ff] via-purple-500 to-blue-500 opacity-90"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4"></div>
            <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
          <div className="relative px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <span className="text-purple-100 text-sm font-medium">{getGreeting()}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {employee.name?.split(' ')[0]}!
                </h1>
                <p className="text-purple-100 text-lg">
                  Track your expenses and manage reimbursements with ease.
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="group flex items-center space-x-2 bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-xl shadow-purple-900/20 hover:shadow-2xl hover:shadow-purple-900/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Plus className="w-5 h-5" />
                  <span>New Expense</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pending Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center text-amber-600 text-sm font-medium bg-amber-50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-2 animate-pulse"></span>
                  Pending
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Awaiting Approval</p>
              <p className="text-3xl font-bold text-gray-900">₦{totalPending.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-2">{expenses.filter(e => e.status === 'pending').length} expenses waiting</p>
            </div>
          </div>

          {/* This Month Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center text-blue-600 text-sm font-medium bg-blue-50 px-3 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  This Month
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Submitted</p>
              <p className="text-3xl font-bold text-gray-900">₦{totalThisMonth.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-2">{expenses.length} total expenses</p>
            </div>
          </div>

          {/* Approved Card */}
          <div className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-[100px] rounded-tr-2xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center text-emerald-600 text-sm font-medium bg-emerald-50 px-3 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Approved
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Ready for Payment</p>
              <p className="text-3xl font-bold text-gray-900">{approvedCount}</p>
              <p className="text-sm text-gray-400 mt-2">Expenses approved</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="group relative overflow-hidden bg-gradient-to-br from-[#b892ff] to-[#8b5cf6] p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-[-50%] translate-y-[50%]"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Submit Expense</h3>
              <p className="text-purple-200 text-sm">Add a new expense report</p>
            </div>
            <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </button>

          <button
            onClick={() => setShowScanModal(true)}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-x-[-50%] translate-y-[50%]"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Scan Receipt</h3>
              <p className="text-blue-200 text-sm">Capture with your camera</p>
            </div>
            <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </button>

          <button className="group relative overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-xl hover:shadow-slate-500/25 hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-x-[-50%] translate-y-[50%]"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Export Data</h3>
              <p className="text-slate-400 text-sm">Download your reports</p>
            </div>
            <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-white/30 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-300" />
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">My Expenses</h2>
                <p className="text-gray-500 text-sm mt-1">View and manage all your expense submissions</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-200 w-64"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all duration-200 cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="reconciled">Reconciled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {filteredExpenses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h3>
              <p className="text-gray-500 mb-6">Start by submitting your first expense report</p>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Submit Expense</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Expense
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Receipt
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredExpenses.map((expense, index) => (
                    <tr key={expense.id} className="hover:bg-purple-50/30 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                            <Receipt className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{expense.description}</div>
                            <div className="text-sm text-gray-500">{expense.category} • {expense.merchant || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-900">₦{expense.amount.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{expense.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{expense.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(expense.status)}`}>
                          {getStatusIcon(expense.status)}
                          <span className="ml-1.5 capitalize">{expense.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {expense.receipt ? (
                          <span className="inline-flex items-center text-emerald-600 text-sm font-medium">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Attached
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-gray-400 text-sm">
                            <XCircle className="w-4 h-4 mr-1" />
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => {
                              setSelectedExpense(expense);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {expense.status === 'pending' && (
                            <button
                              onClick={() => handleEditClick(expense)}
                              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          {expense.status === 'rejected' && (
                            <button className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all duration-200" title="Resubmit">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Submit Expense Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Submit New Expense</h2>
                <p className="text-sm text-gray-500 mt-1">Fill in the details below</p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
                    <input
                      type="number"
                      step="0.01"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
                  placeholder="Brief description of the expense"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Merchant</label>
                  <input
                    type="text"
                    value={expenseForm.merchant}
                    onChange={(e) => setExpenseForm({...expenseForm, merchant: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all"
                    placeholder="Store or vendor name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  value={expenseForm.paymentMethod}
                  onChange={(e) => setExpenseForm({...expenseForm, paymentMethod: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="personal">Personal Card/Cash</option>
                  <option value="corporate">Corporate Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Receipt Upload</label>
                <div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                    dragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="space-y-3">
                      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto">
                        <FileText className="w-7 h-7 text-emerald-600" />
                      </div>
                      <p className="font-semibold text-gray-900">{uploadedFile.name}</p>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-rose-600 hover:text-rose-700 text-sm font-medium"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                        <Upload className="w-7 h-7 text-purple-600" />
                      </div>
                      <p className="font-semibold text-gray-900">Drop receipt here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports JPG, PNG, PDF up to 10MB</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="receipt-upload"
                      />
                      <label
                        htmlFor="receipt-upload"
                        className="inline-block px-6 py-2.5 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({...expenseForm, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition-all resize-none"
                  placeholder="Any additional information about this expense"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExpense}
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center min-w-[140px]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : 'Submit Expense'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Receipt Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Scan Receipt</h2>
              <button
                onClick={() => setShowScanModal(false)}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-8 text-center space-y-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl mx-auto flex items-center justify-center">
                <Camera className="w-16 h-16 text-blue-500" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Scan</h3>
                <p className="text-gray-500">
                  Position your receipt in good lighting and tap the capture button
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300">
                  <Camera className="w-5 h-5 inline mr-2" />
                  Capture Receipt
                </button>
                <button className="w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  <Smartphone className="w-5 h-5 inline mr-2" />
                  Use Mobile App
                </button>
              </div>

              <p className="text-xs text-gray-400">
                Tip: Make sure all text is visible and the receipt is flat
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Expense Modal */}
      {showEditModal && editingExpense && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Expense</h2>
                <p className="text-sm text-gray-500 mt-1">Update the expense details below</p>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingExpense(null);
                }}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₦</span>
                    <input
                      type="number"
                      step="0.01"
                      value={editForm.amount}
                      onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                  placeholder="Brief description of the expense"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Merchant</label>
                  <input
                    type="text"
                    value={editForm.merchant}
                    onChange={(e) => setEditForm({...editForm, merchant: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                    placeholder="Store or vendor name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  value={editForm.paymentMethod}
                  onChange={(e) => setEditForm({...editForm, paymentMethod: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Personal Card">Personal Card/Cash</option>
                  <option value="corporate">Corporate Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"
                  placeholder="Any additional information about this expense"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingExpense(null);
                }}
                className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateExpense}
                disabled={updating}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center min-w-[140px]"
              >
                {updating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Expense'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Expense Details Modal */}
      {showViewModal && selectedExpense && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Expense Details</h2>
                <p className="text-sm text-gray-500 mt-1">Transaction #{selectedExpense.transactionNumber}</p>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedExpense(null);
                }}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Amount Section */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 text-center">
                <p className="text-sm font-medium text-gray-500 mb-1">Total Amount</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ₦{selectedExpense.amount.toLocaleString()}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(selectedExpense.status)}`}>
                  {getStatusIcon(selectedExpense.status)}
                  <span className="ml-2 capitalize">{selectedExpense.status}</span>
                </span>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Description</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.category}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Merchant</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.merchant || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.date}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.paymentMethod || 'N/A'}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted On</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{selectedExpense.submittedDate}</p>
                </div>

                {/* Receipt Status */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Receipt</p>
                  {selectedExpense.receipt ? (
                    <span className="inline-flex items-center text-emerald-600 text-sm font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Receipt Attached
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-amber-600 text-sm font-semibold bg-amber-50 px-3 py-1.5 rounded-lg">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      No Receipt Attached
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50/50 rounded-b-3xl">
              {selectedExpense.status === 'pending' && (
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditClick(selectedExpense);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300"
                >
                  Edit Expense
                </button>
              )}
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedExpense(null);
                }}
                className="px-6 py-2.5 text-gray-700 font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePortal;
