import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  BookOpen,
  ArrowRight,
  Users,
  Clock,
  Target,
  TrendingUp
} from "lucide-react";

export default function Subjects() {
  const subjects = [
    {
      name: "Mathematical Methods",
      slug: "mathematical-methods",
      description: "Master calculus, functions, and statistical analysis for Year 11-12",
      icon: "📊",
      color: "bg-blue-500",
      totalTopics: 45,
      studyTime: "68 hours",
      difficulty: "Advanced",
      completion: 68,
      students: "2.1K"
    },
    {
      name: "Specialist Mathematics",
      slug: "specialist-mathematics",
      description: "Advanced mathematics including complex numbers, vectors, and further calculus",
      icon: "🔢",
      color: "bg-indigo-500",
      totalTopics: 42,
      studyTime: "75 hours",
      difficulty: "Advanced",
      completion: 45,
      students: "1.2K"
    },
    {
      name: "Physics",
      slug: "physics",
      description: "Understanding mechanics, waves, electricity, and modern physics",
      icon: "⚡",
      color: "bg-red-500",
      totalTopics: 39,
      studyTime: "71 hours",
      difficulty: "Advanced",
      completion: 28,
      students: "1.8K"
    },
    {
      name: "Engineering",
      slug: "engineering",
      description: "Design thinking, problem-solving, and engineering systems",
      icon: "⚙️",
      color: "bg-orange-500",
      totalTopics: 38,
      studyTime: "62 hours",
      difficulty: "Advanced",
      completion: 32,
      students: "1.5K"
    },
    {
      name: "Economics",
      slug: "economics",
      description: "Microeconomics, macroeconomics, and market analysis",
      icon: "💰",
      color: "bg-green-500",
      totalTopics: 35,
      studyTime: "55 hours",
      difficulty: "Intermediate",
      completion: 55,
      students: "1.9K"
    },
    {
      name: "English",
      slug: "english",
      description: "Literature analysis, language skills, and written communication",
      icon: "📚",
      color: "bg-purple-500",
      totalTopics: 40,
      studyTime: "52 hours",
      difficulty: "Intermediate",
      completion: 38,
      students: "2.3K"
    }
  ];

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
            Queensland Year 11-12 Subjects
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive collection of subjects, each with interactive study materials,
            practice quizzes, and detailed curriculum coverage aligned with Queensland standards.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
              <div className="text-sm text-gray-600">Core Subjects</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">241</div>
              <div className="text-sm text-gray-600">Study Topics</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">15K+</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">94%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {subjects.map((subject) => (
            <Link key={subject.slug} to={`/subjects/${subject.slug}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-blue-200 hover:border-sky-blue-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{subject.icon}</div>
                    <Badge className={getDifficultyColor(subject.difficulty)}>
                      {subject.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{subject.name}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {subject.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Your Progress</span>
                        <span className="font-medium">{subject.completion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sky-blue-500 h-2 rounded-full"
                          style={{ width: `${subject.completion}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Subject Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {subject.totalTopics} topics
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {subject.studyTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {subject.students} students
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        QLD Curriculum
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      <Button className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                        {subject.completion > 0 ? 'Continue' : 'Start'} Learning
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of Queensland students who are already using StudyMate to achieve their academic goals.
              Start with any subject and track your progress towards exam success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-sky-blue-600 hover:bg-gray-100">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  View Your Progress
                </Button>
              </Link>
              <Link to="/flashcards">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Start with Flashcards
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
