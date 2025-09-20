
// // pages/Analytics.jsx
// import React from 'react';

// const Analytics = () => {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Analytics & Reports</h2>
//       <p className="text-gray-600">Analytics dashboard with charts and insights will be implemented here.</p>
//     </div>
//   );
// };

// export default Analytics



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
  Area
} from 'recharts';

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Calendar,
  Download,
  Filter,
  BarChart3,
//   PieChart,
  Activity,
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for charts
  const expenseData = [
    { month: 'Jan', amount: 12450, approved: 11200, pending: 1250 },
    { month: 'Feb', amount: 15680, approved: 14100, pending: 1580 },
    { month: 'Mar', amount: 18920, approved: 17200, pending: 1720 },
    { month: 'Apr', amount: 16750, approved: 15400, pending: 1350 },
    { month: 'May', amount: 21340, approved: 19800, pending: 1540 },
    { month: 'Jun', amount: 19580, approved: 18200, pending: 1380 },
    { month: 'Jul', amount: 23150, approved: 21900, pending: 1250 },
    { month: 'Aug', amount: 25670, approved: 24100, pending: 1570 },
    { month: 'Sep', amount: 22890, approved: 21300, pending: 1590 }
  ];

  const categoryData = [
    { name: 'Travel & Transport', value: 35, amount: 45780, color: '#b892ff' },
    { name: 'Office Supplies', value: 25, amount: 32150, color: '#8b5cf6' },
    { name: 'Software & Tools', value: 18, amount: 23890, color: '#a78bfa' },
    { name: 'Client Entertainment', value: 12, amount: 15670, color: '#c4b5fd' },
    { name: 'Equipment', value: 10, amount: 12340, color: '#ddd6fe' }
  ];

  const weeklyTrends = [
    { day: 'Mon', expenses: 2340, transactions: 12 },
    { day: 'Tue', expenses: 3890, transactions: 18 },
    { day: 'Wed', expenses: 2780, transactions: 15 },
    { day: 'Thu', expenses: 4560, transactions: 22 },
    { day: 'Fri', expenses: 3210, transactions: 16 },
    { day: 'Sat', expenses: 1890, transactions: 8 },
    { day: 'Sun', expenses: 1230, transactions: 5 }
  ];

  const departmentData = [
    { department: 'Sales', budget: 25000, spent: 18750, percentage: 75 },
    { department: 'Marketing', budget: 20000, spent: 16800, percentage: 84 },
    { department: 'Engineering', budget: 30000, spent: 22500, percentage: 75 },
    { department: 'Operations', budget: 15000, spent: 11250, percentage: 75 },
    { department: 'HR', budget: 10000, spent: 6800, percentage: 68 }
  ];

  const topEmployees = [
    { name: 'Sarah Johnson', amount: 4890, transactions: 23, department: 'Sales' },
    { name: 'Mike Chen', amount: 4320, transactions: 19, department: 'Marketing' },
    { name: 'Emma Davis', amount: 3980, transactions: 21, department: 'Engineering' },
    { name: 'James Wilson', amount: 3650, transactions: 18, department: 'Sales' },
    { name: 'Lisa Brown', amount: 3290, transactions: 16, department: 'Operations' }
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-500',
      purple: 'bg-[#b892ff]',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: ${entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Overview</h2>
          <p className="text-gray-600 mt-1">Track expenses, analyze spending patterns, and monitor budget usage</p>
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
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Expenses"
          value="$189,420"
          change="+12.5% from last month"
          changeType="increase"
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Pending Approvals"
          value="$12,890"
          change="-8.2% from last week"
          changeType="decrease"
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Active Employees"
          value="47"
          change="+6.4% this month"
          changeType="increase"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Avg. Transaction"
          value="$284"
          change="+3.1% from last month"
          changeType="increase"
          icon={CreditCard}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Expense Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-[#b892ff] rounded-full mr-2"></div>
                <span className="text-gray-600">Total</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Approved</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={expenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stackId="1"
                stroke="#b892ff"
                fill="#b892ff"
                fillOpacity={0.1}
              />
              <Area
                type="monotone"
                dataKey="approved"
                stackId="2"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
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
          <div className="mt-4 space-y-2">
            {categoryData.map((category, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-gray-700">{category.name}</span>
                </div>
                <span className="font-medium text-gray-900">${category.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity & Department Budget */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Activity</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="expenses" fill="#b892ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Budget Usage */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Department Budget Usage</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                  <span className="text-sm text-gray-500">
                    ${dept.spent.toLocaleString()} / ${dept.budget.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      dept.percentage > 80 ? 'bg-red-500' : 
                      dept.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{dept.percentage}% used</span>
                  <span>${(dept.budget - dept.spent).toLocaleString()} remaining</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Spenders & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spenders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Spenders</h3>
            <button className="text-[#b892ff] hover:text-[#a075ff] text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {topEmployees.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${employee.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{employee.transactions} transactions</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Quick Insights</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">Budget on Track</p>
                  <p className="text-sm text-green-700">73% of monthly budget used with 8 days remaining</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <p className="font-medium text-yellow-900">High Spending Alert</p>
                  <p className="text-sm text-yellow-700">Marketing dept. exceeded 80% of monthly budget</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Trend Analysis</p>
                  <p className="text-sm text-blue-700">Travel expenses increased by 23% this month</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-purple-900">Pending Reviews</p>
                  <p className="text-sm text-purple-700">12 transactions awaiting approval worth $2,847</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;