import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AIInsightBoxProps {
  lastTransaction?: {
    type: string;
    amount: number;
    note?: string;
  };
}

const AIInsightBox = ({ lastTransaction }: AIInsightBoxProps) => {
  const [insight, setInsight] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!lastTransaction) return;

    const generateInsight = () => {
      const { type, amount, note } = lastTransaction;
      const category = note?.toLowerCase() || "";

      if (category.includes("food") || category.includes("groceries")) {
        return "🍔 AI Insight: You're spending on food. Consider cooking at home to save more!";
      } else if (category.includes("entertainment") || category.includes("movie")) {
        return "🎬 AI Insight: Great! You've kept entertainment under control this week.";
      } else if (category.includes("shopping") || category.includes("clothes")) {
        return "🛍️ AI Insight: Shopping detected! Remember your savings goal before your next purchase.";
      } else if (type === "debit") {
        return `💰 AI Insight: Debit of ₹${amount} recorded. Track your spending to stay on goal!`;
      } else if (type === "credit") {
        return `✨ AI Insight: Great! ₹${amount} added. You're building your savings nicely!`;
      }
      return "📊 AI Insight: Transaction recorded. Keep monitoring your spending patterns!";
    };

    const newInsight = generateInsight();
    setInsight(newInsight);
    setDisplayedText("");
    setIsTyping(true);
  }, [lastTransaction]);

  useEffect(() => {
    if (!isTyping || displayedText === insight) {
      setIsTyping(false);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(insight.slice(0, displayedText.length + 1));
    }, 30);

    return () => clearTimeout(timeout);
  }, [displayedText, insight, isTyping]);

  if (!lastTransaction) {
    return (
      <Card className="shadow-glass border border-primary/20 bg-gradient-to-br from-white/80 to-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Sparkles className="w-5 h-5 text-primary transition-transform hover:scale-[1.05] hover-glow" />
            <span className="text-sm">AI insights will appear here after transactions</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={insight}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-glass border border-primary/20 bg-gradient-to-br from-primary/8 to-accent/10">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 transition-transform hover:scale-[1.05] hover-glow" />
              </motion.div>
              <p className="text-sm font-medium text-foreground flex-1">
                {displayedText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1 h-4 bg-primary ml-1"
                  />
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIInsightBox;
