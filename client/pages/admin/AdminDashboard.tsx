import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { 
  Settings, 
  BookOpen, 
  Brain, 
  Trophy,
  Users,
  BarChart3,
  Plus,
  FileText,
  Zap,
  Database,
  Bot,
  ChevronRight,
  Activity,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";

// Mock admin data
const adminData = {
  overview: {
    totalSubjects: 6,
    totalTopics: 241,
    totalStudents: 15247,
    activeGenerations: 3,
    contentItems: {
      flashcards: 156,
      quizzes: 89,
      notes: 45
    }
  },
  subjects: [
    {
      id: "math-methods",
      name: "Mathematical Methods",
      status: "active",
      topics: 45,
      lastUpdated: "2024-01-15",
      contentGenerated: {
        flashcards: 35,
        quizzes: 15,
        notes: 8
      },
      aiStatus: "ready"
    },
    {
      id: "specialist-math",
      name: "Specialist Mathematics", 
      status: "active",
      topics: 42,
      lastUpdated: "2024-01-14",
      contentGenerated: {
        flashcards: 30,
        quizzes: 12,
        notes: 7
      },
      aiStatus: "generating"
    },
    {
      id: "physics",
      name: "Physics",
      status: "active", 
      topics: 39,
      lastUpdated: "2024-01-13",
      contentGenerated: {
        flashcards: 25,
        quizzes: 10,
        notes: 6
      },
      aiStatus: "ready"
    },
    {
      id: "engineering",
      name: "Engineering",
      status: "draft",
      topics: 38,
      lastUpdated: "2024-01-12",
      contentGenerated: {
        flashcards: 20,
        quizzes: 8,
        notes: 4
      },
      aiStatus: "pending"
    },
    {
      id: "economics",
      name: "Economics",
      status: "active",
      topics: 35,
      lastUpdated: "2024-01-11", 
      contentGenerated: {
        flashcards: 28,
        quizzes: 14,
        notes: 6
      },
      aiStatus: "ready"
    },
    {
      id: "english",
      name: "English",
      status: "active",
      topics: 40,
      lastUpdated: "2024-01-16",
      contentGenerated: {
        flashcards: 32,
        quizzes: 16,
        notes: 9
      },
      aiStatus: "ready"
    }
  ],
  recentActivity: [
    {
      type: "content_generated",
      message: "AI generated 5 new flashcards for Physics - Mechanics",
      time: "2 hours ago",
      icon: Brain,
      color: "text-green-600"
    },
    {
      type: "subject_updated", 
      message: "Updated curriculum for Mathematical Methods",
      time: "4 hours ago",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      type: "quiz_generated",
      message: "Generated quiz: English Literature Analysis",
      time: "6 hours ago",
      icon: Trophy,
      color: "text-purple-600"
    },
    {
      type: "system_update",
      message: "AI content generation model updated",
      time: "1 day ago",
      icon: Bot,
      color: "text-orange-600"
    }
  ],
  generationQueue: [
    {
      id: "gen-1",
      subject: "Physics",
      topic: "Quantum Mechanics",
      type: "flashcards",
      status: "processing",
      progress: 75
    },
    {
      id: "gen-2", 
      subject: "Mathematics",
      topic: "Integration Techniques",
      type: "quiz",
      status: "queued",
      progress: 0
    },
    {
      id: "gen-3",
      subject: "English",
      topic: "Poetry Analysis", 
      type: "notes",
      status: "processing",
      progress: 45
    }
  ]
};

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      case "inactive": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getAIStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "generating": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "pending": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Manage subjects, curriculum, and AI-powered content generation
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/admin/subjects/new">
                <Button className="bg-study-primary hover:bg-study-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Subject
                </Button>
              </Link>

            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-sky-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{adminData.overview.totalSubjects}</div>
              <div className="text-sm text-gray-600">Active Subjects</div>
            </CardContent>
          </Card>
          
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{adminData.overview.totalTopics}</div>
              <div className="text-sm text-gray-600">Total Topics</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{adminData.overview.totalStudents.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Students</div>
            </CardContent>
          </Card>


        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subjects Management */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Database className="w-5 h-5 mr-2" />
                      Subject Management
                    </CardTitle>
                    <CardDescription>Manage curriculum and content for all subjects</CardDescription>
                  </div>
                  <Link to="/admin/subjects">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.subjects.slice(0, 4).map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <Badge className={getStatusColor(subject.status)}>
                            {subject.status}
                          </Badge>
                          {getAIStatusIcon(subject.aiStatus)}
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>{subject.topics} topics</div>
                          <div>{subject.contentGenerated.flashcards} flashcards</div>
                          <div>{subject.contentGenerated.quizzes} quizzes</div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Updated: {subject.lastUpdated}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Link to={`/admin/subjects/${subject.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link to={`/admin/subjects/${subject.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Questions Management */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2" />
                      Questions Management
                    </CardTitle>
                    <CardDescription>View and manage all questions by curriculum structure</CardDescription>
                  </div>
                  <Link to="/admin/questions">
                    <Button variant="outline" size="sm">
                      View Table
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">156</div>
                    <div className="text-sm text-blue-600">Total Questions</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">89</div>
                    <div className="text-sm text-green-600">Flashcards</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-700">67</div>
                    <div className="text-sm text-purple-600">Quiz Questions</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Questions organized by Unit → Topic → Subtopic for easy curriculum management
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Right Column - Side Panels */}
          <div className="space-y-8">





          </div>
        </div>
      </div>
    </div>
  );
}
