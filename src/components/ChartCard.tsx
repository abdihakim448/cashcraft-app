
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", income: 2400, expenses: 1800 },
  { month: "Feb", income: 2600, expenses: 1900 },
  { month: "Mar", income: 2800, expenses: 2100 },
  { month: "Apr", income: 2500, expenses: 1750 },
  { month: "May", income: 2900, expenses: 2200 },
  { month: "Jun", income: 3100, expenses: 2400 },
];

export function ChartCard() {
  return (
    <Card className="financial-card">
      <h2 className="text-lg font-semibold mb-4">Monthly Overview</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="month" 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <Bar 
              dataKey="income" 
              fill="hsl(var(--success))" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="expenses" 
              fill="hsl(var(--destructive))" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success"></div>
          <span className="text-sm text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive"></div>
          <span className="text-sm text-muted-foreground">Expenses</span>
        </div>
      </div>
    </Card>
  );
}
