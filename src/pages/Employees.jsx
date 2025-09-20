// // pages/Employees.jsx
// import React from 'react';

// const Employees = () => {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Employee Management</h2>
//       <p className="text-gray-600">Employee management interface will be implemented here.</p>
//     </div>
//   );
// };


// export default Employees



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
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  UserCheck,
  UserX,
  Settings,
  FileText,
  Star,
  TrendingUp,
  ArrowUpDown,
  X,
  Save,
  Camera
} from 'lucide-react';

const Employees = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  // Mock employee data
  const allEmployees = [
    {
      id: 'EMP-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 123-4567',
      department: 'Sales',
      position: 'Senior Sales Manager',
      manager: 'Mike Chen',
      employeeId: 'SJ001',
      status: 'active',
      startDate: '2022-03-15',
      location: 'New York, NY',
      avatar: null,
      totalExpenses: 12450.80,
      monthlyExpenses: 2847.50,
      transactionCount: 45,
      avgTransaction: 276.68,
      lastExpense: '2025-09-18',
      spendingLimit: 5000,
      approvalLimit: 2000,
      reimbursementMethod: 'Direct Deposit',
      bankAccount: '**** 4532',
      emergencyContact: 'John Johnson',
      emergencyPhone: '+1 (555) 987-6543',
      address: '123 Main St, New York, NY 10001',
      birthDate: '1985-07-22',
      hireDate: '2022-03-15',
      salary: 85000,
      benefits: ['Health Insurance', 'Dental', '401k'],
      skills: ['Sales', 'Client Relations', 'Negotiation'],
      performance: 4.5,
      reports: []
    },
    {
      id: 'EMP-002',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 234-5678',
      department: 'Marketing',
      position: 'Marketing Director',
      manager: 'Emma Davis',
      employeeId: 'MC002',
      status: 'active',
      startDate: '2021-08-20',
      location: 'San Francisco, CA',
      avatar: null,
      totalExpenses: 18920.45,
      monthlyExpenses: 4156.20,
      transactionCount: 67,
      avgTransaction: 282.25,
      lastExpense: '2025-09-17',
      spendingLimit: 7500,
      approvalLimit: 5000,
      reimbursementMethod: 'Corporate Card',
      bankAccount: '**** 8976',
      emergencyContact: 'Linda Chen',
      emergencyPhone: '+1 (555) 876-5432',
      address: '456 Oak Ave, San Francisco, CA 94102',
      birthDate: '1982-11-15',
      hireDate: '2021-08-20',
      salary: 95000,
      benefits: ['Health Insurance', 'Dental', '401k', 'Stock Options'],
      skills: ['Digital Marketing', 'Strategy', 'Analytics'],
      performance: 4.8,
      reports: ['Sarah Johnson', 'James Wilson']
    },
    {
      id: 'EMP-003',
      name: 'Emma Davis',
      email: 'emma.davis@company.com',
      phone: '+1 (555) 345-6789',
      department: 'Engineering',
      position: 'VP of Engineering',
      manager: 'CEO',
      employeeId: 'ED003',
      status: 'active',
      startDate: '2020-01-10',
      location: 'Seattle, WA',
      avatar: null,
      totalExpenses: 15670.30,
      monthlyExpenses: 3890.75,
      transactionCount: 52,
      avgTransaction: 301.35,
      lastExpense: '2025-09-16',
      spendingLimit: 10000,
      approvalLimit: 7500,
      reimbursementMethod: 'Direct Deposit',
      bankAccount: '**** 1234',
      emergencyContact: 'Robert Davis',
      emergencyPhone: '+1 (555) 765-4321',
      address: '789 Pine St, Seattle, WA 98101',
      birthDate: '1980-04-08',
      hireDate: '2020-01-10',
      salary: 140000,
      benefits: ['Health Insurance', 'Dental', '401k', 'Stock Options', 'Equity'],
      skills: ['Software Engineering', 'Team Leadership', 'Architecture'],
      performance: 4.9,
      reports: ['Mike Chen', 'Lisa Brown', 'Tom Wilson']
    },
    {
      id: 'EMP-004',
      name: 'James Wilson',
      email: 'james.wilson@company.com',
      phone: '+1 (555) 456-7890',
      department: 'Sales',
      position: 'Sales Representative',
      manager: 'Sarah Johnson',
      employeeId: 'JW004',
      status: 'active',
      startDate: '2023-06-01',
      location: 'Boston, MA',
      avatar: null,
      totalExpenses: 8940.25,
      monthlyExpenses: 1987.50,
      transactionCount: 28,
      avgTransaction: 319.30,
      lastExpense: '2025-09-15',
      spendingLimit: 3000,
      approvalLimit: 1000,
      reimbursementMethod: 'Direct Deposit',
      bankAccount: '**** 5678',
      emergencyContact: 'Mary Wilson',
      emergencyPhone: '+1 (555) 654-3210',
      address: '321 Elm St, Boston, MA 02101',
      birthDate: '1990-09-12',
      hireDate: '2023-06-01',
      salary: 65000,
      benefits: ['Health Insurance', 'Dental', '401k'],
      skills: ['Sales', 'Customer Service', 'Communication'],
      performance: 4.2,
      reports: []
    },
    {
      id: 'EMP-005',
      name: 'Lisa Brown',
      email: 'lisa.brown@company.com',
      phone: '+1 (555) 567-8901',
      department: 'Operations',
      position: 'Operations Manager',
      manager: 'Emma Davis',
      employeeId: 'LB005',
      status: 'inactive',
      startDate: '2021-11-15',
      location: 'Chicago, IL',
      avatar: null,
      totalExpenses: 6750.60,
      monthlyExpenses: 1456.25,
      transactionCount: 22,
      avgTransaction: 306.85,
      lastExpense: '2025-08-28',
      spendingLimit: 4000,
      approvalLimit: 2500,
      reimbursementMethod: 'Check',
      bankAccount: '**** 9012',
      emergencyContact: 'David Brown',
      emergencyPhone: '+1 (555) 543-2109',
      address: '654 Maple Dr, Chicago, IL 60601',
      birthDate: '1987-02-28',
      hireDate: '2021-11-15',
      salary: 75000,
      benefits: ['Health Insurance', 'Dental'],
      skills: ['Operations', 'Process Improvement', 'Analytics'],
      performance: 4.0,
      reports: []
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-700 bg-green-50 border-green-200';
      case 'inactive': return 'text-red-700 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <UserCheck className="w-4 h-4" />;
      case 'inactive': return <UserX className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(allEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    }
  };

  const EmployeeCard = ({ employee }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status)}`}>
          {getStatusIcon(employee.status)}
          <span className="ml-1 capitalize">{employee.status}</span>
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Building className="w-4 h-4 mr-2" />
          {employee.department}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          {employee.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {employee.location}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Monthly Expenses</p>
            <p className="font-semibold text-gray-900">${employee.monthlyExpenses.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Transactions</p>
            <p className="font-semibold text-gray-900">{employee.transactionCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(employee.performance)
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-2">{employee.performance}</span>
        </div>
        <button
          onClick={() => {
            setSelectedEmployee(employee);
            setShowEmployeeModal(true);
          }}
          className="text-[#b892ff] hover:text-[#a075ff] font-medium text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {employee.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900">{employee.name}</h2>
                <p className="text-gray-500">{employee.position} • {employee.department}</p>
                <p className="text-sm text-gray-400">{employee.employeeId}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-gray-900">{employee.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-gray-900">{employee.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-gray-900">{employee.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Address</label>
                      <p className="mt-1 text-gray-900">{employee.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                      <p className="mt-1 text-gray-900">{employee.emergencyContact}</p>
                      <p className="text-sm text-gray-500">{employee.emergencyPhone}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Start Date</label>
                      <p className="mt-1 text-gray-900">{employee.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Manager</label>
                      <p className="mt-1 text-gray-900">{employee.manager}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Salary</label>
                      <p className="mt-1 text-gray-900">${employee.salary.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Performance Rating</label>
                      <div className="mt-1 flex items-center">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(employee.performance)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">{employee.performance}/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Overview</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600">Total Expenses</p>
                          <p className="text-2xl font-bold text-blue-900">${employee.totalExpenses.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">Monthly Expenses</p>
                          <p className="text-2xl font-bold text-green-900">${employee.monthlyExpenses.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600">Transactions</p>
                          <p className="text-2xl font-bold text-purple-900">{employee.transactionCount}</p>
                        </div>
                        <FileText className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-600">Avg Transaction</p>
                          <p className="text-2xl font-bold text-orange-900">${employee.avgTransaction.toFixed(0)}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending & Approval Limits</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Monthly Spending Limit</span>
                        <span className="text-sm text-gray-500">
                          ${employee.monthlyExpenses.toLocaleString()} / ${employee.spendingLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            (employee.monthlyExpenses / employee.spendingLimit) * 100 > 80 
                              ? 'bg-red-500' 
                              : (employee.monthlyExpenses / employee.spendingLimit) * 100 > 60 
                              ? 'bg-yellow-500' 
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min((employee.monthlyExpenses / employee.spendingLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Approval Limit</label>
                        <p className="mt-1 text-gray-900">${employee.approvalLimit.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Reimbursement Method</label>
                        <p className="mt-1 text-gray-900">{employee.reimbursementMethod}</p>
                        {employee.bankAccount && (
                          <p className="text-sm text-gray-500">{employee.bankAccount}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Skills</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Benefits</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {employee.benefits.map((benefit, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Skills</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {employee.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              Edit Employee
            </button>
            <button className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
              View Transactions
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredEmployees = allEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Management</h2>
          <p className="text-gray-600 mt-1">Manage employee profiles, expenses, and permissions</p>
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
          <button
            onClick={() => setShowAddEmployee(true)}
            className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{allEmployees.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {allEmployees.filter(emp => emp.status === 'active').length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">
                ${allEmployees.reduce((sum, emp) => sum + emp.totalExpenses, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900">
                {(allEmployees.reduce((sum, emp) => sum + emp.performance, 0) / allEmployees.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-600" />
          </div>
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
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Engineering">Engineering</option>
              <option value="Operations">Operations</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>

            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'table' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Grid/Table */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.length === filteredEmployees.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-gray-300 text-[#b892ff] focus:ring-[#b892ff]"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Expenses
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee.id)}
                        onChange={(e) => handleSelectEmployee(employee.id, e.target.checked)}
                        className="rounded border-gray-300 text-[#b892ff] focus:ring-[#b892ff]"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.position}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${employee.monthlyExpenses.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(employee.performance)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{employee.performance}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(employee.status)}`}>
                        {getStatusIcon(employee.status)}
                        <span className="ml-2 capitalize">{employee.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setShowEmployeeModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600" title="Settings">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {showEmployeeModal && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => {
            setShowEmployeeModal(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default Employees;