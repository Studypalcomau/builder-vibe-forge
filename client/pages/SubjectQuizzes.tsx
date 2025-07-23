import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Quiz, QuizData, QuizQuestion } from "../components/Quiz";
import { 
  ArrowLeft, 
  Trophy, 
  Clock,
  Target,
  Brain,
  Play,
  CheckCircle,
  Star
} from "lucide-react";

// Queensland Mathematics curriculum quizzes
const mathematicsQuizzes: QuizData[] = [
  {
    id: "math-calculus-1",
    title: "Differential Calculus Fundamentals",
    description: "Test your understanding of derivatives, limits, and basic calculus concepts",
    subject: "Mathematics",
    totalTime: 30,
    passingScore: 70,
    questions: [
      {
        id: "calc-1",
        type: "multiple-choice",
        question: "What is the derivative of f(x) = 3x² + 2x - 5?",
        options: ["6x + 2", "6x - 2", "3x + 2", "6x² + 2x"],
        correctAnswer: "6x + 2",
        explanation: "Using the power rule: d/dx(3x²) = 6x, d/dx(2x) = 2, d/dx(-5) = 0. Therefore, f'(x) = 6x + 2.",
        difficulty: "Easy",
        category: "Derivatives",
        points: 5
      },
      {
        id: "calc-2", 
        type: "multiple-choice",
        question: "Find the limit: lim(x→2) (x² - 4)/(x - 2)",
        options: ["0", "2", "4", "undefined"],
        correctAnswer: "4",
        explanation: "Factor the numerator: (x² - 4) = (x - 2)(x + 2). Cancel (x - 2) terms. The limit becomes lim(x→2) (x + 2) = 4.",
        difficulty: "Medium",
        category: "Limits",
        points: 8
      },
      {
        id: "calc-3",
        type: "numerical",
        question: "If f(x) = sin(x), what is f'(π/2)? (Enter the exact numerical value)",
        correctAnswer: 0,
        explanation: "f'(x) = cos(x), so f'(π/2) = cos(π/2) = 0.",
        difficulty: "Medium",
        category: "Trigonometric Derivatives",
        points: 7
      },
      {
        id: "calc-4",
        type: "true-false",
        question: "The derivative of e^x is e^x.",
        correctAnswer: "True",
        explanation: "The exponential function e^x is its own derivative. This is a fundamental property of the natural exponential function.",
        difficulty: "Easy",
        category: "Exponential Functions",
        points: 5
      }
    ]
  },
  {
    id: "math-integration-1",
    title: "Integration Techniques",
    description: "Practice integration methods including substitution and integration by parts",
    subject: "Mathematics", 
    totalTime: 45,
    passingScore: 75,
    questions: [
      {
        id: "int-1",
        type: "multiple-choice",
        question: "What is ∫2x dx?",
        options: ["x² + C", "2x² + C", "x² + 2C", "2x + C"],
        correctAnswer: "x² + C",
        explanation: "∫2x dx = 2∫x dx = 2(x²/2) + C = x² + C",
        difficulty: "Easy",
        category: "Basic Integration",
        points: 5
      },
      {
        id: "int-2",
        type: "multiple-choice", 
        question: "Evaluate ∫₀¹ x² dx",
        options: ["1/3", "1/2", "1", "2/3"],
        correctAnswer: "1/3",
        explanation: "∫x² dx = x³/3 + C. Evaluating from 0 to 1: (1³/3) - (0³/3) = 1/3 - 0 = 1/3",
        difficulty: "Medium",
        category: "Definite Integrals",
        points: 8
      }
    ]
  }
];

const biologyQuizzes: QuizData[] = [
  {
    id: "bio-genetics-1",
    title: "Genetics and Heredity",
    description: "Test your knowledge of DNA, RNA, and genetic inheritance patterns",
    subject: "Biology",
    totalTime: 25,
    passingScore: 70,
    questions: [
      {
        id: "gen-1",
        type: "multiple-choice",
        question: "Which nitrogen base is found in RNA but not in DNA?",
        options: ["Adenine", "Guanine", "Uracil", "Cytosine"],
        correctAnswer: "Uracil",
        explanation: "RNA contains uracil (U) instead of thymine (T). DNA contains A, T, G, C while RNA contains A, U, G, C.",
        difficulty: "Easy",
        category: "Molecular Biology",
        points: 5
      },
      {
        id: "gen-2",
        type: "true-false",
        question: "Mitosis results in four genetically different cells.",
        correctAnswer: "False",
        explanation: "Mitosis results in two genetically identical diploid cells. Meiosis results in four genetically different haploid gametes.",
        difficulty: "Medium",
        category: "Cell Division",
        points: 7
      },
      {
        id: "gen-3",
        type: "multiple-choice",
        question: "In a monohybrid cross between two heterozygotes (Aa × Aa), what is the expected phenotypic ratio?",
        options: ["1:1", "3:1", "2:1", "1:2:1"],
        correctAnswer: "3:1",
        explanation: "The genotypic ratio is 1:2:1 (AA:Aa:aa), but the phenotypic ratio is 3:1 (dominant:recessive) since AA and Aa show the same phenotype.",
        difficulty: "Medium",
        category: "Mendelian Genetics",
        points: 8
      }
    ]
  }
];

