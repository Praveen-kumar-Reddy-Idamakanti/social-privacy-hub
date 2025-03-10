
/**
 * Utility functions for downloading privacy data
 */

/**
 * Generate a JSON file and trigger download
 */
export const downloadPrivacyData = (platform: string, data: any) => {
  // Format the data for download
  const exportData = {
    platform,
    exportDate: new Date().toISOString(),
    privacySettings: data
  };
  
  // Convert to JSON string
  const jsonString = JSON.stringify(exportData, null, 2);
  
  // Create a blob
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${platform}-privacy-data-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Get dummy privacy data based on platform
 */
export const getPlatformPrivacyData = (platform: string) => {
  // This would come from an API in a real application
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
