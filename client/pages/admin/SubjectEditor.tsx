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
  Edit
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

interface GeneratedNote {
  id: string;
  title: string;
  unit: string;
  topic: string;
  subtopic: string;
  unitIndex: number;
  topicIndex: number;
  subtopicIndex: number;
  content: {
    overview: string;
    keyDefinitions: string[];
    formulas: string[];
    workedExamples: {
      title: string;
      problem: string;
      solution: string[];
    }[];
    practiceExercises: {
      question: string;
      answer: string;
    }[];
    visualAids: string[];
  };
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
    questionsGenerated: number;
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
    questionsGenerated: 0,
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
      questionsGenerated: 0,
      lastGenerated: ""
    }
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingCurriculum, setIsUploadingCurriculum] = useState(false);
  const [isUploadingMaterial, setIsUploadingMaterial] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState<GeneratedNote[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>(() => {
    // Initialize with some sample questions for demonstration
    const sampleQuestions: GeneratedQuestion[] = [];
    for (let i = 0; i < 15; i++) {
      sampleQuestions.push({
        id: `sample-q-${i}`,
        question: `Sample Question ${i + 1}: What is the fundamental concept of mathematical relationships in advanced calculus applications?`,
        options: [
          "The systematic analysis of limit behavior and continuity properties",
          "The computational application of derivative and integral formulas",
          "The theoretical foundation of mathematical proofs and reasoning",
          "The practical implementation in real-world problem scenarios",
          "The integration of multiple mathematical domains and concepts"
        ],
        correctAnswer: "The systematic analysis of limit behavior and continuity properties",
        explanation: "This question demonstrates understanding of fundamental calculus concepts and their application in mathematical analysis.",
        workingSteps: [
          "Step 1: Identify the core mathematical principle",
          "Step 2: Analyze the relationship to calculus concepts",
          "Step 3: Apply theoretical framework to practical scenarios",
          "Step 4: Validate using established mathematical methods",
          "Step 5: Confirm alignment with curriculum objectives"
        ],
        unit: "Unit 1: Algebra and Functions",
        topic: "Functions and Relations",
        subtopic: "Domain and Range",
        unitIndex: 0,
        topicIndex: 0,
        subtopicIndex: 0,
        difficulty: ['Easy', 'Medium', 'Hard'][i % 3] as 'Easy' | 'Medium' | 'Hard',
        category: "Functions and Relations",
        dateGenerated: new Date().toISOString().split('T')[0]
      });
    }
    return sampleQuestions;
  });
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

  const handleGenerateQuestionBank = async () => {
    if (!subject.curriculum.curriculumDocument?.extractedUnits) {
      alert("Please upload and process a curriculum document first.");
      return;
    }

    setIsGenerating(true);
    const units = subject.curriculum.curriculumDocument.extractedUnits;
    const newQuestions: GeneratedQuestion[] = [];

    // Generate 250 questions per subtopic
    units.forEach((unit, unitIndex) => {
      unit.topics.forEach((topic, topicIndex) => {
        topic.subtopics.forEach((subtopic, subtopicIndex) => {
          // Generate 250 questions for each subtopic
          for (let i = 0; i < 250; i++) {
            const question: GeneratedQuestion = {
              id: `q-${unitIndex}-${topicIndex}-${subtopicIndex}-${i}`,
              question: `${subtopic} - Question ${i + 1}: What is the key concept related to ${subtopic} in the context of ${topic.topicName}?`,
              options: [
                `Option A for ${subtopic} - focusing on basic principles`,
                `Option B for ${subtopic} - intermediate application`,
                `Option C for ${subtopic} - advanced concepts`,
                `Option D for ${subtopic} - practical examples`,
                `Option E for ${subtopic} - theoretical framework`
              ],
              correctAnswer: `Option ${String.fromCharCode(65 + (i % 5))} for ${subtopic} - ${['basic principles', 'intermediate application', 'advanced concepts', 'practical examples', 'theoretical framework'][i % 5]}`,
              explanation: `This question tests understanding of ${subtopic} within ${topic.topicName}. The correct answer demonstrates mastery of key concepts and their practical applications in real-world scenarios.`,
              workingSteps: [
                `Step 1: Identify the core concept of ${subtopic}`,
                `Step 2: Relate it to the broader context of ${topic.topicName}`,
                `Step 3: Apply the theoretical framework to practical scenarios`,
                `Step 4: Validate the solution using established principles`,
                `Step 5: Confirm the answer aligns with curriculum objectives`
              ],
              unit: unit.unitName,
              topic: topic.topicName,
              subtopic: subtopic,
              unitIndex,
              topicIndex,
              subtopicIndex,
              difficulty: ['Easy', 'Medium', 'Hard'][i % 3] as 'Easy' | 'Medium' | 'Hard',
              category: `${unit.unitName} - ${topic.topicName}`,
              dateGenerated: new Date().toISOString().split('T')[0]
            };
            newQuestions.push(question);
          }
        });
      });
    });

    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 3000));

    setGeneratedQuestions(newQuestions);
    setSubject(prev => ({
      ...prev,
      contentGeneration: {
        ...prev.contentGeneration,
        questionsGenerated: newQuestions.length,
        lastGenerated: new Date().toISOString().split('T')[0]
      }
    }));

    setIsGenerating(false);
    alert(`Question bank generation completed!\n\nGenerated ${newQuestions.length} questions across all subtopics.\n\nEach subtopic now has 250 comprehensive multiple choice questions with:\n- 5 answer options each\n- Correct answers identified\n- Detailed explanations\n- Step-by-step worked solutions`);
  };

  const deleteQuestion = (questionId: string) => {
    setGeneratedQuestions(prev => prev.filter(q => q.id !== questionId));
    setSubject(prev => ({
      ...prev,
      contentGeneration: {
        ...prev.contentGeneration,
        questionsGenerated: Math.max(0, prev.contentGeneration.questionsGenerated - 1)
      }
    }));
  };

  const handleGenerateSubtopicNotes = async () => {
    if (!subject.curriculum.curriculumDocument?.extractedUnits) {
      alert("Please upload and process a curriculum document first.");
      return;
    }

    setIsGenerating(true);
    const units = subject.curriculum.curriculumDocument.extractedUnits;
    const newNotes: GeneratedNote[] = [];

    // Generate notes for each subtopic
    units.forEach((unit, unitIndex) => {
      unit.topics.forEach((topic, topicIndex) => {
        topic.subtopics.forEach((subtopic, subtopicIndex) => {
          const note: GeneratedNote = {
            id: `note-${unitIndex}-${topicIndex}-${subtopicIndex}`,
            title: `${subtopic} - Study Notes`,
            unit: unit.unitName,
            topic: topic.topicName,
            subtopic: subtopic,
            unitIndex,
            topicIndex,
            subtopicIndex,
            content: {
              overview: `Comprehensive overview of ${subtopic} within the context of ${topic.topicName}. This section covers fundamental concepts, applications, and theoretical foundations essential for understanding ${subtopic} in mathematical contexts.`,
              keyDefinitions: [
                `${subtopic}: Core mathematical concept relating to ${topic.topicName}`,
                `Definition 2: Extended principle connecting ${subtopic} to broader mathematical frameworks`,
                `Definition 3: Applied methodology for implementing ${subtopic} in problem-solving contexts`,
                `Definition 4: Theoretical foundation underlying ${subtopic} applications`
              ],
              formulas: [
                `Formula 1: ${subtopic} = f(x) where x represents the input variable`,
                `Formula 2: d/dx[${subtopic}] = derivative expression for ${subtopic}`,
                `Formula 3: ∫${subtopic} dx = integral form of ${subtopic}`,
                `Formula 4: ${subtopic}(a,b) = parametric form with variables a and b`
              ],
              workedExamples: [
                {
                  title: `Basic ${subtopic} Example`,
                  problem: `Solve the following problem involving ${subtopic}: Given the conditions related to ${topic.topicName}, find the solution.`,
                  solution: [
                    `Step 1: Identify the key elements of ${subtopic} in the problem`,
                    `Step 2: Apply the fundamental principles of ${subtopic}`,
                    `Step 3: Use appropriate formulas and techniques`,
                    `Step 4: Calculate the numerical result`,
                    `Step 5: Verify the solution and interpret the result`
                  ]
                },
                {
                  title: `Advanced ${subtopic} Application`,
                  problem: `Complex scenario requiring deep understanding of ${subtopic} principles in real-world applications.`,
                  solution: [
                    `Step 1: Analyze the complex problem structure`,
                    `Step 2: Break down into manageable components`,
                    `Step 3: Apply advanced ${subtopic} techniques`,
                    `Step 4: Integrate multiple solution approaches`,
                    `Step 5: Synthesize final comprehensive solution`
                  ]
                }
              ],
              practiceExercises: [
                {
                  question: `Practice Question 1: Calculate the ${subtopic} for the given scenario involving ${topic.topicName}.`,
                  answer: `Solution involves applying core ${subtopic} principles with systematic approach yielding the final result.`
                },
                {
                  question: `Practice Question 2: Demonstrate how ${subtopic} connects to other concepts in ${unit.unitName}.`,
                  answer: `Analysis shows interconnections through mathematical relationships and theoretical frameworks.`
                },
                {
                  question: `Practice Question 3: Solve the optimization problem using ${subtopic} methodology.`,
                  answer: `Optimization achieved through calculus-based approach with ${subtopic} as the primary tool.`
                }
              ],
              visualAids: [
                `Diagram 1: Conceptual representation of ${subtopic} relationships`,
                `Graph 1: Visual plot showing ${subtopic} behavior over different domains`,
                `Chart 1: Comparison table of ${subtopic} properties and characteristics`,
                `Flowchart 1: Problem-solving process for ${subtopic} applications`
              ]
            },
            dateGenerated: new Date().toISOString().split('T')[0]
          };
          newNotes.push(note);
        });
      });
    });

    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 3000));

    setGeneratedNotes(prev => [...prev, ...newNotes]);
    setSubject(prev => ({
      ...prev,
      contentGeneration: {
        ...prev.contentGeneration,
        notesGenerated: prev.contentGeneration.notesGenerated + newNotes.length,
        lastGenerated: new Date().toISOString().split('T')[0]
      }
    }));

    setIsGenerating(false);
    alert(`Subtopic notes generation completed!\n\nGenerated ${newNotes.length} detailed study notes covering all subtopics.\n\nEach note includes:\n- Comprehensive overview\n- Key definitions and formulas\n- Worked examples with solutions\n- Practice exercises\n- Visual aids and diagrams`);
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
                      <div className="text-2xl font-bold text-gray-900">{generatedQuestions.length}</div>
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
                    <Link to={`/admin/subjects/${subject.slug}/questions`}>
                      <Button
                        variant="outline"
                        disabled={generatedQuestions.length === 0}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Generated Questions ({generatedQuestions.length})
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle>Generate Subtopic Study Notes</CardTitle>
                <CardDescription>Create detailed study notes for individual subtopics with comprehensive coverage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-3">Subtopic-Specific Study Notes</h4>
                  <p className="text-purple-700 mb-4">
                    Generate focused study notes for each subtopic with detailed explanations, key concepts, examples, and practice exercises.
                  </p>
                  <ul className="text-purple-700 mb-4 space-y-1 list-disc list-inside">
                    <li>Comprehensive concept explanations</li>
                    <li>Key formulas and definitions</li>
                    <li>Worked examples with step-by-step solutions</li>
                    <li>Practice exercises and review questions</li>
                    <li>Visual diagrams and illustrations</li>
                  </ul>
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleGenerateSubtopicNotes}
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={!subject.curriculum.curriculumDocument?.extractedUnits || isGenerating}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Subtopic Notes"}
                    </Button>
                    <Link to={`/admin/subjects/${subject.slug}/notes`}>
                      <Button
                        variant="outline"
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
                        disabled={generatedNotes.length === 0}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Existing Notes ({generatedNotes.length})
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle>Generate Comprehensive Subject Study Notes</CardTitle>
                <CardDescription>Create unified study notes covering the entire subject with interconnected concepts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                  <h4 className="font-medium text-indigo-900 mb-3">Complete Subject Study Guide</h4>
                  <p className="text-indigo-700 mb-4">
                    Generate a comprehensive study guide that integrates all units and topics, showing how concepts connect across the subject.
                  </p>
                  <ul className="text-indigo-700 mb-4 space-y-1 list-disc list-inside">
                    <li>Subject overview and learning pathway</li>
                    <li>Cross-topic concept connections</li>
                    <li>Progressive difficulty building</li>
                    <li>Exam preparation strategies</li>
                    <li>Quick reference guides and cheat sheets</li>
                    <li>Assessment criteria and rubrics</li>
                  </ul>

                  {subject.curriculum.curriculumDocument?.extractedUnits && (
                    <div className="mb-4 p-3 bg-white rounded border border-indigo-200">
                      <div className="text-sm text-indigo-600 space-y-1">
                        <div><strong>Coverage:</strong> {subject.curriculum.curriculumDocument.extractedUnits.length} units</div>
                        <div><strong>Topics:</strong> {subject.curriculum.curriculumDocument.extractedUnits.reduce((acc, unit) => acc + unit.topics.length, 0)} topics</div>
                        <div><strong>Subtopics:</strong> {subject.curriculum.curriculumDocument.extractedUnits.reduce((acc, unit) =>
                          acc + unit.topics.reduce((topicAcc, topic) => topicAcc + topic.subtopics.length, 0), 0
                        )} subtopics</div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      onClick={() => {
                        alert("Comprehensive Subject Study Notes Generation Started!\n\nGenerating unified study guide including:\n- Subject overview and learning pathways\n- Cross-topic concept connections\n- Progressive difficulty building\n- Exam preparation strategies\n- Quick reference materials\n- Assessment guidelines\n\nThis will create a complete study companion for the entire subject.");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700"
                      disabled={!subject.curriculum.curriculumDocument?.extractedUnits}
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Generate Complete Guide
                    </Button>
                    <Link to={`/admin/subjects/${subject.slug}/complete-guide`}>
                      <Button
                        variant="outline"
                        className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Complete Guide
                      </Button>
                    </Link>
                  </div>
                </div>
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
