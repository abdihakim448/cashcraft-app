
import { MetricCard } from "@/components/MetricCard";
import { TransactionList } from "@/components/TransactionList";
import { QuickActions } from "@/components/QuickActions";
import { ChartCard } from "@/components/ChartCard";
import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Welcome back, John!</h1>
        <p className="text-muted-foreground">
          Here's your financial overview for this month.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Balance"
          value="$8,450.00"
          change="+12% from last month"
          changeType="positive"
          icon={Wallet}
          gradient="balance"
        />
        <MetricCard
          title="Income"
          value="$2,850.00"
          change="+8% from last month"
          changeType="positive"
          icon={TrendingUp}
          gradient="income"
        />
        <MetricCard
          title="Expenses"
          value="$1,230.00"
          change="-5% from last month"
          changeType="positive"
          icon={TrendingDown}
          gradient="expense"
        />
        <MetricCard
          title="Budget Left"
          value="$1,620.00"
          change="68% remaining"
          changeType="neutral"
          icon={Target}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard />
          <TransactionList />
        </div>
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
