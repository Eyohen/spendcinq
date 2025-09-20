
// // pages/Transactions.jsx
// import React from 'react';

// const Transactions = () => {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">All Transactions</h2>
//       <p className="text-gray-600">Transaction management interface will be implemented here.</p>
//     </div>
//   );
// };

// export default Transactions


import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  Receipt,
  User,
  Building,
  Tag,
  FileText,
  ArrowUpDown,
  ChevronDown,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Paperclip,
  Check,
  X
} from 'lucide-react';

const Transactions = () => {
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  // Mock transaction data
  const allTransactions = [
    {
      id: 'TXN-001',
      employee: 'Sarah Johnson',
      employeeEmail: 'sarah.johnson@company.com',
      department: 'Sales',
      amount: 156.80,
      category: 'Office Supplies',
      subcategory: 'Stationery',
      description: 'Premium notebooks and pens for client meetings',
      date: '2025-09-18',
      submittedDate: '2025-09-18',
      approvedDate: null,
      status: 'pending',
      receipt: true,
      receiptUrl: '/receipts/txn-001.pdf',
      merchant: 'Staples Inc.',
      paymentMethod: 'Corporate Card',
      cardLast4: '4532',
      location: 'New York, NY',
      billable: true,
      clientCode: 'CLI-001',
      projectCode: 'PRJ-ABC',
      taxAmount: 12.54,
      currency: 'USD',
      exchangeRate: 1.0,
      notes: 'Required for upcoming client presentation',
      approver: 'Mike Chen',
      tags: ['client-meeting', 'urgent']
    },
    {
      id: 'TXN-002',
      employee: 'Mike Chen',
      employeeEmail: 'mike.chen@company.com',
      department: 'Marketing',
      amount: 2850.00,
      category: 'Travel & Transport',
      subcategory: 'Flight',
      description: 'Round trip flight to San Francisco for conference',
      date: '2025-09-17',
      submittedDate: '2025-09-15',
      approvedDate: '2025-09-16',
      status: 'approved',
      receipt: true,
      receiptUrl: '/receipts/txn-002.pdf',
      merchant: 'Delta Airlines',
      paymentMethod: 'Personal Card',
      cardLast4: '8976',
      location: 'San Francisco, CA',
      billable: false,
      clientCode: null,
      projectCode: 'CONF-2025',
      taxAmount: 228.00,
      currency: 'USD',
      exchangeRate: 1.0,
      notes: 'Marketing conference attendance',
      approver: 'Emma Davis',
      tags: ['conference', 'travel']
    },
    {
      id: 'TXN-003',
      employee: 'Emma Davis',
      employeeEmail: 'emma.davis@company.com',
      department: 'Engineering',
      amount: 599.99,
      category: 'Software & Tools',
      subcategory: 'Development Tools',
      description: 'JetBrains IntelliJ IDEA Ultimate License',
      date: '2025-09-16',
      submittedDate: '2025-09-16',
      approvedDate: '2025-09-17',
      status: 'reconciled',
      receipt: true,
      receiptUrl: '/receipts/txn-003.pdf',
      merchant: 'JetBrains s.r.o.',
      paymentMethod: 'Corporate Card',
      cardLast4: '4532',
      location: 'Online Purchase',
      billable: true,
      clientCode: 'CLI-002',
      projectCode: 'PRJ-XYZ',
      taxAmount: 48.00,
      currency: 'USD',
      exchangeRate: 1.0,
      notes: 'Annual license renewal for development team',
      approver: 'James Wilson',
      tags: ['software', 'development']
    },
    {
      id: 'TXN-004',
      employee: 'James Wilson',
      employeeEmail: 'james.wilson@company.com',
      department: 'Sales',
      amount: 245.75,
      category: 'Client Entertainment',
      subcategory: 'Meals',
      description: 'Client dinner at The Capital Grille',
      date: '2025-09-15',
      submittedDate: '2025-09-15',
      approvedDate: null,
      status: 'rejected',
      receipt: false,
      receiptUrl: null,
      merchant: 'The Capital Grille',
      paymentMethod: 'Personal Card',
      cardLast4: '1234',
      location: 'Boston, MA',
      billable: true,
      clientCode: 'CLI-003',
      projectCode: 'PRJ-DEF',
      taxAmount: 19.66,
      currency: 'USD',
      exchangeRate: 1.0,
      notes: 'Missing receipt - please resubmit with documentation',
      approver: 'Sarah Johnson',
      tags: ['client-dinner', 'resubmit']
    },
    {
      id: 'TXN-005',
      employee: 'Lisa Brown',
      employeeEmail: 'lisa.brown@company.com',
      department: 'Operations',
      amount: 89.50,
      category: 'Transportation',
      subcategory: 'Rideshare',
      description: 'Uber rides for client meetings (3 trips)',
      date: '2025-09-14',
      submittedDate: '2025-09-14',
      approvedDate: '2025-09-15',
      status: 'reconciled',
      receipt: true,
      receiptUrl: '/receipts/txn-005.pdf',
      merchant: 'Uber Technologies',
      paymentMethod: 'Personal Card',
      cardLast4: '5678',
      location: 'Multiple',
      billable: true,
      clientCode: 'CLI-001',
      projectCode: 'PRJ-GHI',
      taxAmount: 7.16,
      currency: 'USD',
      exchangeRate: 1.0,
      notes: 'Client meetings across downtown area',
      approver: 'Mike Chen',
      tags: ['transportation', 'client-meetings']
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'reconciled': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'approved': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'reconciled': return 'text-green-700 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTransactions(allTransactions.map(t => t.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (transactionId, checked) => {
    if (checked) {
      setSelectedTransactions([...selectedTransactions, transactionId]);
    } else {
      setSelectedTransactions(selectedTransactions.filter(id => id !== transactionId));
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`, selectedTransactions);
    // Implement bulk actions here
  };

  const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
              <p className="text-sm text-gray-500 mt-1">{transaction.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-6">
            {/* Transaction Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-gray-900">{transaction.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-2xl font-bold text-gray-900">${transaction.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="ml-2 capitalize">{transaction.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Employee</label>
                  <div className="mt-1 flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.employee}</p>
                      <p className="text-sm text-gray-500">{transaction.department}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <p className="mt-1 text-gray-900">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{transaction.subcategory}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Merchant</label>
                  <p className="mt-1 text-gray-900">{transaction.merchant}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Date</label>
                  <p className="mt-1 text-gray-900">{transaction.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Payment Method</label>
                  <p className="mt-1 text-gray-900">{transaction.paymentMethod}</p>
                  {transaction.cardLast4 && (
                    <p className="text-sm text-gray-500">**** {transaction.cardLast4}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-gray-900">{transaction.location}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Tax Amount</label>
                  <p className="mt-1 text-gray-900">${transaction.taxAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Project & Billing */}
            {transaction.billable && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Client Code</label>
                    <p className="mt-1 text-gray-900">{transaction.clientCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Project Code</label>
                    <p className="mt-1 text-gray-900">{transaction.projectCode}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes & Approver */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Notes</label>
                  <p className="mt-1 text-gray-900">{transaction.notes}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Approver</label>
                  <p className="mt-1 text-gray-900">{transaction.approver}</p>
                </div>
              </div>
            </div>

            {/* Receipt */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Receipt</h3>
              {transaction.receipt ? (
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <Paperclip className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Receipt.pdf</p>
                      <p className="text-sm text-gray-500">Uploaded on {transaction.submittedDate}</p>
                    </div>
                  </div>
                  <button className="text-[#b892ff] hover:text-[#a075ff] font-medium">
                    View Receipt
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Receipt className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No receipt attached</p>
                </div>
              )}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Edit Transaction
            </button>
            {transaction.status === 'pending' && (
              <>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Reject
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2>
          <p className="text-gray-600 mt-1">Monitor, approve, and reconcile employee expenses</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, employees, or merchants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-3">
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

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="travel">Travel & Transport</option>
              <option value="office">Office Supplies</option>
              <option value="software">Software & Tools</option>
              <option value="entertainment">Client Entertainment</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-3 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTransactions.length > 0 && (
        <div className="bg-[#b892ff] rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-white">
              <span className="font-medium">{selectedTransactions.length} transactions selected</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleBulkAction('approve')}
                className="px-4 py-2 bg-white text-[#b892ff] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Bulk Approve
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 bg-white text-[#b892ff] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Bulk Reject
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 bg-white text-[#b892ff] rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Export Selected
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTransactions.length === allTransactions.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-[#b892ff] focus:ring-[#b892ff]"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <span>Transaction ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <span>Amount</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button className="flex items-center space-x-1 hover:text-gray-700">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={(e) => handleSelectTransaction(transaction.id, e.target.checked)}
                      className="rounded border-gray-300 text-[#b892ff] focus:ring-[#b892ff]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowTransactionModal(true);
                      }}
                      className="font-medium text-[#b892ff] hover:text-[#a075ff]"
                    >
                      {transaction.id}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transaction.employee}</div>
                        <div className="text-sm text-gray-500">{transaction.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${transaction.amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{transaction.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{transaction.category}</div>
                    <div className="text-sm text-gray-500">{transaction.subcategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-2 capitalize">{transaction.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.receipt ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Attached</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Missing</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTransaction(transaction);
                          setShowTransactionModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <span>Showing 1 to {Math.min(itemsPerPage, allTransactions.length)} of {allTransactions.length} results</span>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm bg-[#b892ff] text-white rounded hover:bg-[#a075ff]">
                1
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {showTransactionModal && (
        <TransactionModal
          transaction={selectedTransaction}
          onClose={() => {
            setShowTransactionModal(false);
            setSelectedTransaction(null);
          }}
        />
      )}
    </div>
  );
};

export default Transactions;