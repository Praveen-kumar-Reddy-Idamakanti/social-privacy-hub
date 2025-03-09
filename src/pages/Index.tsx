
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SocialCard from '@/components/SocialCard';
import { Shield, RefreshCw, AlertCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  downloadPrivacyData, 
  getPlatformPrivacyData, 
  loadAllPlatformsData,
  savePrivacySettings,
  Platform
} from '@/utils/downloadUtils';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [platformsData, setPlatformsData] = useState<Platform[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [issuesCount, setIssuesCount] = useState(0);
  const [savingData, setSavingData] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPlatformsData();
  }, []);

  const loadPlatformsData = async () => {
    setLoading(true);
    
    try {
      const response = await loadAllPlatformsData();
      
      if (response.success) {
        if (response.platforms) {
          setPlatformsData(response.platforms);
          
          const totalScore = response.platforms.reduce((sum, platform) => 
            sum + (platform.connected ? platform.privacyScore : 0), 0);
          const connectedPlatforms = response.platforms.filter(platform => platform.connected).length;
          const avgScore = connectedPlatforms > 0 ? Math.round(totalScore / connectedPlatforms) : 0;
          
          const totalIssues = response.platforms.reduce((sum, platform) => 
            sum + (platform.issues || 0), 0);
          
          setOverallScore(avgScore);
          setIssuesCount(totalIssues);
        }
      } else {
        toast({
          title: "Error loading data",
          description: "Could not load platform data from the server.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error loading platforms data:", error);
      toast({
        title: "Error loading data",
        description: "There was a problem connecting to the server.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadAll = () => {
    toast({
      title: "Downloading all data",
      description: "Preparing downloads for all connected platforms...",
    });
    
    setTimeout(() => {
      platformsData.forEach(platform => {
        if (platform.connected) {
          const data = getPlatformPrivacyData(platform.id);
          downloadPrivacyData(platform.id, data);
        }
      });
    }, 1000);
  };

  const handleRefresh = async () => {
    toast({
      title: "Refreshing privacy data",
      description: "Syncing with your connected platforms...",
    });
    
    await loadPlatformsData();
    
    toast({
      title: "Privacy data updated",
      description: "All your privacy information is now up to date.",
    });
  };

  const handleSaveChanges = async () => {
    setSavingData(true);
    try {
      for (const platform of platformsData) {
        if (platform.connected) {
          const settings = getPlatformPrivacyData(platform.id);
          await savePrivacySettings(platform.id, settings);
        }
      }
      
      toast({
        title: "Changes saved",
        description: "Your privacy settings have been saved to the server.",
      });
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error saving changes",
        description: "There was a problem saving your changes to the server.",
        variant: "destructive"
      });
    } finally {
      setSavingData(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto px-4 pt-24 pb-16">
        <div className="animate-fade-in">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-medium tracking-tight">Privacy Dashboard</h1>
              <p className="mt-2 text-muted-foreground">
                Manage privacy settings across all your social media accounts in one place.
              </p>
            </div>
            <div>
              <Button 
                variant="default"
                onClick={handleSaveChanges}
                disabled={savingData}
                className="ml-2"
              >
                {savingData ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1 lg:col-span-2 animate-scale-in">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Overall Privacy</h2>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleDownloadAll}
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download All</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleRefresh}
                    disabled={loading}
                    className="flex items-center space-x-2"
                  >
                    {loading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4" />
                    )}
                    <span>Refresh</span>
                  </Button>
                </div>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <RefreshCw className="h-10 w-10 text-primary animate-spin" />
                  <p className="mt-4 text-muted-foreground">Analyzing your privacy settings...</p>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-6">
                    <div>
                      <span className="text-sm text-muted-foreground">Privacy Score</span>
                      <h3 className={`text-5xl font-medium mt-1 ${getScoreColor(overallScore)}`}>
                        {overallScore}%
                      </h3>
                    </div>
                    
                    {issuesCount > 0 && (
                      <div className="mt-4 md:mt-0 bg-red-50 rounded-lg px-4 py-3 flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-red-800">
                            {issuesCount} privacy {issuesCount === 1 ? 'issue' : 'issues'} detected
                          </p>
                          <p className="text-sm text-red-600 mt-1">
                            We recommend addressing these issues to improve your privacy.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Progress 
                    value={overallScore} 
                    max={100}
                    className={`h-2 ${getProgressColor(overallScore)}`}
                  />
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Connected</p>
                      <p className="text-2xl font-medium mt-1">
                        {platformsData.filter(p => p.connected).length}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Private Settings</p>
                      <p className="text-2xl font-medium mt-1">
                        7
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Public Settings</p>
                      <p className="text-2xl font-medium mt-1">
                        5
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-elevation-1 animate-scale-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-xl font-medium mb-6">Privacy Tips</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Use strong, unique passwords</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Create different passwords for each social account.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-800">Enable two-factor authentication</h3>
                  <p className="text-sm text-purple-600 mt-1">
                    Add an extra layer of security to your accounts.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-800">Regularly review app permissions</h3>
                  <p className="text-sm text-green-600 mt-1">
                    Check what third-party apps can access.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Social Platforms</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {platformsData.map((platform, index) => (
                <SocialCard
                  key={platform.id}
                  platform={platform.id as any}
                  connected={platform.connected}
                  privacyScore={platform.privacyScore}
                  issues={platform.issues}
                  delay={index * 100}
                />
              ))}
              
              <div 
                className="w-full bg-white bg-opacity-50 backdrop-blur-sm border border-dashed border-gray-300 rounded-2xl p-6 flex flex-col items-center justify-center space-y-4 hover:border-primary transition-all duration-300 cursor-pointer animate-slide-up"
                style={{ animationDelay: '300ms' }}
              >
                <div className="p-3 rounded-full bg-gray-100">
                  <Shield className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-600">Add Platform</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Connect another social media account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
