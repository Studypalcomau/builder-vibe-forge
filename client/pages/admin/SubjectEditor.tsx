import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { 
  ArrowLeft,
  Save,
  Upload,
  FileText,
  Plus,
  Trash2,
  Eye,
  Download,
  BookOpen,
  Target,
  GraduationCap,
  Clock,
  AlertCircle,
  CheckCircle,
  Bot,
  Paperclip,
  X,
  Edit,
  ChevronRight,
  ChevronDown
} from "lucide-react";

interface Topic {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  prerequisites: string[];
  keyTerms: string[];
  assessmentCriteria: string[];
}

interface ExamPaper {
  id: string;
  title: string;
  year: number;
  type: "trial" | "final" | "practice";
  fileName: string;
  fileSize: string;
  uploadDate: string;
  processed: boolean;
  extractedTopics?: string[];
}

interface CurriculumDocument {
  id: string;
  title: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  processed: boolean;
  extractedTopics?: string[];
  aiAnalysis?: {
    topicsIdentified: number;
    learningObjectivesExtracted: number;
    assessmentCriteriaFound: number;
  };
}

interface SubjectMaterial {
  id: string;
  title: string;
  type: "textbook" | "worksheet" | "video" | "reference" | "other";
  fileName: string;
  fileSize: string;
  uploadDate: string;
  description?: string;
  processed: boolean;
  relevantTopics?: string[];
}

interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: "draft" | "active" | "inactive";
  estimatedHours: number;
  curriculum: {
    overview: string;
    learningOutcomes: string[];
    prerequisites: string[];
    assessmentMethods: string[];
    curriculumDocument?: CurriculumDocument;
  };
  topics: Topic[];
  examPapers: ExamPaper[];
  subjectMaterials: SubjectMaterial[];
  contentGeneration: {
    flashcardsGenerated: number;
    quizzesGenerated: number;
    notesGenerated: number;
    lastGenerated: string;
  };
}

// Mock data for editing mode
const mockSubject: Subject = {
  id: "math-methods",
  name: "Mathematical Methods", 
  slug: "mathematical-methods",
  description: "Master calculus, functions, and statistical analysis for Year 11-12",
  icon: "📊",
  difficulty: "Advanced",
  status: "active",
  estimatedHours: 68,
  curriculum: {
    overview: "Mathematical Methods provides students with advanced mathematical skills including calculus, functions, probability, and statistics. Students develop mathematical reasoning and problem-solving capabilities essential for STEM fields.",
    learningOutcomes: [
      "Apply differential and integral calculus to solve real-world problems",
      "Analyze and manipulate various types of functions",
      "Use probability and statistics to interpret data",
      "Model mathematical relationships in practical contexts"
    ],
    prerequisites: ["Year 10 Mathematics", "Algebra proficiency", "Basic trigonometry"],
    assessmentMethods: ["Written examinations", "Practical investigations", "Problem-solving tasks", "Mathematical modeling projects"]
  },
  topics: [
    {
      id: "topic-1",
      title: "Functions and Relations",
      description: "Understanding different types of functions, their properties, and transformations",
      learningObjectives: [
        "Define and classify different types of functions",
        "Apply function transformations",
        "Solve function equations and inequalities"
      ],
      difficulty: "Intermediate",
      estimatedHours: 12,
      prerequisites: ["Basic algebra", "Coordinate geometry"],
      keyTerms: ["domain", "range", "transformation", "composite function", "inverse function"],
      assessmentCriteria: ["Function identification", "Transformation application", "Problem solving accuracy"]
    },
    {
      id: "topic-2",
      title: "Differential Calculus",
      description: "Introduction to derivatives, differentiation rules, and applications",
      learningObjectives: [
        "Understand the concept of derivatives",
        "Apply differentiation rules",
        "Use derivatives to solve optimization problems"
      ],
      difficulty: "Advanced",
      estimatedHours: 18,
      prerequisites: ["Functions and Relations", "Limits"],
      keyTerms: ["derivative", "tangent", "rate of change", "optimization", "critical points"],
      assessmentCriteria: ["Rule application", "Problem solving", "Real-world applications"]
    }
  ],
  subjectMaterials: [],
  examPapers: [
    {
      id: "exam-1",
      title: "QLD Mathematical Methods Trial Exam",
      year: 2023,
      type: "trial",
      fileName: "math_methods_trial_2023.pdf",
      fileSize: "2.4 MB",
      uploadDate: "2024-01-15",
      processed: true,
      extractedTopics: ["Calculus", "Functions", "Statistics", "Probability"]
    },
    {
      id: "exam-2",
      title: "Mathematical Methods Final Exam",
      year: 2022,
      type: "final", 
      fileName: "math_methods_final_2022.pdf",
      fileSize: "3.1 MB",
      uploadDate: "2024-01-14",
      processed: true,
      extractedTopics: ["Integration", "Differentiation", "Modeling", "Data Analysis"]
    }
  ],
  contentGeneration: {
    flashcardsGenerated: 35,
    quizzesGenerated: 15,
    notesGenerated: 8,
    lastGenerated: "2024-01-15"
  }
};