// English quizzes for Queensland curriculum
const englishQuizzes: QuizData[] = [
  {
    id: "eng-literary-devices",
    title: "Literary Devices and Techniques",
    description: "Test your knowledge of metaphors, similes, irony, and other literary devices",
    subject: "English",
    totalTime: 20,
    passingScore: 70,
    questions: [
      {
        id: "lit-1",
        type: "multiple-choice",
        question: "Which literary device is used in the phrase 'The classroom was a zoo'?",
        options: ["Simile", "Metaphor", "Personification", "Alliteration"],
        correctAnswer: "Metaphor",
        explanation: "This is a metaphor because it directly compares the classroom to a zoo without using 'like' or 'as'. It suggests the classroom was chaotic and noisy.",
        difficulty: "Easy",
        category: "Literary Devices",
        points: 5
      },
      {
        id: "lit-2",
        type: "multiple-choice",
        question: "What type of irony is present when the audience knows something the character doesn't?",
        options: ["Verbal irony", "Situational irony", "Dramatic irony", "Cosmic irony"],
        correctAnswer: "Dramatic irony",
        explanation: "Dramatic irony occurs when the audience has knowledge that the characters lack, creating tension or humor.",
        difficulty: "Medium",
        category: "Literary Devices",
        points: 7
      },
      {
        id: "lit-3",
        type: "true-false",
        question: "Alliteration is the repetition of vowel sounds in consecutive words.",
        correctAnswer: "False",
        explanation: "Alliteration is the repetition of initial consonant sounds. The repetition of vowel sounds is called assonance.",
        difficulty: "Medium",
        category: "Literary Devices",
        points: 6
      },
      {
        id: "lit-4",
        type: "multiple-choice",
        question: "In the sentence 'The wind whispered through the trees,' what literary device is used?",
        options: ["Metaphor", "Simile", "Personification", "Symbolism"],
        correctAnswer: "Personification",
        explanation: "Personification gives human qualities (whispering) to non-human things (wind). Wind cannot literally whisper.",
        difficulty: "Easy",
        category: "Literary Devices",
        points: 5
      }
    ]
  },
  {
    id: "eng-essay-writing",
    title: "Essay Structure and Persuasive Writing",
    description: "Practice essay planning, thesis statements, and persuasive techniques",
    subject: "English",
    totalTime: 25,
    passingScore: 75,
    questions: [
      {
        id: "essay-1",
        type: "multiple-choice",
        question: "What is the primary purpose of a thesis statement?",
        options: [
          "To introduce the topic",
          "To state the main argument or claim",
          "To provide evidence",
          "To conclude the essay"
        ],
        correctAnswer: "To state the main argument or claim",
        explanation: "A thesis statement presents the main argument or central claim that the essay will support and develop.",
        difficulty: "Easy",
        category: "Essay Writing",
        points: 5
      },
      {
        id: "essay-2",
        type: "multiple-choice",
        question: "Which of these is the most effective way to start a persuasive essay?",
        options: [
          "With a dictionary definition",
          "With a compelling hook that relates to your argument",
          "With your thesis statement",
          "With background information only"
        ],
        correctAnswer: "With a compelling hook that relates to your argument",
        explanation: "A compelling hook grabs the reader's attention and draws them into your argument, making them want to continue reading.",
        difficulty: "Medium",
        category: "Essay Writing",
        points: 7
      },
      {
        id: "essay-3",
        type: "true-false",
        question: "Each body paragraph should focus on one main idea that supports your thesis.",
        correctAnswer: "True",
        explanation: "Effective paragraphs have unity - each should focus on a single main idea that supports and develops your overall thesis.",
        difficulty: "Easy",
        category: "Essay Writing",
        points: 5
      }
    ]
  }
];

