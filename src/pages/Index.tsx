import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center relative overflow-hidden">
      {/* Floating orb accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/12 rounded-full filter blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/12 rounded-full filter blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="text-center animate-fade-in space-y-8 px-4 relative z-10">
        <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent tracking-tighter leading-none drop-shadow-[0_4px_20px_rgba(69,167,255,0.15)]">
          Quantum
        </h1>
        <p className="text-xl md:text-2xl text-foreground/70 max-w-md mx-auto tracking-tight font-light">
          Your intelligent financial coach.
        </p>
        <Button 
          size="lg" 
          className="mt-8 text-lg px-10 py-7 text-base font-semibold"
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
