
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



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
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
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  // State for analytics data from API
  const [expenseData, setExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalExpenses: 0,
    thisMonth: 0,
    pendingApprovals: 0,
    avgProcessingTime: 0
  });

  // Fetch data on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.companyId) {
      setCompanyId(user.companyId);
      fetchAnalytics(user.companyId);
    }
  }, []);

  const fetchAnalytics = async (companyId) => {
    const token = localStorage.getItem('access_token');
    if (!token || !companyId) return;

    try {
      setLoading(true);

      // Fetch analytics overview
      const analyticsResponse = await axios.get(
        `${URL}/api/dashboard/${companyId}/analytics`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (analyticsResponse.data.success) {
        const data = analyticsResponse.data.analytics;
        setAnalytics({
          totalExpenses: parseFloat(data.totalExpenses) || 0,
          thisMonth: parseFloat(data.thisMonth) || 0,
          pendingApprovals: parseFloat(data.pendingApprovals) || 0,
          avgProcessingTime: data.avgProcessingTime || 0
        });
      }

      // Fetch trends (last 9 months)
      const trendsResponse = await axios.get(
        `${URL}/api/dashboard/${companyId}/trends?months=9`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (trendsResponse.data.success) {
        const trends = trendsResponse.data.trends.map(t => ({
          month: t.month,
          amount: parseFloat(t.totalExpenses),
          approved: parseFloat(t.approvedExpenses) || 0,
          pending: parseFloat(t.pendingExpenses) || 0
        }));
        setExpenseData(trends);
      }

      // Fetch category breakdown
      const categoryResponse = await axios.get(
        `${URL}/api/dashboard/${companyId}/categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (categoryResponse.data.success) {
        const categories = categoryResponse.data.categories.map((cat, idx) => ({
          name: cat.category || 'Uncategorized',
          value: parseFloat(cat.percentage) || 0,
          amount: parseFloat(cat.amount),
          color: ['#b892ff', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'][idx % 5]
        }));
        setCategoryData(categories);
      }

      // Fetch department budgets
      const departmentsResponse = await axios.get(
        `${URL}/api/dashboard/${companyId}/departments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (departmentsResponse.data.success) {
        const departments = departmentsResponse.data.departments.map(dept => ({
          department: dept.department,
          budget: parseFloat(dept.budget),
          spent: parseFloat(dept.spent),
          percentage: parseFloat(dept.utilization)
        }));
        setDepartmentData(departments);
      }

      // Fetch top employees
      const topEmployeesResponse = await axios.get(
        `${URL}/api/dashboard/${companyId}/top-employees`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (topEmployeesResponse.data.success) {
        const employees = topEmployeesResponse.data.topEmployees.map(emp => ({
          name: `${emp.firstName} ${emp.lastName}`,
          amount: parseFloat(emp.totalExpenses),
          transactions: emp.transactionCount,
          department: emp.department || 'N/A'
        }));
        setTopEmployees(employees);
      }

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Expenses"
            value={`$${analytics.totalExpenses.toLocaleString()}`}
            icon={DollarSign}
            color="blue"
          />
          <StatCard
            title="Pending Approvals"
            value={`$${analytics.pendingApprovals.toLocaleString()}`}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="This Month"
            value={`$${analytics.thisMonth.toLocaleString()}`}
            icon={Calendar}
            color="green"
          />
          <StatCard
            title="Avg. Processing Time"
            value={`${analytics.avgProcessingTime}d`}
            icon={CreditCard}
            color="purple"
          />
        </div>
      )}

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
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-gray-400">Loading chart data...</div>
            </div>
          ) : expenseData.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No trend data available</p>
            </div>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Expense Categories</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="text-gray-400">Loading chart data...</div>
            </div>
          ) : categoryData.length > 0 ? (
            <>
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
            </>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              <p>No category data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Department Budget Usage */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Department Budget Usage</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : departmentData.length > 0 ? (
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No department data available</p>
          </div>
        )}
      </div>

      {/* Top Spenders & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spenders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Spenders</h3>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between p-3 animate-pulse">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              ))}
            </div>
          ) : topEmployees.length > 0 ? (
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No employee data available</p>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-blue-900">Total Expenses</p>
                  <p className="text-sm text-blue-700">${analytics.totalExpenses.toLocaleString()} total spending</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">This Month</p>
                  <p className="text-sm text-green-700">${analytics.thisMonth.toLocaleString()} in current month</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-orange-600 mr-3" />
                <div>
                  <p className="font-medium text-orange-900">Pending Approvals</p>
                  <p className="text-sm text-orange-700">${analytics.pendingApprovals.toLocaleString()} awaiting review</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-center">
                <Activity className="w-5 h-5 text-purple-600 mr-3" />
                <div>
                  <p className="font-medium text-purple-900">Processing Time</p>
                  <p className="text-sm text-purple-700">Average {analytics.avgProcessingTime} days to process</p>
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