/**
 * Utility functions for downloading privacy data and backend integration
 */

/**
 * Interface for platform data
 */
export interface Platform {
  id: string;
  connected: boolean;
  privacyScore: number;
  issues: number;
}

/**
 * Interface for API responses
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  platforms?: Platform[];
}

/**
 * Generate a JSON file and trigger download
 */
export const downloadPrivacyData = (platform: string, data: any) => {
  const exportData = {
    platform,
    exportDate: new Date().toISOString(),
    privacySettings: data
  };
  
  const jsonString = JSON.stringify(exportData, null, 2);
  
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${platform}-privacy-data-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get dummy privacy data based on platform
 */
export const getPlatformPrivacyData = (platform: string) => {
  const commonSettings = {
    profileVisibility: "friends",
    dataSharing: "minimal",
    thirdPartyAccess: "restricted",
    adPersonalization: "limited"
  };
  
  switch (platform) {
    case 'facebook':
      return {
        ...commonSettings,
        locationSharing: "off",
        faceRecognition: "disabled",
        timeline: "friends-only",
        tagApproval: "enabled"
      };
    case 'twitter':
      return {
        ...commonSettings,
        directMessages: "followers-only",
        tweetVisibility: "public",
        locationTagging: "disabled",
        discoverability: "email-only"
      };
    case 'instagram':
      return {
        ...commonSettings,
        storySharing: "close-friends",
        activityStatus: "off",
        mentionAllowance: "followers",
        commentFiltering: "strict"
      };
    default:
      return commonSettings;
  }
};

/**
 * Save privacy settings to the backend
 */
export const savePrivacySettings = async (platform: string, settings: any): Promise<ApiResponse<any>> => {
  try {
    console.log(`Saving ${platform} privacy settings to backend:`, settings);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `${platform} privacy settings saved successfully` });
      }, 800);
    });
  } catch (error) {
    console.error(`Error saving ${platform} privacy settings:`, error);
    throw error;
  }
};

/**
 * Load privacy settings from the backend
 */
export const loadPrivacySettings = async (platform: string): Promise<ApiResponse<any>> => {
  try {
    console.log(`Loading ${platform} privacy settings from backend`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = getPlatformPrivacyData(platform);
        resolve({ success: true, data });
      }, 1000);
    });
  } catch (error) {
    console.error(`Error loading ${platform} privacy settings:`, error);
    throw error;
  }
};

/**
 * Load all platforms data from the backend
 */
export const loadAllPlatformsData = async (): Promise<ApiResponse<Platform[]>> => {
  try {
    console.log("Loading all platforms data from backend");
    
    return new Promise((resolve) => {
      setTimeout(() => {
        const platforms: Platform[] = [
          { 
            id: 'facebook',
            connected: true,
            privacyScore: 65,
            issues: 2
          },
          { 
            id: 'twitter',
            connected: true,
            privacyScore: 85,
            issues: 0
          },
          { 
            id: 'instagram',
            connected: true,
            privacyScore: 40,
            issues: 3
          }
        ];
        resolve({ success: true, platforms });
      }, 1200);
    });
  } catch (error) {
    console.error("Error loading all platforms data:", error);
    throw error;
  }
};
