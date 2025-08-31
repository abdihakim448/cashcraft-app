
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrendingUp, TrendingDown } from "lucide-react";

interface Transaction {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 2500,
    type: "income",
    category: "Salary",
    description: "Monthly salary",
    date: "2024-01-15"
  },
  {
    id: "2", 
    amount: 85,
    type: "expense",
    category: "Food",
    description: "Grocery shopping",
    date: "2024-01-14"
  },
  {
    id: "3",
    amount: 45,
    type: "expense", 
    category: "Transport",
    description: "Gas station",
    date: "2024-01-13"
  },
  {
    id: "4",
    amount: 120,
    type: "expense",
    category: "Entertainment",
    description: "Movie tickets",
    date: "2024-01-12"
  }
];

export function TransactionList() {
  return (
    <Card className="financial-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      
      <div className="space-y-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === "income" 
                  ? "bg-success/10 text-success" 
                  : "bg-destructive/10 text-destructive"
              }`}>
                {transaction.type === "income" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              <div>
                <p className="font-medium">{transaction.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`font-semibold ${
                transaction.type === "income" ? "text-success" : "text-destructive"
              }`}>
                {transaction.type === "income" ? "+" : "-"}${transaction.amount}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
