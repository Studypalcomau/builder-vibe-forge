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
import AdminDashboard from "./pages/admin/AdminDashboard";
import SubjectManagement from "./pages/admin/SubjectManagement";
import SubjectEditor from "./pages/admin/SubjectEditor";
import CurriculumManager from "./pages/admin/CurriculumManager";
import ContentGeneration from "./pages/admin/ContentGeneration";
import QuestionsManagement from "./pages/admin/QuestionsManagement";
import QuestionBank from "./pages/admin/QuestionBank";
import StudyNotesManagement from "./pages/admin/StudyNotesManagement";
import ComprehensiveStudyGuide from "./pages/admin/ComprehensiveStudyGuide";
import PlaceholderPage from "./pages/PlaceholderPage";
import StudyRecommendations from "./pages/StudyRecommendations";
import TopicResults from "./pages/TopicResults";
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
            <Route
              path="/subjects/:slug/flashcards"
              element={<SubjectFlashcards />}
            />
            <Route
              path="/subjects/:slug/quizzes"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/quiz/:subtopicId"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/quiz/:subtopicId/history"
              element={<SubjectQuizzes />}
            />
            <Route path="/subjects/:slug/test" element={<SubjectQuizzes />} />
            <Route
              path="/subjects/:slug/test/history"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/test/history/:attemptId"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/test/:testType/results/:attemptId"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/quiz/:subtopicId/results/:attemptId"
              element={<SubjectQuizzes />}
            />
            <Route path="/subjects/:slug/progress" element={<TopicResults />} />
            <Route
              path="/subjects/:slug/analytics"
              element={
                <PlaceholderPage
                  title="Performance Analytics"
                  description="Comprehensive analytics dashboard showing learning trends and performance insights."
                />
              }
            />
            <Route
              path="/subjects/:slug/recommendations"
              element={<StudyRecommendations />}
            />
            <Route path="/subjects/:slug/notes" element={<SubjectNotes />} />
            <Route
              path="/subjects/:slug/notes/:subtopicId"
              element={<SubjectNotes />}
            />
            <Route
              path="/subjects/:slug/topics/:topicId"
              element={<TopicContent />}
            />
            <Route
              path="/subjects/:slug/subtopics/:subtopicId/flashcards"
              element={<SubjectFlashcards />}
            />
            <Route
              path="/subjects/:slug/subtopics/:subtopicId/quiz"
              element={<SubjectQuizzes />}
            />
            <Route
              path="/subjects/:slug/subtopics/:subtopicId/notes"
              element={<SubjectNotes />}
            />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/quizzes" element={<Quizzes />} />

            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/subjects" element={<SubjectManagement />} />
            <Route path="/admin/subjects/new" element={<SubjectEditor />} />
            <Route path="/admin/subjects/:id" element={<SubjectEditor />} />
            <Route
              path="/admin/subjects/:id/edit"
              element={<SubjectEditor />}
            />
            <Route path="/admin/curriculum" element={<CurriculumManager />} />
            <Route path="/admin/generate" element={<ContentGeneration />} />
            <Route path="/admin/questions" element={<QuestionsManagement />} />
            <Route
              path="/admin/subjects/:subjectId/questions"
              element={<QuestionBank />}
            />
            <Route
              path="/admin/subjects/:subjectId/notes"
              element={<StudyNotesManagement />}
            />
            <Route
              path="/admin/subjects/:subjectId/complete-guide"
              element={<ComprehensiveStudyGuide />}
            />
            <Route
              path="/admin/curriculum"
              element={
                <PlaceholderPage
                  title="Curriculum Management"
                  description="Manage curriculum structure and learning objectives for all subjects."
                />
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <PlaceholderPage
                  title="Admin Analytics"
                  description="View comprehensive analytics and reports for the platform."
                />
              }
            />
            <Route
              path="/admin/settings"
              element={
                <PlaceholderPage
                  title="System Settings"
                  description="Configure system-wide settings and preferences."
                />
              }
            />
            <Route
              path="/progress"
              element={
                <PlaceholderPage
                  title="Progress Tracking"
                  description="Monitor your learning progress with detailed analytics and insights."
                />
              }
            />
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
