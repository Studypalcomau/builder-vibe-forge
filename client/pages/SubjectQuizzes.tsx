import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Quiz, QuizData, QuizQuestion, DetailedQuizResult, QuizAttempt, QuizProgress } from "../components/Quiz";
import {
  ArrowLeft,
  Trophy,
  Clock,
  Target,
  Brain,
  Play,
  CheckCircle,
  Star,
  ChevronRight
} from "lucide-react";

// Quiz curriculum mapping
interface QuizCurriculumInfo {
  unit: string;
  topic: string;
  subtopic?: string;
}

interface CurriculumDetails {
  unitName: string;
  topicName: string;
  subtopicName: string;
}

// Subject-level curriculum mapping for "Currently studying" section
const subjectQuizCurriculumMapping: Record<string, QuizCurriculumInfo> = {
  "mathematical-methods": {
    unit: "Unit 2: Calculus",
    topic: "Differential Calculus",
    subtopic: "Derivatives and Limits"
  },
  "physics": {
    unit: "Unit 1: Motion and Forces",
    topic: "Mechanics",
    subtopic: "Forces and Motion"
  },
  "biology": {
    unit: "Unit 3: Genetics and Evolution",
    topic: "Genetics and Heredity",
    subtopic: "DNA and Inheritance"
  },
  "english": {
    unit: "Unit 1: Language and Literature",
    topic: "Literary Analysis",
    subtopic: "Literary Devices"
  },
  "chemistry": {
    unit: "Unit 2: Chemical Bonding",
    topic: "Atomic Structure",
    subtopic: "Electron Configuration"
  }
};

