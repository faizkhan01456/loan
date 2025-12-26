import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock, Eye, EyeOff } from 'lucide-react';

const EmployeeLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Mock employees data (आपके actual API से replace करें)
  const mockEmployees = [
    {
      employeeId: 'EMP001',
      username: 'amit_sharma',
      password: 'password123',
      fullName: 'Amit Sharma',
      designation: 'Senior Sales Executive',
      department: 'Sales',
      permissions: {
        dashboard: true,
        customers: true,
        loans: false,
        reports: false,
        settings: false,
        notifications: true,
        messages: true,
        profile: true,
        los: true
      }
    },
    {
      employeeId: 'EMP002',
      username: 'priya_patel',
      password: 'securepass123',
      fullName: 'Priya Patel',
      designation: 'Marketing Manager',
      department: 'Marketing',
      permissions: {
        dashboard: true,
        customers: true,
        loans: false,
        reports: true,
        settings: false,
        notifications: true,
        messages: true,
        profile: true,
        los: false
      }
    },
    {
      employeeId: 'EMP003',
      username: 'rahul_verma',
      password: 'manager123',
      fullName: 'Rahul Verma',
      designation: 'Operations Head',
      department: 'Management',
      permissions: {
        dashboard: true,
        customers: true,
        loans: true,
        reports: true,
        settings: true,
        notifications: true,
        messages: true,
        profile: true,
        los: true
      }
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const employee = mockEmployees.find(
        emp => emp.username === username && emp.password === password
      );

      if (employee) {
        // Store employee data in localStorage
        localStorage.setItem('currentEmployee', JSON.stringify({
          employeeId: employee.employeeId,
          fullName: employee.fullName,
          designation: employee.designation,
          department: employee.department,
          username: employee.username
        }));

        // Store permissions
        localStorage.setItem('employeePermissions', JSON.stringify(employee.permissions));

        // Navigate to employee dashboard
        navigate('/employee/dashboard');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Employee Portal</h1>
            <p className="text-blue-100 mt-1">Sign in to access your workspace</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <User size={16} /> Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Lock size={16} /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={20} /> Sign In
                </>
              )}
            </button>

            {/* Demo Accounts */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center mb-3">Demo Accounts:</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Amit (Sales)</p>
                  <p className="text-gray-500">amit_sharma</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Priya (Marketing)</p>
                  <p className="text-gray-500">priya_patel</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="font-medium">Rahul (Management)</p>
                  <p className="text-gray-500">rahul_verma</p>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Need help? Contact your system administrator
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Employee Portal. Secure login enabled.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;