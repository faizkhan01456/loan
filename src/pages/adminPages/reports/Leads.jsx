import React, { useState, useEffect, useMemo } from 'react';
import { Phone, MoreVertical, ChevronLeft, ChevronRight, Mail, MapPin, PhoneCall, Edit, Trash2, User } from 'lucide-react';
import { useGetLeads } from '../../../hooks/useLeads';

const Leads = () => {
  const { data: responseData = {}, isLoading } = useGetLeads();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Extract leads data from the nested response structure
  const loanData = useMemo(() => {
    if (!responseData || !responseData.data) {
      return [];
    }
    
    // Handle the nested structure: responseData.data.data
    const data = responseData.data;
    
    // Case 1: Direct array in data.data
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // Case 2: Array directly in data
    if (Array.isArray(data)) {
      return data;
    }
    
    // Case 3: Check for other common property names
    if (data.leads && Array.isArray(data.leads)) {
      return data.leads;
    }
    
    if (data.items && Array.isArray(data.items)) {
      return data.items;
    }
    
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    return [];
  }, [responseData]);

  const filteredData = useMemo(() => {
    if (!searchTerm) return loanData;

    const lower = searchTerm.toLowerCase();

    return loanData.filter((item) => {
      // Safely handle null/undefined properties
      const fullName = item?.fullName || '';
      const email = item?.email || '';
      const contactNumber = item?.contactNumber || '';
      const city = item?.city || '';
      // Note: In your JSON, loanType is a nested object
      const loanTypeName = item?.loanType?.name || '';

      return (
        fullName.toLowerCase().includes(lower) ||
        email.toLowerCase().includes(lower) ||
        contactNumber.includes(searchTerm) ||
        city.toLowerCase().includes(lower) ||
        loanTypeName.toLowerCase().includes(lower)
      );
    });
  }, [loanData, searchTerm]);

  // Pagination logic - ensure filteredData is always an array
  const totalItems = Array.isArray(filteredData) ? filteredData.length : 0;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = Array.isArray(filteredData) 
    ? filteredData.slice(firstIndex, lastIndex)
    : [];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenu) setActiveMenu(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenu]);

  const getLoanTypeColor = (name = "") => {
    const key = name.toLowerCase();

    if (key.includes("home")) return "bg-blue-50 text-blue-700 border-blue-200";
    if (key.includes("personal")) return "bg-purple-50 text-purple-700 border-purple-200";
    if (key.includes("car")) return "bg-green-50 text-green-700 border-green-200";
    if (key.includes("business")) return "bg-amber-50 text-amber-700 border-amber-200";
    if (key.includes("education")) return "bg-indigo-50 text-indigo-700 border-indigo-200";

    return "bg-gray-50 text-gray-700 border-gray-200";
  };

  // Debug: Log the data structure
  console.log("Response Data:", responseData);
  console.log("Extracted Loan Data:", loanData);
  console.log("Filtered Data:", filteredData);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Lead Management</h1>
          <p className="text-gray-600">Manage and view all loan application details</p>
        </div>

        {/* Stats and Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Leads</h2>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                  <User size={14} />
                  Total: {totalItems} Records
                </span>
                {searchTerm && (
                  <span className="text-sm text-gray-500">
                    Found {filteredData.length} matching records
                  </span>
                )}
              </div>
            </div>

            <div className="w-full md:w-64">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {isLoading && (
            <div className="p-6 text-center text-gray-500">
              Loading user Leads...
            </div>
          )}

          {/* Table */}
          {!isLoading && (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Contact Details
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Loan Type
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Loan Amount
                      </th>
                      <th className="px-8 py-4 text-right text-sm font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.length > 0 ? (
                      currentItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          {/* Name Column */}
                          <td className="px-8 py-5">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                                {(item.fullName || '').charAt(0).toUpperCase() || 'U'}
                              </div>
                              <div className="ml-4">
                                <div className="text-base font-semibold text-gray-900">{item.fullName || 'Unknown'}</div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                  <Mail size={12} />
                                  {item.email || 'No email'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contact Column */}
                          <td className="px-8 py-5">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Phone size={14} className="text-gray-400" />
                                <span className="text-sm text-gray-900 font-medium">
                                  {item.contactNumber || 'No phone number'}
                                </span>
                              </div>
                              {item.contactNumber && (
                                <a
                                  href={`tel:${item.contactNumber}`}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                                >
                                  <PhoneCall size={12} />
                                  Call Customer
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Location Column */}
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-gray-400" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.city || 'Unknown'}</div>
                                <div className="text-xs text-gray-500">{item.state || ''}</div>
                              </div>
                            </div>
                          </td>

                          {/* Loan Type Column */}
                          <td className="px-8 py-5">
                            <span
                              className={`inline-flex items-center px-3 py-1.5 rounded-2xl text-sm font-medium border 
                                ${getLoanTypeColor(item.loanType?.name)}`}
                            >
                              {item.loanType?.name || "—"}
                            </span>
                          </td>

                          <td className="px-8 py-5">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹ {item.loanAmount ? item.loanAmount.toLocaleString("en-IN") : '0'}
                            </span>
                          </td>

                          {/* Actions Column */}
                          <td className="px-8 py-5 text-right relative">
                            <div className="flex justify-end">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleMenu(item.id);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              >
                                <MoreVertical size={20} className="text-gray-500" />
                              </button>

                              {activeMenu === item.id && (
                                <div className="absolute right-12 mt-10 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                  {item.contactNumber && (
                                    <a
                                      href={`tel:${item.contactNumber}`}
                                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                      <PhoneCall size={16} className="text-green-600" />
                                      Call Now
                                    </a>
                                  )}
                                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-gray-50">
                                    <Trash2 size={16} />
                                    Delete Record
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-8 py-12 text-center">
                          <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            {searchTerm ? "No matching users found" : "No lead data available"}
                          </h3>
                          <p className="text-gray-500">
                            {searchTerm
                              ? "Try adjusting your search to find what you're looking for."
                              : "There are no leads in the system yet."}
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Only show if there are items */}
              {totalItems > 0 && (
                <div className="px-8 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{Math.min(firstIndex + 1, totalItems)}</span> to{" "}
                    <span className="font-semibold">{Math.min(lastIndex, totalItems)}</span> of{" "}
                    <span className="font-semibold">{totalItems}</span> entries
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2.5 rounded-lg border ${currentPage === 1
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm transition-all'}`}
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium ${currentPage === pageNum
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-700 hover:bg-gray-100'}`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2.5 rounded-lg border ${currentPage === totalPages
                        ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                        : 'border-gray-300 text-gray-700 hover:bg-white hover:shadow-sm transition-all'}`}
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;