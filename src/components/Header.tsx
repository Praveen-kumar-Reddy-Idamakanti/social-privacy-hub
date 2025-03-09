
import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="w-full px-8 py-4 flex items-center justify-between bg-white bg-opacity-70 backdrop-blur-lg border-b border-gray-100 fixed top-0 z-50 animate-fade-in">
      <div className="flex items-center">
        <button 
          onClick={() => navigate('/')}
          className="text-xl font-medium tracking-tight hover:text-primary transition-colors"
        >
          Privacy Hub
        </button>
      </div>
      
      <div className="flex items-center space-x-6">
        <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
          <Search className="h-5 w-5 text-gray-500" />
        </button>
        <button className="rounded-full p-2 hover:bg-gray-100 transition-colors">
          <Bell className="h-5 w-5 text-gray-500" />
        </button>
        <button className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors">
          <User className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
