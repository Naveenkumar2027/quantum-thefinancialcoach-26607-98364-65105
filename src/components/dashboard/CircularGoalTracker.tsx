import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface CircularGoalTrackerProps {
  currentBalance: number;
  goal: number;
}

const CircularGoalTracker = ({ currentBalance, goal }: CircularGoalTrackerProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.min((currentBalance / goal) * 100, 100);
  const difference = currentBalance - goal;
  const isAboveGoal = currentBalance > goal;
  const isNearGoal = currentBalance <= goal + 200 && currentBalance > goal;
  
  useEffect(() => {
    if (percentage >= 90 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [percentage]);

  const getStatusColor = () => {
    if (isAboveGoal) return "stroke-emerald-500";
    if (isNearGoal) return "stroke-amber-500";
    return "stroke-red-500";
  };

  const getStatusIcon = () => {
    if (isAboveGoal) return <TrendingUp className="w-5 h-5 text-emerald-500" />;
    if (isNearGoal) return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    return <TrendingDown className="w-5 h-5 text-red-500" />;
  };

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center space-y-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "50%",
                backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"][Math.floor(Math.random() * 4)]
              }}
              initial={{ y: 0, opacity: 1 }}
              animate={{ 
                y: [-20, 100],
                x: [0, Math.random() * 100 - 50],
                opacity: [1, 0],
                rotate: Math.random() * 360
              }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </div>
      )}

      {/* Circular Progress */}
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-accent"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="70"
            strokeWidth="12"
            fill="none"
            className={getStatusColor()}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {getStatusIcon()}
          </motion.div>
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {percentage.toFixed(0)}%
          </motion.div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="bg-white/60 backdrop-blur rounded-lg p-3 border border-black/10 text-center">
          <div className="text-xs text-muted-foreground mb-1">Current</div>
          <div className="text-sm font-bold">₹{currentBalance.toLocaleString()}</div>
        </div>
        <div className="bg-white/60 backdrop-blur rounded-lg p-3 border border-black/10 text-center">
          <div className="text-xs text-muted-foreground mb-1">Goal</div>
          <div className="text-sm font-bold text-primary">₹{goal.toLocaleString()}</div>
        </div>
      </div>

      {/* Difference */}
      <div className={`text-sm font-medium ${isAboveGoal ? 'text-emerald-500' : 'text-red-500'}`}>
        {isAboveGoal ? '+' : '-'}₹{Math.abs(difference).toLocaleString()} {isAboveGoal ? 'above' : 'below'} goal
      </div>
    </div>
  );
};

export default CircularGoalTracker;
