
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "@/hooks/useAuth";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TemplePage from "./pages/TemplePage";
import EventsPage from "./pages/EventsPage";
import DonationsPage from "./pages/DonationsPage";
import LocationPage from "./pages/LocationPage";
import NoticesPage from "./pages/NoticesPage";
import TemplestayPage from "./pages/TemplestayPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import StatsPage from "./pages/StatsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/temple" element={<RequireAuth><TemplePage /></RequireAuth>} />
            <Route path="/events" element={<RequireAuth><EventsPage /></RequireAuth>} />
            <Route path="/donations" element={<RequireAuth><DonationsPage /></RequireAuth>} />
            <Route path="/location" element={<RequireAuth><LocationPage /></RequireAuth>} />
            <Route path="/notices" element={<RequireAuth><NoticesPage /></RequireAuth>} />
            <Route path="/templestay" element={<RequireAuth><TemplestayPage /></RequireAuth>} />
            <Route path="/social" element={<RequireAuth><SocialMediaPage /></RequireAuth>} />
            <Route path="/stats" element={<RequireAuth><StatsPage /></RequireAuth>} />
            <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
