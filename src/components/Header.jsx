
// components/Header.jsx
import React from 'react';
import { Search, Bell, Plus } from 'lucide-react';

const Header = ({ currentPage, searchQuery, setSearchQuery }) => {
  const getPageTitle = (page) => {
    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  const getPageDescription = (page) => {
    const descriptions = {
      dashboard: 'Overview of your financial reconciliation and expense tracking',
      transactions: 'Manage and track all employee transactions and expenses',
      analytics: 'View reports and analytics for financial insights',
      employees: 'Manage employee accounts and expense permissions',
      billing: 'Manage your subscription and billing information',
      settings: 'Configure your account and application settings'
    };
    return descriptions[page] || 'Manage your financial reconciliation and expense tracking';
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getPageTitle(currentPage)}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {getPageDescription(currentPage)}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b892ff] focus:border-transparent"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Add Transaction Button */}
          {/* <button className="bg-[#b892ff] hover:bg-[#a075ff] text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header