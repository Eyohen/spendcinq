// // pages/Billing.jsx
// import React from 'react';

// const Billing = () => {
//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h2 className="text-xl font-semibold text-gray-900 mb-4">Billing & Subscription</h2>
//       <p className="text-gray-600">Billing management interface will be implemented here.</p>
//     </div>
//   );
// };


// export default Billing




import React, { useState } from 'react';
import {
  CreditCard,
  Download,
  Eye,
  Edit,
  Check,
  X,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Crown,
  Zap,
  Shield,
  Clock,
  FileText,
  RefreshCw,
  Plus,
  Settings,
  Mail,
  Phone,
  Building,
  MapPin,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Gift,
  Lock,
  Unlock
} from 'lucide-react';

const Billing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Current subscription data
  const currentPlan = {
    name: 'Professional',
    price: 49,
    period: 'month',
    users: 50,
    usersUsed: 47,
    transactions: 'Unlimited',
    transactionsUsed: 1247,
    storage: '100 GB',
    storageUsed: 67.3,
    features: [
      'Advanced Analytics',
      'Multi-department Support',
      'API Access',
      'Priority Support',
      'Custom Reports',
      'Bulk Operations'
    ],
    renewalDate: '2025-10-20',
    status: 'active'
  };

  // Available plans
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 19,
      originalPrice: null,
      period: 'month',
      description: 'Perfect for small teams',
      users: 10,
      transactions: 500,
      storage: '10 GB',
      features: [
        'Basic Analytics',
        'Email Support',
        'Standard Reports',
        'Mobile App Access'
      ],
      popular: false,
      current: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 49,
      originalPrice: 59,
      period: 'month',
      description: 'Most popular for growing companies',
      users: 50,
      transactions: 'Unlimited',
      storage: '100 GB',
      features: [
        'Advanced Analytics',
        'Multi-department Support',
        'API Access',
        'Priority Support',
        'Custom Reports',
        'Bulk Operations'
      ],
      popular: true,
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 99,
      originalPrice: null,
      period: 'month',
      description: 'For large organizations',
      users: 'Unlimited',
      transactions: 'Unlimited',
      storage: '1 TB',
      features: [
        'Everything in Professional',
        'Advanced Security',
        'SSO Integration',
        'Dedicated Manager',
        'Custom Integrations',
        'SLA Guarantee'
      ],
      popular: false,
      current: false
    }
  ];

  // Usage data
  const usageData = [
    { month: 'Jan', transactions: 890, users: 42, storage: 58.2 },
    { month: 'Feb', transactions: 1120, users: 45, storage: 61.5 },
    { month: 'Mar', transactions: 1350, users: 47, storage: 64.8 },
    { month: 'Apr', transactions: 1180, users: 46, storage: 62.1 },
    { month: 'May', transactions: 1420, users: 48, storage: 67.3 },
    { month: 'Jun', transactions: 1247, users: 47, storage: 67.3 }
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 'card-1',
      type: 'visa',
      last4: '4532',
      expiry: '12/27',
      isDefault: true,
      name: 'Company Card'
    },
    {
      id: 'card-2',
      type: 'mastercard',
      last4: '8976',
      expiry: '08/26',
      isDefault: false,
      name: 'Backup Card'
    }
  ];

  // Invoice history
  const invoices = [
    {
      id: 'INV-2025-09',
      date: '2025-09-20',
      amount: 49.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Sep 2025',
      dueDate: '2025-09-20',
      paidDate: '2025-09-20',
      paymentMethod: '**** 4532'
    },
    {
      id: 'INV-2025-08',
      date: '2025-08-20',
      amount: 49.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Aug 2025',
      dueDate: '2025-08-20',
      paidDate: '2025-08-21',
      paymentMethod: '**** 4532'
    },
    {
      id: 'INV-2025-07',
      date: '2025-07-20',
      amount: 49.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Jul 2025',
      dueDate: '2025-07-20',
      paidDate: '2025-07-20',
      paymentMethod: '**** 4532'
    },
    {
      id: 'INV-2025-06',
      date: '2025-06-20',
      amount: 59.00,
      status: 'paid',
      plan: 'Professional',
      period: 'Jun 2025',
      dueDate: '2025-06-20',
      paidDate: '2025-06-22',
      paymentMethod: '**** 8976'
    },
    {
      id: 'INV-2025-05',
      date: '2025-05-20',
      amount: 59.00,
      status: 'overdue',
      plan: 'Professional',
      period: 'May 2025',
      dueDate: '2025-05-20',
      paidDate: null,
      paymentMethod: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-700 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'overdue': return 'text-red-700 bg-red-50 border-red-200';
      case 'active': return 'text-green-700 bg-green-50 border-green-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'active': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const PlanCard = ({ plan, isYearly = false }) => {
    const yearlyPrice = Math.round(plan.price * 12 * 0.8); // 20% discount for yearly
    const displayPrice = isYearly ? yearlyPrice : plan.price;
    const period = isYearly ? 'year' : plan.period;

    return (
      <div className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
        plan.popular 
          ? 'border-[#b892ff] shadow-lg scale-105' 
          : plan.current
          ? 'border-green-500 shadow-md'
          : 'border-gray-200 hover:border-gray-300'
      }`}>
        {plan.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-[#b892ff] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
        )}
        {plan.current && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Current Plan
            </span>
          </div>
        )}

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
          <p className="text-gray-500 mt-1">{plan.description}</p>
          <div className="mt-4">
            <div className="flex items-baseline justify-center">
              {plan.originalPrice && !isYearly && (
                <span className="text-lg text-gray-400 line-through mr-2">
                  ${plan.originalPrice}
                </span>
              )}
              <span className="text-4xl font-bold text-gray-900">
                ${isYearly ? yearlyPrice : plan.price}
              </span>
              <span className="text-gray-500 ml-1">/{period}</span>
            </div>
            {isYearly && (
              <div className="mt-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                  Save 20%
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Users</span>
            <span className="font-medium">{plan.users}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Transactions</span>
            <span className="font-medium">{plan.transactions}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Storage</span>
            <span className="font-medium">{plan.storage}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <button
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            plan.current
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : plan.popular
              ? 'bg-[#b892ff] text-white hover:bg-[#a075ff]'
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
          disabled={plan.current}
        >
          {plan.current ? 'Current Plan' : `Upgrade to ${plan.name}`}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing & Subscription</h2>
          <p className="text-gray-600 mt-1">Manage your subscription, billing, and payment methods</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Download Invoices
          </button>
          <button className="flex items-center px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
            <Settings className="w-4 h-4 mr-2" />
            Billing Settings
          </button>
        </div>
      </div>

      {/* Current Subscription Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscription Status */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Subscription</h3>
              <p className="text-gray-500">Your plan details and usage</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(currentPlan.status)}`}>
              {getStatusIcon(currentPlan.status)}
              <span className="ml-2 capitalize">{currentPlan.status}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">{currentPlan.name} Plan</h4>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${currentPlan.price}</p>
                  <p className="text-sm text-gray-500">per {currentPlan.period}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Users</span>
                    <span className="text-sm font-medium">{currentPlan.usersUsed} / {currentPlan.users}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#b892ff] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentPlan.usersUsed / currentPlan.users) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-sm font-medium">{currentPlan.storageUsed}% used</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${currentPlan.storageUsed}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-gray-900 mb-3">Features Included</h5>
              <div className="space-y-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Next billing date</p>
                <p className="font-medium text-gray-900">{currentPlan.renewalDate}</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel Subscription
                </button>
                <button className="px-4 py-2 bg-[#b892ff] text-white rounded-lg hover:bg-[#a075ff] transition-colors">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-xl font-bold text-gray-900">{currentPlan.transactionsUsed}</p>
                <p className="text-xs text-gray-500">transactions</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-xl font-bold text-gray-900">{currentPlan.usersUsed}</p>
                <p className="text-xs text-gray-500">of {currentPlan.users}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Savings</p>
                <p className="text-xl font-bold text-green-600">$10</p>
                <p className="text-xs text-gray-500">vs original price</p>
              </div>
              <Percent className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Available Plans</h3>
            <p className="text-gray-500">Choose the plan that fits your needs</p>
          </div>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                billingPeriod === 'yearly' 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-green-100 text-green-800 px-1 rounded">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} isYearly={billingPeriod === 'yearly'} />
          ))}
        </div>
      </div>

      {/* Payment Methods & Invoice History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
            <button className="flex items-center px-3 py-2 text-[#b892ff] border border-[#b892ff] rounded-lg hover:bg-[#b892ff] hover:text-white transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 border rounded-lg ${
                  method.isDefault ? 'border-[#b892ff] bg-[#b892ff]/5' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="w-8 h-8 text-gray-400 mr-3" />
                    <div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-900">
                          {method.type.charAt(0).toUpperCase() + method.type.slice(1)} **** {method.last4}
                        </span>
                        {method.isDefault && (
                          <span className="ml-2 px-2 py-1 text-xs bg-[#b892ff] text-white rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
            <button className="text-[#b892ff] hover:text-[#a075ff] font-medium text-sm">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {invoices.slice(0, 5).map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="w-8 h-8 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.date} • ${invoice.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                    {getStatusIcon(invoice.status)}
                    <span className="ml-1 capitalize">{invoice.status}</span>
                  </span>
                  <button
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Billing History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
          <p className="text-gray-500 mt-1">Complete history of your payments and invoices</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">{invoice.period}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(invoice.status)}`}>
                      {getStatusIcon(invoice.status)}
                      <span className="ml-1 capitalize">{invoice.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.plan}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View Invoice"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {invoice.status === 'overdue' && (
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                        >
                          Pay Now
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
    </div>
  );
};

export default Billing;