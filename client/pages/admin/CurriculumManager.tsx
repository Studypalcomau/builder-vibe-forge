import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { 
  BookOpen,
  Target,
  Plus,
  Edit,
  Trash2,
  Save,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Download,
  Upload,
  Bot,
  Clock,
  Users,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  FileText,
  Zap,
  Eye,
  Settings
} from "lucide-react";

interface LearningObjective {
  id: string;
  description: string;
  level: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
  assessmentMethods: string[];
}

interface Topic {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subjectName: string;
  parentTopicId?: string;
  order: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  prerequisites: string[];
  learningObjectives: LearningObjective[];
  keyTerms: string[];
  assessmentCriteria: string[];
  contentStatus: {
    flashcards: number;
    quizzes: number;
    notes: number;
    lastGenerated?: string;
  };
  qldStandards: {
    unitCode: string;
    achievement: string;
    criteria: string[];
  };
}

interface Subject {
  id: string;
  name: string;
  code: string;
  level: "Year 11" | "Year 12";
  status: "draft" | "active" | "archived";
}

// Mock data
const subjects: Subject[] = [
  { id: "math-methods", name: "Mathematical Methods", code: "MAM", level: "Year 11", status: "active" },
  { id: "specialist-math", name: "Specialist Mathematics", code: "SMA", level: "Year 12", status: "active" },
  { id: "physics", name: "Physics", code: "PHY", level: "Year 11", status: "active" },
  { id: "english", name: "English", code: "ENG", level: "Year 11", status: "active" },
  { id: "economics", name: "Economics", code: "ECO", level: "Year 12", status: "active" },
  { id: "engineering", name: "Engineering", code: "ENG", level: "Year 12", status: "draft" }
];

const mockTopics: Topic[] = [
  {
    id: "topic-1",
    title: "Functions and Relations",
    description: "Introduction to functions, their properties, domain, range, and transformations",
    subjectId: "math-methods",
    subjectName: "Mathematical Methods",
    order: 1,
    difficulty: "Intermediate",
    estimatedHours: 12,
    prerequisites: ["Basic Algebra", "Coordinate Geometry"],
    learningObjectives: [
      {
        id: "obj-1",
        description: "Define and identify different types of functions",
        level: "Understand",
        assessmentMethods: ["Written test", "Problem solving"]
      },
      {
        id: "obj-2",
        description: "Apply function transformations to sketch graphs",
        level: "Apply",
        assessmentMethods: ["Practical task", "Portfolio"]
      }
    ],
    keyTerms: ["domain", "range", "function", "transformation", "composition", "inverse"],
    assessmentCriteria: ["Accuracy in function identification", "Correct application of transformations"],
    contentStatus: {
      flashcards: 15,
      quizzes: 3,
      notes: 2,
      lastGenerated: "2024-01-15"
    },
    qldStandards: {
      unitCode: "Unit 1",
      achievement: "Algebra, Functions and Graphs",
      criteria: ["Define functions", "Analyze function behavior", "Apply transformations"]
    }
  },
  {
    id: "topic-2",
    title: "Differential Calculus",
    description: "Introduction to derivatives, differentiation rules, and applications",
    subjectId: "math-methods",
    subjectName: "Mathematical Methods",
    order: 2,
    difficulty: "Advanced",
    estimatedHours: 18,
    prerequisites: ["Functions and Relations", "Limits"],
    learningObjectives: [
      {
        id: "obj-3",
        description: "Calculate derivatives using fundamental rules",
        level: "Apply",
        assessmentMethods: ["Written examination", "Problem solving tasks"]
      },
      {
        id: "obj-4",
        description: "Solve optimization problems using calculus",
        level: "Analyze",
        assessmentMethods: ["Investigation", "Real-world applications"]
      }
    ],
    keyTerms: ["derivative", "limit", "tangent", "rate of change", "optimization", "critical points"],
    assessmentCriteria: ["Correct application of differentiation rules", "Problem-solving accuracy"],
    contentStatus: {
      flashcards: 22,
      quizzes: 5,
      notes: 3,
      lastGenerated: "2024-01-14"
    },
    qldStandards: {
      unitCode: "Unit 3",
      achievement: "Calculus and Further Functions",
      criteria: ["Apply differentiation", "Solve related rate problems", "Analyze function behavior"]
    }
  },
  {
    id: "topic-3",
    title: "Forces and Motion",
    description: "Understanding Newton's laws, forces, and motion in one and two dimensions",
    subjectId: "physics",
    subjectName: "Physics",
    order: 1,
    difficulty: "Intermediate",
    estimatedHours: 16,
    prerequisites: ["Basic Mathematics", "Vector concepts"],
    learningObjectives: [
      {
        id: "obj-5",
        description: "Apply Newton's laws to analyze motion",
        level: "Apply",
        assessmentMethods: ["Practical investigation", "Problem solving"]
      }
    ],
    keyTerms: ["force", "acceleration", "momentum", "friction", "Newton's laws"],
    assessmentCriteria: ["Correct application of physics principles", "Problem-solving methodology"],
    contentStatus: {
      flashcards: 18,
      quizzes: 4,
      notes: 2,
      lastGenerated: "2024-01-13"
    },
    qldStandards: {
      unitCode: "Unit 1",
      achievement: "Thermal, Nuclear and Electrical Physics",
      criteria: ["Analyze motion", "Apply conservation laws", "Investigate forces"]
    }
  }
];

