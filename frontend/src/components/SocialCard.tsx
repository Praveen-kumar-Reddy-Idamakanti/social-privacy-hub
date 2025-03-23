
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Shield, Lock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type SocialPlatform = 'facebook' | 'twitter' | 'instagram';

interface SocialCardProps {
  platform: SocialPlatform;
  connected: boolean;
  privacyScore: number;
  issues?: number;
  delay?: number;
}

const SocialCard: React.FC<SocialCardProps> = ({ 
  platform, 
  connected, 
  privacyScore,
  issues = 0,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const getPlatformIcon = () => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="h-6 w-6 text-facebook" />;
      case 'twitter':
        return <Twitter className="h-6 w-6 text-twitter" />;
      case 'instagram':
        return <Instagram className="h-6 w-6 text-instagram" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };
  
  const getPlatformName = () => {
    switch (platform) {
      case 'facebook':
        return 'Facebook';
      case 'twitter':
        return 'Twitter';
      case 'instagram':
        return 'Instagram';
      default:
        return 'Unknown';
    }
  };
  
  const getPlatformColor = () => {
    switch (platform) {
      case 'facebook':
        return 'bg-blue-50';
      case 'twitter':
        return 'bg-sky-50';
      case 'instagram':
        return 'bg-pink-50';
      default:
        return 'bg-gray-50';
    }
  };
  
  const getPrivacyIndicator = () => {
    if (privacyScore >= 80) {
      return <div className="flex items-center space-x-2 text-green-600"><Lock className="h-4 w-4" /><span>Secure</span></div>;
    } else if (privacyScore >= 50) {
      return <div className="flex items-center space-x-2 text-yellow-600"><Shield className="h-4 w-4" /><span>Moderate</span></div>;
    } else {
      return <div className="flex items-center space-x-2 text-red-600"><Shield className="h-4 w-4" /><span>Vulnerable</span></div>;
    }
  };
  
  const handleClick = () => {
    navigate(`/platform/${platform}`);
  };
  
  return (
    <div 
      className={cn(
        "relative w-full bg-white rounded-2xl p-6 transition-all duration-500 overflow-hidden",
        "shadow-elevation-1 hover:shadow-elevation-3",
        "animate-slide-up",
        isHovered ? "transform scale-[1.02]" : "",
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={cn(
        "absolute top-0 left-0 h-1 transition-all duration-500",
        platform === 'facebook' ? "bg-facebook" : "",
        platform === 'twitter' ? "bg-twitter" : "",
        platform === 'instagram' ? "bg-instagram" : "",
        isHovered ? "w-full" : "w-1/3"
      )} />
      
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={cn("p-3 rounded-xl", getPlatformColor())}>
            {getPlatformIcon()}
          </div>
          <div>
            <h3 className="text-lg font-medium">{getPlatformName()}</h3>
            <div className="mt-1 text-sm">
              {connected ? (
                getPrivacyIndicator()
              ) : (
                <span className="text-gray-500">Not connected</span>
              )}
            </div>
          </div>
        </div>
        
        <ChevronRight className={cn(
          "h-5 w-5 text-gray-400 transition-transform duration-300",
          isHovered ? "transform translate-x-1" : ""
        )} />
      </div>
      
      {connected && issues > 0 && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg text-sm text-red-800 flex items-center space-x-2">
          <span className="font-medium">{issues} privacy {issues === 1 ? 'issue' : 'issues'} detected</span>
        </div>
      )}
      
      {connected && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className={cn(
                "h-1.5 rounded-full",
                privacyScore >= 80 ? "bg-green-500" : "",
                privacyScore >= 50 && privacyScore < 80 ? "bg-yellow-500" : "",
                privacyScore < 50 ? "bg-red-500" : ""
              )} 
              style={{ width: `${privacyScore}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Privacy Score</span>
            <span>{privacyScore}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialCard;
