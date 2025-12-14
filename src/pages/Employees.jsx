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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
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
  User,
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
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  // Employee data from API
  const [allEmployees, setAllEmployees] = useState([]);

  // Fetch employees on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.companyId) {
      setCompanyId(user.companyId);
      fetchEmployees(user.companyId);
    }
  }, [searchQuery, departmentFilter, statusFilter]);

  const fetchEmployees = async (companyId) => {
    const token = localStorage.getItem('access_token');
    if (!token || !companyId) return;

    try {
      setLoading(true);

      let queryParams = [];
      if (searchQuery) queryParams.push(`search=${searchQuery}`);
      if (departmentFilter !== 'all') queryParams.push(`department=${departmentFilter}`);
      if (statusFilter !== 'all') queryParams.push(`status=${statusFilter}`);

      const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

      const response = await axios.get(
        `${URL}/api/employees/company/${companyId}${queryString}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const employees = response.data.employees.map(emp => ({
          id: emp.id,
          name: `${emp.firstName} ${emp.lastName}`,
          email: emp.email,
          phone: emp.phone,
          department: emp.department?.name || 'N/A',
          position: emp.position,
          manager: emp.manager ? `${emp.manager.firstName} ${emp.manager.lastName}` : 'N/A',
          employeeId: emp.employeeId,
          status: emp.isActive ? 'active' : 'inactive',
          startDate: emp.hireDate ? new Date(emp.hireDate).toISOString().split('T')[0] : 'N/A',
          location: emp.location,
          totalExpenses: emp.stats?.totalExpenses || 0,
          monthlyExpenses: emp.stats?.monthlyExpenses || 0,
          transactionCount: emp.stats?.transactionCount || 0,
          avgTransaction: emp.stats?.averageTransaction || 0,
          spendingLimit: emp.monthlySpendingLimit,
          approvalLimit: emp.approvalLimit,
          reimbursementMethod: emp.reimbursementMethod,
          bankName: emp.bankName,
          accountNumber: emp.accountNumber,
          performanceRating: emp.performanceRating
        }));
        setAllEmployees(employees);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const EmployeeCard = ({ employee }) => {
    const initials = employee.name
      ? employee.name.split(' ').map(n => n[0]).join('').toUpperCase()
      : 'N/A';
    const performanceRating = employee.performanceRating || employee.performance || 0;
    const monthlyExpenses = employee.monthlyExpenses || 0;
    const transactionCount = employee.transactionCount || 0;

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-semibold">
              {initials}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">{employee.name || 'N/A'}</h3>
              <p className="text-sm text-gray-500">{employee.position || 'N/A'}</p>
              <p className="text-xs text-blue-600 font-mono font-medium">ID: {employee.employeeId || 'N/A'}</p>
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
            {employee.department || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {employee.email || 'N/A'}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {employee.location || 'N/A'}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Monthly Expenses</p>
              <p className="font-semibold text-gray-900">₦{monthlyExpenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Transactions</p>
              <p className="font-semibold text-gray-900">{transactionCount}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(performanceRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-2">{performanceRating > 0 ? performanceRating : 'N/A'}</span>
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
  };

  const EmployeeModal = ({ employee, onClose }) => {
    if (!employee) return null;

    // Safe access to employee properties with defaults
    const initials = employee.name
      ? employee.name.split(' ').map(n => n[0]).join('').toUpperCase()
      : 'N/A';
    const performanceRating = employee.performanceRating || employee.performance || 0;
    const salary = employee.salary || 0;
    const totalExpenses = employee.totalExpenses || 0;
    const monthlyExpenses = employee.monthlyExpenses || 0;
    const transactionCount = employee.transactionCount || 0;
    const avgTransaction = employee.avgTransaction || 0;
    const spendingLimit = employee.spendingLimit || 0;
    const approvalLimit = employee.approvalLimit || 0;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {initials}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">{employee.name || 'N/A'}</h2>
                  <p className="text-gray-500">
                    {employee.position || 'N/A'} • {employee.department || 'N/A'}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Employee Credentials Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-900">Employee Login Credentials</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-blue-600 font-medium">Employee ID:</label>
                      <p className="text-sm font-mono font-semibold text-gray-900 bg-white px-2 py-1 rounded inline-block ml-2">
                        {employee.employeeId || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-blue-600 font-medium">Default Password:</label>
                      <p className="text-sm font-mono font-semibold text-gray-900 bg-white px-2 py-1 rounded inline-block ml-2">
                        spendcinq123
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Share these credentials with the employee for login at /employee-signin
                  </p>
                </div>
                <button
                  onClick={() => {
                    const credentials = `Employee ID: ${employee.employeeId}\nPassword: spendcinq123\nLogin at: ${window.location.origin}/employee-signin`;
                    navigator.clipboard.writeText(credentials);
                    alert('Credentials copied to clipboard!');
                  }}
                  className="ml-4 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>
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
                      <p className="mt-1 text-gray-900">{employee.email || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <p className="mt-1 text-gray-900">{employee.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-gray-900">{employee.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Start Date</label>
                      <p className="mt-1 text-gray-900">{employee.startDate || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Manager</label>
                      <p className="mt-1 text-gray-900">{employee.manager || 'N/A'}</p>
                    </div>
                    {salary > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Salary</label>
                        <p className="mt-1 text-gray-900">₦{salary.toLocaleString()}</p>
                      </div>
                    )}
                    {performanceRating > 0 && (
                      <div>
                        <label className="text-sm font-medium text-gray-700">Performance Rating</label>
                        <div className="mt-1 flex items-center">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(performanceRating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">{performanceRating}/5</span>
                        </div>
                      </div>
                    )}
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
                          <p className="text-2xl font-bold text-blue-900">₦{totalExpenses.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-600">Monthly Expenses</p>
                          <p className="text-2xl font-bold text-green-900">₦{monthlyExpenses.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-600">Transactions</p>
                          <p className="text-2xl font-bold text-purple-900">{transactionCount}</p>
                        </div>
                        <FileText className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-orange-600">Avg Transaction</p>
                          <p className="text-2xl font-bold text-orange-900">₦{avgTransaction.toFixed(0)}</p>
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
                          ₦{monthlyExpenses.toLocaleString()} / ₦{spendingLimit.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            spendingLimit > 0 && (monthlyExpenses / spendingLimit) * 100 > 80
                              ? 'bg-red-500'
                              : spendingLimit > 0 && (monthlyExpenses / spendingLimit) * 100 > 60
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{
                            width: `${spendingLimit > 0 ? Math.min((monthlyExpenses / spendingLimit) * 100, 100) : 0}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Approval Limit</label>
                        <p className="mt-1 text-gray-900">₦{approvalLimit.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Reimbursement Method</label>
                        <p className="mt-1 text-gray-900">{employee.reimbursementMethod || 'N/A'}</p>
                        {employee.bankName && (
                          <p className="text-sm text-gray-500">{employee.bankName}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {(employee.benefits?.length > 0 || employee.skills?.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Skills</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {employee.benefits?.length > 0 && (
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
                      )}
                      {employee.skills?.length > 0 && (
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
                      )}
                    </div>
                  </div>
                )}
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
    const matchesSearch = (employee.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (employee.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                         (employee.department?.toLowerCase() || '').includes(searchQuery.toLowerCase());
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
                ₦{allEmployees.reduce((sum, emp) => sum + emp.totalExpenses, 0).toLocaleString()}
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
                          {employee.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'N/A'}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{employee.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{employee.position || 'N/A'}</div>
                          <div className="text-xs text-blue-600 font-mono font-medium">ID: {employee.employeeId || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.department || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₦{(employee.monthlyExpenses || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(employee.performanceRating || employee.performance || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {employee.performanceRating || employee.performance || 'N/A'}
                        </span>
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

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <AddEmployeeModal
          companyId={companyId}
          onClose={() => setShowAddEmployee(false)}
          onSuccess={() => {
            setShowAddEmployee(false);
            fetchEmployees(companyId);
          }}
        />
      )}
    </div>
  );
};

// Add Employee Modal Component
const AddEmployeeModal = ({ companyId, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    location: '',
    hireDate: '',
    salary: '',
    monthlySpendingLimit: '',
    approvalLimit: '',
    reimbursementMethod: 'Direct Deposit',
    bankName: '',
    accountNumber: '',
    accountName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [departments, setDepartments] = useState([]);
  const [showNewDeptInput, setShowNewDeptInput] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, [companyId]);

  const fetchDepartments = async () => {
    const token = localStorage.getItem('access_token');
    if (!token || !companyId) return;

    try {
      const response = await axios.get(
        `${URL}/api/employees/departments/company/${companyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setDepartments(response.data.departments || []);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleCreateDepartment = async () => {
    if (!newDeptName.trim()) return;

    const token = localStorage.getItem('access_token');
    if (!token) return;

    try {
      const response = await axios.post(
        `${URL}/api/employees/departments`,
        { companyId, name: newDeptName.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setDepartments([...departments, response.data.department]);
        setFormData(prev => ({ ...prev, department: response.data.department.id }));
        setNewDeptName('');
        setShowNewDeptInput(false);
      }
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError('First name, last name, and email are required');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setError('Authentication token not found');
      return;
    }

    try {
      setLoading(true);

      const payload = {
        companyId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        position: formData.position || null,
        location: formData.location || null,
        hireDate: formData.hireDate || new Date().toISOString().split('T')[0],
        salary: formData.salary ? parseFloat(formData.salary) : null,
        monthlySpendingLimit: formData.monthlySpendingLimit ? parseFloat(formData.monthlySpendingLimit) : 0,
        approvalLimit: formData.approvalLimit ? parseFloat(formData.approvalLimit) : 0,
        reimbursementMethod: formData.reimbursementMethod,
        bankName: formData.bankName || null,
        accountNumber: formData.accountNumber || null,
        accountName: formData.accountName || null
      };

      // Only add departmentId if one was selected
      if (formData.department && formData.department !== '') {
        payload.departmentId = formData.department;
      }

      console.log('Creating employee with payload:', payload);

      const response = await axios.post(
        `${URL}/api/employees`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert(`Employee created successfully!\n\nEmployee ID: ${response.data.employee.employeeId}\nDefault Password: spendcinq123\n\nPlease share these credentials with the employee.`);
        onSuccess();
      } else {
        setError(response.data.message || 'Failed to create employee');
      }
    } catch (error) {
      console.error('Error creating employee:', error);
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || 'Failed to create employee. Please try again.';
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Information */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            {/* Employment Information */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Employment Information</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department (Optional)</label>
              {!showNewDeptInput ? (
                <div className="flex gap-2">
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewDeptInput(true)}
                    className="px-3 py-2 text-[#b892ff] border border-[#b892ff] rounded-lg hover:bg-[#b892ff] hover:text-white transition-colors"
                    title="Add new department"
                  >
                    +
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeptName}
                    onChange={(e) => setNewDeptName(e.target.value)}
                    placeholder="Enter department name"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleCreateDepartment}
                    className="px-3 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNewDeptInput(false); setNewDeptName(''); }}
                    className="px-3 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
              {departments.length === 0 && !showNewDeptInput && (
                <p className="text-xs text-gray-500 mt-1">No departments yet. Click + to create one.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hire Date</label>
              <input
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            {/* Financial Information */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Financial Settings</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Spending Limit</label>
              <input
                type="number"
                name="monthlySpendingLimit"
                value={formData.monthlySpendingLimit}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Approval Limit</label>
              <input
                type="number"
                name="approvalLimit"
                value={formData.approvalLimit}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reimbursement Method</label>
              <select
                name="reimbursementMethod"
                value={formData.reimbursementMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              >
                <option value="Direct Deposit">Direct Deposit</option>
                <option value="Corporate Card">Corporate Card</option>
                <option value="Check">Check</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Default password will be: <span className="font-mono bg-gray-100 px-2 py-1 rounded">spendcinq123</span>
            </p>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Employee'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employees;