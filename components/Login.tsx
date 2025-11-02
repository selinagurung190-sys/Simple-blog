import React, { useState } from 'react';
import type { User } from '../types';

interface LoginProps {
  users: User[];
  onLogin: (user: User) => void;
  onSwitchToSignUp: () => void;
}

const Login: React.FC<LoginProps> = ({ users, onLogin, onSwitchToSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
      setError('');
      onLogin(user);
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
            <h1 className="font-pacifico text-4xl text-gray-700">Daily Thoughts</h1>
            <p className="text-gray-500 mt-2">Sign in to continue to your journal.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <button type="submit" className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all">
              Login
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignUp} className="font-medium text-purple-600 hover:text-purple-500">
                Sign up
            </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
