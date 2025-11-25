import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock Admin Credentials
  const MOCK_USERNAME = 'admin';
  const MOCK_PASSWORD = 'password123';

  const handleSubmit = (e) => { 
    e.preventDefault();
    setError('');

    if (username === MOCK_USERNAME && password === MOCK_PASSWORD) {
      // 1. Store the authentication flag in local storage
      localStorage.setItem('isAuthenticated', 'true');
      
      // 2. Navigate to the dashboard (replace history entry)
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError('Invalid Username or Password');
      setPassword(''); 
    }
  }; 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl">
        <div className="flex flex-col items-center">
          <LogIn className="w-10 h-10 text-[#3d5f12]" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Admin Login
          </h2>
          <p className="text-sm text-gray-600">
            Enter your credentials to access the dashboard
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-sm text-red-700 p-3 bg-red-100 border border-red-300 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-[#3d5f12] focus:border-[#3d5f12] transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-[#3d5f12] 
              focus:border-[#3d5f12] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent 
            rounded-lg shadow-sm text-white bg-[#745e46] hover:bg-[#5b4a3c] font-medium 
            transition duration-150 cursor-pointer"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;