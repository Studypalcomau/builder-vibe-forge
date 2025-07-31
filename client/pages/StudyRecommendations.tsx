import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  ArrowLeft,
  Brain,
  Trophy,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Target,
  BookOpen,
  Star
} from "lucide-react";

export default function StudyRecommendations() {
  const { slug } = useParams();

  const subjectNames: Record<string, string> = {
    "mathematical-methods": "Mathematical Methods",
    "specialist-mathematics": "Specialist Mathematics",
    physics: "Physics",
    biology: "Biology",
    chemistry: "Chemistry",
    english: "English",
    engineering: "Engineering",
    economics: "Economics"
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  // Mock performance data for all subtopics
  const subtopicPerformance = [
    {
      unit: "Unit 1: Algebra and Functions",
      topic: "Functions and Relations",
      subtopic: "Domain and Range",
      score: 95,
      attempts: 3,
      lastAttempt: "2024-12-10",
      status: "mastered",
      weakness: null,
      unitIndex: 0,
      topicIndex: 0,
      subtopicIndex: 0
    },
    {
      unit: "Unit 1: Algebra and Functions", 
      topic: "Functions and Relations",
      subtopic: "Function Types",
      score: 78,
      attempts: 2,
      lastAttempt: "2024-12-01",
      status: "good",
      weakness: "Quadratic function vertex form",
      unitIndex: 0,
      topicIndex: 0,
      subtopicIndex: 1
    },
    {
      unit: "Unit 1: Algebra and Functions",
      topic: "Functions and Relations", 
      subtopic: "Transformations",
      score: 65,
      attempts: 2,
      lastAttempt: "2024-11-28",
      status: "needs_work",
      weakness: "Horizontal and vertical shifts",
      unitIndex: 0,
      topicIndex: 0,
      subtopicIndex: 2
    },
    {
      unit: "Unit 2: Calculus",
      topic: "Differential Calculus",
      subtopic: "Limits",
      score: 45,
      attempts: 1,
      lastAttempt: "2024-11-15",
      status: "needs_work",
      weakness: "One-sided limits and continuity",
      unitIndex: 1,
      topicIndex: 0,
      subtopicIndex: 0
    },
    {
      unit: "Unit 2: Calculus",
      topic: "Differential Calculus",
      subtopic: "Derivatives",
      score: 72,
      attempts: 3,
      lastAttempt: "2024-12-05",
      status: "good",
      weakness: "Chain rule applications",
      unitIndex: 1,
      topicIndex: 0,
      subtopicIndex: 1
    },
    {
      unit: "Unit 2: Calculus",
      topic: "Integral Calculus",
      subtopic: "Antiderivatives",
      score: 0,
      attempts: 0,
      lastAttempt: null,
      status: "not_started",
      weakness: "No attempts yet",
      unitIndex: 1,
      topicIndex: 1,
      subtopicIndex: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "mastered": return "bg-green-100 text-green-700 border-green-200";
      case "good": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "needs_work": return "bg-red-100 text-red-700 border-red-200";
      case "not_started": return "bg-gray-100 text-gray-700 border-gray-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mastered": return <CheckCircle className="w-4 h-4" />;
      case "good": return <TrendingUp className="w-4 h-4" />;
      case "needs_work": return <AlertCircle className="w-4 h-4" />;
      case "not_started": return <Target className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "mastered": return "Mastered";
      case "good": return "Good Progress";
      case "needs_work": return "Needs Improvement";
      case "not_started": return "Not Started";
      default: return "Unknown";
    }
  };

  const getPriorityRecommendation = (status: string, score: number) => {
    if (status === "not_started") return "Start with basic concepts";
    if (status === "needs_work") return "Focus on fundamentals and practice";
    if (status === "good") return "Review weak areas and advance";
    return "Maintain mastery with periodic review";
  };

  // Group performance by priority
  const needsWork = subtopicPerformance.filter(p => p.status === "needs_work" || p.status === "not_started");
  const good = subtopicPerformance.filter(p => p.status === "good");
  const mastered = subtopicPerformance.filter(p => p.status === "mastered");

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to={`/subjects/${slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Study Recommendations</h1>
            <p className="text-gray-600">Personalized study plan based on your performance across all topics</p>
          </div>
        </div>

        {/* Performance Summary */}
        <Card className="border-sky-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              Your Learning Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{mastered.length}</div>
                <div className="text-sm text-gray-600">Mastered Topics</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{good.length}</div>
                <div className="text-sm text-gray-600">Improving Topics</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{needsWork.length}</div>
                <div className="text-sm text-gray-600">Needs Focus</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(subtopicPerformance.filter(p => p.score > 0).reduce((acc, p) => acc + p.score, 0) / subtopicPerformance.filter(p => p.score > 0).length) || 0}%
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Priority Areas - Needs Work */}
        {needsWork.length > 0 && (
          <Card className="border-red-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                Priority Focus Areas ({needsWork.length} topics)
              </CardTitle>
              <CardDescription>
                These topics need immediate attention to strengthen your foundation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {needsWork.map((item, index) => (
                  <div key={index} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.subtopic}</div>
                        <div className="text-sm text-gray-600">{item.unit} → {item.topic}</div>
                        <div className="text-sm text-red-600 mt-1">Weakness: {item.weakness}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{getStatusText(item.status)}</span>
                        </Badge>
                        {item.score > 0 && (
                          <div className="text-sm text-gray-600 mt-1">{item.score}% • {item.attempts} attempts</div>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Recommendation: {getPriorityRecommendation(item.status, item.score)}
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/subjects/${slug}/notes/${item.unitIndex}-${item.topicIndex}-${item.subtopicIndex}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Study Notes
                        </Button>
                      </Link>
                      <Link to={`/subjects/${slug}/quiz/${item.unitIndex}-${item.topicIndex}-${item.subtopicIndex}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          Practice Quiz
                        </Button>
                      </Link>
                      <Link to={`/subjects/${slug}/flashcards`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          Flashcards
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Good Progress Areas */}
        {good.length > 0 && (
          <Card className="border-yellow-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-700">
                <TrendingUp className="w-5 h-5" />
                Areas for Advancement ({good.length} topics)
              </CardTitle>
              <CardDescription>
                You're doing well here - polish these areas for mastery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {good.map((item, index) => (
                  <div key={index} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.subtopic}</div>
                        <div className="text-sm text-gray-600">{item.unit} → {item.topic}</div>
                        <div className="text-sm text-yellow-600 mt-1">Focus on: {item.weakness}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{getStatusText(item.status)}</span>
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">{item.score}% • {item.attempts} attempts</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        Recommendation: {getPriorityRecommendation(item.status, item.score)}
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/subjects/${slug}/notes/${item.unitIndex}-${item.topicIndex}-${item.subtopicIndex}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          Review Notes
                        </Button>
                      </Link>
                      <Link to={`/subjects/${slug}/quiz/${item.unitIndex}-${item.topicIndex}-${item.subtopicIndex}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          Challenge Quiz
                        </Button>
                      </Link>
                      <Link to={`/subjects/${slug}/flashcards`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Brain className="w-3 h-3 mr-1" />
                          Review Cards
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mastered Areas */}
        {mastered.length > 0 && (
          <Card className="border-green-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Star className="w-5 h-5" />
                Mastered Topics ({mastered.length} topics)
              </CardTitle>
              <CardDescription>
                Excellent work! Keep these sharp with periodic review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mastered.map((item, index) => (
                  <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.subtopic}</div>
                        <div className="text-sm text-gray-600">{item.unit} → {item.topic}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1">{getStatusText(item.status)}</span>
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">{item.score}% • {item.attempts} attempts</div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <Progress value={item.score} className="h-2" />
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/subjects/${slug}/quiz/${item.unitIndex}-${item.topicIndex}-${item.subtopicIndex}`}>
                        <Button size="sm" variant="outline" className="text-xs">
                          <Trophy className="w-3 h-3 mr-1" />
                          Maintain Skills
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Study Plan */}
        <Card className="border-sky-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Recommended Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900 mb-2">This Week's Focus</div>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Spend 60% of study time on Priority Focus Areas (red sections above)</li>
                  <li>Allocate 30% to advancing Good Progress areas (yellow sections)</li>
                  <li>Reserve 10% for quick reviews of Mastered topics (green sections)</li>
                </ol>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">Daily Study Routine</div>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Start with 10 min flashcard review</li>
                    <li>• Focus 20-30 min on one priority topic</li>
                    <li>• Take practice quiz on studied topic</li>
                    <li>• End with comprehensive test question</li>
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900 mb-2">Weekly Goals</div>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Improve lowest scoring topic by 15%</li>
                    <li>• Complete study notes for 2 topics</li>
                    <li>• Take one comprehensive test</li>
                    <li>• Review 3 mastered topics</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
