import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, Users, CreditCard, BarChart, Calendar, 
  CheckCircle, Clock, AlertCircle, TrendingUp, DollarSign,
  FileText, Target, PieChart, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const EmployeeDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    pendingLoans: 0,
    completedTasks: 0,
    monthlyTarget: 0
  });

  useEffect(() => {
    // Fetch employee data from localStorage
    const storedEmployee = localStorage.getItem('currentEmployee');
    const storedPermissions = localStorage.getItem('employeePermissions');
    
    if (storedEmployee) {
      setEmployeeData(JSON.parse(storedEmployee));
    }

    // Fetch stats (यहाँ आप actual API call करेंगे)
    setStats({
      totalCustomers: 156,
      pendingLoans: 23,
      completedTasks: 45,
      monthlyTarget: 85 // percentage
    });
  }, []);

  // Quick Stats Cards
  const statCards = [
    {
      title: 'Total Customers',
      value: stats.totalCustomers,
      icon: <Users size={24} />,
      color: 'blue',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Pending Loans',
      value: stats.pendingLoans,
      icon: <CreditCard size={24} />,
      color: 'orange',
      change: '-5%',
      trend: 'down'
    },
    {
      title: 'Completed Tasks',
      value: stats.completedTasks,
      icon: <CheckCircle size={24} />,
      color: 'green',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Monthly Target',
      value: `${stats.monthlyTarget}%`,
      icon: <Target size={24} />,
      color: 'purple',
      change: '+15%',
      trend: 'up'
    }
  ];

  // Recent Activities
  const recentActivities = [
    { id: 1, action: 'Approved loan application', customer: 'Rajesh Kumar', time: '10 min ago', type: 'success' },
    { id: 2, action: 'Added new customer', customer: 'Priya Singh', time: '25 min ago', type: 'info' },
    { id: 3, action: 'Task completed', customer: 'Monthly Report', time: '1 hour ago', type: 'success' },
    { id: 4, action: 'Payment received', customer: 'Mohit Gupta', time: '2 hours ago', type: 'payment' },
    { id: 5, action: 'Follow-up required', customer: 'Ankit Sharma', time: '3 hours ago', type: 'warning' }
  ];

  // Quick Actions
  const quickActions = [
    { title: 'Add New Customer', icon: <UserPlus size={20} />, path: '/employee/customers/add' },
    { title: 'Process Loan', icon: <FileText size={20} />, path: '/employee/loans/new' },
    { title: 'Generate Report', icon: <BarChart size={20} />, path: '/employee/reports' },
    { title: 'Check Messages', icon: <MessageSquare size={20} />, path: '/employee/messages' }
  ];

  if (!employeeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome back, {employeeData.fullName}!
            </h1>
            <p className="text-blue-100 mt-2">
              Here's what's happening with your work today. 
              You have {stats.pendingLoans} pending loans and {stats.completedTasks} completed tasks.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-xl font-bold">{employeeData.fullName?.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold">{employeeData.designation}</p>
                <p className="text-sm text-blue-200">{employeeData.department} Department</p>
                <p className="text-xs text-blue-300">ID: {employeeData.employeeId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">{card.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {card.trend === 'up' ? (
                    <ArrowUpRight size={16} className="text-green-500" />
                  ) : (
                    <ArrowDownRight size={16} className="text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${card.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {card.change}
                  </span>
                  <span className="text-gray-500 text-sm">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg bg-${card.color}-50 text-${card.color}-600`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-100 text-green-600' :
                    activity.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'payment' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {activity.type === 'success' && <CheckCircle size={16} />}
                    {activity.type === 'warning' && <AlertCircle size={16} />}
                    {activity.type === 'payment' && <DollarSign size={16} />}
                    {activity.type === 'info' && <Clock size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.customer}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = action.path}
                  className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors group"
                >
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {action.icon}
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">{action.title}</span>
                </button>
              ))}
            </div>

            {/* Performance Meter */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-700">Monthly Performance</h3>
                <span className="font-bold text-blue-600">{stats.monthlyTarget}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${stats.monthlyTarget}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {stats.monthlyTarget >= 80 
                  ? 'Excellent! Keep up the good work.' 
                  : 'You\'re doing well. Aim for 80%+' 
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Upcoming Deadlines</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Monthly Sales Report', date: 'Today, 5:00 PM', priority: 'high' },
            { title: 'Customer Follow-ups', date: 'Tomorrow, 10:00 AM', priority: 'medium' },
            { title: 'Loan Approvals', date: 'Apr 15, 2024', priority: 'high' }
          ].map((deadline, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-800">{deadline.title}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{deadline.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  deadline.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {deadline.priority === 'high' ? 'High' : 'Medium'}
                </span>
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Mark as Done
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;