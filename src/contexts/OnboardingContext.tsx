import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  id: number;
  page: "login" | "dashboard" | "groups" | "profile";
  title: string;
  description: string;
  buttonText: string;
  targetElement?: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  autoNavigate?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  // Login Page
  {
    id: 1,
    page: "login",
    title: "👋 Welcome to Quantum!",
    description: "Use these demo credentials to log in and start exploring.\n\nEmail: demo@quantum.ai\nPassword: demo123",
    buttonText: "Got it!",
    targetElement: "login-form",
    position: "bottom",
  },
  // Dashboard Page
  {
    id: 2,
    page: "dashboard",
    title: "🎯 Set Your Goal",
    description: "Set your financial goal here — Quantum tracks your progress and alerts you when you're close!",
    buttonText: "Got it!",
    targetElement: "goal-card",
    position: "left",
  },
  {
    id: 3,
    page: "dashboard",
    title: "💰 Current Balance",
    description: "Your current balance updates automatically with every transaction. Watch it change in real time!",
    buttonText: "Got it!",
    targetElement: "balance-card",
    position: "bottom",
  },
  {
    id: 4,
    page: "dashboard",
    title: "📝 Manual Transactions",
    description: "Add income or expenses manually here. Dummy transactions run every 2–3 seconds to simulate real-time flow.",
    buttonText: "Got it!",
    targetElement: "manual-transaction-card",
    position: "left",
  },
  {
    id: 5,
    page: "dashboard",
    title: "🤖 AI Insights",
    description: "Quantum generates helpful insights here after each transaction — like a personal financial coach.",
    buttonText: "Got it!",
    targetElement: "ai-insight-box",
    position: "top",
  },
  {
    id: 6,
    page: "dashboard",
    title: "🧭 Navigate",
    description: "Navigate to 'Groups' to see collaborative savings or 'Profile' to view your rank and badges.",
    buttonText: "Next ➜",
    targetElement: "navigation",
    position: "bottom",
    autoNavigate: "/groups",
  },
  // Groups Page
  {
    id: 7,
    page: "groups",
    title: "👥 Savings Groups",
    description: "Each card shows a savings group — like a trip or event — and members' progress bars.",
    buttonText: "Got it!",
    targetElement: "group-cards",
    position: "top",
  },
  {
    id: 8,
    page: "groups",
    title: "➕ Create Your Group",
    description: "Create your own group goal! Set a total budget — Quantum splits it evenly among members.",
    buttonText: "Next ➜",
    targetElement: "create-group-button",
    position: "bottom",
    autoNavigate: "/profile",
  },
  // Profile Page
  {
    id: 9,
    page: "profile",
    title: "👤 Your Dashboard",
    description: "Your personal dashboard — view balance, activity, and achievements.",
    buttonText: "Got it!",
    targetElement: "profile-info",
    position: "bottom",
  },
  {
    id: 10,
    page: "profile",
    title: "🏅 Earn Badges",
    description: "Earn badges and rise on the leaderboard as you save consistently!",
    buttonText: "Got it!",
    targetElement: "badges-section",
    position: "top",
  },
  {
    id: 11,
    page: "profile",
    title: "🎉 Tour Complete!",
    description: "You've completed the Quantum tour! Enjoy your AI-powered financial journey 🚀",
    buttonText: "Start Using Quantum",
    position: "center",
  },
];

interface OnboardingContextType {
  currentStep: number;
  isOnboarding: boolean;
  currentStepData: OnboardingStep | null;
  nextStep: () => void;
  skipOnboarding: () => void;
  startOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

export const OnboardingProvider = ({ children }: OnboardingProviderProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboarding, setIsOnboarding] = useState(false);

  useEffect(() => {
    const hasCompletedOnboarding = localStorage.getItem("quantum_onboarding_completed");
    console.log("🎯 Onboarding check:", { hasCompletedOnboarding, willStart: !hasCompletedOnboarding });
    if (!hasCompletedOnboarding) {
      setIsOnboarding(true);
      setCurrentStep(1);
      console.log("🚀 Starting onboarding - Step 1");
    }
  }, []);

  const currentStepData = ONBOARDING_STEPS.find(step => step.id === currentStep) || null;

  const nextStep = () => {
    const nextStepId = currentStep + 1;
    const nextStepData = ONBOARDING_STEPS.find(step => step.id === nextStepId);

    if (!nextStepData) {
      // Onboarding complete
      setIsOnboarding(false);
      localStorage.setItem("quantum_onboarding_completed", "true");
      return;
    }

    setCurrentStep(nextStepId);

    // Auto-navigate if specified
    if (currentStepData?.autoNavigate) {
      setTimeout(() => {
        navigate(currentStepData.autoNavigate!);
      }, 300);
    }
  };

  const skipOnboarding = () => {
    setIsOnboarding(false);
    localStorage.setItem("quantum_onboarding_completed", "true");
  };

  const startOnboarding = () => {
    localStorage.removeItem("quantum_onboarding_completed");
    setIsOnboarding(true);
    setCurrentStep(1);
    navigate("/");
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboarding,
        currentStepData,
        nextStep,
        skipOnboarding,
        startOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
