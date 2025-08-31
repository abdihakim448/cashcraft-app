
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Download, Target } from "lucide-react";

export function QuickActions() {
  return (
    <Card className="financial-card">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <Button className="h-12 flex-col gap-1" variant="outline">
          <Plus className="h-4 w-4" />
          <span className="text-xs">Add Transaction</span>
        </Button>
        <Button className="h-12 flex-col gap-1" variant="outline">
          <Target className="h-4 w-4" />
          <span className="text-xs">Set Budget</span>
        </Button>
        <Button className="h-12 flex-col gap-1" variant="outline">
          <Upload className="h-4 w-4" />
          <span className="text-xs">Import Data</span>
        </Button>
        <Button className="h-12 flex-col gap-1" variant="outline">
          <Download className="h-4 w-4" />
          <span className="text-xs">Export Report</span>
        </Button>
      </div>
    </Card>
  );
}
