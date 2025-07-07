
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Shield, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Test user credentials
  const TEST_USER = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate login validation
      if (email === TEST_USER.email && password === TEST_USER.password) {
        // Store user data in localStorage (simulating authentication)
        localStorage.setItem('auth_token', 'test-token-123');
        localStorage.setItem('user', JSON.stringify({
          id: '1',
          name: TEST_USER.name,
          email: TEST_USER.email,
          role: 'Standard User'
        }));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${TEST_USER.name}!`,
        });
        
        // Redirect to home page
        navigate('/');
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
      
      toast({
        title: "Login failed",
        description: err.message || 'Please check your credentials and try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestUserLogin = () => {
    setEmail(TEST_USER.email);
    setPassword(TEST_USER.password);
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold">Privacy Hub</h2>
          <p className="mt-2 text-gray-600">Take control of your digital privacy</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Log in to your account</CardTitle>
            <CardDescription>Enter your email and password to access your dashboard</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Log in</span>
                  </div>
                )}
              </Button>
            </form>
            
            <div className="mt-6 flex items-center justify-between">
              <div className="h-px bg-gray-200 flex-grow"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>
            
            <div className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-center space-x-2"
                onClick={handleTestUserLogin}
                disabled={isLoading}
              >
                <User className="h-4 w-4" />
                <span>Use Test User</span>
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Email: {TEST_USER.email} | Password: {TEST_USER.password}
              </p>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
        
        <p className="text-xs text-center text-gray-500">
          By logging in, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