export default function SubjectEditor() {
  const { id } = useParams();
  const isEditMode = id !== "new";
  
  const [subject, setSubject] = useState<Subject>(isEditMode ? mockSubject : {
    id: "",
    name: "",
    slug: "",
    description: "",
    icon: "📚",
    difficulty: "Intermediate",
    status: "draft",
    estimatedHours: 40,
    curriculum: {
      overview: "",
      learningOutcomes: [""],
      prerequisites: [""],
      assessmentMethods: [""]
    },
    topics: [],
    examPapers: [],
    subjectMaterials: [],
    contentGeneration: {
      flashcardsGenerated: 0,
      quizzesGenerated: 0,
      notesGenerated: 0,
      lastGenerated: ""
    }
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingCurriculum, setIsUploadingCurriculum] = useState(false);
  const [isUploadingMaterial, setIsUploadingMaterial] = useState(false);

  const handleSave = () => {
    // Save subject to database
    console.log("Saving subject:", subject);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate file upload
      setTimeout(() => {
        const newExamPaper: ExamPaper = {
          id: `exam-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          year: new Date().getFullYear(),
          type: "practice",
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          processed: false
        };
        setSubject(prev => ({
          ...prev,
          examPapers: [...prev.examPapers, newExamPaper]
        }));
        setIsUploading(false);
      }, 2000);
    }
  };

  const handleCurriculumUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingCurriculum(true);
      // Simulate curriculum PDF processing
      setTimeout(() => {
        const newCurriculumDoc: CurriculumDocument = {
          id: `curriculum-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          processed: true,
          extractedTopics: ["Functions and Relations", "Differential Calculus", "Integral Calculus", "Statistics", "Probability"],
          aiAnalysis: {
            topicsIdentified: 12,
            learningObjectivesExtracted: 48,
            assessmentCriteriaFound: 24
          }
        };
        setSubject(prev => ({
          ...prev,
          curriculum: {
            ...prev.curriculum,
            curriculumDocument: newCurriculumDoc
          }
        }));
        setIsUploadingCurriculum(false);
      }, 3000);
    }
  };

  const handleMaterialUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploadingMaterial(true);
      // Simulate material upload
      setTimeout(() => {
        const newMaterial: SubjectMaterial = {
          id: `material-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ""),
          type: "other",
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadDate: new Date().toISOString().split('T')[0],
          processed: false,
          description: ""
        };
        setSubject(prev => ({
          ...prev,
          subjectMaterials: [...prev.subjectMaterials, newMaterial]
        }));
        setIsUploadingMaterial(false);
      }, 2000);
    }
  };

  const addTopic = () => {
    const newTopic: Topic = {
      id: `topic-${Date.now()}`,
      title: "New Topic",
      description: "",
      learningObjectives: [""],
      difficulty: "Intermediate",
      estimatedHours: 4,
      prerequisites: [],
      keyTerms: [],
      assessmentCriteria: []
    };
    setSubject(prev => ({
      ...prev,
      topics: [...prev.topics, newTopic]
    }));
  };

  const updateTopic = (topicId: string, updates: Partial<Topic>) => {
    setSubject(prev => ({
      ...prev,
      topics: prev.topics.map(topic => 
        topic.id === topicId ? { ...topic, ...updates } : topic
      )
    }));
  };

  const deleteTopic = (topicId: string) => {
    setSubject(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic.id !== topicId)
    }));
  };

  const generateContent = () => {
    // Trigger AI content generation based on curriculum and exam papers
    console.log("Generating content for subject:", subject.name);
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/admin/subjects">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subjects
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditMode ? "Edit Subject" : "Create New Subject"}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditMode ? "Modify subject details, curriculum, and content" : "Set up a new subject with curriculum and learning materials"}
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={generateContent}>
                <Bot className="w-4 h-4 mr-2" />
                Generate Content
              </Button>
              <Button onClick={handleSave} className="bg-study-primary hover:bg-study-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Subject
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "basic", label: "Basic Info", icon: BookOpen },
              { id: "curriculum", label: "Curriculum", icon: GraduationCap },
              { id: "topics", label: "Topics", icon: Target },
              { id: "exams", label: "Exam Papers", icon: FileText },
              { id: "materials", label: "Subject Materials", icon: Paperclip },
              { id: "content", label: "Generated Content", icon: Bot }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-sky-blue-500 text-sky-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "basic" && (
          <div className="space-y-6">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Set up the fundamental details for this subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Subject Name *</Label>
                    <Input
                      id="name"
                      value={subject.name}
                      onChange={(e) => setSubject(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Mathematical Methods"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={subject.slug}
                      onChange={(e) => setSubject(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="e.g., mathematical-methods"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={subject.description}
                    onChange={(e) => setSubject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of the subject"
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="icon">Subject Icon</Label>
                    <Input
                      id="icon"
                      value={subject.icon}
                      onChange={(e) => setSubject(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="📊"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <select
                      id="difficulty"
                      value={subject.difficulty}
                      onChange={(e) => setSubject(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="hours">Estimated Hours</Label>
                    <Input
                      id="hours"
                      type="number"
                      value={subject.estimatedHours}
                      onChange={(e) => setSubject(prev => ({ ...prev, estimatedHours: parseInt(e.target.value) || 0 }))}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={subject.status}
                    onChange={(e) => setSubject(prev => ({ ...prev, status: e.target.value as any }))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "curriculum" && (
          <div className="space-y-6">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle>Curriculum Overview</CardTitle>
                <CardDescription>Define the overall curriculum structure and learning framework</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Curriculum PDF Upload Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    AI-Powered Curriculum Upload
                  </h3>
                  <p className="text-blue-700 mb-4">
                    Upload your curriculum PDF and let AI automatically extract topics, learning objectives, and assessment criteria.
                  </p>

                  {subject.curriculum.curriculumDocument ? (
                    <div className="border border-blue-300 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{subject.curriculum.curriculumDocument.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{subject.curriculum.curriculumDocument.fileSize}</span>
                              <span>Uploaded: {subject.curriculum.curriculumDocument.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {subject.curriculum.curriculumDocument.processed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {subject.curriculum.curriculumDocument.aiAnalysis && (
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <h5 className="font-medium text-gray-900 mb-2">AI Analysis Results:</h5>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{subject.curriculum.curriculumDocument.aiAnalysis.topicsIdentified}</div>
                              <div className="text-gray-600">Topics Identified</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{subject.curriculum.curriculumDocument.aiAnalysis.learningObjectivesExtracted}</div>
                              <div className="text-gray-600">Learning Objectives</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">{subject.curriculum.curriculumDocument.aiAnalysis.assessmentCriteriaFound}</div>
                              <div className="text-gray-600">Assessment Criteria</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {subject.curriculum.curriculumDocument.extractedTopics && (
                        <div className="mt-3">
                          <Label className="text-sm text-gray-600">Extracted Topics:</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {subject.curriculum.curriculumDocument.extractedTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleCurriculumUpload}
                        className="hidden"
                        id="curriculum-upload"
                      />
                      <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <label htmlFor="curriculum-upload" className="cursor-pointer">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Curriculum PDF
                        </label>
                      </Button>
                    </div>
                  )}

                  {isUploadingCurriculum && (
                    <div className="mt-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                        <span className="text-blue-700">Processing curriculum document and extracting topics...</span>
                      </div>
                      <Progress value={60} className="mt-2" />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="overview">Curriculum Overview *</Label>
                  <Textarea
                    id="overview"
                    value={subject.curriculum.overview}
                    onChange={(e) => setSubject(prev => ({
                      ...prev,
                      curriculum: { ...prev.curriculum, overview: e.target.value }
                    }))}
                    placeholder="Provide a comprehensive overview of what this subject covers..."
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Learning Outcomes</Label>
                  <div className="mt-2 space-y-2">
                    {subject.curriculum.learningOutcomes.map((outcome, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={outcome}
                          onChange={(e) => {
                            const newOutcomes = [...subject.curriculum.learningOutcomes];
                            newOutcomes[index] = e.target.value;
                            setSubject(prev => ({
                              ...prev,
                              curriculum: { ...prev.curriculum, learningOutcomes: newOutcomes }
                            }));
                          }}
                          placeholder="Learning outcome..."
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newOutcomes = subject.curriculum.learningOutcomes.filter((_, i) => i !== index);
                            setSubject(prev => ({
                              ...prev,
                              curriculum: { ...prev.curriculum, learningOutcomes: newOutcomes }
                            }));
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSubject(prev => ({
                          ...prev,
                          curriculum: {
                            ...prev.curriculum,
                            learningOutcomes: [...prev.curriculum.learningOutcomes, ""]
                          }
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Outcome
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Prerequisites</Label>
                  <div className="mt-2 space-y-2">
                    {subject.curriculum.prerequisites.map((prereq, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={prereq}
                          onChange={(e) => {
                            const newPrereqs = [...subject.curriculum.prerequisites];
                            newPrereqs[index] = e.target.value;
                            setSubject(prev => ({
                              ...prev,
                              curriculum: { ...prev.curriculum, prerequisites: newPrereqs }
                            }));
                          }}
                          placeholder="Prerequisite..."
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newPrereqs = subject.curriculum.prerequisites.filter((_, i) => i !== index);
                            setSubject(prev => ({
                              ...prev,
                              curriculum: { ...prev.curriculum, prerequisites: newPrereqs }
                            }));
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSubject(prev => ({
                          ...prev,
                          curriculum: {
                            ...prev.curriculum,
                            prerequisites: [...prev.curriculum.prerequisites, ""]
                          }
                        }));
                      }}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Prerequisite
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "topics" && (
          <div className="space-y-6">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subject Topics</CardTitle>
                    <CardDescription>Define detailed topics and learning objectives</CardDescription>
                  </div>
                  <Button onClick={addTopic} className="bg-study-primary hover:bg-study-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Topic
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subject.topics.map((topic) => (
                    <div key={topic.id} className="border border-gray-200 rounded-lg">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => setExpandedTopic(
                                expandedTopic === topic.id ? null : topic.id
                              )}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              {expandedTopic === topic.id ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            <div>
                              <h4 className="font-semibold text-gray-900">{topic.title}</h4>
                              <p className="text-sm text-gray-600">{topic.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{topic.difficulty}</Badge>
                            <span className="text-sm text-gray-500">{topic.estimatedHours}h</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteTopic(topic.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {expandedTopic === topic.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Topic Title</Label>
                                <Input
                                  value={topic.title}
                                  onChange={(e) => updateTopic(topic.id, { title: e.target.value })}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label>Estimated Hours</Label>
                                <Input
                                  type="number"
                                  value={topic.estimatedHours}
                                  onChange={(e) => updateTopic(topic.id, { estimatedHours: parseInt(e.target.value) || 0 })}
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={topic.description}
                                onChange={(e) => updateTopic(topic.id, { description: e.target.value })}
                                rows={2}
                                className="mt-1"
                              />
                            </div>

                            <div>
                              <Label>Learning Objectives</Label>
                              <div className="mt-2 space-y-2">
                                {topic.learningObjectives.map((objective, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <Input
                                      value={objective}
                                      onChange={(e) => {
                                        const newObjectives = [...topic.learningObjectives];
                                        newObjectives[index] = e.target.value;
                                        updateTopic(topic.id, { learningObjectives: newObjectives });
                                      }}
                                      placeholder="Learning objective..."
                                      className="flex-1"
                                    />
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newObjectives = topic.learningObjectives.filter((_, i) => i !== index);
                                        updateTopic(topic.id, { learningObjectives: newObjectives });
                                      }}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ))}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    updateTopic(topic.id, {
                                      learningObjectives: [...topic.learningObjectives, ""]
                                    });
                                  }}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Objective
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {subject.topics.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No topics yet</h3>
                      <p className="text-gray-600 mb-4">Start by adding your first topic to define the curriculum structure.</p>
                      <Button onClick={addTopic} className="bg-study-primary hover:bg-study-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Topic
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "exams" && (
          <div className="space-y-6">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Past Exam Papers</CardTitle>
                    <CardDescription>Upload exam papers for AI content generation</CardDescription>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild className="bg-study-primary hover:bg-study-primary/90">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Exam Paper
                      </label>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isUploading && (
                  <div className="mb-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700">Processing uploaded file...</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {subject.examPapers.map((paper) => (
                    <div key={paper.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div>
                            <h4 className="font-semibold text-gray-900">{paper.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{paper.year}</span>
                              <span className="capitalize">{paper.type}</span>
                              <span>{paper.fileSize}</span>
                              <span>Uploaded: {paper.uploadDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {paper.processed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {paper.extractedTopics && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <Label className="text-sm text-gray-600">Extracted Topics:</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {paper.extractedTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {subject.examPapers.length === 0 && !isUploading && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No exam papers uploaded</h3>
                      <p className="text-gray-600 mb-4">Upload past exam papers to enhance AI content generation.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-sky-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Bot className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{subject.contentGeneration.flashcardsGenerated}</div>
                  <div className="text-sm text-gray-600">Flashcards Generated</div>
                </CardContent>
              </Card>

              <Card className="border-sky-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{subject.contentGeneration.quizzesGenerated}</div>
                  <div className="text-sm text-gray-600">Quizzes Generated</div>
                </CardContent>
              </Card>

              <Card className="border-sky-blue-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{subject.contentGeneration.notesGenerated}</div>
                  <div className="text-sm text-gray-600">Study Notes Generated</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Generate learning materials based on curriculum and exam papers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-sky-blue-50 border border-sky-blue-200 rounded-lg p-6">
                  <h4 className="font-medium text-sky-blue-900 mb-3">Ready for Content Generation</h4>
                  <p className="text-sky-blue-700 mb-4">
                    Your subject has {subject.topics.length} topics and {subject.examPapers.length} exam papers uploaded. 
                    AI can now generate comprehensive learning materials.
                  </p>
                  <div className="flex space-x-3">
                    <Button onClick={generateContent} className="bg-study-primary hover:bg-study-primary/90">
                      <Bot className="w-4 h-4 mr-2" />
                      Generate All Content
                    </Button>
                    <Link to="/admin/generate">
                      <Button variant="outline">
                        Advanced Generation
                      </Button>
                    </Link>
                  </div>
                </div>

                {subject.contentGeneration.lastGenerated && (
                  <div className="mt-4 text-sm text-gray-600">
                    Last generation: {subject.contentGeneration.lastGenerated}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-6">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subject Materials</CardTitle>
                    <CardDescription>Upload additional learning materials, textbooks, worksheets, and reference documents</CardDescription>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mov"
                      onChange={handleMaterialUpload}
                      className="hidden"
                      id="material-upload"
                    />
                    <Button asChild className="bg-study-primary hover:bg-study-primary/90">
                      <label htmlFor="material-upload" className="cursor-pointer">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Material
                      </label>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isUploadingMaterial && (
                  <div className="mb-4 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                      <span className="text-blue-700">Processing uploaded material...</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {subject.subjectMaterials.map((material) => (
                    <div key={material.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            material.type === 'textbook' ? 'bg-blue-100' :
                            material.type === 'worksheet' ? 'bg-green-100' :
                            material.type === 'video' ? 'bg-red-100' :
                            material.type === 'reference' ? 'bg-purple-100' :
                            'bg-gray-100'
                          }`}>
                            {material.type === 'textbook' && <BookOpen className="w-5 h-5 text-blue-600" />}
                            {material.type === 'worksheet' && <FileText className="w-5 h-5 text-green-600" />}
                            {material.type === 'video' && <Eye className="w-5 h-5 text-red-600" />}
                            {material.type === 'reference' && <Target className="w-5 h-5 text-purple-600" />}
                            {material.type === 'other' && <Paperclip className="w-5 h-5 text-gray-600" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{material.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span className="capitalize">{material.type}</span>
                              <span>{material.fileSize}</span>
                              <span>Uploaded: {material.uploadDate}</span>
                            </div>
                            {material.description && (
                              <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {material.processed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-500" />
                          )}
                          <Button size="sm" variant="ghost">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {material.relevantTopics && material.relevantTopics.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <Label className="text-sm text-gray-600">Relevant Topics:</Label>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {material.relevantTopics.map((topic, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {subject.subjectMaterials.length === 0 && !isUploadingMaterial && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Paperclip className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No materials uploaded</h3>
                      <p className="text-gray-600 mb-4">Upload textbooks, worksheets, videos, and other learning materials to enhance your subject content.</p>
                      <div className="text-sm text-gray-500">
                        <p>Supported formats: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG, MP4, MOV</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
