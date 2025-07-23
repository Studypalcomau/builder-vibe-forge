import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, Menu, X, User } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Subjects", href: "/subjects" },
    { name: "Flashcards", href: "/flashcards" },
    { name: "Quizzes", href: "/quizzes" },
    { name: "Study Planner", href: "/planner" },
    { name: "Pricing", href: "/pricing" },
  ];

  // For demo purposes, assuming user is logged in. In real app, this would come from auth context
  const isLoggedIn = true;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-study-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-sky-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-sky-blue-500 to-sky-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">StudyMate QLD</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-sky-blue-100 text-sky-blue-700"
                      : "text-gray-600 hover:text-sky-blue-600 hover:bg-sky-blue-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>

            {/* CTA Button / Account */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Link to="/account">
                  <Button variant="outline" className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-50">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </Link>
              ) : (
                <Link to="/signup">
                  <Button className="bg-study-accent hover:bg-study-accent/90 text-gray-900 font-medium">
                    Get Started
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-sky-blue-200 py-2">
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-sky-blue-100 text-sky-blue-700"
                        : "text-gray-600 hover:text-sky-blue-600 hover:bg-sky-blue-50"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-2">
                  <Link to="/signup">
                    <Button className="w-full bg-study-accent hover:bg-study-accent/90 text-gray-900 font-medium">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-sky-blue-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-sky-blue-500 to-sky-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">StudyMate QLD</span>
              </Link>
              <p className="text-gray-600 mb-6 max-w-md">
                Your comprehensive study companion for Queensland Year 11-12 subjects. 
                Master your curriculum with interactive flashcards, quizzes, and personalized study plans.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Ready to ace your exams?</h4>
                <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                  Start Studying Now
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/subjects" className="text-gray-600 hover:text-sky-blue-600">Browse Subjects</Link></li>
                <li><Link to="/flashcards" className="text-gray-600 hover:text-sky-blue-600">Flashcards</Link></li>
                <li><Link to="/quizzes" className="text-gray-600 hover:text-sky-blue-600">Practice Quizzes</Link></li>
                <li><Link to="/planner" className="text-gray-600 hover:text-sky-blue-600">Study Planner</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-sky-blue-600">Help Center</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-sky-blue-600">Contact Us</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-sky-blue-600">About</Link></li>
                <li><Link to="/privacy" className="text-gray-600 hover:text-sky-blue-600">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-sky-blue-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 StudyMate QLD. All rights reserved. Built for Queensland students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
