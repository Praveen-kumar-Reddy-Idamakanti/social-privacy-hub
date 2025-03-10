import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Shield, Bell, Moon, HelpCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: '/api/placeholder/40/40', // Placeholder avatar
    role: 'Premium User',
    joinDate: 'Member since June 2023'
  };

  useEffect(() => {
    // Handle clicks outside the component to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
    // In a real app, you would handle the actual logout process here
    onClose();
    navigate('/'); // Navigate to login page
  };

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast({
      title: `${!darkMode ? 'Dark' : 'Light'} mode activated`,
      description: `Application theme has been changed to ${!darkMode ? 'dark' : 'light'} mode.`
    });
    // In a real app, you would implement the actual theme switching here
  };

  return (
    <div 
      ref={menuRef}
      className="absolute top-14 right-4 w-72 bg-white rounded-xl shadow-elevation-3 overflow-hidden border border-gray-100 animate-scale-in z-50"
    >
      {/* User info section */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}{user.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{user.name}</h4>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">{user.role}</span>
          <p className="text-xs text-gray-500 mt-1">{user.joinDate}</p>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-2">
        <button 
          onClick={() => handleNavigate('/profile')}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Profile Settings</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button 
          onClick={() => handleNavigate('/privacy')}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Shield className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Privacy Dashboard</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>

        <button 
          onClick={() => handleNavigate('/notifications')}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Bell className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Notifications</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-5 h-5 bg-primary rounded-full text-white text-xs font-medium">3</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </button>

        <div className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center space-x-3">
            <Moon className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Dark Mode</span>
          </div>
          <Switch
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            className="data-[state=checked]:bg-primary"
          />
        </div>

        <button 
          onClick={() => handleNavigate('/help')}
          className="w-full px-4 py-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Help & Support</span>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Logout section */}
      <div className="p-2 border-t border-gray-100">
        <button 
          onClick={handleLogout}
          className="w-full px-4 py-2 flex items-center space-x-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
};
export default UserProfile ;