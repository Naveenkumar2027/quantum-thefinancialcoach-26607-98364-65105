import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const ResetOnboardingButton = () => {
  const handleReset = () => {
    localStorage.removeItem("quantum_onboarding_completed");
    window.location.href = "/";
  };

  return (
    <Button
      onClick={handleReset}
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 z-50 gap-2 shadow-lg"
    >
      <RotateCcw className="w-4 h-4" />
      Reset Tour
    </Button>
  );
};

export default ResetOnboardingButton;
