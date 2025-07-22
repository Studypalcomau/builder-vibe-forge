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
import Flashcards from "./pages/Flashcards";
import SubjectFlashcards from "./pages/SubjectFlashcards";
import Quizzes from "./pages/Quizzes";
import StudyPlanner from "./pages/StudyPlanner";
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
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:slug" element={<Subject />} />
            <Route path="/subjects/:slug/flashcards" element={
              <PlaceholderPage
                title="Subject Flashcards"
                description="Interactive flashcards for this specific subject with spaced repetition learning."
                backLink="/subjects"
                backText="Back to Subjects"
              />
            } />
            <Route path="/subjects/:slug/quizzes" element={
              <PlaceholderPage
                title="Subject Quizzes"
                description="Practice quizzes and tests specifically designed for this subject."
                backLink="/subjects"
                backText="Back to Subjects"
              />
            } />
            <Route path="/subjects/:slug/notes" element={
              <PlaceholderPage
                title="Study Notes"
                description="Comprehensive study notes and reference materials for this subject."
                backLink="/subjects"
                backText="Back to Subjects"
              />
            } />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/planner" element={<StudyPlanner />} />
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
