import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight } from "lucide-react";

interface Transaction {
  id: string;
  type: "credit" | "debit" | "manual";
  amount: number;
  timestamp: Date;
  note?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  const getIcon = (type: string) => {
    if (type === "credit") return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (type === "debit") return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    return <ArrowLeftRight className="w-4 h-4 text-blue-600" />;
  };

  const getColor = (type: string) => {
    if (type === "credit") return "text-green-600";
    if (type === "debit") return "text-red-600";
    return "text-blue-600";
  };

  return (
    <Card className="hover:shadow-[0_8px_40px_rgba(2,6,23,0.14)] transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg tracking-tight">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No transactions yet. They will appear automatically.
            </p>
          ) : (
            transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/60 backdrop-blur border border-black/10 hover:bg-white/80 transition-all duration-200 animate-slide-in hover:scale-[1.01] hover:shadow-glass"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border/50">
                    {getIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium capitalize tracking-tight">
                      {transaction.note || transaction.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(transaction.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <p className={`font-bold text-lg ${getColor(transaction.type)}`}>
                  {transaction.type === "debit" ? "-" : "+"}₹{transaction.amount.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
