import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import TransactionList from "@/components/dashboard/TransactionList";
import CircularGoalTracker from "@/components/dashboard/CircularGoalTracker";
import NotificationModal from "@/components/dashboard/NotificationModal";
import AIInsightBox from "@/components/dashboard/AIInsightBox";
import FinancialCoach from "@/components/dashboard/FinancialCoach";
import Navigation from "@/components/Navigation";

interface Transaction {
  id: string;
  type: "credit" | "debit" | "manual";
  amount: number;
  timestamp: Date;
  note?: string;
}

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem("quantum_balance");
    return saved ? parseFloat(saved) : 50000;
  });
  const [goal, setGoal] = useState<number>(() => {
    const saved = localStorage.getItem("quantum_goal");
    return saved ? parseFloat(saved) : 0;
  });
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("quantum_transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [goalInput, setGoalInput] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [manualDescription, setManualDescription] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [overspendAmount, setOverspendAmount] = useState(0);
  const [hasNotified, setHasNotified] = useState(false);
  const [autoTransactionCount, setAutoTransactionCount] = useState(0);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("quantum_balance", balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("quantum_goal", goal.toString());
  }, [goal]);

  useEffect(() => {
    localStorage.setItem("quantum_transactions", JSON.stringify(transactions.slice(0, 10)));
  }, [transactions]);

  // Auto-generate transactions - stops after 10 transactions
  useEffect(() => {
    if (autoTransactionCount >= 10) return;

    const interval = setInterval(() => {
      setAutoTransactionCount((count) => {
        if (count >= 10) return count;
        
        // Bias towards debits to trigger notification (70% debit, 30% credit)
        const isCredit = Math.random() > 0.7;
        const amount = Math.floor(Math.random() * 451) + 50; // 50-500

        const newTransaction: Transaction = {
          id: Date.now().toString(),
          type: isCredit ? "credit" : "debit",
          amount,
          timestamp: new Date(),
        };

        setTransactions((prev) => [newTransaction, ...prev].slice(0, 10));
        setBalance((prev) => isCredit ? prev + amount : prev - amount);
        
        return count + 1;
      });
    }, 2500); // Every 2.5 seconds

    return () => clearInterval(interval);
  }, [autoTransactionCount]);

  // Check if approaching minimum savings goal - only notify once per breach
  useEffect(() => {
    if (goal > 0 && balance <= goal + 200 && !hasNotified) {
      const overspend = balance - goal;
      setOverspendAmount(overspend);
      setShowNotification(true);
      setHasNotified(true);
    } else if (balance > goal + 200) {
      // Reset notification flag when balance goes back above threshold
      setHasNotified(false);
    }
  }, [balance, goal, hasNotified]);

  const handleSetGoal = () => {
    const amount = parseFloat(goalInput);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid goal amount",
        variant: "destructive",
      });
      return;
    }
    setGoal(amount);
    setGoalInput("");
    toast({
      title: "Goal set!",
      description: `Your financial goal is now ₹${amount.toLocaleString()}`,
    });
  };

  const handleManualUpdate = (isIncome: boolean) => {
    const amount = parseFloat(manualAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    const finalAmount = isIncome ? amount : -amount;
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "manual",
      amount: amount,
      timestamp: new Date(),
      note: manualDescription || (isIncome ? "Manual Income" : "Manual Expense"),
    };

    setTransactions((prev) => [newTransaction, ...prev].slice(0, 10));
    setBalance((prev) => prev + finalAmount);
    setManualAmount("");
    setManualDescription("");
    toast({
      title: "Transaction added",
      description: `${isIncome ? "Added" : "Subtracted"} ₹${amount.toLocaleString()}`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Balance & Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <Card id="balance-card" className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Current Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold text-primary">
                  ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>

            {/* AI Insight Box */}
            <div id="ai-insight-box">
              <AIInsightBox lastTransaction={transactions[0]} />
            </div>

            <TransactionList transactions={transactions} />
          </div>

          {/* Right Column - Goal & Manual Adjustment */}
          <div className="space-y-6">
            <Card id="goal-card" className="shadow-xl border-2 border-primary/20 bg-gradient-to-br from-card via-card to-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent flex items-center gap-2">
                  🎯 Financial Goal
                </CardTitle>
                <p className="text-xs text-muted-foreground">Track your minimum savings target</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {goal > 0 ? (
                  <div className="space-y-4">
                    <CircularGoalTracker currentBalance={balance} goal={goal} />
                  </div>
                ) : (
                  <div className="bg-accent/30 rounded-lg p-4 text-center border border-dashed border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">
                      Set a minimum savings goal to track your spending
                    </p>
                    <p className="text-xs text-muted-foreground/80">
                      You'll be notified when you're close to your limit
                    </p>
                  </div>
                )}
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {goal > 0 ? "Update Goal Amount" : "Set Goal Amount"}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">₹</span>
                      <Input
                        type="number"
                        placeholder="e.g., 10000"
                        value={goalInput}
                        onChange={(e) => setGoalInput(e.target.value)}
                        className="pl-8 h-11 text-base font-medium"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSetGoal} 
                    className="w-full h-11 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                  >
                    {goal > 0 ? "Update Goal" : "Set Goal"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card id="manual-transaction-card" className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Manual Transaction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Amount (₹)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={manualAmount}
                      onChange={(e) => setManualAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Description (optional)</label>
                    <Input
                      type="text"
                      placeholder="e.g., Salary, Groceries"
                      value={manualDescription}
                      onChange={(e) => setManualDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleManualUpdate(true)} 
                      className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
                    >
                      Add Income
                    </Button>
                    <Button 
                      onClick={() => handleManualUpdate(false)} 
                      className="w-full bg-[#EF4444] hover:bg-[#EF4444]/90 text-white"
                    >
                      Add Expense
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <NotificationModal
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        overspendAmount={overspendAmount}
        currentBalance={balance}
        goal={goal}
      />

      <FinancialCoach currentBalance={balance} goal={goal} />
    </div>
  );
};

export default Dashboard;
