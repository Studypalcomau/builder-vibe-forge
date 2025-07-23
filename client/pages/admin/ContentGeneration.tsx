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
  Bot,
  Brain,
  Trophy,
  FileText,
  Zap,
  Play,
  Pause,
  RotateCcw,
  Download,
  Eye,
  Settings,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  Plus,
  Sparkles,
  Target,
  BookOpen
} from "lucide-react";

interface GenerationTemplate {
  id: string;
  name: string;
  type: "flashcards" | "quiz" | "notes";
  description: string;
  icon: any;
  color: string;
  estimatedTime: string;
  difficulty: string;
}

interface GenerationJob {
  id: string;
  subject: string;
  topic: string;
  type: "flashcards" | "quiz" | "notes";
  status: "queued" | "processing" | "completed" | "failed";
  progress: number;
  startTime: string;
  estimatedCompletion?: string;
  resultCount?: number;
  parameters: {
    difficulty: string;
    count: number;
    style?: string;
  };
}

const generationTemplates: GenerationTemplate[] = [
  {
    id: "flashcards-basic",
    name: "Flashcards",
    type: "flashcards",
    description: "Generate interactive flashcards with questions and answers",
    icon: Brain,
    color: "bg-purple-500",
    estimatedTime: "2-5 minutes",
    difficulty: "Basic"
  },
  {
    id: "quiz-comprehensive",
    name: "Practice Quiz",
    type: "quiz", 
    description: "Create comprehensive quizzes with multiple question types",
    icon: Trophy,
    color: "bg-yellow-500",
    estimatedTime: "3-8 minutes",
    difficulty: "Intermediate"
  },
  {
    id: "notes-detailed",
    name: "Study Notes",
    type: "notes",
    description: "Generate detailed study notes with explanations and examples",
    icon: FileText,
    color: "bg-blue-500",
    estimatedTime: "5-12 minutes",
    difficulty: "Advanced"
  }
];

const mockJobs: GenerationJob[] = [
  {
    id: "job-1",
    subject: "Physics",
    topic: "Quantum Mechanics",
    type: "flashcards",
    status: "processing",
    progress: 75,
    startTime: "2 hours ago",
    estimatedCompletion: "2 minutes",
    parameters: { difficulty: "Advanced", count: 20 }
  },
  {
    id: "job-2",
    subject: "Mathematical Methods",
    topic: "Integration Techniques", 
    type: "quiz",
    status: "queued",
    progress: 0,
    startTime: "5 minutes ago",
    parameters: { difficulty: "Intermediate", count: 15, style: "mixed" }
  },
  {
    id: "job-3",
    subject: "English",
    topic: "Poetry Analysis",
    type: "notes",
    status: "completed",
    progress: 100,
    startTime: "1 hour ago",
    resultCount: 3,
    parameters: { difficulty: "Intermediate", count: 3 }
  },
  {
    id: "job-4",
    subject: "Economics",
    topic: "Market Structures",
    type: "flashcards", 
    status: "failed",
    progress: 0,
    startTime: "3 hours ago",
    parameters: { difficulty: "Beginner", count: 25 }
  }
];

