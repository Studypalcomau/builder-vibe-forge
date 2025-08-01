import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  BookOpen,
  Brain,
  Trophy,
  Users,
  Star,
  ArrowRight,
  Play,
  Target,
  Clock,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function Index() {
  const subjects = [
    {
      name: "Mathematical Methods",
      slug: "mathematical-methods",
      description: "Calculus, Functions, Statistics",
      topics: 45,
      color: "bg-blue-500",
      icon: "📊",
    },
    {
      name: "Specialist Mathematics",
      slug: "specialist-mathematics",
      description: "Advanced Calculus, Complex Numbers, Vectors",
      topics: 42,
      color: "bg-indigo-500",
      icon: "🔢",
    },
    {
      name: "Physics",
      slug: "physics",
      description: "Mechanics, Waves, Electricity, Modern Physics",
      topics: 39,
      color: "bg-red-500",
      icon: "⚡",
    },
    {
      name: "Engineering",
      slug: "engineering",
      description: "Design Thinking, Systems, Problem Solving",
      topics: 38,
      color: "bg-orange-500",
      icon: "⚙️",
    },
    {
      name: "Economics",
      slug: "economics",
      description: "Microeconomics, Macroeconomics, Markets",
      topics: 35,
      color: "bg-green-500",
      icon: "💰",
    },
    {
      name: "English",
      slug: "english",
      description: "Literature, Language, Writing, Communication",
      topics: 40,
      color: "bg-purple-500",
      icon: "📚",
    },
  ];

  const features = [
    {
      icon: Brain,
      title: "Smart Flashcards",
      description:
        "AI-powered spaced repetition system that adapts to your learning pace",
    },
    {
      icon: Trophy,
      title: "Practice Quizzes",
      description:
        "Comprehensive quizzes aligned with Queensland curriculum standards",
    },
    {
      icon: FileText,
      title: "Study Notes",
      description: "Comprehensive notes and guides for all subjects",
    },
    {
      icon: Target,
      title: "Track Your Progress",
      description:
        "Monitor your learning journey with detailed analytics and insights",
    },
  ];

  const stats = [
    { label: "Subjects", value: "10+", icon: Users },
    { label: "Study Topics", value: "500+", icon: BookOpen },
    { label: "Practice Questions", value: "25K+", icon: Trophy },
    { label: "Success Rate", value: "94%", icon: Star },
  ];

  const recentTopics = [
    {
      subject: "Mathematics",
      topic: "Differential Calculus",
      progress: 75,
      timeLeft: "2 days",
    },
    {
      subject: "Chemistry",
      topic: "Organic Reactions",
      progress: 60,
      timeLeft: "4 days",
    },
    {
      subject: "English",
      topic: "Poetry Analysis",
      progress: 90,
      timeLeft: "1 day",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-study-background via-sky-blue-50 to-sky-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-blue-600 to-sky-blue-500">
                {" "}
                QLD{" "}
              </span>
              Curriculum
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The complete study platform for Queensland Year 11-12 students.
              Interactive flashcards, practice quizzes, and comprehensive study
              notes to help you excel in your exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-study-primary hover:bg-study-primary/90 text-white px-8"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Today
                </Button>
              </Link>
            </div>
            <div className="mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-sky-blue-600 hover:text-sky-blue-700 font-medium"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <div className="w-20 h-20 bg-sky-blue-200 rounded-lg"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 animate-pulse delay-300">
          <div className="w-16 h-16 bg-sky-blue-300 rounded-lg"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-6 h-6 text-sky-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Subject Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Subject
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive study materials for all Queensland Year 11-12
            subjects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link key={subject.slug} to={`/subjects/${subject.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-blue-200 hover:border-sky-blue-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{subject.icon}</div>
                    <Badge
                      variant="secondary"
                      className="bg-sky-blue-100 text-sky-blue-700"
                    >
                      {subject.topics} Topics
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    {subject.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Year 11-12</span>
                    <ArrowRight className="w-4 h-4 text-sky-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive study tools designed specifically for Queensland
              students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full text-center hover:shadow-md transition-shadow border-sky-blue-200 hover:border-sky-blue-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-sky-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Excel in Your Exams?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Queensland students who are already using StudyPal
            to achieve their academic goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-white text-sky-blue-600 hover:bg-gray-100 px-8"
              >
                Start Free Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
