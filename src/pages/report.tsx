import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  category: string;
  description: string;
  date: string;
}

export default function TransactionsTab() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (error) console.error("Supabase error:", error);
    else setTransactions(data as Transaction[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">All Transactions</h1>

      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        transactions.map((tx) => (
          <Card key={tx.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{tx.category}</span>
                <span
                  className={`font-bold ${
                    tx.type === "income" ? "text-success" : "text-destructive"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div>
                {tx.description && <p className="text-sm text-muted-foreground">{tx.description}</p>}
              </div>
              <div className="text-sm text-muted-foreground">{tx.date}</div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
