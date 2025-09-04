import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";   // ✅ import
import Reports from "./pages/Reports";             // ✅ import
import Settings from "./pages/Settings";           // ✅ import

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
              <AddTransaction />
            </Layout>
          } />

          <Route path="/transactions" element={
            <Layout>
              <Transactions />   {/* ✅ use real page */}
            </Layout>
          } />

          <Route path="/analytics" element={
            <Layout>
              <Analytics />
            </Layout>
          } />

          <Route path="/budget" element={
            <Layout>
              <Budget />
            </Layout>
          } />

          <Route path="/reports" element={
            <Layout>
              <Reports />   {/* ✅ use real page */}
            </Layout>
          } />

          <Route path="/settings" element={
            <Layout>
              <Settings />   {/* ✅ use real page */}
            </Layout>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
