import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Index from "./pages/Index";
import Subject from "./pages/Subject";
import Subjects from "./pages/Subjects";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import SubjectFlashcards from "./pages/SubjectFlashcards";
import Quizzes from "./pages/Quizzes";
import SubjectQuizzes from "./pages/SubjectQuizzes";
import SubjectNotes from "./pages/SubjectNotes";
import TopicContent from "./pages/TopicContent";

import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Account from "./pages/Account";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:slug" element={<Subject />} />
            <Route path="/subjects/:slug/flashcards" element={<SubjectFlashcards />} />
            <Route path="/subjects/:slug/quizzes" element={<SubjectQuizzes />} />
            <Route path="/subjects/:slug/notes" element={<SubjectNotes />} />
            <Route path="/subjects/:slug/topics/:topicId" element={<TopicContent />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/planner" element={<StudyPlanner />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account" element={<Account />} />
            <Route path="/progress" element={
              <PlaceholderPage
                title="Progress Tracking"
                description="Monitor your learning progress with detailed analytics and insights."
              />
            } />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
