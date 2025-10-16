import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { useOnboarding } from "@/contexts/OnboardingContext";

const Login = () => {
  const navigate = useNavigate();
  const { currentStep, nextStep } = useOnboarding();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto-advance to dashboard after step 1
  useEffect(() => {
    if (currentStep === 2) {
      // User just completed login onboarding, auto-navigate to dashboard
      navigate("/dashboard");
    }
  }, [currentStep, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "demo@quantum.ai" && password === "demo123") {
      toast({
        title: "Welcome to Quantum!",
        description: "Login successful",
      });
      // Move to next onboarding step instead of directly navigating
      if (currentStep === 1) {
        nextStep();
      } else {
        navigate("/dashboard");
      }
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please use demo@quantum.ai / demo123",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Quantum
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to your financial dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="demo@quantum.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="demo123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              Demo credentials: demo@quantum.ai / demo123
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
