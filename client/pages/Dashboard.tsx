import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BookOpen,
  Brain,
  Trophy,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  Play,
  Flame,
  BarChart3,
  Activity,
  Users,
  Zap,
  ChevronRight
} from "lucide-react";

// Mock data - in a real app this would come from an API
const dashboardData = {
  user: {
    name: "Alex Thompson",
    level: "Advanced Learner",
    joinDate: "September 2024",
    avatar: "AT"
  },
  overview: {
    totalStudyTime: 47,
    streakDays: 12,
    completedTopics: 23,
    averageScore: 87,
    rank: "Top 15%"
  },
  subjects: [
    {
      name: "Mathematical Methods",
      slug: "mathematical-methods",
      progress: 68,
      lastStudied: "2 hours ago",
      nextTopic: "Integration Techniques",
      recentScore: 92,
      color: "bg-blue-500",
      icon: "📊"
    },
    {
      name: "Specialist Mathematics",
      slug: "specialist-mathematics",
      progress: 45,
      lastStudied: "1 day ago",
      nextTopic: "Complex Numbers",
      recentScore: 85,
      color: "bg-indigo-500",
      icon: "🔢"
    },
    {
      name: "Physics",
      slug: "physics",
      progress: 28,
      lastStudied: "3 days ago",
      nextTopic: "Mechanics",
      recentScore: 81,
      color: "bg-red-500",
      icon: "⚡"
    },
    {
      name: "Engineering",
      slug: "engineering",
      progress: 32,
      lastStudied: "5 days ago",
      nextTopic: "Design Process",
      recentScore: 78,
      color: "bg-orange-500",
      icon: "⚙️"
    }
  ],
  recentActivity: [
    {
      type: "topic_completed",
      subject: "Mathematics",
      item: "Differential Calculus",
      score: 92,
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      type: "quiz_taken",
      subject: "Biology", 
      item: "Genetics Quiz",
      score: 85,
      time: "1 day ago",
      icon: Trophy,
      color: "text-blue-600"
    },
    {
      type: "flashcards_reviewed",
      subject: "Mathematics",
      item: "25 flashcards reviewed",
      score: null,
      time: "2 days ago",
      icon: Brain,
      color: "text-purple-600"
    },
    {
      type: "topic_started",
      subject: "Chemistry",
      item: "Chemical Bonding",
      score: null,
      time: "3 days ago",
      icon: Play,
      color: "text-orange-600"
    }
  ],

  recommendations: [
    {
      type: "study_suggestion",
      title: "Review Integration Techniques",
      description: "You're doing great in calculus! Complete this topic to maintain momentum.",
      subject: "Mathematics",
      action: "Start Topic",
      link: "/subjects/mathematics/topics/integration-techniques"
    },
    {
      type: "weak_area",
      title: "Focus on Chemical Bonding",
      description: "Your recent chemistry scores suggest more practice needed here.",
      subject: "Chemistry", 
      action: "Practice Quiz",
      link: "/subjects/chemistry/quizzes"
    },
    {
      type: "streak_boost",
      title: "Maintain Your Streak",
      description: "12 days strong! Study for just 15 more minutes today.",
      subject: "Any Subject",
      action: "Quick Review",
      link: "/flashcards"
    }
  ],

};

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");



  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Welcome back, {dashboardData.user.name}! 👋
              </h1>
              <p className="text-gray-600 mt-2">
                Ready to continue your learning journey? Here's your progress overview.
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Member since</div>
                <div className="font-medium">{dashboardData.user.joinDate}</div>
              </div>
              <div className="w-12 h-12 bg-sky-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {dashboardData.user.avatar}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-sky-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.overview.totalStudyTime}h</div>
              <div className="text-sm text-gray-600">Study Time</div>
            </CardContent>
          </Card>
          

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.overview.completedTopics}</div>
              <div className="text-sm text-gray-600">Topics Done</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.overview.averageScore}%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{dashboardData.overview.rank}</div>
              <div className="text-sm text-gray-600">Class Rank</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subject Progress */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Subject Progress
                </CardTitle>
                <CardDescription>Your current progress across all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.subjects.map((subject, index) => (
                    <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-100">
                            <div className="text-2xl">{subject.icon}</div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">{subject.name}</h3>
                            <p className="text-sm text-gray-600">Last studied: {subject.lastStudied}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 text-xl">{subject.progress}%</div>
                          <div className="text-sm text-gray-600">Score: {subject.recentScore}%</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Progress value={subject.progress} className="h-3" />
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="text-sm text-gray-600 font-medium">Next: {subject.nextTopic}</span>
                        <Link to={`/subjects/${subject.slug}`}>
                          <Button size="sm" className="bg-sky-blue-600 hover:bg-sky-blue-700 text-white">
                            Continue
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest study sessions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.subject} - {activity.item}
                          </p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        {activity.score && (
                          <p className="text-sm text-gray-600">Score: {activity.score}%</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">





          </div>
        </div>

        {/* Recommendations */}
        <Card className="mt-8 border-sky-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>Based on your progress and study patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardData.recommendations.map((rec, index) => (
                <div key={index} className="p-4 border border-sky-blue-200 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-gray-900 mb-2">{rec.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">{rec.subject}</Badge>
                    <Link to={rec.link}>
                      <Button size="sm" className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                        {rec.action}
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