export default function ContentGeneration() {
  const [selectedTemplate, setSelectedTemplate] = useState<GenerationTemplate | null>(null);
  const [generationJobs, setGenerationJobs] = useState<GenerationJob[]>(mockJobs);
  const [showNewGeneration, setShowNewGeneration] = useState(false);
  
  // Form state for new generation
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    description: "",
    difficulty: "Intermediate",
    count: 10,
    style: "standard"
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "queued": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "processing": return <Clock className="w-4 h-4 text-blue-500" />;
      case "queued": return <Clock className="w-4 h-4 text-yellow-500" />;
      case "failed": return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleStartGeneration = () => {
    if (!selectedTemplate) return;
    
    const newJob: GenerationJob = {
      id: `job-${Date.now()}`,
      subject: formData.subject,
      topic: formData.topic,
      type: selectedTemplate.type,
      status: "queued",
      progress: 0,
      startTime: "Just now",
      parameters: {
        difficulty: formData.difficulty,
        count: formData.count,
        style: formData.style
      }
    };

    setGenerationJobs([newJob, ...generationJobs]);
    setShowNewGeneration(false);
    setSelectedTemplate(null);
    setFormData({
      subject: "",
      topic: "",
      description: "",
      difficulty: "Intermediate", 
      count: 10,
      style: "standard"
    });
  };

  const handleJobAction = (jobId: string, action: string) => {
    switch (action) {
      case "pause":
        setGenerationJobs(jobs => jobs.map(job => 
          job.id === jobId ? { ...job, status: "queued" as const } : job
        ));
        break;
      case "retry":
        setGenerationJobs(jobs => jobs.map(job => 
          job.id === jobId ? { ...job, status: "queued" as const, progress: 0 } : job
        ));
        break;
      case "cancel":
        setGenerationJobs(jobs => jobs.filter(job => job.id !== jobId));
        break;
    }
  };

  // New generation form
  if (showNewGeneration && selectedTemplate) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => {setShowNewGeneration(false); setSelectedTemplate(null);}}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Generation
            </Button>
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 ${selectedTemplate.color} rounded-lg flex items-center justify-center`}>
                <selectedTemplate.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Generate {selectedTemplate.name}</h1>
                <p className="text-gray-600">{selectedTemplate.description}</p>
              </div>
            </div>
          </div>

          <Card className="border-sky-blue-200">
            <CardHeader>
              <CardTitle>Content Generation Settings</CardTitle>
              <CardDescription>
                Configure the parameters for AI content generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                  >
                    <option value="">Select subject</option>
                    <option value="Mathematical Methods">Mathematical Methods</option>
                    <option value="Specialist Mathematics">Specialist Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Economics">Economics</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    value={formData.difficulty}
                    onChange={(e) => setFormData(prev => ({...prev, difficulty: e.target.value}))}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="topic">Topic/Chapter *</Label>
                <Input
                  id="topic"
                  value={formData.topic}
                  onChange={(e) => setFormData(prev => ({...prev, topic: e.target.value}))}
                  placeholder="e.g., Differential Calculus, Quantum Mechanics, Poetry Analysis"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Topic Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  placeholder="Provide detailed description of the topic, learning objectives, key concepts to cover..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="count">Number of Items</Label>
                  <Input
                    id="count"
                    type="number"
                    value={formData.count}
                    onChange={(e) => setFormData(prev => ({...prev, count: parseInt(e.target.value) || 10}))}
                    min="1"
                    max="50"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Recommended: {selectedTemplate.type === "flashcards" ? "10-25" : selectedTemplate.type === "quiz" ? "10-20" : "3-8"} items
                  </p>
                </div>

                {selectedTemplate.type === "quiz" && (
                  <div>
                    <Label htmlFor="style">Question Style</Label>
                    <select
                      id="style"
                      value={formData.style}
                      onChange={(e) => setFormData(prev => ({...prev, style: e.target.value}))}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                    >
                      <option value="standard">Mixed Question Types</option>
                      <option value="multiple-choice">Multiple Choice Only</option>
                      <option value="short-answer">Short Answer Only</option>
                      <option value="true-false">True/False Only</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="bg-sky-blue-50 border border-sky-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-sky-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sky-blue-900">AI Generation Tips</h4>
                    <ul className="text-sm text-sky-blue-700 mt-1 space-y-1">
                      <li>• Be specific in your topic description for better results</li>
                      <li>• Include learning objectives and key concepts to cover</li>
                      <li>• Higher item counts may take longer to generate</li>
                      <li>• Review and edit generated content before publishing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Estimated generation time: {selectedTemplate.estimatedTime}
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => {setShowNewGeneration(false); setSelectedTemplate(null);}}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleStartGeneration}
                    disabled={!formData.subject || !formData.topic}
                    className="bg-study-primary hover:bg-study-primary/90"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Generation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Main content generation interface
  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Content Generation</h1>
              <p className="text-gray-600 mt-2">Generate flashcards, quizzes, and study notes using AI</p>
            </div>
            <div className="flex space-x-3">
              <Link to="/admin">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Generation Templates */}
          <div className="lg:col-span-1">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Content Types
                </CardTitle>
                <CardDescription>Choose what type of content to generate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generationTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => {
                        setSelectedTemplate(template);
                        setShowNewGeneration(true);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-sky-blue-300 hover:bg-sky-blue-50 transition-colors text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center`}>
                          <template.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {template.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{template.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-sky-blue-200 mt-6">
              <CardHeader>
                <CardTitle>Generation Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Jobs</span>
                    <span className="font-semibold">
                      {generationJobs.filter(job => job.status === "processing").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completed Today</span>
                    <span className="font-semibold">
                      {generationJobs.filter(job => job.status === "completed").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">In Queue</span>
                    <span className="font-semibold">
                      {generationJobs.filter(job => job.status === "queued").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Generation Queue */}
          <div className="lg:col-span-2">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Generation Queue
                </CardTitle>
                <CardDescription>Monitor current and recent generation jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generationJobs.map((job) => (
                    <div key={job.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(job.status)}
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {job.subject} - {job.topic}
                            </h4>
                            <p className="text-sm text-gray-600 capitalize">
                              {job.type} • {job.parameters.difficulty} • {job.parameters.count} items
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          <div className="flex space-x-1">
                            {job.status === "processing" && (
                              <Button size="sm" variant="ghost" onClick={() => handleJobAction(job.id, "pause")}>
                                <Pause className="w-3 h-3" />
                              </Button>
                            )}
                            {job.status === "failed" && (
                              <Button size="sm" variant="ghost" onClick={() => handleJobAction(job.id, "retry")}>
                                <RotateCcw className="w-3 h-3" />
                              </Button>
                            )}
                            {job.status === "completed" && (
                              <>
                                <Button size="sm" variant="ghost">
                                  <Eye className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Download className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="ghost" onClick={() => handleJobAction(job.id, "cancel")}>
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {job.status === "processing" && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{job.progress}%</span>
                          </div>
                          <Progress value={job.progress} className="h-2" />
                          {job.estimatedCompletion && (
                            <p className="text-xs text-gray-500 mt-1">
                              Est. completion: {job.estimatedCompletion}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Started: {job.startTime}</span>
                        {job.resultCount && (
                          <span>{job.resultCount} items generated</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {generationJobs.length === 0 && (
                    <div className="text-center py-8">
                      <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No generation jobs</h3>
                      <p className="text-gray-600 mb-4">Start generating content by selecting a content type.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
