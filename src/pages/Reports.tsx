import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchReport = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("transactions").select("amount, type");

    if (!error && data) {
      let inc = 0;
      let exp = 0;
      data.forEach((t) => {
        if (t.type === "income") inc += t.amount;
        else exp += t.amount;
      });
      setIncome(inc);
      setExpense(exp);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Reports</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Income</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 font-bold text-xl">${income}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 font-bold text-xl">${expense}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
