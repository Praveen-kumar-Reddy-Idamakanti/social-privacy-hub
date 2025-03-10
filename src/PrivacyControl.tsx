//PrivacyControl.tsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Info } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PrivacyControlProps {
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  impact: 'high' | 'medium' | 'low';
  delay?: number;
}

const PrivacyControl: React.FC<PrivacyControlProps> = ({
  title,
  description,
  enabled,
  onChange,
  impact,
  delay = 0
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const getImpactColor = () => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getImpactLabel = () => {
    switch (impact) {
      case 'high':
        return 'High Impact';
      case 'medium':
        return 'Medium Impact';
      case 'low':
        return 'Low Impact';
      default:
        return 'Unknown Impact';
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl p-5 border border-gray-100 transition-all duration-500",
        "opacity-0 transform translate-y-4",
        isAnimated && "opacity-100 transform translate-y-0",
        "hover:shadow-elevation-1"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium">{title}</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="inline-flex">
                    <Info className="h-4 w-4 text-gray-400" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="w-64 p-3">
                  <p className="text-sm">{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center mt-1.5 space-x-3">
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full font-medium",
              getImpactColor()
            )}>
              {getImpactLabel()}
            </span>
            <div className="flex items-center text-xs text-gray-500">
              {enabled ? (
                <div className="flex items-center space-x-1">
                  <EyeOff className="h-3 w-3" />
                  <span>Private</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>Public</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <Switch 
          checked={enabled} 
          onCheckedChange={onChange}
          className="data-[state=checked]:bg-primary"
        />
      </div>
    </div>
  );
};

export default PrivacyControl;
