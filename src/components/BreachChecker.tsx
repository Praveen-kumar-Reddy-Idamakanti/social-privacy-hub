
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldAlert, ShieldCheck, Search, AlertTriangle } from 'lucide-react';
import { checkEmailBreach } from '@/services/hibpService';
import { useToast } from '@/hooks/use-toast';

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

const BreachChecker = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HIBPCheckResult | null>(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const checkResult = await checkEmailBreach(email);
      setResult(checkResult);
      
      if (checkResult.error) {
        toast({
          title: "Check failed",
          description: checkResult.error,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Check completed",
          description: checkResult.isBreached 
            ? `Found ${checkResult.breaches.length} breach(es)` 
            : "No breaches found",
          variant: checkResult.isBreached ? "destructive" : "default"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Have I Been Pwned?</span>
        </CardTitle>
        <CardDescription>
          Check if your email address has been compromised in a data breach
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
          />
          <Button 
            onClick={handleCheck} 
            disabled={loading || !email}
            className="flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>{loading ? 'Checking...' : 'Check'}</span>
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            {result.error ? (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{result.error}</AlertDescription>
              </Alert>
            ) : (
              <>
                <Alert variant={result.isBreached ? "destructive" : "default"}>
                  {result.isBreached ? (
                    <ShieldAlert className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    {result.isBreached 
                      ? `Your email was found in ${result.breaches.length} data breach${result.breaches.length > 1 ? 'es' : ''}`
                      : 'Good news! Your email was not found in any data breaches'
                    }
                  </AlertDescription>
                </Alert>

                {result.breaches.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Breach Details:</h4>
                    {result.breaches.map((breach, index) => (
                      <Card key={index} className="border-red-200">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-red-800">{breach.Title}</h5>
                            <div className="flex space-x-1">
                              {breach.IsVerified && (
                                <Badge variant="destructive" className="text-xs">Verified</Badge>
                              )}
                              {breach.IsSensitive && (
                                <Badge variant="outline" className="text-xs">Sensitive</Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <p><strong>Date:</strong> {formatDate(breach.BreachDate)}</p>
                            <p><strong>Affected accounts:</strong> {formatNumber(breach.PwnCount)}</p>
                            <p><strong>Domain:</strong> {breach.Domain}</p>
                            
                            {breach.DataClasses.length > 0 && (
                              <div>
                                <p className="font-medium mb-1">Compromised data:</p>
                                <div className="flex flex-wrap gap-1">
                                  {breach.DataClasses.map((dataClass, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {dataClass}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <p 
                              className="text-xs mt-2"
                              dangerouslySetInnerHTML={{ 
                                __html: breach.Description.replace(/<[^>]*>/g, '') 
                              }}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-4">
          <p>This service uses the Have I Been Pwned API to check for data breaches.</p>
          <p>No passwords are stored or transmitted - only email addresses are checked.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreachChecker;
