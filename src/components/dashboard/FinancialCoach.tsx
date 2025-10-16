import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

interface FinancialCoachProps {
  currentBalance: number;
  goal: number;
}

const FinancialCoach = ({ currentBalance, goal }: FinancialCoachProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const messages = [
    "Hey! You're doing great! Keep up the savings momentum! 💪",
    "Remember: Every small save adds up to big dreams! 🌟",
    `You're ${goal > 0 ? Math.round((currentBalance / goal) * 100) : 0}% close to your goal 🎯 — stay strong!`,
    "Oops 😅 you're nearing your goal limit. Maybe pause big spends for a few days?",
    "Smart saver! You're making excellent progress today! 🚀",
    "Pro tip: Track every rupee, save every day! 💡",
    "You've got this! Your future self will thank you! 🙏",
    "Great job staying on track! Keep that discipline going! 💎",
    "Financial freedom is just consistent saving away! 🎊",
    "Nice! You're building wealth one transaction at a time! 📈",
  ];

  useEffect(() => {
    const showCoach = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setMessage(randomMessage);
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Initial delay before first message
    const initialTimeout = setTimeout(() => {
      showCoach();
    }, 10000);

    // Random interval between 30-60 seconds
    const interval = setInterval(() => {
      showCoach();
    }, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [currentBalance, goal]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-brand-gradient text-white rounded-2xl shadow-[0_20px_60px_rgba(69,167,255,0.3)] p-5 relative border border-white/10">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
              <div className="flex-1 pr-4">
                <h4 className="font-bold text-sm mb-1">Financial Coach 🎓</h4>
                <p className="text-sm leading-relaxed">{message}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinancialCoach;