export default function CurriculumManager() {
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredTopics = topics.filter(topic => {
    const matchesSubject = selectedSubject === "all" || topic.subjectId === selectedSubject;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getBloomLevel = (level: string) => {
    const colors: Record<string, string> = {
      "Remember": "bg-blue-100 text-blue-700",
      "Understand": "bg-green-100 text-green-700",
      "Apply": "bg-yellow-100 text-yellow-700",
      "Analyze": "bg-orange-100 text-orange-700",
      "Evaluate": "bg-red-100 text-red-700",
      "Create": "bg-purple-100 text-purple-700"
    };
    return colors[level] || "bg-gray-100 text-gray-700";
  };

  const generateContent = (topicId: string) => {
    console.log("Generating content for topic:", topicId);
    // Trigger AI content generation for specific topic
  };

  const exportCurriculum = () => {
    console.log("Exporting curriculum data");
    // Export curriculum as JSON/Excel
  };

  // Topic detail view
  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setSelectedTopic(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Curriculum
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedTopic.title}</h1>
                <p className="text-gray-600 mt-2">{selectedTopic.subjectName}</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => generateContent(selectedTopic.id)}>
                  <Bot className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
                <Button onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Save Changes" : "Edit Topic"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Topic Overview */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Topic Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="title">Topic Title</Label>
                        <Input
                          id="title"
                          value={selectedTopic.title}
                          onChange={(e) => setSelectedTopic({...selectedTopic, title: e.target.value})}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={selectedTopic.description}
                          onChange={(e) => setSelectedTopic({...selectedTopic, description: e.target.value})}
                          rows={3}
                          className="mt-1"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700 leading-relaxed">{selectedTopic.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge className={getDifficultyColor(selectedTopic.difficulty)}>
                          {selectedTopic.difficulty}
                        </Badge>
                        <span className="text-gray-600">{selectedTopic.estimatedHours} hours</span>
                        <span className="text-gray-600">Order: {selectedTopic.order}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Learning Objectives */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                  <CardDescription>Bloom's taxonomy aligned learning outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTopic.learningObjectives.map((objective, index) => (
                      <div key={objective.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="text-gray-900">{objective.description}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getBloomLevel(objective.level)} variant="outline">
                                {objective.level}
                              </Badge>
                              <div className="text-sm text-gray-600">
                                Assessment: {objective.assessmentMethods.join(", ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* QLD Standards Alignment */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Queensland Standards Alignment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit Code:</span>
                      <span className="font-medium">{selectedTopic.qldStandards.unitCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Achievement Standard:</span>
                      <span className="font-medium">{selectedTopic.qldStandards.achievement}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Criteria:</span>
                      <ul className="mt-1 space-y-1">
                        {selectedTopic.qldStandards.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{criterion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Content Status */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Generated Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Flashcards</span>
                      <span className="font-semibold">{selectedTopic.contentStatus.flashcards}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Quizzes</span>
                      <span className="font-semibold">{selectedTopic.contentStatus.quizzes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Study Notes</span>
                      <span className="font-semibold">{selectedTopic.contentStatus.notes}</span>
                    </div>
                    {selectedTopic.contentStatus.lastGenerated && (
                      <div className="text-xs text-gray-500 pt-2 border-t">
                        Last generated: {selectedTopic.contentStatus.lastGenerated}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Prerequisites */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Prerequisites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedTopic.prerequisites.map((prereq, index) => (
                      <Badge key={index} variant="outline" className="block text-center">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Terms */}
              <Card className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle>Key Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedTopic.keyTerms.map((term, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main curriculum management view
  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Curriculum Management</h1>
              <p className="text-gray-600 mt-2">Manage topics, learning objectives, and Queensland standards alignment</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={exportCurriculum}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Link to="/admin/subjects/new">
                <Button className="bg-study-primary hover:bg-study-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  New Topic
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-sky-blue-200 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <Target className="w-8 h-8 text-sky-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{topics.length}</div>
              <div className="text-sm text-gray-600">Total Topics</div>
            </CardContent>
          </Card>
          
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{subjects.filter(s => s.status === "active").length}</div>
              <div className="text-sm text-gray-600">Active Subjects</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {topics.reduce((total, topic) => total + topic.contentStatus.flashcards + topic.contentStatus.quizzes + topic.contentStatus.notes, 0)}
              </div>
              <div className="text-sm text-gray-600">Content Items</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {topics.reduce((total, topic) => total + topic.estimatedHours, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Hours</div>
            </CardContent>
          </Card>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {filteredTopics.map((topic) => (
            <Card key={topic.id} className="border-sky-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                      <Badge className={getDifficultyColor(topic.difficulty)}>
                        {topic.difficulty}
                      </Badge>
                      <Badge variant="outline">{topic.subjectName}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{topic.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{topic.estimatedHours}h</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span>{topic.learningObjectives.length} objectives</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-gray-400" />
                        <span>{topic.contentStatus.flashcards + topic.contentStatus.quizzes + topic.contentStatus.notes} items</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span>{topic.qldStandards.unitCode}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => generateContent(topic.id)}
                    >
                      <Bot className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTopics.length === 0 && (
            <Card className="border-sky-blue-200 text-center py-12">
              <CardContent>
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No topics found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters.</p>
                <Link to="/admin/subjects/new">
                  <Button className="bg-study-primary hover:bg-study-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Topic
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
