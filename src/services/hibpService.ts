
interface BreachData {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  LogoPath: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  IsMalware: boolean;
}

interface HIBPCheckResult {
  email: string;
  isBreached: boolean;
  breaches: BreachData[];
  error?: string;
}

export const checkEmailBreach = async (email: string): Promise<HIBPCheckResult> => {
  try {
    // Using the free HIBP API (rate limited)
    const response = await fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Social Privacy Hub'
      }
    });

    if (response.status === 404) {
      // No breaches found
      return {
        email,
        isBreached: false,
        breaches: []
      };
    }

    if (response.status === 429) {
      // Rate limited
      return {
        email,
        isBreached: false,
        breaches: [],
        error: 'Rate limited. Please try again later.'
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const breaches: BreachData[] = await response.json();
    
    return {
      email,
      isBreached: breaches.length > 0,
      breaches
    };
  } catch (error) {
    console.error('Error checking email breach:', error);
    return {
      email,
      isBreached: false,
      breaches: [],
      error: 'Failed to check email. Please try again.'
    };
  }
};