// Physics quizzes
const physicsQuizzes: QuizData[] = [
  {
    id: "phys-mechanics-1",
    title: "Forces and Motion",
    description: "Test your understanding of Newton's laws and basic mechanics",
    subject: "Physics",
    totalTime: 30,
    passingScore: 70,
    questions: [
      {
        id: "mech-1",
        type: "multiple-choice",
        question: "What is the SI unit for force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correctAnswer: "Newton",
        explanation: "The Newton (N) is the SI unit for force, named after Sir Isaac Newton. 1 N = 1 kg⋅m/s².",
        difficulty: "Easy",
        category: "Mechanics",
        points: 5
      },
      {
        id: "mech-2",
        type: "numerical",
        question: "A 10 kg object accelerates at 5 m/s². What is the net force acting on it? (Answer in Newtons)",
        correctAnswer: 50,
        explanation: "Using F = ma: F = 10 kg × 5 m/s² = 50 N",
        difficulty: "Medium",
        category: "Mechanics",
        points: 8
      }
    ]
  }
];

const subjectQuizzes: Record<string, QuizData[]> = {
  mathematics: mathematicsQuizzes,
  "mathematical-methods": mathematicsQuizzes,
  "specialist-mathematics": mathematicsQuizzes,
  biology: biologyQuizzes,
  physics: physicsQuizzes,
  english: englishQuizzes,
  chemistry: [],
  engineering: [],
  economics: []
};

export default function SubjectQuizzes() {
  const { slug, subtopicId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});

  const quizzes = subjectQuizzes[slug as string] || [];
  const hasQuizzes = quizzes.length > 0;

  const subjectNames: Record<string, string> = {
    biology: "Biology",
    mathematics: "Mathematics",
    "mathematical-methods": "Mathematical Methods",
    "specialist-mathematics": "Specialist Mathematics",
    physics: "Physics",
    english: "English",
    chemistry: "Chemistry",
    engineering: "Engineering",
    economics: "Economics"
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  const handleQuizComplete = (score: number, answers: Record<string, any>) => {
    if (selectedQuiz) {
      setQuizResults(prev => ({
        ...prev,
        [selectedQuiz.id]: score
      }));
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-100 text-green-700" };
    if (score >= 80) return { text: "Good", color: "bg-blue-100 text-blue-700" };
    if (score >= 70) return { text: "Pass", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Needs Work", color: "bg-red-100 text-red-700" };
  };

  // Show selected quiz
  if (selectedQuiz) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedQuiz(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Quiz List
            </Button>
          </div>
          
          <Quiz 
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
          />
        </div>
      </div>
    );
  }

  if (!hasQuizzes) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link to={`/subjects/${slug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {subjectName}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subjectName} Quizzes</h1>
              <p className="text-gray-600">Test your knowledge with curriculum-aligned questions</p>
            </div>
          </div>

          {/* No quizzes message */}
          <Card className="text-center border-sky-blue-200 max-w-2xl mx-auto">
            <CardHeader>
              <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-sky-blue-600" />
              </div>
              <CardTitle className="text-2xl">Quizzes Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                {subjectName} practice quizzes are currently being developed. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In the meantime, try our Mathematics and Biology quizzes to see how the system works.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/subjects/mathematics/quizzes">
                    <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                      Try Math Quizzes
                    </Button>
                  </Link>
                  <Link to="/subjects/biology/quizzes">
                    <Button variant="outline">
                      Try Biology Quizzes
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to={`/subjects/${slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{subjectName} Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with curriculum-aligned questions</p>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{quizzes.length}</div>
              <div className="text-sm text-gray-600">Available Quizzes</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{Object.keys(quizResults).length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(quizResults).length > 0 
                  ? Math.round(Object.values(quizResults).reduce((a, b) => a + b, 0) / Object.values(quizResults).length)
                  : 0}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </CardContent>
          </Card>
        </div>

        {/* Quiz List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Quizzes</h2>
          
          <div className="grid gap-6">
            {quizzes.map((quiz) => {
              const hasCompleted = quizResults[quiz.id] !== undefined;
              const score = quizResults[quiz.id];
              const scoreBadge = score ? getScoreBadge(score) : null;
              
              return (
                <Card key={quiz.id} className="border-sky-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                          {hasCompleted && scoreBadge && (
                            <Badge className={scoreBadge.color}>
                              {score}% - {scoreBadge.text}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{quiz.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Brain className="w-4 h-4 mr-1" />
                            {quiz.questions.length} questions
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {quiz.totalTime} minutes
                          </div>
                          <div className="flex items-center">
                            <Target className="w-4 h-4 mr-1" />
                            {quiz.passingScore}% to pass
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <Button 
                          onClick={() => setSelectedQuiz(quiz)}
                          className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {hasCompleted ? 'Retake' : 'Start'} Quiz
                        </Button>
                      </div>
                    </div>

                    {hasCompleted && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last Score:</span>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                            <span className="font-medium">{score}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Tips */}
        <Card className="mt-8 border-sky-blue-200 bg-sky-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-sky-blue-600" />
              Quiz Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Read each question carefully before selecting an answer</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>You can navigate back to previous questions if needed</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Review flashcards and notes before taking quizzes</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Retake quizzes to improve your understanding</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
