
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/add" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="/transactions" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="/analytics" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Analytics</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="/budget" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Budget Management</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="/reports" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Reports</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="/settings" element={
            <Layout>
              <div className="text-center py-20">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <p className="text-muted-foreground">Coming soon - Connect to Supabase first!</p>
              </div>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
