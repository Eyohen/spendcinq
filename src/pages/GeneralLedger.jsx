// pages/GeneralLedger.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../url';
import {
  Upload,
  Download,
  Plus,
  Search,
  Filter,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  FileText,
  X,
  Eye,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const GeneralLedger = () => {
  const [companyId, setCompanyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const fileInputRef = useRef(null);

  const COLORS = {
    Asset: '#10b981',
    Liability: '#ef4444',
    Equity: '#3b82f6',
    Revenue: '#8b5cf6',
    Expense: '#f59e0b'
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.companyId) {
      setCompanyId(user.companyId);
      fetchGLData(user.companyId);
    }
  }, []);

  const fetchGLData = async (companyId) => {
    const token = localStorage.getItem('access_token');
    if (!token || !companyId) return;

    try {
      setLoading(true);

      // Fetch accounts and analytics in parallel
      const [accountsRes, analyticsRes] = await Promise.all([
        axios.get(`${URL}/api/general-ledger/company/${companyId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${URL}/api/general-ledger/company/${companyId}/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setAccounts(accountsRes.data.accounts || []);
      setAnalytics(analyticsRes.data.analytics || null);
    } catch (error) {
      console.error('Error fetching GL data:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch general ledger data');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File selected:', file.name, 'Type:', file.type, 'Size:', file.size);

    // Validate file type
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type);
      toast.error('Invalid file type. Please upload a CSV or Excel file.');
      return;
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No authentication token found');
      toast.error('Authentication required. Please log in again.');
      return;
    }

    if (!companyId) {
      console.error('No company ID found');
      toast.error('Company information not found. Please refresh the page.');
      return;
    }

    console.log('Uploading to:', `${URL}/api/general-ledger/company/${companyId}/upload-file`);

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      console.log('Starting upload...');

      const response = await axios.post(
        `${URL}/api/general-ledger/company/${companyId}/upload-file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Upload response:', response.data);
      toast.success(response.data.message || 'General ledger uploaded successfully!');

      // Refresh data
      console.log('Refreshing GL data...');
      await fetchGLData(companyId);

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      toast.error(error.response?.data?.message || 'Failed to upload general ledger file');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    // Create CSV template
    const csvContent = `accountCode,accountName,accountType,accountCategory,balance,description
1000,Cash,Asset,Current Assets,0,Cash on hand and in bank
1100,Accounts Receivable,Asset,Current Assets,0,Money owed by customers
1200,Inventory,Asset,Current Assets,0,Stock and inventory
1500,Equipment,Asset,Fixed Assets,0,Office and operational equipment
2000,Accounts Payable,Liability,Current Liabilities,0,Money owed to suppliers
2100,Loans Payable,Liability,Long-term Liabilities,0,Bank loans and credit
3000,Owner's Equity,Equity,Equity,0,Owner's investment and retained earnings
4000,Sales Revenue,Revenue,Operating Revenue,0,Revenue from sales
5000,Travel Expenses,Expense,Operating Expenses,0,Employee travel costs
5100,Office Supplies,Expense,Operating Expenses,0,Office supplies and materials
5200,Utilities,Expense,Operating Expenses,0,Electricity water internet
5300,Salaries,Expense,Operating Expenses,0,Employee salaries and wages`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'general_ledger_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success('Template downloaded successfully!');
  };

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.accountCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || account.accountType === filterType;
    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount || 0);
  };

  const chartData = analytics?.accountsByType?.map(item => ({
    name: item.accountType,
    value: Math.abs(item.totalBalance),
    count: item.accountCount
  })) || [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#b892ff] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading General Ledger...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">General Ledger</h1>
          <p className="text-gray-500 mt-1">Manage your chart of accounts and GL structure</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Template
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a078ff] transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload GL File'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(analytics.totalAssets)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Liabilities</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(analytics.totalLiabilities)}
                </p>
              </div>
              <TrendingDown className="w-10 h-10 text-red-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Equity</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(analytics.totalEquity)}
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(analytics.totalRevenue)}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(analytics.totalExpenses)}
                </p>
              </div>
              <FileText className="w-10 h-10 text-orange-500 opacity-20" />
            </div>
          </div>
        </div>
      )}

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Accounts</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {analytics?.totalAccounts || 0}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-[#b892ff] opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unmapped Transactions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {analytics?.unmappedTransactions || 0}
              </p>
            </div>
            {(analytics?.unmappedTransactions || 0) > 0 ? (
              <AlertCircle className="w-12 h-12 text-orange-500 opacity-20" />
            ) : (
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Position</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {formatCurrency(
                  (analytics?.totalAssets || 0) -
                  (analytics?.totalLiabilities || 0)
                )}
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Charts */}
      {chartData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accounts by Type</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#b892ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by account code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
          >
            <option value="all">All Account Types</option>
            <option value="Asset">Assets</option>
            <option value="Liability">Liabilities</option>
            <option value="Equity">Equity</option>
            <option value="Revenue">Revenue</option>
            <option value="Expense">Expenses</option>
          </select>
        </div>

        {/* Accounts Table */}
        <div className="overflow-x-auto">
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Accounts Found</h3>
              <p className="text-gray-500 mb-4">
                {accounts.length === 0
                  ? 'Upload a general ledger file to get started'
                  : 'No accounts match your search criteria'}
              </p>
              {accounts.length === 0 && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a078ff] transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Upload GL File
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Report Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tax Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dashboard
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exp Claims
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payments
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {account.accountCode}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                        {account.accountName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${COLORS[account.accountType]}20`,
                            color: COLORS[account.accountType]
                          }}
                        >
                          {account.accountType}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {account.metadata?.['Report Code'] || '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {account.metadata?.['*Tax Code'] || '-'}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate" title={account.description || account.metadata?.['Description']}>
                        {account.description || account.metadata?.['Description'] || '-'}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {account.metadata?.['Dashboard'] === 'Yes' ? (
                          <span className="text-green-600 font-medium">✓</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {account.metadata?.['Expense Claims'] === 'Yes' ? (
                          <span className="text-green-600 font-medium">✓</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center text-sm">
                        {account.metadata?.['Enable Payments'] === 'Yes' ? (
                          <span className="text-green-600 font-medium">✓</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {formatCurrency(account.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {filteredAccounts.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAccounts.length} of {accounts.length} accounts
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralLedger;
