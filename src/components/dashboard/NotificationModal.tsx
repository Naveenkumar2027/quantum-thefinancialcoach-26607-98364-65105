import { useEffect } from "react";
import { X } from "lucide-react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  overspendAmount: number;
  currentBalance: number;
  goal: number;
}

const NotificationModal = ({ isOpen, onClose, overspendAmount, currentBalance, goal }: NotificationModalProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Translucent backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal card with enhanced animations */}
      <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl shadow-[0_20px_80px_rgba(2,6,23,0.2)] max-w-md w-full p-8 animate-[fade-in_0.3s_ease-out,scale-in_0.2s_ease-out] border border-black/5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-all hover:scale-110 hover:rotate-90 duration-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="text-6xl animate-[scale-in_0.5s_ease-out]">😬</div>
            <h3 className="text-2xl font-bold text-foreground animate-slide-in tracking-tight">
              Careful! You're nearing your savings goal.
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              You're ₹{Math.abs(overspendAmount).toLocaleString()} away from your goal — you've come so far, don't stop now! 💪
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur rounded-xl p-4 space-y-3 border border-black/10">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Current Balance:</span>
              <span className="font-bold text-lg text-primary">₹{currentBalance.toLocaleString()}</span>
            </div>
            <div className="w-full h-px bg-border/50" />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Your Goal:</span>
              <span className="font-bold text-lg text-foreground">₹{goal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-brand-gradient text-white hover:scale-[1.02] hover-glow active:scale-95 rounded-2xl py-3 px-6 font-semibold transition-all duration-200"
          >
            Got it! I'll be careful 🎯
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
