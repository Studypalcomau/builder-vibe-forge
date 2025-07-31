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
  Search,
  Filter
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
  extractedUnits?: {
    unitName: string;
    topics: {
      topicName: string;
      subtopics: string[];
    }[];
  }[];
  aiAnalysis?: {
    unitsIdentified: number;
    topicsExtracted: number;
    subtopicsFound: number;
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

interface GeneratedQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  workingSteps: string[];
  unit: string;
  topic: string;
  subtopic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  unitIndex: number;
  topicIndex: number;
  subtopicIndex: number;
  dateGenerated: string;
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestionBank, setShowQuestionBank] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [questionSearchTerm, setQuestionSearchTerm] = useState("");
  const [selectedQuestionUnit, setSelectedQuestionUnit] = useState<string>("all");
  const [selectedQuestionTopic, setSelectedQuestionTopic] = useState<string>("all");
  const [selectedQuestionSubtopic, setSelectedQuestionSubtopic] = useState<string>("all");
  const [generationProgress, setGenerationProgress] = useState<{
    currentUnit: string;
    currentTopic: string;
    currentSubtopic: string;
    totalItems: number;
    completedItems: number;
    generatedContent: {
      unitId: string;
      topicId: string;
      subtopicId?: string;
      contentType: 'flashcards' | 'quiz' | 'notes';
      status: 'pending' | 'generating' | 'completed' | 'error';
      itemsGenerated?: number;
    }[];
  } | null>(null);

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
          extractedUnits: [
            {
              unitName: "Unit 1: Algebra and Functions",
              topics: [
                {
                  topicName: "Functions and Relations",
                  subtopics: ["Domain and Range", "Function Types", "Transformations"]
                },
                {
                  topicName: "Polynomial Functions",
                  subtopics: ["Linear Functions", "Quadratic Functions", "Cubic Functions"]
                }
              ]
            },
            {
              unitName: "Unit 2: Calculus",
              topics: [
                {
                  topicName: "Differential Calculus",
                  subtopics: ["Limits", "Derivatives", "Chain Rule"]
                },
                {
                  topicName: "Integral Calculus",
                  subtopics: ["Antiderivatives", "Definite Integrals", "Applications"]
                }
              ]
            }
          ],
          aiAnalysis: {
            unitsIdentified: 3,
            topicsExtracted: 9,
            subtopicsFound: 24
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



  const generateContent = async () => {
    if (!subject.curriculum.curriculumDocument?.extractedUnits) {
      alert("Please upload and process a curriculum document first.");
      return;
    }

    setIsGenerating(true);

    // Calculate total items to generate
    const units = subject.curriculum.curriculumDocument.extractedUnits;
    let totalItems = 0;
    const generationQueue: any[] = [];

    units.forEach((unit, unitIndex) => {
      // Generate for each unit (3 content types: flashcards, quiz, notes)
      totalItems += 3;
      generationQueue.push({ unitIndex, unitName: unit.unitName, type: 'unit', contentTypes: ['flashcards', 'quiz', 'notes'] });

      unit.topics.forEach((topic, topicIndex) => {
        // Generate for each topic (3 content types)
        totalItems += 3;
        generationQueue.push({ unitIndex, topicIndex, unitName: unit.unitName, topicName: topic.topicName, type: 'topic', contentTypes: ['flashcards', 'quiz', 'notes'] });

        topic.subtopics.forEach((subtopic, subtopicIndex) => {
          // Generate for each subtopic (3 content types)
          totalItems += 3;
          generationQueue.push({
            unitIndex,
            topicIndex,
            subtopicIndex,
            unitName: unit.unitName,
            topicName: topic.topicName,
            subtopicName: subtopic,
            type: 'subtopic',
            contentTypes: ['flashcards', 'quiz', 'notes']
          });
        });
      });
    });

    setGenerationProgress({
      currentUnit: '',
      currentTopic: '',
      currentSubtopic: '',
      totalItems,
      completedItems: 0,
      generatedContent: []
    });

    // Simulate AI generation process
    let completedCount = 0;

    for (const item of generationQueue) {
      for (const contentType of item.contentTypes) {
        setGenerationProgress(prev => ({
          ...prev!,
          currentUnit: item.unitName,
          currentTopic: item.topicName || '',
          currentSubtopic: item.subtopicName || '',
        }));

        // Add pending item
        const contentId = `${item.unitIndex}-${item.topicIndex || 'unit'}-${item.subtopicIndex || ''}-${contentType}`;
        setGenerationProgress(prev => ({
          ...prev!,
          generatedContent: [...prev!.generatedContent, {
            unitId: item.unitIndex.toString(),
            topicId: (item.topicIndex || 'unit').toString(),
            subtopicId: item.subtopicIndex?.toString(),
            contentType: contentType as 'flashcards' | 'quiz' | 'notes',
            status: 'generating'
          }]
        }));

        // Simulate generation time
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mark as completed and add to database
        completedCount++;
        const itemsGenerated = contentType === 'flashcards' ? Math.floor(Math.random() * 15) + 5 :
                             contentType === 'quiz' ? 1 : 1;

        setGenerationProgress(prev => ({
          ...prev!,
          completedItems: completedCount,
          generatedContent: prev!.generatedContent.map(content =>
            content.unitId === item.unitIndex.toString() &&
            content.topicId === (item.topicIndex || 'unit').toString() &&
            content.subtopicId === item.subtopicIndex?.toString() &&
            content.contentType === contentType
              ? { ...content, status: 'completed' as const, itemsGenerated }
              : content
          )
        }));

        // Store in database (simulate API call)
        await storeGeneratedContent({
          subjectId: subject.id,
          unitIndex: item.unitIndex,
          topicIndex: item.topicIndex,
          subtopicIndex: item.subtopicIndex,
          contentType,
          content: await generateContentForItem(item, contentType),
          metadata: {
            generatedAt: new Date().toISOString(),
            itemsCount: itemsGenerated,
            curriculum: subject.curriculum.curriculumDocument
          }
        });
      }
    }

    // Update subject stats
    setSubject(prev => ({
      ...prev,
      contentGeneration: {
        flashcardsGenerated: prev.contentGeneration.flashcardsGenerated + Math.floor(totalItems * 0.4),
        quizzesGenerated: prev.contentGeneration.quizzesGenerated + Math.floor(totalItems * 0.33),
        notesGenerated: prev.contentGeneration.notesGenerated + Math.floor(totalItems * 0.33),
        lastGenerated: new Date().toISOString().split('T')[0]
      }
    }));

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationProgress(null);
      alert(`Content generation completed! Generated materials for ${units.length} units with comprehensive coverage.`);
    }, 1000);
  };

  // Simulate content generation for specific items
  const generateContentForItem = async (item: any, contentType: string) => {
    const context = `${item.unitName}${item.topicName ? ` - ${item.topicName}` : ''}${item.subtopicName ? ` - ${item.subtopicName}` : ''}`;

    switch (contentType) {
      case 'flashcards':
        return {
          cards: Array.from({ length: Math.floor(Math.random() * 15) + 5 }, (_, i) => ({
            id: `card-${i}`,
            front: `Question about ${context} - ${i + 1}`,
            back: `Answer covering key concepts of ${context}`,
            difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)]
          }))
        };
      case 'quiz':
        return {
          title: `${context} Quiz`,
          questions: Array.from({ length: 10 }, (_, i) => ({
            id: `q-${i}`,
            question: `Question ${i + 1} about ${context}`,
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correctAnswer: 0,
            explanation: `Explanation for ${context} concept`
          }))
        };
      case 'notes':
        return {
          title: `${context} Study Notes`,
          sections: [
            { heading: 'Overview', content: `Comprehensive overview of ${context}` },
            { heading: 'Key Concepts', content: `Important concepts in ${context}` },
            { heading: 'Examples', content: `Practical examples of ${context}` },
            { heading: 'Summary', content: `Summary of ${context} learning objectives` }
          ]
        };
      default:
        return {};
    }
  };

  // Store generated content in database
  const storeGeneratedContent = async (data: any) => {
    // Simulate API call to store in database
    console.log('Storing in database:', {
      table: 'generated_content',
      data: {
        subject_id: data.subjectId,
        unit_index: data.unitIndex,
        topic_index: data.topicIndex,
        subtopic_index: data.subtopicIndex,
        content_type: data.contentType,
        content_data: JSON.stringify(data.content),
        metadata: JSON.stringify(data.metadata),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    });

    // In real implementation, this would be:
    // await fetch('/api/content/generate', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  };

  // Handle incremental content generation for new curriculum additions
  const generateIncrementalContent = async (changedItems: any[]) => {
    if (changedItems.length === 0) return;

    setIsGenerating(true);
    console.log('Generating content for new/modified items:', changedItems);

    // This would be called when:
    // 1. New units are added to curriculum
    // 2. New topics are added to existing units
    // 3. New subtopics are added to existing topics
    // 4. Curriculum document is re-uploaded with changes

    for (const item of changedItems) {
      await generateContentForItem(item, 'flashcards');
      await generateContentForItem(item, 'quiz');
      await generateContentForItem(item, 'notes');

      await storeGeneratedContent({
        subjectId: subject.id,
        ...item,
        isIncremental: true,
        previousVersion: item.previousVersion // for tracking changes
      });
    }

    setIsGenerating(false);
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
                    Upload your curriculum PDF and let AI automatically extract units, topics, and subtopics to structure your course content.
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
                              <div className="text-lg font-bold text-blue-600">{subject.curriculum.curriculumDocument.aiAnalysis.unitsIdentified}</div>
                              <div className="text-gray-600">Units Identified</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{subject.curriculum.curriculumDocument.aiAnalysis.topicsExtracted}</div>
                              <div className="text-gray-600">Topics Extracted</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-600">{subject.curriculum.curriculumDocument.aiAnalysis.subtopicsFound}</div>
                              <div className="text-gray-600">Subtopics Found</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {subject.curriculum.curriculumDocument.extractedUnits && (
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm text-gray-600">Curriculum Structure:</Label>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const newUnit = {
                                  unitName: "New Unit",
                                  topics: []
                                };
                                setSubject(prev => ({
                                  ...prev,
                                  curriculum: {
                                    ...prev.curriculum,
                                    curriculumDocument: {
                                      ...prev.curriculum.curriculumDocument!,
                                      extractedUnits: [...(prev.curriculum.curriculumDocument?.extractedUnits || []), newUnit]
                                    }
                                  }
                                }));
                              }}
                            >
                              <Plus className="w-3 h-3 mr-1" />
                              Add Unit
                            </Button>
                          </div>
                          {subject.curriculum.curriculumDocument.extractedUnits.map((unit, unitIndex) => (
                            <div key={unitIndex} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <Input
                                  value={unit.unitName}
                                  onChange={(e) => {
                                    const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                    newUnits[unitIndex] = { ...unit, unitName: e.target.value };
                                    setSubject(prev => ({
                                      ...prev,
                                      curriculum: {
                                        ...prev.curriculum,
                                        curriculumDocument: {
                                          ...prev.curriculum.curriculumDocument!,
                                          extractedUnits: newUnits
                                        }
                                      }
                                    }));
                                  }}
                                  className="font-medium text-gray-900 border-none shadow-none p-0 h-auto text-base"
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    const newUnits = subject.curriculum.curriculumDocument!.extractedUnits!.filter((_, i) => i !== unitIndex);
                                    setSubject(prev => ({
                                      ...prev,
                                      curriculum: {
                                        ...prev.curriculum,
                                        curriculumDocument: {
                                          ...prev.curriculum.curriculumDocument!,
                                          extractedUnits: newUnits
                                        }
                                      }
                                    }));
                                  }}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              <div className="space-y-3">
                                {unit.topics.map((topic, topicIndex) => (
                                  <div key={topicIndex} className="border border-gray-100 rounded-md p-3 bg-gray-50">
                                    <div className="flex items-center justify-between mb-2">
                                      <Input
                                        value={topic.topicName}
                                        onChange={(e) => {
                                          const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                          newUnits[unitIndex].topics[topicIndex].topicName = e.target.value;
                                          setSubject(prev => ({
                                            ...prev,
                                            curriculum: {
                                              ...prev.curriculum,
                                              curriculumDocument: {
                                                ...prev.curriculum.curriculumDocument!,
                                                extractedUnits: newUnits
                                              }
                                            }
                                          }));
                                        }}
                                        className="font-medium border-none shadow-none p-0 h-auto bg-transparent"
                                      />
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                          const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                          newUnits[unitIndex].topics = unit.topics.filter((_, i) => i !== topicIndex);
                                          setSubject(prev => ({
                                            ...prev,
                                            curriculum: {
                                              ...prev.curriculum,
                                              curriculumDocument: {
                                                ...prev.curriculum.curriculumDocument!,
                                                extractedUnits: newUnits
                                              }
                                            }
                                          }));
                                        }}
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-1 mb-2">
                                      {topic.subtopics.map((subtopic, subtopicIndex) => (
                                        <div key={subtopicIndex} className="flex items-center space-x-1 bg-white rounded px-2 py-1 border">
                                          <Input
                                            value={subtopic}
                                            onChange={(e) => {
                                              const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                              newUnits[unitIndex].topics[topicIndex].subtopics[subtopicIndex] = e.target.value;
                                              setSubject(prev => ({
                                                ...prev,
                                                curriculum: {
                                                  ...prev.curriculum,
                                                  curriculumDocument: {
                                                    ...prev.curriculum.curriculumDocument!,
                                                    extractedUnits: newUnits
                                                  }
                                                }
                                              }));
                                            }}
                                            className="text-xs border-none shadow-none p-0 h-auto bg-transparent min-w-0"
                                          />
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-3 w-3 p-0"
                                            onClick={() => {
                                              const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                              newUnits[unitIndex].topics[topicIndex].subtopics = topic.subtopics.filter((_, i) => i !== subtopicIndex);
                                              setSubject(prev => ({
                                                ...prev,
                                                curriculum: {
                                                  ...prev.curriculum,
                                                  curriculumDocument: {
                                                    ...prev.curriculum.curriculumDocument!,
                                                    extractedUnits: newUnits
                                                  }
                                                }
                                              }));
                                            }}
                                          >
                                            <X className="w-2 h-2" />
                                          </Button>
                                        </div>
                                      ))}
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-6 text-xs"
                                        onClick={() => {
                                          const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                          newUnits[unitIndex].topics[topicIndex].subtopics.push("New Subtopic");
                                          setSubject(prev => ({
                                            ...prev,
                                            curriculum: {
                                              ...prev.curriculum,
                                              curriculumDocument: {
                                                ...prev.curriculum.curriculumDocument!,
                                                extractedUnits: newUnits
                                              }
                                            }
                                          }));
                                        }}
                                      >
                                        <Plus className="w-2 h-2 mr-1" />
                                        Add Subtopic
                                      </Button>
                                    </div>
                                  </div>
                                ))}

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => {
                                    const newUnits = [...subject.curriculum.curriculumDocument!.extractedUnits!];
                                    newUnits[unitIndex].topics.push({
                                      topicName: "New Topic",
                                      subtopics: []
                                    });
                                    setSubject(prev => ({
                                      ...prev,
                                      curriculum: {
                                        ...prev.curriculum,
                                        curriculumDocument: {
                                          ...prev.curriculum.curriculumDocument!,
                                          extractedUnits: newUnits
                                        }
                                      }
                                    }));
                                  }}
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Add Topic to {unit.unitName}
                                </Button>
                              </div>
                            </div>
                          ))}
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
                        <span className="text-blue-700">Processing curriculum document and extracting units and topics...</span>
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

                      {paper.processed && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-700">Content analyzed and ready for AI generation</span>
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
                <CardTitle>Question Bank Generation</CardTitle>
                <CardDescription>Generate comprehensive question bank with 250 multiple choice questions covering all curriculum topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-green-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{subject.contentGeneration.questionsGenerated || 0}</div>
                      <div className="text-sm text-gray-600">Questions Generated</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">250</div>
                      <div className="text-sm text-gray-600">Target Questions</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-3">AI Question Generation</h4>
                  <p className="text-green-700 mb-4">
                    AI will analyze your curriculum, learning materials, and exam papers to generate 250 comprehensive multiple choice questions per subtopic with:
                  </p>
                  <ul className="text-green-700 mb-4 space-y-1 list-disc list-inside">
                    <li>250 questions per subtopic</li>
                    <li>5 multiple choice options per question</li>
                    <li>Correct answer identification</li>
                    <li>Detailed answer explanations</li>
                    <li>Step-by-step worked solutions</li>
                    <li>Coverage across all curriculum subtopics</li>
                  </ul>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        handleGenerateQuestionBank();
                      }}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={!subject.curriculum.curriculumDocument?.extractedUnits}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Generate Question Bank
                    </Button>
                    <Button
                      onClick={() => {
                        setShowQuestionBank(true);
                      }}
                      variant="outline"
                      disabled={generatedQuestions.length === 0}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Generated Questions ({generatedQuestions.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle>AI Content Generation</CardTitle>
                <CardDescription>Generate learning materials for all curriculum units, topics, and subtopics</CardDescription>
              </CardHeader>
              <CardContent>
                {!isGenerating ? (
                  <div className="bg-sky-blue-50 border border-sky-blue-200 rounded-lg p-6">
                    <h4 className="font-medium text-sky-blue-900 mb-3">Ready for Content Generation</h4>
                    <p className="text-sky-blue-700 mb-4">
                      AI will generate flashcards, quizzes, and study notes for each unit, topic, and subtopic in your curriculum.
                      {subject.curriculum.curriculumDocument?.extractedUnits && (
                        <span className="block mt-2 font-medium">
                          {subject.curriculum.curriculumDocument.extractedUnits.length} units • {' '}
                          {subject.curriculum.curriculumDocument.extractedUnits.reduce((acc, unit) => acc + unit.topics.length, 0)} topics • {' '}
                          {subject.curriculum.curriculumDocument.extractedUnits.reduce((acc, unit) =>
                            acc + unit.topics.reduce((topicAcc, topic) => topicAcc + topic.subtopics.length, 0), 0
                          )} subtopics
                        </span>
                      )}
                    </p>
                    <div className="flex space-x-3">
                      <Button
                        onClick={generateContent}
                        className="bg-study-primary hover:bg-study-primary/90"
                        disabled={!subject.curriculum.curriculumDocument?.extractedUnits}
                      >
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
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <h4 className="font-medium text-blue-900">Generating AI Content</h4>
                      </div>

                      {generationProgress && (
                        <>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm text-blue-700 mb-2">
                              <span>Progress: {generationProgress.completedItems} / {generationProgress.totalItems}</span>
                              <span>{Math.round((generationProgress.completedItems / generationProgress.totalItems) * 100)}%</span>
                            </div>
                            <Progress value={(generationProgress.completedItems / generationProgress.totalItems) * 100} className="mb-3" />

                            <div className="text-sm text-blue-600">
                              <div>Current Unit: <span className="font-medium">{generationProgress.currentUnit}</span></div>
                              {generationProgress.currentTopic && (
                                <div>Current Topic: <span className="font-medium">{generationProgress.currentTopic}</span></div>
                              )}
                              {generationProgress.currentSubtopic && (
                                <div>Current Subtopic: <span className="font-medium">{generationProgress.currentSubtopic}</span></div>
                              )}
                            </div>
                          </div>

                          <div className="max-h-40 overflow-y-auto space-y-1">
                            {generationProgress.generatedContent.map((item, index) => (
                              <div key={index} className="flex items-center justify-between text-xs bg-white rounded px-3 py-2">
                                <span>
                                  Unit {item.unitId} - {item.topicId !== 'unit' ? `Topic ${item.topicId}` : 'Unit Level'}
                                  {item.subtopicId ? ` - Subtopic ${item.subtopicId}` : ''} ({item.contentType})
                                </span>
                                <div className="flex items-center space-x-1">
                                  {item.status === 'generating' && <Clock className="w-3 h-3 text-yellow-500" />}
                                  {item.status === 'completed' && <CheckCircle className="w-3 h-3 text-green-500" />}
                                  {item.itemsGenerated && <span className="text-gray-500">({item.itemsGenerated} items)</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {subject.contentGeneration.lastGenerated && !isGenerating && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-900 mb-2">Content Generation Strategy</h5>
                    <div className="text-sm text-green-700 space-y-1">
                      <div>• <strong>Incremental Updates:</strong> When you add new units/topics, only new content will be generated</div>
                      <div>• <strong>Smart Refresh:</strong> Modified curriculum sections will automatically regenerate affected content</div>
                      <div>• <strong>Database Storage:</strong> All content is stored with metadata linking to specific curriculum elements</div>
                      <div className="mt-2 pt-2 border-t border-green-300">
                        Last generation: {subject.contentGeneration.lastGenerated}
                      </div>
                    </div>
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
