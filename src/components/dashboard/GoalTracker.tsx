import { TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

interface GoalTrackerProps {
  currentBalance: number;
  goal: number;
}

const GoalTracker = ({ currentBalance, goal }: GoalTrackerProps) => {
  const percentage = Math.min((currentBalance / goal) * 100, 100);
  const difference = currentBalance - goal;
  const isAboveGoal = currentBalance > goal;
  const isNearGoal = currentBalance <= goal + 200 && currentBalance > goal;
  
  const getStatusColor = () => {
    if (isAboveGoal) return "text-emerald-600 dark:text-emerald-400";
    if (isNearGoal) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusIcon = () => {
    if (isAboveGoal) return <TrendingUp className="w-4 h-4" />;
    if (isNearGoal) return <AlertTriangle className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (isAboveGoal) return "Above Goal";
    if (isNearGoal) return "Near Threshold";
    return "Below Goal";
  };

  return (
    <div className="space-y-4 p-4 rounded-xl bg-gradient-to-br from-background via-accent/20 to-accent/30 border border-border/50">
      {/* Status Header */}
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 ${getStatusColor()} font-semibold text-sm`}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </div>
        <div className={`text-2xl font-bold ${getStatusColor()}`}>
          {percentage.toFixed(0)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-accent rounded-full h-4 overflow-hidden shadow-inner">
          <div
            className={`h-full transition-all duration-700 ease-out rounded-full ${
              isAboveGoal 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' 
                : isNearGoal 
                ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                : 'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            style={{ width: `${percentage}%` }}
          >
            <div className="w-full h-full opacity-30 animate-pulse bg-gradient-to-r from-white/0 via-white/40 to-white/0" />
          </div>
        </div>
      </div>

      {/* Balance Details */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background/60 rounded-lg p-3 border border-border/30">
          <div className="text-xs text-muted-foreground mb-1">Current</div>
          <div className="text-base font-bold text-foreground">₹{currentBalance.toLocaleString()}</div>
        </div>
        <div className="bg-background/60 rounded-lg p-3 border border-border/30">
          <div className="text-xs text-muted-foreground mb-1">Goal</div>
          <div className="text-base font-bold text-primary">₹{goal.toLocaleString()}</div>
        </div>
      </div>

      {/* Difference Indicator */}
      <div className={`text-center text-sm ${getStatusColor()}`}>
        {isAboveGoal ? (
          <span className="flex items-center justify-center gap-1">
            <TrendingUp className="w-3 h-3" />
            ₹{Math.abs(difference).toLocaleString()} above goal
          </span>
        ) : (
          <span className="flex items-center justify-center gap-1">
            <TrendingDown className="w-3 h-3" />
            ₹{Math.abs(difference).toLocaleString()} below goal
          </span>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;