// Individual quiz curriculum mapping (kept for potential future use)
const quizCurriculumMapping: Record<string, QuizCurriculumInfo> = {
  "math-calculus-1": {
    unit: "Unit 2: Calculus",
    topic: "Differential Calculus",
    subtopic: "Derivatives and Limits"
  },
  "math-integration-1": {
    unit: "Unit 2: Calculus",
    topic: "Integral Calculus",
    subtopic: "Basic Integration"
  },
  "bio-genetics-1": {
    unit: "Unit 3: Genetics and Evolution",
    topic: "Genetics and Heredity",
    subtopic: "DNA and Inheritance"
  },
  "eng-literary-devices": {
    unit: "Unit 1: Language and Literature",
    topic: "Literary Analysis",
    subtopic: "Literary Devices"
  },
  "eng-essay-writing": {
    unit: "Unit 1: Language and Literature",
    topic: "Writing Skills",
    subtopic: "Essay Structure"
  },
  "phys-mechanics-1": {
    unit: "Unit 1: Motion and Forces",
    topic: "Mechanics",
    subtopic: "Forces and Motion"
  }
};

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
        workingSteps: [
          "Start with f(x) = 3x² + 2x - 5",
          "Apply the power rule to each term: d/dx(xⁿ) = n·xⁿ⁻¹",
          "For 3x²: d/dx(3x²) = 3 × 2 × x²⁻¹ = 6x",
          "For 2x: d/dx(2x) = 2 × 1 × x¹⁻¹ = 2",
          "For -5: d/dx(-5) = 0 (constant rule)",
          "Combine all terms: f'(x) = 6x + 2 + 0 = 6x + 2"
        ],
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
        explanation: "Factor the numerator: (x�� - 4) = (x - 2)(x + 2). Cancel (x - 2) terms. The limit becomes lim(x→2) (x + 2) = 4.",
        workingSteps: [
          "Start with lim(x→2) (x² - 4)/(x - 2)",
          "Notice direct substitution gives 0/0 (indeterminate form)",
          "Factor the numerator: x² - 4 = (x - 2)(x + 2) using difference of squares",
          "Rewrite: lim(x→2) [(x - 2)(x + 2)]/(x - 2)",
          "Cancel the common factor (x - 2): lim(x→2) (x + 2)",
          "Now substitute x = 2: (2) + 2 = 4"
        ],
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
        workingSteps: [
          "Given: f(x) = sin(x)",
          "Find the derivative: f'(x) = d/dx[sin(x)]",
          "Apply the trigonometric derivative rule: d/dx[sin(x)] = cos(x)",
          "So f'(x) = cos(x)",
          "Evaluate at x = π/2: f'(π/2) = cos(π/2)",
          "From the unit circle: cos(π/2) = 0"
        ],
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
        workingSteps: [
          "Start with ∫2x dx",
          "Factor out the constant: ∫2x dx = 2∫x dx",
          "Apply the power rule for integration: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C",
          "For x¹: ∫x dx = x¹⁺¹/(1+1) + C = x²/2 + C",
          "Substitute back: 2∫x dx = 2(x²/2 + C)",
          "Simplify: 2 × x²/2 + 2C = x² + 2C",
          "Since 2C is still an arbitrary constant, write as: x² + C"
        ],
        difficulty: "Easy",
        category: "Basic Integration",
        points: 5
      },
      {
        id: "int-2",
        type: "multiple-choice", 
        question: "Evaluate ��₀¹ x² dx",
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
        workingSteps: [
          "Set up the cross: Aa × Aa",
          "Draw a Punnett square with gametes A and a from each parent",
          "Fill in the squares: AA, Aa, aA, aa",
          "Count genotypes: 1 AA : 2 Aa : 1 aa (genotypic ratio 1:2:1)",
          "Determine phenotypes: A is dominant, so AA and Aa both show dominant phenotype",
          "Count phenotypes: 3 dominant (AA + Aa + aA) : 1 recessive (aa)",
          "Final phenotypic ratio: 3:1 (dominant:recessive)"
        ],
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

// Helper functions to generate IDs for curriculum sections
const getUnitNumber = (unitName: string): string => {
  const match = unitName.match(/Unit (\d+)/);
  return match ? match[1] : '1';
};

const getTopicId = (topicName: string): string => {
  // Convert topic name to a slug-like ID
  return topicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

const getSubtopicId = (subtopicName: string): string => {
  // Convert subtopic name to a slug-like ID
  return subtopicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

// Function to decode subtopic ID into curriculum details
const decodeCurriculumInfo = (subtopicId: string): CurriculumDetails | null => {
  const curriculumMapping: Record<string, CurriculumDetails> = {
    "0-0-0": { unitName: "Unit 1: Functions and Relations", topicName: "Functions and Relations", subtopicName: "Domain and Range" },
    "0-0-1": { unitName: "Unit 1: Functions and Relations", topicName: "Functions and Relations", subtopicName: "Function Types" },
    "0-0-2": { unitName: "Unit 1: Functions and Relations", topicName: "Functions and Relations", subtopicName: "Transformations" },
    "0-1-0": { unitName: "Unit 1: Functions and Relations", topicName: "Advanced Functions", subtopicName: "Linear Functions" },
    "0-1-1": { unitName: "Unit 1: Functions and Relations", topicName: "Advanced Functions", subtopicName: "Quadratic Functions" },
    "0-1-2": { unitName: "Unit 1: Functions and Relations", topicName: "Advanced Functions", subtopicName: "Cubic Functions" },
    "1-0-0": { unitName: "Unit 2: Calculus", topicName: "Differential Calculus", subtopicName: "Limits" },
    "1-0-1": { unitName: "Unit 2: Calculus", topicName: "Differential Calculus", subtopicName: "Derivatives" },
    "1-0-2": { unitName: "Unit 2: Calculus", topicName: "Differential Calculus", subtopicName: "Chain Rule" },
    "1-1-0": { unitName: "Unit 2: Calculus", topicName: "Integral Calculus", subtopicName: "Antiderivatives" },
    "1-1-1": { unitName: "Unit 2: Calculus", topicName: "Integral Calculus", subtopicName: "Definite Integrals" },
    "1-1-2": { unitName: "Unit 2: Calculus", topicName: "Integral Calculus", subtopicName: "Applications" }
  };

  return curriculumMapping[subtopicId] || null;
};

export default function SubjectQuizzes() {
  const { slug, subtopicId } = useParams();
  const [selectedQuiz, setSelectedQuiz] = useState<QuizData | null>(null);

  // Detect if this is the full test mode
  const isFullTest = window.location.pathname.includes('/test');
  const [quizResults, setQuizResults] = useState<Record<string, number>>({});
  const [detailedQuizResults, setDetailedQuizResults] = useState<Record<string, DetailedQuizResult>>({});
  const [quizProgress, setQuizProgress] = useState<Record<string, QuizProgress>>({});

  // Question pools for randomized quizzes
  const questionPools: Record<string, QuizQuestion[]> = {
    "0-0-0": [ // Domain and Range Question Pool
      {
        id: "dr-q1",
        question: "What is the domain of f(x) = 1/(x-2)?",
        type: "multiple-choice",
        options: ["All real numbers", "All real numbers except 2", "All positive numbers", "All numbers greater than 2"],
        correctAnswer: "All real numbers except 2",
        explanation: "The function is undefined when x-2=0, so x cannot equal 2.",
        workingSteps: [
          "Identify restrictions on the function f(x) = 1/(x-2)",
          "The function is undefined when the denominator equals zero",
          "Set the denominator equal to zero: x - 2 = 0",
          "Solve for x: x = 2",
          "Therefore, x cannot equal 2",
          "Domain: All real numbers except x = 2"
        ],
        difficulty: "Easy",
        category: "Functions",
        points: 5
      },
      {
        id: "dr-q2",
        question: "What is the range of f(x) = x²?",
        type: "multiple-choice",
        options: ["All real numbers", "All positive numbers", "All non-negative numbers", "All negative numbers"],
        correctAnswer: "All non-negative numbers",
        explanation: "Since x² is always non-negative, the range is [0, ∞).",
        workingSteps: [
          "Consider the function f(x) = x²",
          "For any real number x, x² ≥ 0",
          "The minimum value occurs when x = 0, giving f(0) = 0",
          "As |x| increases, x² increases without bound",
          "Therefore, f(x) can take any value ≥ 0",
          "Range: [0, ���) or all non-negative numbers"
        ],
        difficulty: "Easy",
        category: "Functions",
        points: 5
      },
      {
        id: "dr-q3",
        question: "What is the domain of f(x) = √(x-3)?",
        type: "multiple-choice",
        options: ["x ≥ 3", "x > 3", "x ≤ 3", "All real numbers"],
        correctAnswer: "x ≥ 3",
        explanation: "For square root to be defined, x-3 ≥ 0, so x ≥ 3.",
        workingSteps: [
          "For √(x-3) to be defined, the expression under the square root must be non-negative",
          "Set up the inequality: x - 3 ≥ 0",
          "Solve for x: x ≥ 3",
          "Domain: x ≥ 3 or [3, ∞)"
        ],
        difficulty: "Medium",
        category: "Functions",
        points: 7
      },
      {
        id: "dr-q4",
        question: "What is the range of f(x) = -2x² + 8?",
        type: "multiple-choice",
        options: ["All real numbers", "y ≤ 8", "y ≥ 8", "y > 0"],
        correctAnswer: "y ≤ 8",
        explanation: "This is a downward parabola with vertex at (0,8), so y ≤ 8.",
        workingSteps: [
          "Identify the function as a quadratic: f(x) = -2x² + 8",
          "The coefficient of x² is negative (-2), so the parabola opens downward",
          "Find the vertex: x = 0 (since there's no linear term)",
          "Calculate the maximum value: f(0) = -2(0)² + 8 = 8",
          "Since the parabola opens downward, the maximum y-value is 8",
          "Range: y ≤ 8 or (-∞, 8]"
        ],
        difficulty: "Medium",
        category: "Functions",
        points: 7
      },
      {
        id: "dr-q5",
        question: "What is the domain of f(x) = 1/√(4-x²)?",
        type: "multiple-choice",
        options: ["-2 < x < 2", "-2 ≤ x ≤ 2", "x < -2 or x > 2", "All real numbers"],
        correctAnswer: "-2 < x < 2",
        explanation: "We need 4-x² > 0, which gives -2 < x < 2.",
        workingSteps: [
          "For the function to be defined, the denominator cannot be zero and the expression under the square root must be positive",
          "Set up the inequality: 4 - x² > 0 (must be positive, not just non-negative)",
          "Rearrange: 4 > x²",
          "Take square root: 2 > |x| or |x| < 2",
          "This means: -2 < x < 2",
          "Domain: (-2, 2)"
        ],
        difficulty: "Hard",
        category: "Functions",
        points: 10
      },
      {
        id: "dr-q6",
        question: "What is the domain of f(x) = ln(x-1)?",
        type: "multiple-choice",
        options: ["x > 1", "x ≥ 1", "x < 1", "All real numbers"],
        correctAnswer: "x > 1",
        explanation: "The natural logarithm is only defined for positive arguments, so x-1 > 0.",
        workingSteps: [
          "For ln(x-1) to be defined, the argument must be positive",
          "Set up the inequality: x - 1 > 0",
          "Solve for x: x > 1",
          "Domain: (1, ∞)"
        ],
        difficulty: "Medium",
        category: "Functions",
        points: 7
      },
      {
        id: "dr-q7",
        question: "What is the range of f(x) = |x - 3|?",
        type: "multiple-choice",
        options: ["All real numbers", "y ≥ 0", "y ≥ 3", "y ��� -3"],
        correctAnswer: "y ≥ 0",
        explanation: "Absolute value functions always produce non-negative outputs.",
        workingSteps: [
          "The absolute value function |x - 3| measures distance from 3 on the number line",
          "Distance is always non-negative",
          "The minimum value occurs when x = 3: |3 - 3| = 0",
          "As x moves away from 3, the absolute value increases without bound",
          "Range: [0, ∞) or y ≥ 0"
        ],
        difficulty: "Easy",
        category: "Functions",
        points: 5
      },
      {
        id: "dr-q8",
        question: "What is the domain of f(x) = (x+2)/(x²-4)?",
        type: "multiple-choice",
        options: ["All real numbers except ±2", "All real numbers except 2", "All real numbers except -2", "All real numbers"],
        correctAnswer: "All real numbers except ±2",
        explanation: "The function is undefined when the denominator equals zero: x²-4 = 0, so x = ±2.",
        workingSteps: [
          "Find where the denominator equals zero: x² - 4 = 0",
          "Factor: (x - 2)(x + 2) = 0",
          "Solve: x = 2 or x = -2",
          "The function is undefined at these points",
          "Domain: All real numbers except x = 2 and x = -2"
        ],
        difficulty: "Medium",
        category: "Functions",
        points: 7
      }
    ]
  };

  // Handle subtopic-specific quizzes
  const subtopicQuizzes: Record<string, QuizData[]> = {
    "0-0-0": [ // Domain and Range
      {
        id: "dom-quiz-1",
        title: "Domain and Range Fundamentals",
        description: "Test your understanding of function domains and ranges",
        subject: "Mathematical Methods",
        totalTime: 10,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What is the domain of f(x) = 1/(x-2)?",
            type: "multiple-choice",
            options: ["All real numbers", "All real numbers except 2", "All positive numbers", "All numbers greater than 2"],
            correctAnswer: "All real numbers except 2",
            explanation: "The function is undefined when x-2=0, so x cannot equal 2.",
            difficulty: "Easy",
            category: "Functions",
            points: 5
          },
          {
            id: "q2",
            question: "What is the range of f(x) = x²?",
            type: "multiple-choice",
            options: ["All real numbers", "All positive numbers", "All non-negative numbers", "All negative numbers"],
            correctAnswer: "All non-negative numbers",
            explanation: "Since x² is always non-negative, the range is [0, ∞).",
            difficulty: "Easy",
            category: "Functions",
            points: 5
          }
        ]
      },
      {
        id: "dom-quiz-2",
        title: "Advanced Domain and Range",
        description: "Challenge yourself with complex domain and range problems",
        subject: "Mathematical Methods",
        totalTime: 12,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What is the domain of f(x) = ���(x-3)?",
            type: "multiple-choice",
            options: ["x ≥ 3", "x > 3", "x ≤ 3", "All real numbers"],
            correctAnswer: "x ≥ 3",
            explanation: "For square root to be defined, x-3 ≥ 0, so x ≥ 3.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          },
          {
            id: "q2",
            question: "What is the range of f(x) = -2x² + 8?",
            type: "multiple-choice",
            options: ["All real numbers", "y ≤ 8", "y ≥ 8", "y > 0"],
            correctAnswer: "y ≤ 8",
            explanation: "This is a downward parabola with vertex at (0,8), so y ≤ 8.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          }
        ]
      },
      {
        id: "dom-quiz-3",
        title: "Domain and Range Mastery",
        description: "Master domain and range with challenging questions",
        subject: "Mathematical Methods",
        totalTime: 15,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What is the domain of f(x) = 1/√(4-x²)?",
            type: "multiple-choice",
            options: ["-2 < x < 2", "-2 ≤ x ≤ 2", "x < -2 or x > 2", "All real numbers"],
            correctAnswer: "-2 < x < 2",
            explanation: "We need 4-x² > 0, which gives -2 < x < 2.",
            difficulty: "Hard",
            category: "Functions",
            points: 10
          }
        ]
      }
    ],
    "0-0-1": [ // Function Types
      {
        id: "func-quiz-1",
        title: "Linear Functions Basics",
        description: "Introduction to linear functions and their properties",
        subject: "Mathematical Methods",
        totalTime: 8,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What type of function has the form f(x) = mx + b?",
            type: "multiple-choice",
            options: ["Quadratic", "Linear", "Exponential", "Logarithmic"],
            correctAnswer: "Linear",
            explanation: "f(x) = mx + b is the standard form of a linear function.",
            difficulty: "Easy",
            category: "Functions",
            points: 5
          },
          {
            id: "q2",
            question: "In f(x) = 3x + 5, what is the slope?",
            type: "multiple-choice",
            options: ["3", "5", "8", "x"],
            correctAnswer: "3",
            explanation: "In f(x) = mx + b, m is the slope, so the slope is 3.",
            difficulty: "Easy",
            category: "Functions",
            points: 5
          }
        ]
      },
      {
        id: "func-quiz-2",
        title: "Quadratic Functions",
        description: "Understanding quadratic functions and parabolas",
        subject: "Mathematical Methods",
        totalTime: 12,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What is the vertex form of a quadratic function?",
            type: "multiple-choice",
            options: ["f(x) = ax² + bx + c", "f(x) = a(x-h)² + k", "f(x) = mx + b", "f(x) = a^x"],
            correctAnswer: "f(x) = a(x-h)² + k",
            explanation: "The vertex form is f(x) = a(x-h)² + k where (h,k) is the vertex.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          },
          {
            id: "q2",
            question: "Which direction does f(x) = -2x² + 3 open?",
            type: "multiple-choice",
            options: ["Upward", "Downward", "Left", "Right"],
            correctAnswer: "Downward",
            explanation: "Since a = -2 < 0, the parabola opens downward.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          }
        ]
      },
      {
        id: "func-quiz-3",
        title: "Exponential Functions",
        description: "Explore exponential growth and decay functions",
        subject: "Mathematical Methods",
        totalTime: 10,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "What is the general form of an exponential function?",
            type: "multiple-choice",
            options: ["f(x) = ax² + bx + c", "f(x) = mx + b", "f(x) = ab^x", "f(x) = log_a(x)"],
            correctAnswer: "f(x) = ab^x",
            explanation: "An exponential function has the form f(x) = ab^x where a ≠ 0 and b > 0, b ≠ 1.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          }
        ]
      }
    ],
    "0-0-2": [ // Transformations
      {
        id: "trans-quiz-1",
        title: "Function Transformations Basics",
        description: "Understanding how to transform functions",
        subject: "Mathematical Methods",
        totalTime: 8,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "How does f(x) + 3 transform the graph of f(x)?",
            type: "multiple-choice",
            options: ["Shifts up 3 units", "Shifts down 3 units", "Shifts left 3 units", "Shifts right 3 units"],
            correctAnswer: "Shifts up 3 units",
            explanation: "Adding a constant to the function shifts the graph vertically upward.",
            difficulty: "Easy",
            category: "Functions",
            points: 5
          }
        ]
      },
      {
        id: "trans-quiz-2",
        title: "Advanced Transformations",
        description: "Complex function transformations and combinations",
        subject: "Mathematical Methods",
        totalTime: 12,
        passingScore: 70,
        questions: [
          {
            id: "q1",
            question: "How does f(x-2) transform the graph of f(x)?",
            type: "multiple-choice",
            options: ["Shifts up 2 units", "Shifts down 2 units", "Shifts left 2 units", "Shifts right 2 units"],
            correctAnswer: "Shifts right 2 units",
            explanation: "f(x-h) shifts the graph h units to the right.",
            difficulty: "Medium",
            category: "Functions",
            points: 7
          }
        ]
      }
    ]
  };

  // Create comprehensive test that includes questions from all subtopics
  const createFullTest = (): QuizData => {
    const allQuestions: QuizQuestion[] = [];

    // Collect questions from all subtopic question pools
    Object.values(questionPools).forEach(pool => {
      // Take 2-3 questions from each subtopic pool
      const selectedQuestions = pool.slice(0, 3);
      allQuestions.push(...selectedQuestions);
    });

    // Shuffle questions for randomization
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    return {
      id: `${slug}-full-test`,
      title: `${subjectNames[slug as string]} Comprehensive Test`,
      description: `Complete assessment covering all topics in ${subjectNames[slug as string]}`,
      subject: subjectNames[slug as string] || "Subject",
      totalTime: Math.max(45, shuffledQuestions.length * 2), // Minimum 45 minutes or 2 minutes per question
      passingScore: 70,
      questions: shuffledQuestions
    };
  };

  const quizzes = isFullTest
    ? [createFullTest()]
    : subtopicId
    ? (subtopicQuizzes[subtopicId] || [])
    : (subjectQuizzes[slug as string] || []);
  const hasQuizzes = quizzes.length > 0;

  // Auto-start quiz when accessing via direct subtopic route
  useEffect(() => {
    if (subtopicId && hasQuizzes && !selectedQuiz) {
      // Start the first (and only) quiz for this subtopic automatically
      setSelectedQuiz(quizzes[0]);
    }
  }, [subtopicId, hasQuizzes, quizzes, selectedQuiz]);

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

  // Get subtopic name from ID
  const subtopicNames: Record<string, string> = {
    "0-0-0": "Domain and Range",
    "0-0-1": "Function Types",
    "0-0-2": "Transformations",
    "2-0": "Linear Functions",
    "2-1": "Quadratic Functions",
    "2-2": "Cubic Functions",
    "3-0": "Limits",
    "3-1": "Derivatives",
    "3-2": "Chain Rule",
    "4-0": "Antiderivatives",
    "4-1": "Definite Integrals",
    "4-2": "Applications"
  };

  const subtopicName = subtopicId ? subtopicNames[subtopicId] : null;

  const handleQuizComplete = (score: number, answers: Record<string, any>, detailedResults?: DetailedQuizResult, attempt?: QuizAttempt) => {
    if (selectedQuiz) {
      // Update latest score for quick access
      setQuizResults(prev => ({
        ...prev,
        [selectedQuiz.id]: score
      }));

      if (detailedResults) {
        setDetailedQuizResults(prev => ({
          ...prev,
          [selectedQuiz.id]: detailedResults
        }));
      }

      // Update quiz progress with attempt tracking
      if (attempt) {
        setQuizProgress(prev => {
          const existing = prev[selectedQuiz.id] || {
            quizId: selectedQuiz.id,
            attempts: [],
            bestScore: 0,
            hasPassed: false,
            lastAttemptDate: new Date()
          };

          const newAttempts = [...existing.attempts, attempt];
          const bestScore = Math.max(existing.bestScore, score);
          const hasPassed = existing.hasPassed || attempt.passed;

          return {
            ...prev,
            [selectedQuiz.id]: {
              ...existing,
              attempts: newAttempts,
              bestScore,
              hasPassed,
              lastAttemptDate: attempt.completedAt
            }
          };
        });
      }
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

  const getScoreBadge = (score: number, passingScore: number = 70) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-100 text-green-700" };
    if (score >= 80) return { text: "Good", color: "bg-blue-100 text-blue-700" };
    if (score >= passingScore) return { text: "Pass", color: "bg-yellow-100 text-yellow-700" };
    return { text: "Needs Improvement", color: "bg-red-100 text-red-700" };
  };

  const getQuizStatus = (quizId: string, passingScore: number) => {
    const progress = quizProgress[quizId];
    if (!progress || progress.attempts.length === 0) {
      return { status: 'not_attempted', text: 'Not Attempted', color: 'bg-gray-100 text-gray-700' };
    }

    if (progress.hasPassed) {
      return { status: 'passed', text: 'Passed', color: 'bg-green-100 text-green-700' };
    }

    return { status: 'needs_retake', text: 'Needs Retake', color: 'bg-orange-100 text-orange-700' };
  };

  // Show selected quiz
  if (selectedQuiz) {
    // Determine the appropriate return path
    const returnPath = subtopicId
      ? `/subjects/${slug}` // Go back to main subject page for subtopic quizzes
      : `/subjects/${slug}/quizzes`; // Go back to quiz list for main subject quizzes

    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link to={`/subjects/${slug}`}>
              <Button
                variant="outline"
                size="sm"
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>

          <Quiz
            quiz={selectedQuiz}
            onComplete={handleQuizComplete}
            returnPath={returnPath}
            previousAttempts={quizProgress[selectedQuiz.id]?.attempts || []}
            allowRetakes={true}
            requirePassingGrade={false}
            questionPool={subtopicId ? questionPools[subtopicId] : undefined}
            questionsPerAttempt={5}
            curriculumInfo={subtopicId ? decodeCurriculumInfo(subtopicId) || undefined : undefined}
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
                Back
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
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{subjectName} Quizzes</h1>
            <p className="text-gray-600">Test your knowledge with curriculum-aligned questions</p>
          </div>
        </div>

        {/* Current Quiz Topic */}
        {subjectQuizCurriculumMapping[slug as string] && (
          <Card className="mb-8 border-sky-blue-200">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-gray-600 font-medium">Currently studying:</span>
                <Link to={`/subjects/${slug}#unit-${getUnitNumber(subjectQuizCurriculumMapping[slug as string].unit)}`}>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors">
                    {subjectQuizCurriculumMapping[slug as string].unit}
                  </Badge>
                </Link>
                <ChevronRight className="w-3 h-3 text-gray-400" />
                <Link to={`/subjects/${slug}#topic-${getTopicId(subjectQuizCurriculumMapping[slug as string].topic)}`}>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-pointer transition-colors">
                    {subjectQuizCurriculumMapping[slug as string].topic}
                  </Badge>
                </Link>
                {subjectQuizCurriculumMapping[slug as string].subtopic && (
                  <>
                    <ChevronRight className="w-3 h-3 text-gray-400" />
                    <Link to={`/subjects/${slug}#subtopic-${getSubtopicId(subjectQuizCurriculumMapping[slug as string].subtopic)}`}>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 cursor-pointer transition-colors">
                        {subjectQuizCurriculumMapping[slug as string].subtopic}
                      </Badge>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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
              <div className="text-2xl font-bold text-gray-900">{Object.keys(quizProgress).length}</div>
              <div className="text-sm text-gray-600">Attempted</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(quizProgress).length > 0
                  ? Math.round(Object.values(quizProgress).reduce((sum, progress) => sum + progress.bestScore, 0) / Object.values(quizProgress).length)
                  : 0}%
              </div>
              <div className="text-sm text-gray-600">Average Best Score</div>
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
              const progress = quizProgress[quiz.id];
              const quizStatus = getQuizStatus(quiz.id, quiz.passingScore);
              const scoreBadge = score ? getScoreBadge(score, quiz.passingScore) : null;
              const bestScore = progress?.bestScore || score;
              const attemptCount = progress?.attempts.length || 0;
              
              return (
                <Card key={quiz.id} className="border-sky-blue-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">


                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{quiz.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge className={quizStatus.color}>
                              {quizStatus.text}
                            </Badge>
                            {hasCompleted && scoreBadge && (
                              <Badge className={scoreBadge.color}>
                                {bestScore}% {attemptCount > 1 ? `(Best of ${attemptCount})` : ''}
                              </Badge>
                            )}
                          </div>
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
                          className={`text-white ${
                            quizStatus.status === 'needs_retake'
                              ? 'bg-orange-500 hover:bg-orange-600'
                              : 'bg-sky-blue-500 hover:bg-sky-blue-600'
                          }`}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {quizStatus.status === 'not_attempted' ? 'Start Quiz' :
                           quizStatus.status === 'needs_retake' ? 'Retake Quiz' :
                           'Practice Again'}
                        </Button>
                      </div>
                    </div>

                    {hasCompleted && (
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Best Score:</span>
                            <div className="flex items-center">
                              <CheckCircle className={`w-4 h-4 mr-1 ${
                                bestScore >= quiz.passingScore ? 'text-green-500' : 'text-red-500'
                              }`} />
                              <span className="font-medium">{bestScore}%</span>
                            </div>
                          </div>
                          {attemptCount > 1 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Attempts:</span>
                              <span className="font-medium">{attemptCount}</span>
                            </div>
                          )}
                          {progress && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Last Attempt:</span>
                              <span className="text-gray-500">
                                {progress.lastAttemptDate.toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Quick Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Review key concepts with interactive flashcards
              </CardDescription>
              <Link to={`/subjects/${slug}/flashcards`}>
                <Button variant="outline" className="w-full">
                  Study Cards
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Study Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Review comprehensive notes covering these topics
              </CardDescription>
              <Link to={`/subjects/${slug}/notes`}>
                <Button variant="outline" className="w-full">
                  View Notes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
