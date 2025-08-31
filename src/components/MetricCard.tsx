
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  gradient?: "income" | "expense" | "balance";
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  gradient 
}: MetricCardProps) {
  const gradientClass = {
    income: "income-gradient",
    expense: "expense-gradient", 
    balance: "financial-gradient"
  }[gradient || "balance"];

  const changeColor = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground"
  }[changeType];

  return (
    <Card className="metric-card overflow-hidden">
      <div className={`h-1 ${gradientClass}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          {change && (
            <p className={`text-xs ${changeColor} flex items-center gap-1`}>
              {change}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
