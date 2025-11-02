import React from 'react';
import { SparkleIcon, SunIcon, MoonIcon } from './DoodleIcons';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onNewPost: () => void;
  onHome: () => void;
  onLogout: () => void;
  onAdmin: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onNewPost, onHome, onLogout, onAdmin }) => {
  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={onHome}
        >
          <SparkleIcon className="w-8 h-8 text-pink-400 group-hover:text-pink-500 transition-colors" />
          <h1 className="font-pacifico text-2xl md:text-3xl text-gray-700 group-hover:text-gray-900 transition-colors">
            Daily Thoughts
          </h1>
          <SunIcon className="w-6 h-6 text-amber-400 hidden sm:block group-hover:text-amber-500 transition-colors" />
        </div>
        <div className="flex items-center gap-4">
           <MoonIcon className="w-6 h-6 text-indigo-400 hidden sm:block" />
          {user ? (
            <>
              <span className="text-gray-600 hidden md:inline">Welcome, {user.username}!</span>
              {user.role === 'admin' && (
                 <button onClick={onAdmin} className="font-semibold text-purple-600 hover:text-purple-800 transition-colors">
                  Admin
                </button>
              )}
              <button
                onClick={onNewPost}
                className="bg-fuchsia-400 hover:bg-fuchsia-500 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Write Post
              </button>
               <button onClick={onLogout} className="font-semibold text-gray-600 hover:text-gray-800 transition-colors">
                Logout
              </button>
            </>
          ) : (
            // FIX: The expression `({/* ... */})` evaluates to an empty object, which is not a valid ReactNode.
            // Returning `null` renders nothing, which is the desired behavior for the "else" case here.
            null
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
