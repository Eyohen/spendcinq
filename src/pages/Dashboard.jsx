
// // pages/Dashboard.jsx
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  CreditCard,
  Receipt,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Filter,
  RefreshCw,
  Eye,
  MoreHorizontal,
  Building,
  BarChart3,
  Activity,
  FileText,
  Wallet,
  Target,
  Zap,
  Star,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Financial overview data
  const financialOverview = {
    totalExpenses: 248567.80,
    monthlyExpenses: 18456.20,
    pendingApprovals: 5673.45,
    thisMonthGrowth: 12.5,
    avgTransactionValue: 284.67,
    totalTransactions: 1247,
    reimbursementsDue: 8934.20,
    budgetUtilization: 73.2
  };

  // Monthly expense trend data
  const monthlyTrends = [
    { month: 'Jan', expenses: 12450, budget: 15000, approved: 11200, pending: 1250, reimbursed: 10800 },
    { month: 'Feb', expenses: 15680, budget: 16000, approved: 14100, pending: 1580, reimbursed: 13200 },
    { month: 'Mar', expenses: 18920, budget: 20000, approved: 17200, pending: 1720, reimbursed: 16100 },
    { month: 'Apr', expenses: 16750, budget: 18000, approved: 15400, pending: 1350, reimbursed: 14800 },
    { month: 'May', expenses: 21340, budget: 22000, approved: 19800, pending: 1540, reimbursed: 18900 },
    { month: 'Jun', expenses: 19580, budget: 21000, approved: 18200, pending: 1380, reimbursed: 17600 },
    { month: 'Jul', expenses: 23150, budget: 24000, approved: 21900, pending: 1250, reimbursed: 21200 },
    { month: 'Aug', expenses: 25670, budget: 26000, approved: 24100, pending: 1570, reimbursed: 23400 },
    { month: 'Sep', expenses: 18456, budget: 25000, approved: 16890, pending: 1566, reimbursed: 16200 }
  ];

  // Department spending data
  const departmentData = [
    { name: 'Sales', amount: 85420, budget: 95000, utilization: 89.9, transactions: 245, color: '#b892ff' },
    { name: 'Marketing', amount: 67890, budget: 75000, utilization: 90.5, transactions: 189, color: '#8b5cf6' },
    { name: 'Engineering', amount: 54320, budget: 80000, utilization: 67.9, transactions: 156, color: '#a78bfa' },
    { name: 'Operations', amount: 32150, budget: 45000, utilization: 71.4, transactions: 98, color: '#c4b5fd' },
    { name: 'HR', amount: 18750, budget: 25000, utilization: 75.0, transactions: 67, color: '#ddd6fe' }
  ];

  // Category breakdown data
  const categoryData = [
    { name: 'Travel & Transport', value: 35.2, amount: 87450, color: '#b892ff', trend: 5.2 },
    { name: 'Office Supplies', value: 22.8, amount: 56780, color: '#8b5cf6', trend: -2.1 },
    { name: 'Software & Tools', value: 18.5, amount: 46120, color: '#a78bfa', trend: 8.7 },
    { name: 'Client Entertainment', value: 12.3, amount: 30650, color: '#c4b5fd', trend: -1.5 },
    { name: 'Equipment', value: 8.7, amount: 21670, color: '#ddd6fe', trend: 3.2 },
    { name: 'Other', value: 2.5, amount: 6230, color: '#f3f4f6', trend: 0.8 }
  ];

  // Daily activity data
  const dailyActivity = [
    { day: 'Mon', submitted: 23, approved: 18, rejected: 2, amount: 4567 },
    { day: 'Tue', submitted: 31, approved: 24, rejected: 3, amount: 6789 },
    { day: 'Wed', submitted: 28, approved: 22, rejected: 1, amount: 5234 },
    { day: 'Thu', submitted: 34, approved: 29, rejected: 2, amount: 7891 },
    { day: 'Fri', submitted: 26, approved: 21, rejected: 1, amount: 5123 },
    { day: 'Sat', submitted: 12, approved: 10, rejected: 0, amount: 2345 },
    { day: 'Sun', submitted: 8, approved: 6, rejected: 0, amount: 1567 }
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 'TXN-2025-001',
      employee: 'Sarah Johnson',
      department: 'Sales',
      amount: 156.80,
      category: 'Client Lunch',
      date: '2025-09-20',
      status: 'pending',
      urgency: 'normal'
    },
    {
      id: 'TXN-2025-002',
      employee: 'Mike Chen',
      department: 'Marketing',
      amount: 2847.50,
      category: 'Conference',
      date: '2025-09-19',
      status: 'approved',
      urgency: 'high'
    },
    {
      id: 'TXN-2025-003',
      employee: 'Emma Davis',
      department: 'Engineering',
      amount: 599.99,
      category: 'Software',
      date: '2025-09-19',
      status: 'reconciled',
      urgency: 'normal'
    },
    {
      id: 'TXN-2025-004',
      employee: 'James Wilson',
      department: 'Sales',
      amount: 89.50,
      category: 'Transportation',
      date: '2025-09-18',
      status: 'pending',
      urgency: 'normal'
    },
    {
      id: 'TXN-2025-005',
      employee: 'Lisa Brown',
      department: 'Operations',
      amount: 234.75,
      category: 'Office Supplies',
      date: '2025-09-18',
      status: 'rejected',
      urgency: 'low'
    }
  ];

  // Approval queue
  const approvalQueue = [
    {
      id: 'APP-001',
      employee: 'David Kim',
      amount: 1247.80,
      category: 'Travel',
      submitDate: '2025-09-18',
      daysWaiting: 2,
      priority: 'high'
    },
    {
      id: 'APP-002',
      employee: 'Maria Garcia',
      amount: 567.45,
      category: 'Entertainment',
      submitDate: '2025-09-19',
      daysWaiting: 1,
      priority: 'medium'
    },
    {
      id: 'APP-003',
      employee: 'Tom Anderson',
      amount: 89.99,
      category: 'Supplies',
      submitDate: '2025-09-20',
      daysWaiting: 0,
      priority: 'low'
    }
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

  const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'blue', subtitle, onClick }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      purple: 'bg-[#b892ff]',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500',
      indigo: 'bg-indigo-500'
    };

    return (
      <div 
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
            {change && (
              <div className={`flex items-center mt-2 text-sm ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                {change}
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.dataKey}:
              </span>
              <span className="ml-2 font-bold">
                ${entry.value?.toLocaleString() || entry.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 font-jakarta">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
          <p className="text-gray-600 mt-1">Real-time insights into your expense management and financial health</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Plus className="w-4 h-4 mr-2" />
            New Expense
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value={`$${financialOverview.totalExpenses.toLocaleString()}`}
          change={`+${financialOverview.thisMonthGrowth}% from last month`}
          changeType="increase"
          icon={DollarSign}
          color="purple"
          subtitle="All time"
        />
        <StatCard
          title="This Month"
          value={`$${financialOverview.monthlyExpenses.toLocaleString()}`}
          change={`${financialOverview.totalTransactions} transactions`}
          icon={TrendingUp}
          color="blue"
          subtitle={`Avg: $${financialOverview.avgTransactionValue}`}
        />
        <StatCard
          title="Pending Approvals"
          value={`$${financialOverview.pendingApprovals.toLocaleString()}`}
          change="12 items waiting"
          icon={Clock}
          color="orange"
          subtitle="Requires action"
        />
        <StatCard
          title="Reimbursements Due"
          value={`$${financialOverview.reimbursementsDue.toLocaleString()}`}
          change="23 employees"
          icon={Wallet}
          color="green"
          subtitle="Ready for payment"
        />
      </div>

      {/* Financial Overview Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Monthly Expense Trends</h3>
              <p className="text-gray-500 text-sm">Expenses vs Budget comparison</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#b892ff] rounded-full mr-2"></div>
                <span className="text-gray-600">Expenses</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-gray-600">Budget</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <ComposedChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="budget" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#b892ff" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
              <p className="text-gray-500 text-sm">Current month breakdown</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-center mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}%`, name]}
                  labelFormatter={() => ''}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center flex-1">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-gray-700 flex-1">{category.name}</span>
                  <div className={`flex items-center ml-2 ${
                    category.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {category.trend > 0 ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    <span className="text-xs">{Math.abs(category.trend)}%</span>
                  </div>
                </div>
                <span className="font-medium text-gray-900 ml-4">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Analysis & Daily Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Budget Utilization */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Department Analysis</h3>
              <p className="text-gray-500 text-sm">Budget utilization by department</p>
            </div>
            <Building className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">
                      ${dept.amount.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 block">
                      {dept.transactions} transactions
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        dept.utilization > 85 ? 'bg-red-500' : 
                        dept.utilization > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${dept.utilization}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 min-w-[40px]">
                    {dept.utilization}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
              <p className="text-gray-500 text-sm">Transaction submissions and approvals</p>
            </div>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip 
                formatter={(value, name) => [value, name === 'amount' ? 'Amount ($)' : name]}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar dataKey="submitted" stackId="a" fill="#b892ff" />
              <Bar dataKey="approved" stackId="a" fill="#10b981" />
              <Bar dataKey="rejected" stackId="a" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#b892ff] rounded-full mr-2"></div>
              <span className="text-gray-600">Submitted</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Approved</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Rejected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Approval Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <p className="text-gray-500 text-sm">Latest expense submissions</p>
            </div>
            <button className="text-[#b892ff] hover:text-[#a075ff] font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center flex-1">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <Receipt className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{transaction.employee}</p>
                    <p className="text-xs text-gray-500">{transaction.category} • {transaction.department}</p>
                    <p className="text-xs text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right mr-3">
                  <p className="font-medium text-gray-900">${transaction.amount}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(transaction.status)}`}>
                    {getStatusIcon(transaction.status)}
                    <span className="ml-1 capitalize">{transaction.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approval Queue */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Approval Queue</h3>
              <p className="text-gray-500 text-sm">Expenses waiting for approval</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                {approvalQueue.length} pending
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {approvalQueue.map((item) => (
              <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-[#b892ff] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{item.employee}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${item.amount}</p>
                    <p className="text-xs text-gray-500">{item.daysWaiting} days waiting</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.priority} priority
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-[#b892ff] hover:text-[#a075ff] font-medium text-sm">
              View All Pending Approvals
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-[#b892ff] to-[#8b5cf6] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="text-purple-100">Streamline your expense management workflow</p>
          </div>
          <Zap className="w-6 h-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-colors">
            <Plus className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">New Expense</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-colors">
            <CheckCircle className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Bulk Approve</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-colors">
            <Download className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Export Report</span>
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center transition-colors">
            <Users className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;