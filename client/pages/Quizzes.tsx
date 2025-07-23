import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Trophy,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Play,
  Target,
  Brain,
  CheckCircle,
  Zap,
  Award
} from "lucide-react";

export default function Quizzes() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const subjects = [
    {
      name: "Mathematical Methods",
      slug: "mathematical-methods",
      icon: "📊",
      totalQuizzes: 19,
      completed: 12,
      bestScore: 92,
      averageScore: 87,
      lastTaken: "2 hours ago",
      available: true
    },
    {
      name: "Specialist Mathematics",
      slug: "specialist-mathematics",
      icon: "🔢",
      totalQuizzes: 15,
      completed: 8,
      bestScore: 88,
      averageScore: 82,
      lastTaken: "1 day ago",
      available: true
    },
    {
      name: "Physics",
      slug: "physics",
      icon: "⚡",
      totalQuizzes: 16,
      completed: 3,
      bestScore: 81,
      averageScore: 76,
      lastTaken: "3 days ago",
      available: false
    },
    {
      name: "Engineering",
      slug: "engineering",
      icon: "⚙️",
      totalQuizzes: 17,
      completed: 4,
      bestScore: 78,
      averageScore: 73,
      lastTaken: "5 days ago",
      available: false
    },
    {
      name: "Economics",
      slug: "economics",
      icon: "💰",
      totalQuizzes: 14,
      completed: 6,
      bestScore: 85,
      averageScore: 79,
      lastTaken: "4 days ago",
      available: false
    },
    {
      name: "English",
      slug: "english",
      icon: "📚",
      totalQuizzes: 12,
      completed: 2,
      bestScore: 83,
      averageScore: 80,
      lastTaken: "1 week ago",
      available: false
    }
  ];

  const featuredQuizzes = [
    {
      title: "Calculus Fundamentals",
      subject: "Mathematics",
      difficulty: "Intermediate",
      questions: 15,
      timeLimit: "25 min",
      attempts: 847,
      rating: 4.8,
      description: "Test your understanding of derivatives, limits, and basic calculus concepts"
    },
    {
      title: "Genetics and Heredity",
      subject: "Biology",
      difficulty: "Advanced",
      questions: 12,
      timeLimit: "20 min",
      attempts: 623,
      rating: 4.6,
      description: "Comprehensive quiz on DNA, RNA, and genetic inheritance patterns"
    },
    {
      title: "Atomic Structure",
      subject: "Chemistry",
      difficulty: "Beginner",
      questions: 10,
      timeLimit: "15 min",
      attempts: 1205,
      rating: 4.7,
      description: "Master the fundamentals of atomic theory and electron configuration"
    }
  ];

  const totalStats = {
    totalQuizzes: subjects.reduce((sum, subject) => sum + subject.totalQuizzes, 0),
    completedQuizzes: subjects.reduce((sum, subject) => sum + subject.completed, 0),
    averageScore: Math.round(subjects.reduce((sum, subject) => sum + subject.averageScore, 0) / subjects.length),
    bestScore: Math.max(...subjects.map(subject => subject.bestScore))
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Practice Quizzes
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Test your knowledge with comprehensive quizzes aligned with Queensland curriculum standards.
            Track your progress and identify areas for improvement.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.totalQuizzes}</div>
              <div className="text-sm text-gray-600">Available Quizzes</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.completedQuizzes}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.averageScore}%</div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.bestScore}%</div>
              <div className="text-sm text-gray-600">Best Score</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Quizzes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredQuizzes.map((quiz, index) => (
              <Card key={index} className="border-sky-blue-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {quiz.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {quiz.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center">
                        <Brain className="w-3 h-3 mr-1" />
                        {quiz.questions} questions
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {quiz.timeLimit}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>{quiz.attempts.toLocaleString()} students attempted</span>
                    </div>
                    <Button className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subject-wise Quizzes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quizzes by Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.slug} className={`border-sky-blue-200 ${!subject.available ? 'opacity-60' : 'hover:shadow-md transition-shadow'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{subject.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {subject.totalQuizzes} quizzes available
                        </CardDescription>
                      </div>
                    </div>
                    {subject.available && (
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{Math.round((subject.completed / subject.totalQuizzes) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sky-blue-500 h-2 rounded-full"
                          style={{ width: `${(subject.completed / subject.totalQuizzes) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Best Score</div>
                        <div className="font-medium flex items-center">
                          <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                          {subject.bestScore}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Average</div>
                        <div className="font-medium">{subject.averageScore}%</div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-600">
                      Last taken: {subject.lastTaken}
                    </div>

                    {/* Action Button */}
                    {subject.available ? (
                      <Link to={`/subjects/${subject.slug}/quizzes`}>
                        <Button className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Take Quiz
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quiz Tips */}
        <Card className="border-sky-blue-200 bg-sky-blue-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-sky-blue-600" />
              Quiz Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Before Taking a Quiz</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Review relevant flashcards and study notes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Choose a quiet environment free from distractions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Read all instructions carefully before starting</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">During the Quiz</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Read each question thoroughly before answering</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Manage your time effectively across all questions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Review your answers before submitting</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
