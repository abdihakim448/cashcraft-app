import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, DollarSign, Save, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const categories = [
  "Food & Dining", "Transportation", "Shopping", "Entertainment", 
  "Bills & Utilities", "Healthcare", "Travel", "Education", "Other"
];

const quickAmounts = [10, 25, 50, 100, 200, 500];

export default function AddTransaction() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickAmount = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      type: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const isFormValid = formData.amount && formData.type && formData.category;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          amount: parseFloat(formData.amount),
          type: formData.type,
          category: formData.category,
          description: formData.description,
          date: formData.date,
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Transaction Added!",
        description: `${formData.type === "income" ? "Income" : "Expense"} of $${formData.amount} has been recorded.`,
      });
      resetForm();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Add New Transaction</h1>
        <p className="text-muted-foreground">Record your income or expenses quickly and accurately</p>
      </div>

      {/* Quick Amounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" /> Quick Amounts
          </CardTitle>
          <CardDescription>Select a common amount or enter your own</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAmount(amount)}
                className="hover-scale"
              >
                ${amount}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Form */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Fill in the information below to record your transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                  className="pl-10 text-lg"
                  required
                />
              </div>
            </div>

            {/* Type */}
            <div className="space-y-2">
              <Label>Transaction Type *</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.type === "income" ? "default" : "outline"}
                  onClick={() => setFormData((prev) => ({ ...prev, type: "income" }))}
                  className="flex-1"
                >
                  💰 Income
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "expense" ? "default" : "outline"}
                  onClick={() => setFormData((prev) => ({ ...prev, type: "expense" }))}
                  className="flex-1"
                >
                  💸 Expense
                </Button>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add notes about this transaction..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={!isFormValid || isSubmitting} className="flex-1">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" /> Add Transaction
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                <X className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Preview */}
      {isFormValid && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle>Transaction Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    formData.type === "income" ? "bg-success" : "bg-destructive"
                  }`}
                />
                <div>
                  <div className="font-medium">{formData.category}</div>
                  {formData.description && (
                    <div className="text-sm text-muted-foreground">{formData.description}</div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${
                    formData.type === "income" ? "text-success" : "text-destructive"
                  }`}
                >
                  {formData.type === "income" ? "+" : "-"}${formData.amount}
                </div>
                <div className="text-sm text-muted-foreground">{formData.date}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
