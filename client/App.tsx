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
import StudyPlanner from "./pages/StudyPlanner";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
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
            <Route path="/progress" element={
              <PlaceholderPage
                title="Progress Tracking"
                description="Monitor your learning progress with detailed analytics and insights."
              />
            } />
            <Route path="/help" element={
              <PlaceholderPage
                title="Help Center"
                description="Get help and support for using StudyMate QLD effectively."
              />
            } />
            <Route path="/contact" element={
              <PlaceholderPage
                title="Contact Us"
                description="Get in touch with our support team for assistance."
              />
            } />
            <Route path="/about" element={
              <PlaceholderPage
                title="About StudyMate QLD"
                description="Learn more about our mission to help Queensland students succeed."
              />
            } />
            <Route path="/privacy" element={
              <PlaceholderPage
                title="Privacy Policy"
                description="Our commitment to protecting your privacy and data."
              />
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
