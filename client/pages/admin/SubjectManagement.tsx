import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { 
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Settings,
  Brain,
  Trophy,
  FileText,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Bot,
  Download,
  Upload,
  MoreHorizontal
} from "lucide-react";

interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "active" | "draft" | "inactive";
  totalTopics: number;
  studyTime: string;
  lastUpdated: string;
  contentGenerated: {
    flashcards: number;
    quizzes: number;
    notes: number;
  };
  aiStatus: "ready" | "generating" | "pending" | "error";
  curriculum: {
    overview: string;
    learningObjectives: string[];
    prerequisites: string[];
  };
}

// Mock subjects data
const subjectsData: Subject[] = [
  {
    id: "math-methods",
    name: "Mathematical Methods",
    slug: "mathematical-methods",
    description: "Master calculus, functions, and statistical analysis for Year 11-12",
    icon: "📊",
    difficulty: "Advanced",
    status: "active",
    totalTopics: 45,
    studyTime: "68 hours",
    lastUpdated: "2024-01-15",
    contentGenerated: {
      flashcards: 35,
      quizzes: 15,
      notes: 8
    },
    aiStatus: "ready",
    curriculum: {
      overview: "Mathematical Methods provides students with advanced mathematical skills including calculus, functions, probability, and statistics. Students develop mathematical reasoning and problem-solving capabilities.",
      learningObjectives: [
        "Apply differential and integral calculus",
        "Analyze functions and their properties", 
        "Use probability and statistics in real contexts",
        "Model real-world situations mathematically"
      ],
      prerequisites: ["Year 10 Mathematics", "Algebra proficiency"]
    }
  },
  {
    id: "specialist-math",
    name: "Specialist Mathematics",
    slug: "specialist-mathematics", 
    description: "Advanced mathematics including complex numbers, vectors, and further calculus",
    icon: "🔢",
    difficulty: "Advanced",
    status: "active",
    totalTopics: 42,
    studyTime: "75 hours",
    lastUpdated: "2024-01-14",
    contentGenerated: {
      flashcards: 30,
      quizzes: 12,
      notes: 7
    },
    aiStatus: "generating",
    curriculum: {
      overview: "Specialist Mathematics extends and deepens mathematical knowledge, particularly in calculus, and provides systematic study of the mathematics of motion in two and three dimensions.",
      learningObjectives: [
        "Work with complex numbers and polynomials",
        "Apply advanced calculus techniques",
        "Analyze motion in multiple dimensions",
        "Use mathematical modeling for complex systems"
      ],
      prerequisites: ["Mathematical Methods (concurrent)", "Strong algebra foundation"]
    }
  },
  {
    id: "physics",
    name: "Physics",
    slug: "physics",
    description: "Understanding mechanics, waves, electricity, and modern physics",
    icon: "⚡",
    difficulty: "Advanced", 
    status: "active",
    totalTopics: 39,
    studyTime: "71 hours",
    lastUpdated: "2024-01-13",
    contentGenerated: {
      flashcards: 25,
      quizzes: 10,
      notes: 6
    },
    aiStatus: "ready",
    curriculum: {
      overview: "Physics develops students' understanding of the natural world through the study of matter, forces, energy, and their interactions.",
      learningObjectives: [
        "Apply principles of mechanics and thermodynamics",
        "Understand wave phenomena and electromagnetic theory",
        "Explore atomic and nuclear physics",
        "Conduct scientific investigations and analysis"
      ],
      prerequisites: ["Mathematical Methods (concurrent)", "Year 10 Science"]
    }
  },
  {
    id: "engineering",
    name: "Engineering",
    slug: "engineering",
    description: "Design thinking, problem-solving, and engineering systems",
    icon: "⚙️",
    difficulty: "Advanced",
    status: "draft",
    totalTopics: 38,
    studyTime: "62 hours", 
    lastUpdated: "2024-01-12",
    contentGenerated: {
      flashcards: 20,
      quizzes: 8,
      notes: 4
    },
    aiStatus: "pending",
    curriculum: {
      overview: "Engineering focuses on applying scientific and mathematical principles to design, build, and analyze technological solutions.",
      learningObjectives: [
        "Apply engineering design process",
        "Analyze and evaluate engineering systems",
        "Use mathematical modeling in engineering contexts",
        "Consider ethical and environmental implications"
      ],
      prerequisites: ["Mathematical Methods", "Physics (recommended)"]
    }
  },
  {
    id: "economics",
    name: "Economics", 
    slug: "economics",
    description: "Microeconomics, macroeconomics, and market analysis",
    icon: "💰",
    difficulty: "Intermediate",
    status: "active",
    totalTopics: 35,
    studyTime: "55 hours",
    lastUpdated: "2024-01-11",
    contentGenerated: {
      flashcards: 28,
      quizzes: 14,
      notes: 6
    },
    aiStatus: "ready",
    curriculum: {
      overview: "Economics develops students' understanding of economic systems, markets, and the role of government in economic activity.",
      learningObjectives: [
        "Analyze market structures and behavior",
        "Understand macroeconomic indicators and policy",
        "Evaluate economic decision-making",
        "Apply economic concepts to real-world scenarios"
      ],
      prerequisites: ["Year 10 Mathematics", "General literacy skills"]
    }
  },
  {
    id: "english",
    name: "English",
    slug: "english", 
    description: "Literature analysis, language skills, and written communication",
    icon: "📚",
    difficulty: "Intermediate",
    status: "active",
    totalTopics: 40,
    studyTime: "52 hours",
    lastUpdated: "2024-01-16",
    contentGenerated: {
      flashcards: 32,
      quizzes: 16,
      notes: 9
    },
    aiStatus: "ready",
    curriculum: {
      overview: "English develops students' skills in reading, writing, speaking, listening, and viewing. Students engage with a variety of texts and develop critical thinking skills.",
      learningObjectives: [
        "Analyze and interpret literary and non-literary texts",
        "Produce effective written and spoken communication",
        "Develop critical and creative thinking skills",
        "Understand language features and conventions"
      ],
      prerequisites: ["Year 10 English", "General literacy competence"]
    }
  }
];

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState<Subject[]>(subjectsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "draft" | "inactive">("all");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "edit" | "view">("list");

  const filteredSubjects = subjects.filter(subject => {
    const matchesSearch = subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || subject.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      case "inactive": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getAIStatusIcon = (status: string) => {
    switch (status) {
      case "ready": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "generating": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "pending": return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "error": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSubjectAction = (action: string, subject: Subject) => {
    switch (action) {
      case "view":
        setSelectedSubject(subject);
        setViewMode("view");
        break;
      case "edit":
        setSelectedSubject(subject);
        setViewMode("edit");
        break;
      case "generate":
        // Trigger AI content generation
        console.log("Generate content for", subject.name);
        break;
      case "delete":
        if (confirm(`Are you sure you want to delete ${subject.name}?`)) {
          setSubjects(subjects.filter(s => s.id !== subject.id));
        }
        break;
    }
  };

  // Subject details view
  if (viewMode === "view" && selectedSubject) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => {setViewMode("list"); setSelectedSubject(null);}}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{selectedSubject.icon}</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{selectedSubject.name}</h1>
                  <p className="text-gray-600">{selectedSubject.description}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setViewMode("edit")}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" onClick={() => handleSubjectAction("generate", selectedSubject)}>
                  <Bot className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
              </div>
            </div>
          </div>

          {/* Subject Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Curriculum Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{selectedSubject.curriculum.overview}</p>
                </CardContent>
              </Card>

              {/* Learning Objectives */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedSubject.curriculum.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedSubject.curriculum.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Sidebar */}
            <div className="space-y-6">
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Subject Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge className={getStatusColor(selectedSubject.status)}>
                      {selectedSubject.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Difficulty</span>
                    <Badge className={getDifficultyColor(selectedSubject.difficulty)}>
                      {selectedSubject.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Status</span>
                    <div className="flex items-center space-x-1">
                      {getAIStatusIcon(selectedSubject.aiStatus)}
                      <span className="text-sm capitalize">{selectedSubject.aiStatus}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Topics</span>
                    <span className="font-medium">{selectedSubject.totalTopics}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Study Time</span>
                    <span className="font-medium">{selectedSubject.studyTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated</span>
                    <span className="font-medium">{selectedSubject.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="w-4 h-4 text-purple-600 mr-2" />
                      <span className="text-sm">Flashcards</span>
                    </div>
                    <span className="font-semibold">{selectedSubject.contentGenerated.flashcards}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm">Quizzes</span>
                    </div>
                    <span className="font-semibold">{selectedSubject.contentGenerated.quizzes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm">Study Notes</span>
                    </div>
                    <span className="font-semibold">{selectedSubject.contentGenerated.notes}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main subjects list view
  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subject Management</h1>
              <p className="text-gray-600 mt-2">Manage curriculum, content, and AI generation for all subjects</p>
            </div>
            <Link to="/admin/subjects/new">
              <Button className="bg-study-primary hover:bg-study-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                New Subject
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="border-sky-blue-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => (
            <Card key={subject.id} className="border-sky-blue-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{subject.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge className={`${getStatusColor(subject.status)} text-xs mt-1`}>
                        {subject.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <Link to={`/admin/subjects/${subject.id}/edit`}>
                    <Button size="sm" className="bg-study-primary hover:bg-study-primary/90">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSubjectAction("view", subject)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <Card className="border-sky-blue-200 text-center py-12">
            <CardContent>
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
              <Link to="/admin/subjects/new">
                <Button className="bg-study-primary hover:bg-study-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Subject
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
