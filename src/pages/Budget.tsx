import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Target, AlertTriangle, CheckCircle, Plus, Edit, TrendingUp } from "lucide-react";

interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}

const initialBudgets: BudgetCategory[] = [
  { id: "1", name: "Food & Dining", budgeted: 600, spent: 450, color: "#8B5CF6" },
  { id: "2", name: "Transportation", budgeted: 400, spent: 320, color: "#06B6D4" },
  { id: "3", name: "Shopping", budgeted: 300, spent: 280, color: "#10B981" },
  { id: "4", name: "Entertainment", budgeted: 200, spent: 180, color: "#F59E0B" },
  { id: "5", name: "Bills & Utilities", budgeted: 500, spent: 220, color: "#EF4444" },
  { id: "6", name: "Healthcare", budgeted: 200, spent: 150, color: "#EC4899" },
];

export default function Budget() {
  const { toast } = useToast();
  const [budgets, setBudgets] = useState<BudgetCategory[]>(initialBudgets);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetCategory | null>(null);
  const [newBudget, setNewBudget] = useState({ name: "", amount: "" });

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudgeted - totalSpent;

  const getProgressColor = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-success";
  };

  const getStatusBadge = (spent: number, budgeted: number) => {
    const percentage = (spent / budgeted) * 100;
    if (percentage >= 100) {
      return <Badge variant="destructive">Over Budget</Badge>;
    }
    if (percentage >= 90) {
      return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700">Near Limit</Badge>;
    }
    return <Badge variant="secondary" className="bg-success/10 text-success">On Track</Badge>;
  };

  const handleSaveBudget = () => {
    if (!newBudget.name || !newBudget.amount) return;

    const budget: BudgetCategory = {
      id: editingBudget?.id || Date.now().toString(),
      name: newBudget.name,
      budgeted: parseFloat(newBudget.amount),
      spent: editingBudget?.spent || 0,
      color: editingBudget?.color || "#6366F1"
    };

    if (editingBudget) {
      setBudgets(prev => prev.map(b => b.id === editingBudget.id ? budget : b));
      toast({ title: "Budget Updated", description: `${budget.name} budget has been updated.` });
    } else {
      setBudgets(prev => [...prev, budget]);
      toast({ title: "Budget Added", description: `${budget.name} budget has been created.` });
    }

    setIsDialogOpen(false);
    setEditingBudget(null);
    setNewBudget({ name: "", amount: "" });
  };

  const openEditDialog = (budget: BudgetCategory) => {
    setEditingBudget(budget);
    setNewBudget({ name: budget.name, amount: budget.budgeted.toString() });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingBudget(null);
    setNewBudget({ name: "", amount: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Budget Management</h1>
          <p className="text-muted-foreground">
            Set spending limits and track your progress
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBudget ? 'Edit Budget' : 'Create New Budget'}
              </DialogTitle>
              <DialogDescription>
                Set a monthly spending limit for this category
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newBudget.name}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget-amount">Monthly Budget</Label>
                <Input
                  id="budget-amount"
                  type="number"
                  value={newBudget.amount}
                  onChange={(e) => setNewBudget(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter budget amount"
                />
              </div>
              <Button onClick={handleSaveBudget} className="w-full">
                {editingBudget ? 'Update Budget' : 'Create Budget'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Monthly allocation</p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalSpent / totalBudgeted) * 100).toFixed(1)}% of total budget
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${Math.abs(remainingBudget).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {remainingBudget >= 0 ? 'Available to spend' : 'Over budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Budget Progress</CardTitle>
          <CardDescription>
            Your spending progress across all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Progress</span>
              <span>{((totalSpent / totalBudgeted) * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={(totalSpent / totalBudgeted) * 100} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${totalSpent.toLocaleString()} spent</span>
              <span>${totalBudgeted.toLocaleString()} budgeted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Budget Categories</h2>
          <Badge variant="outline">
            {budgets.filter(b => (b.spent / b.budgeted) >= 0.9).length} near limit
          </Badge>
        </div>
        
        <div className="grid gap-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.budgeted) * 100;
            const remaining = budget.budgeted - budget.spent;
            
            return (
              <Card key={budget.id} className="hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: budget.color }}
                      />
                      <h3 className="font-semibold">{budget.name}</h3>
                      {percentage >= 90 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(budget.spent, budget.budgeted)}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(budget)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${budget.spent.toLocaleString()} spent</span>
                      <span>${budget.budgeted.toLocaleString()} budgeted</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Remaining</span>
                      <span className={`font-medium ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {remaining >= 0 ? '+' : ''}${remaining.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}