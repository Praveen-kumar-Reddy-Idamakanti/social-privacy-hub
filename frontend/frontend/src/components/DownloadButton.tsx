
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadPrivacyData, getPlatformPrivacyData } from '@/utils/downloadUtils';
import { useToast } from '@/hooks/use-toast';

interface DownloadButtonProps {
  platform: string;
}

const DownloadButton = ({ platform }: DownloadButtonProps) => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    try {
      // Get the privacy data for the platform
      const privacyData = getPlatformPrivacyData(platform);
      
      // Trigger the download
      downloadPrivacyData(platform, privacyData);
      
      // Show success toast
      toast({
        title: "Download started",
        description: `Your ${platform} privacy data is being downloaded.`,
      });
    } catch (error) {
      // Show error toast
      toast({
        title: "Download failed",
        description: "There was an error downloading your privacy data.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Button 
      variant="outline"
      size="sm"
      onClick={handleDownload}
      className="flex items-center space-x-2"
    >
      <Download className="h-4 w-4" />
      <span>Download Data</span>
    </Button>
  );
};

export default DownloadButton;
