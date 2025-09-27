import React, { useState } from 'react';
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
  Trash2,
  Calendar,
  CreditCard,
  User,
  LogOut,
  Bell,
  Search,
  Filter,
  Download,
  X,
  Save,
  AlertCircle,
  MapPin,
  Building,
  FileText,
  Smartphone,
  Scan,
  RefreshCw
} from 'lucide-react';

const EmployeePortal = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: '',
    description: '',
    date: '',
    merchant: '',
    paymentMethod: 'personal',
    notes: ''
  });

  // Mock employee data
  const employee = {
    name: 'John Smith',
    id: 'EMP-001',
    department: 'Sales',
    profilePicture: null
  };

  // Mock expenses data
  const expenses = [
    {
      id: 'EXP-001',
      amount: 156.80,
      category: 'Client Lunch',
      description: 'Business lunch with potential client',
      date: '2025-09-20',
      merchant: 'The Steakhouse',
      status: 'pending',
      receipt: true,
      submittedDate: '2025-09-20',
      paymentMethod: 'personal'
    },
    {
      id: 'EXP-002',
      amount: 89.50,
      category: 'Transportation',
      description: 'Uber to client meeting',
      date: '2025-09-19',
      merchant: 'Uber',
      status: 'approved',
      receipt: true,
      submittedDate: '2025-09-19',
      paymentMethod: 'personal'
    },
    {
      id: 'EXP-003',
      amount: 245.00,
      category: 'Office Supplies',
      description: 'Laptop accessories for remote work',
      date: '2025-09-18',
      merchant: 'Best Buy',
      status: 'reconciled',
      receipt: true,
      submittedDate: '2025-09-18',
      paymentMethod: 'corporate'
    },
    {
      id: 'EXP-004',
      amount: 67.25,
      category: 'Internet',
      description: 'Monthly internet bill',
      date: '2025-09-17',
      merchant: 'Comcast',
      status: 'rejected',
      receipt: false,
      submittedDate: '2025-09-17',
      paymentMethod: 'personal',
      rejectionReason: 'Personal expense not eligible for reimbursement'
    }
  ];

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
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'approved': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'reconciled': return 'text-green-700 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'reconciled': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
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

  const handleSubmitExpense = () => {
    console.log('Submitting expense:', expenseForm, uploadedFile);
    setShowSubmitModal(false);
    setExpenseForm({
      amount: '',
      category: '',
      description: '',
      date: '',
      merchant: '',
      paymentMethod: 'personal',
      notes: ''
    });
    setUploadedFile(null);
  };

  const totalPending = expenses.filter(exp => exp.status === 'pending').reduce((sum, exp) => sum + exp.amount, 0);
  const totalThisMonth = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#b892ff] rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Spendcinq</span>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Employee Portal
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                  <p className="text-xs text-gray-500">{employee.id} • {employee.department}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {employee.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Manage your expenses and track reimbursements</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-gray-900">${totalPending.toFixed(2)}</p>
                <p className="text-xs text-yellow-600">Awaiting review</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${totalThisMonth.toFixed(2)}</p>
                <p className="text-xs text-blue-600">{expenses.length} expenses</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reimbursed</p>
                <p className="text-2xl font-bold text-gray-900">$245.00</p>
                <p className="text-xs text-green-600">Last payment</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-[#b892ff] text-white p-6 rounded-xl hover:bg-[#a075ff] transition-colors text-left"
          >
            <Plus className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Submit Expense</h3>
            <p className="text-sm text-purple-100">Add a new expense report</p>
          </button>

          <button
            onClick={() => setShowScanModal(true)}
            className="bg-blue-500 text-white p-6 rounded-xl hover:bg-blue-600 transition-colors text-left"
          >
            <Camera className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Scan Receipt</h3>
            <p className="text-sm text-blue-100">Take a photo of your receipt</p>
          </button>

          <button className="bg-green-500 text-white p-6 rounded-xl hover:bg-green-600 transition-colors text-left">
            <Upload className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Upload Receipt</h3>
            <p className="text-sm text-green-100">Upload from your device</p>
          </button>

          <button className="bg-gray-600 text-white p-6 rounded-xl hover:bg-gray-700 transition-colors text-left">
            <Download className="w-8 h-8 mb-3" />
            <h3 className="font-semibold mb-1">Export Data</h3>
            <p className="text-sm text-gray-100">Download your reports</p>
          </button>
        </div>

        {/* Expenses Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">My Expenses</h2>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
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

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expense
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Receipt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                        <div className="text-sm text-gray-500">{expense.category} • {expense.merchant}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${expense.amount.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{expense.paymentMethod}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(expense.status)}`}>
                        {getStatusIcon(expense.status)}
                        <span className="ml-1 capitalize">{expense.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {expense.receipt ? (
                        <span className="text-green-600 text-sm">✓ Attached</span>
                      ) : (
                        <span className="text-red-600 text-sm">✗ Missing</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSelectedExpense(expense)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {expense.status === 'pending' && (
                          <button className="p-1 text-gray-400 hover:text-gray-600" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {expense.status === 'rejected' && (
                          <button className="p-1 text-red-400 hover:text-red-600" title="Resubmit">
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
        </div>
      </main>

      {/* Submit Expense Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Submit New Expense</h2>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <input
                  type="text"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  placeholder="Brief description of the expense"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Merchant</label>
                  <input
                    type="text"
                    value={expenseForm.merchant}
                    onChange={(e) => setExpenseForm({...expenseForm, merchant: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                    placeholder="Store or vendor name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select
                  value={expenseForm.paymentMethod}
                  onChange={(e) => setExpenseForm({...expenseForm, paymentMethod: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                >
                  <option value="personal">Personal Card/Cash</option>
                  <option value="corporate">Corporate Card</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt Upload</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? 'border-[#b892ff] bg-[#b892ff]/5' : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {uploadedFile ? (
                    <div className="space-y-2">
                      <FileText className="w-8 h-8 text-green-500 mx-auto" />
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <button
                        onClick={() => setUploadedFile(null)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto" />
                      <p className="font-medium text-gray-900">Drop receipt here or click to browse</p>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="receipt-upload"
                      />
                      <label
                        htmlFor="receipt-upload"
                        className="inline-block px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors cursor-pointer"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({...expenseForm, notes: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  placeholder="Any additional information about this expense"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitExpense}
                className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors"
              >
                Submit Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scan Receipt Modal */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Scan Receipt</h2>
              <button
                onClick={() => setShowScanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 text-center space-y-6">
              <div className="w-32 h-32 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                <Camera className="w-16 h-16 text-gray-400" />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Scan</h3>
                <p className="text-gray-600">
                  Position your receipt in good lighting and tap the capture button
                </p>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-[#b892ff] text-white py-3 rounded-lg hover:bg-[#a075ff] transition-colors font-medium">
                  <Camera className="w-5 h-5 inline mr-2" />
                  Capture Receipt
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Smartphone className="w-5 h-5 inline mr-2" />
                  Use Mobile App
                </button>
              </div>

              <p className="text-xs text-gray-500">
                Tip: Make sure all text is visible and the receipt is flat
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeePortal;