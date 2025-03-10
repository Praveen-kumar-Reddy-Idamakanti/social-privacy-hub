//Platoform.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Facebook, Twitter, Instagram, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import PrivacyControl from './PrivacyControl';
import { useToast } from '@/hooks/use-toast';

interface PlatformData {
  name: string;
  icon: React.ReactNode;
  color: string;
  privacyScore: number;
  isConnected: boolean;
  controls: {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    impact: 'high' | 'medium' | 'low';
  }[];
}

const platformsData: Record<string, PlatformData> = {
  facebook: {
    name: 'Facebook',
    icon: <Facebook className="h-6 w-6 text-facebook" />,
    color: 'facebook',
    privacyScore: 65,
    isConnected: true,
    controls: [
      {
        id: 'fb-profile-visibility',
        title: 'Profile Visibility',
        description: 'Control who can see your profile information, including your name, profile picture, and cover photo.',
        enabled: true,
        impact: 'high'
      },
      {
        id: 'fb-post-visibility',
        title: 'Post Privacy',
        description: 'Control who can see your posts, including photos, videos, and status updates.',
        enabled: false,
        impact: 'high'
      },
      {
        id: 'fb-friend-list',
        title: 'Friend List Visibility',
        description: 'Control who can see your friend list.',
        enabled: true,
        impact: 'medium'
      },
      {
        id: 'fb-tagging',
        title: 'Tagging Controls',
        description: 'Control who can tag you in posts and who can see posts you\'re tagged in.',
        enabled: true,
        impact: 'medium'
      },
      {
        id: 'fb-ads',
        title: 'Ad Preferences',
        description: 'Control what information is used to show you ads.',
        enabled: false,
        impact: 'low'
      }
    ]
  },
  twitter: {
    name: 'Twitter',
    icon: <Twitter className="h-6 w-6 text-twitter" />,
    color: 'twitter',
    privacyScore: 85,
    isConnected: true,
    controls: [
      {
        id: 'tw-tweet-privacy',
        title: 'Tweet Privacy',
        description: 'Control who can see your tweets.',
        enabled: true,
        impact: 'high'
      },
      {
        id: 'tw-direct-messages',
        title: 'Direct Message Privacy',
        description: 'Control who can send you direct messages.',
        enabled: true,
        impact: 'high'
      },
      {
        id: 'tw-location',
        title: 'Location Information',
        description: 'Control whether your tweets include precise location information.',
        enabled: true,
        impact: 'medium'
      },
      {
        id: 'tw-discoverability',
        title: 'Discoverability',
        description: 'Control whether people can find you using your email address or phone number.',
        enabled: false,
        impact: 'medium'
      },
      {
        id: 'tw-data-sharing',
        title: 'Data Sharing',
        description: 'Control how Twitter shares your data with business partners.',
        enabled: true,
        impact: 'low'
      }
    ]
  },
  instagram: {
    name: 'Instagram',
    icon: <Instagram className="h-6 w-6 text-instagram" />,
    color: 'instagram',
    privacyScore: 40,
    isConnected: true,
    controls: [
      {
        id: 'ig-account-privacy',
        title: 'Account Privacy',
        description: 'Control whether your account is public or private.',
        enabled: false,
        impact: 'high'
      },
      {
        id: 'ig-story-sharing',
        title: 'Story Sharing',
        description: 'Control who can see and share your stories.',
        enabled: true,
        impact: 'high'
      },
      {
        id: 'ig-activity-status',
        title: 'Activity Status',
        description: 'Control whether other users can see when you\'re active on Instagram.',
        enabled: false,
        impact: 'medium'
      },
      {
        id: 'ig-tagged-photos',
        title: 'Tagged Photos',
        description: 'Control whether photos you\'re tagged in appear on your profile.',
        enabled: true,
        impact: 'medium'
      },
      {
        id: 'ig-data-download',
        title: 'Data Download',
        description: 'Control what data Instagram can download about you.',
        enabled: false,
        impact: 'low'
      }
    ]
  }
};

const PlatformPage: React.FC = () => {
  const { platform = '' } = useParams<{ platform: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [platformControls, setPlatformControls] = useState<typeof platformsData[keyof typeof platformsData]['controls']>([]);
  const [currentPlatform, setCurrentPlatform] = useState<PlatformData | null>(null);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    setTimeout(() => {
      if (platform in platformsData) {
        setCurrentPlatform(platformsData[platform]);
        setPlatformControls([...platformsData[platform].controls]);
      }
      setIsLoading(false);
    }, 1000);
  }, [platform]);

  const handlePrivacyToggle = (controlId: string, enabled: boolean) => {
    // Update the local state
    setPlatformControls(controls => 
      controls.map(control => 
        control.id === controlId ? { ...control, enabled } : control
      )
    );
    
    // Show a toast notification
    toast({
      title: "Privacy setting updated",
      description: `Your changes have been saved.`,
    });
    
    // In a real app, you would send an API request to update the setting
    console.log(`Updated ${controlId} to ${enabled}`);
  };

  const handleRefreshSettings = () => {
    setIsLoading(true);
    
    // Simulate refreshing data from the platform
    setTimeout(() => {
      toast({
        title: "Settings refreshed",
        description: `Latest privacy settings have been loaded from ${currentPlatform?.name}.`,
      });
      setIsLoading(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin">
            <RefreshCw className="h-8 w-8 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading privacy settings...</p>
        </div>
      </div>
    );
  }

  if (!currentPlatform) {
    return (
      <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16 min-h-screen">
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <Shield className="h-16 w-16 text-gray-300" />
          <h2 className="text-2xl font-medium">Platform not found</h2>
          <p className="text-muted-foreground">We couldn't find the platform you're looking for.</p>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 pt-24 pb-16 min-h-screen">
      <div className="flex items-center space-x-2 mb-8 animate-fade-in">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/')}
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>
      
      <div className="bg-white rounded-2xl p-8 shadow-elevation-1 animate-scale-in">
        <div className="flex items-center space-x-4">
          <div className={cn(
            "p-4 rounded-xl",
            platform === 'facebook' ? "bg-blue-50" : "",
            platform === 'twitter' ? "bg-sky-50" : "",
            platform === 'instagram' ? "bg-pink-50" : ""
          )}>
            {currentPlatform.icon}
          </div>
          <div>
            <h1 className="text-2xl font-medium">{currentPlatform.name} Privacy</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className={cn(
                "font-medium",
                getScoreColor(currentPlatform.privacyScore)
              )}>
                Privacy Score: {currentPlatform.privacyScore}%
              </span>
            </div>
          </div>
          <div className="ml-auto">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center space-x-2"
              onClick={handleRefreshSettings}
              disabled={isLoading}
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh Settings</span>
            </Button>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="grid grid-cols-1 gap-4">
          <h2 className="text-lg font-medium mb-2">Privacy Controls</h2>
          {platformControls.map((control, index) => (
            <PrivacyControl
              key={control.id}
              title={control.title}
              description={control.description}
              enabled={control.enabled}
              onChange={(enabled) => handlePrivacyToggle(control.id, enabled)}
              impact={control.impact}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
