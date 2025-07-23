import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { 
  ArrowLeft, 
  BookOpen, 
  Brain,
  Trophy,
  CheckCircle,
  Play,
  Clock,
  Target,
  Lightbulb,
  Calculator,
  FileText,
  Eye,
  PenTool
} from "lucide-react";

// Comprehensive topic content for Queensland Mathematics curriculum
const topicContent: Record<string, any> = {
  "mathematical-methods": {
    "1": { // Functions and Relations
      title: "Functions and Relations",
      description: "Master domain, range, function types and transformations",
      difficulty: "Intermediate",
      estimatedTime: "2 hours",
      progress: 75,
      sections: [
        {
          id: "intro",
          title: "Introduction to Functions",
          type: "concept",
          content: `
## Functions and Relations

A **function** is a special type of relation where each input has exactly one output.

### Key Concepts:
- **Domain**: Set of all possible input values (x-values)
- **Range**: Set of all possible output values (y-values)
- **Function notation**: f(x) represents the output when input is x

### Types of Functions:
1. **Linear**: f(x) = mx + b
2. **Quadratic**: f(x) = ax² + bx + c
3. **Exponential**: f(x) = a·b^x

Start with the subtopics below to master each concept step by step.
          `
        }
      ],
      subtopics: [
        {
          id: "domain-range",
          title: "Domain and Range",
          description: "Understanding input and output sets of functions",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/1-0/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/1-0/quiz",
            notes: "/subjects/mathematical-methods/subtopics/1-0/notes"
          }
        },
        {
          id: "function-types",
          title: "Function Types",
          description: "Linear, quadratic, and exponential functions",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/1-1/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/1-1/quiz",
            notes: "/subjects/mathematical-methods/subtopics/1-1/notes"
          }
        },
        {
          id: "transformations",
          title: "Transformations",
          description: "Shifting, stretching, and reflecting functions",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/1-2/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/1-2/quiz",
            notes: "/subjects/mathematical-methods/subtopics/1-2/notes"
          }
        }
      ]
    },
    "2": { // Polynomial Functions
      title: "Polynomial Functions",
      description: "Linear, quadratic, and higher-degree polynomials",
      difficulty: "Intermediate",
      estimatedTime: "2.5 hours",
      progress: 30,
      sections: [
        {
          id: "intro",
          title: "Understanding Polynomials",
          type: "concept",
          content: `
## Polynomial Functions

Polynomial functions are expressions with variables raised to whole number powers.

### General Form:
f(x) = a_n·x^n + a_(n-1)·x^(n-1) + ... + a_1·x + a_0

### Common Types:
- **Linear (Degree 1)**: f(x) = mx + b
- **Quadratic (Degree 2)**: f(x) = ax² + bx + c
- **Cubic (Degree 3)**: f(x) = ax³ + bx² + cx + d

Explore each type through the subtopics below.
          `
        }
      ],
      subtopics: [
        {
          id: "linear",
          title: "Linear Functions",
          description: "First degree polynomials and straight lines",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/2-0/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/2-0/quiz",
            notes: "/subjects/mathematical-methods/subtopics/2-0/notes"
          }
        },
        {
          id: "quadratic",
          title: "Quadratic Functions",
          description: "Second degree polynomials and parabolas",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/2-1/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/2-1/quiz",
            notes: "/subjects/mathematical-methods/subtopics/2-1/notes"
          }
        },
        {
          id: "cubic",
          title: "Cubic Functions",
          description: "Third degree polynomials and their properties",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/2-2/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/2-2/quiz",
            notes: "/subjects/mathematical-methods/subtopics/2-2/notes"
          }
        }
      ]
    },
    "3": { // Differential Calculus
      title: "Differential Calculus",
      description: "Limits, derivatives, and rates of change",
      difficulty: "Advanced",
      estimatedTime: "3 hours",
      progress: 0,
      sections: [
        {
          id: "intro",
          title: "Introduction to Calculus",
          type: "concept",
          content: `
## Differential Calculus

Calculus studies how things change. Differential calculus focuses on **rates of change**.

### Core Concepts:
- **Limits**: What happens as we approach a value
- **Derivatives**: Instantaneous rate of change
- **Applications**: Optimization, motion, growth rates

### Key Skills:
1. Evaluating limits
2. Finding derivatives using rules
3. Applying derivatives to solve problems

Master each concept through the subtopics below.
          `
        }
      ],
      subtopics: [
        {
          id: "limits",
          title: "Limits",
          description: "Understanding behavior as variables approach values",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/3-0/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/3-0/quiz",
            notes: "/subjects/mathematical-methods/subtopics/3-0/notes"
          }
        },
        {
          id: "derivatives",
          title: "Derivatives",
          description: "Instantaneous rates of change and differentiation",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/3-1/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/3-1/quiz",
            notes: "/subjects/mathematical-methods/subtopics/3-1/notes"
          }
        },
        {
          id: "chain-rule",
          title: "Chain Rule",
          description: "Differentiating composite functions",
          links: {
            flashcards: "/subjects/mathematical-methods/subtopics/3-2/flashcards",
            quiz: "/subjects/mathematical-methods/subtopics/3-2/quiz",
            notes: "/subjects/mathematical-methods/subtopics/3-2/notes"
          }
        }
      ]
    }
  },
  mathematics: {
    "functions-and-relations": {
      title: "Functions and Relations",
      description: "Domain, range, inverse functions, and graphical analysis",
      difficulty: "Beginner",
      estimatedTime: "1.5 hours",
      progress: 100,
      sections: [
        {
          id: "definition",
          title: "What is a Function?",
          type: "concept",
          content: `
## Definition of a Function

A **function** is a mathematical relationship where each input (x-value) corresponds to exactly one output (y-value).

### Key Properties:
- **Domain**: The set of all possible input values (x-values)
- **Range**: The set of all possible output values (y-values)
- **One-to-one correspondence**: Each x-value maps to exactly one y-value

### Function Notation:
- **f(x) = y** means "f of x equals y"
- **f(2) = 5** means "when x = 2, the function outputs 5"

### Example:
f(x) = 2x + 3

- f(1) = 2(1) + 3 = 5
- f(3) = 2(3) + 3 = 9
- f(-2) = 2(-2) + 3 = -1
          `,
          examples: [
            {
              question: "Given f(x) = x² - 4x + 3, find f(2)",
              solution: "f(2) = (2)² - 4(2) + 3 = 4 - 8 + 3 = -1",
              explanation: "Substitute x = 2 into the function and simplify"
            }
          ]
        },
        {
          id: "domain-range",
          title: "Domain and Range",
          type: "concept",
          content: `
## Finding Domain and Range

### Domain
The **domain** is all x-values for which the function is defined.

**Common restrictions:**
- Cannot divide by zero
- Cannot take square root of negative numbers (in real numbers)
- Logarithms require positive arguments

### Range
The **range** is all possible y-values that the function can output.

### Examples:

#### Linear Function: f(x) = 2x + 1
- **Domain**: All real numbers (ℝ)
- **Range**: All real numbers (ℝ)

#### Quadratic Function: f(x) = x² - 4
- **Domain**: All real numbers (ℝ)
- **Range**: y ≥ -4 (minimum value is -4)

#### Rational Function: f(x) = 1/(x-2)
- **Domain**: x ≠ 2 (cannot divide by zero)
- **Range**: y ≠ 0
          `,
          examples: [
            {
              question: "Find the domain of g(x) = √(x + 3)",
              solution: "x + 3 ≥ 0, so x ≥ -3. Domain: [-3, ∞)",
              explanation: "For square roots, the expression under the radical must be non-negative"
            }
          ]
        },
        {
          id: "inverse-functions",
          title: "Inverse Functions",
          type: "concept",
          content: `
## Inverse Functions

An **inverse function** f⁻¹(x) "undoes" what the original function f(x) does.

### Key Properties:
- f(f⁻¹(x)) = x
- f⁻¹(f(x)) = x
- The graphs of f and f���¹ are reflections across the line y = x

### Finding Inverse Functions:
1. Replace f(x) with y
2. Swap x and y
3. Solve for y
4. Replace y with f⁻¹(x)

### Example: Find inverse of f(x) = 2x - 3

**Step 1:** y = 2x - 3
**Step 2:** x = 2y - 3
**Step 3:** x + 3 = 2y → y = (x + 3)/2
**Step 4:** f⁻¹(x) = (x + 3)/2

### Verification:
- f(f⁻¹(x)) = f((x+3)/2) = 2((x+3)/2) - 3 = (x+3) - 3 = x ✓
- f⁻¹(f(x)) = f⁻¹(2x-3) = ((2x-3)+3)/2 = 2x/2 = x ✓
          `,
          examples: [
            {
              question: "Find the inverse of h(x) = (x - 1)/3",
              solution: "h⁻¹(x) = 3x + 1",
              explanation: "Start with y = (x-1)/3, swap to get x = (y-1)/3, solve: 3x = y-1, so y = 3x+1"
            }
          ]
        },
        {
          id: "graphical-analysis",
          title: "Graphical Analysis",
          type: "application",
          content: `
## Analyzing Functions Graphically

### Vertical Line Test
A graph represents a function if **every vertical line intersects it at most once**.

### Horizontal Line Test
A function is **one-to-one** (has an inverse) if every horizontal line intersects its graph at most once.

### Key Features to Analyze:
1. **Intercepts**
   - x-intercept: where graph crosses x-axis (y = 0)
   - y-intercept: where graph crosses y-axis (x = 0)

2. **Intervals of Increase/Decrease**
   - Increasing: function values rise as x increases
   - Decreasing: function values fall as x increases

3. **Maximum and Minimum Points**
   - Local maximum: highest point in a region
   - Local minimum: lowest point in a region
   - Global maximum/minimum: highest/lowest point overall

4. **End Behavior**
   - What happens as x → ∞ and x → -∞

### Example Analysis: f(x) = x² - 4x + 3

**Intercepts:**
- y-intercept: f(0) = 3, point (0, 3)
- x-intercepts: x² - 4x + 3 = 0 → (x-1)(x-3) = 0 → x = 1, 3

**Vertex:** x = -b/2a = 4/2 = 2, f(2) = -1, vertex (2, -1)

**Behavior:**
- Decreasing on (-∞, 2)
- Increasing on (2, ∞)
- Minimum value: -1 at x = 2
          `,
          examples: [
            {
              question: "For g(x) = -x² + 6x - 5, find the vertex and determine if it's a maximum or minimum",
              solution: "Vertex at x = 3, g(3) = 4. Point (3, 4) is a maximum since a = -1 < 0",
              explanation: "Use x = -b/2a = -6/2(-1) = 3. Since coefficient of x² is negative, parabola opens downward"
            }
          ]
        }
      ],
      practiceProblems: [
        {
          id: 1,
          question: "Given f(x) = 3x - 7, find f⁻¹(x)",
          options: ["(x + 7)/3", "(x - 7)/3", "3x + 7", "7 - 3x"],
          correct: 0,
          explanation: "Start with y = 3x - 7, swap to get x = 3y - 7, solve: x + 7 = 3y, so y = (x + 7)/3"
        },
        {
          id: 2,
          question: "What is the domain of h(x) = 1/(x² - 9)?",
          options: ["All real numbers", "x ≠ ±3", "x ≠ 3", "x > 0"],
          correct: 1,
          explanation: "Cannot divide by zero. x² - 9 = 0 when x = ±3, so domain excludes these values"
        },
        {
          id: 3,
          question: "If f(x) = x² + 2x - 3, what is the minimum value?",
          options: ["-4", "-3", "-2", "-1"],
          correct: 0,
          explanation: "Vertex at x = -b/2a = -2/2 = -1. f(-1) = 1 - 2 - 3 = -4"
        }
      ]
    },
    "differential-calculus": {
      title: "Differential Calculus",
      description: "Derivatives, limits, chain rule, and applications",
      difficulty: "Intermediate",
      estimatedTime: "2.5 hours",
      progress: 100,
      sections: [
        {
          id: "limits",
          title: "Introduction to Limits",
          type: "concept",
          content: `
## Understanding Limits

A **limit** describes the value that a function approaches as the input approaches a certain value.

### Notation:
lim[x→a] f(x) = L

This reads: "The limit of f(x) as x approaches a equals L"

### Basic Limit Rules:
1. **Constant Rule**: lim[x→a] c = c
2. **Identity Rule**: lim[x→a] x = a
3. **Sum Rule**: lim[x→a] [f(x) + g(x)] = lim[x→a] f(x) + lim[x→a] g(x)
4. **Product Rule**: lim[x→a] [f(x) · g(x)] = lim[x→a] f(x) · lim[x→a] g(x)

### Example:
Find lim[x→3] (2x² - 5x + 1)

**Solution:**
= lim[x→3] 2x² - lim[x→3] 5x + lim[x→3] 1
= 2(3)² - 5(3) + 1
= 18 - 15 + 1 = 4

### Indeterminate Forms:
When direct substitution gives 0/0 or ∞/∞, we need special techniques:
- **Factoring**
- **Rationalization**
- **L'Hôpital's Rule** (advanced)
          `,
          examples: [
            {
              question: "Find lim[x→2] (x² - 4)/(x - 2)",
              solution: "lim[x→2] (x-2)(x+2)/(x-2) = lim[x→2] (x+2) = 4",
              explanation: "Factor the numerator to cancel the common factor that causes 0/0"
            }
          ]
        },
        {
          id: "derivatives",
          title: "Derivatives and Differentiation",
          type: "concept",
          content: `
## The Derivative

The **derivative** measures the instantaneous rate of change of a function.

### Definition:
f'(x) = lim[h→0] [f(x+h) - f(x)]/h

### Basic Differentiation Rules:

#### 1. Power Rule:
If f(x) = xⁿ, then f'(x) = n·xⁿ⁻¹

#### 2. Constant Rule:
If f(x) = c, then f'(x) = 0

#### 3. Constant Multiple Rule:
If f(x) = c·g(x), then f'(x) = c·g'(x)

#### 4. Sum/Difference Rule:
If f(x) = g(x) ± h(x), then f'(x) = g'(x) ± h'(x)

### Examples:

**Example 1:** f(x) = 3x⁴ - 2x² + 5x - 1
f'(x) = 12x³ - 4x + 5

**Example 2:** f(x) = 5x³ - 7x + 2
f'(x) = 15x�� - 7

**Example 3:** f(x) = 1/x² = x⁻²
f'(x) = -2x⁻³ = -2/x³
          `,
          examples: [
            {
              question: "Find the derivative of g(x) = 4x³ - 6x² + 2x - 8",
              solution: "g'(x) = 12x² - 12x + 2",
              explanation: "Apply power rule to each term: d/dx(4x³) = 12x², d/dx(-6x²) = -12x, d/dx(2x) = 2, d/dx(-8) = 0"
            }
          ]
        },
        {
          id: "chain-rule",
          title: "Chain Rule",
          type: "concept",
          content: `
## The Chain Rule

For **composite functions**, we use the chain rule:

If f(x) = g(h(x)), then f'(x) = g'(h(x)) · h'(x)

### Process:
1. Identify the outer function g and inner function h
2. Find the derivative of the outer function
3. Find the derivative of the inner function
4. Multiply them together

### Examples:

**Example 1:** f(x) = (3x + 1)⁵
- Outer function: g(u) = u⁵, so g'(u) = 5u⁴
- Inner function: h(x) = 3x + 1, so h'(x) = 3
- f'(x) = 5(3x + 1)⁴ · 3 = 15(3x + 1)��

**Example 2:** f(x) = √(x² + 4) = (x² + 4)^(1/2)
- Outer function: g(u) = u^(1/2), so g'(u) = (1/2)u^(-1/2)
- Inner function: h(x) = x² + 4, so h'(x) = 2x
- f'(x) = (1/2)(x² + 4)^(-1/2) · 2x = x/√(x² + 4)

### Trigonometric Chain Rule:
- d/dx[sin(u)] = cos(u) · u'
- d/dx[cos(u)] = -sin(u) · u'
- d/dx[tan(u)] = sec²(u) · u'
          `,
          examples: [
            {
              question: "Find the derivative of y = sin(2x + 3)",
              solution: "y' = cos(2x + 3) · 2 = 2cos(2x + 3)",
              explanation: "Outer function is sin(u), inner function is 2x + 3. Apply chain rule."
            }
          ]
        },
        {
          id: "applications",
          title: "Applications of Derivatives",
          type: "application",
          content: `
## Real-World Applications

### 1. Velocity and Acceleration
If s(t) represents position at time t:
- **Velocity**: v(t) = s'(t)
- **Acceleration**: a(t) = v'(t) = s''(t)

### 2. Optimization Problems
Find maximum or minimum values by:
1. Finding where f'(x) = 0 (critical points)
2. Testing these points and endpoints
3. Using second derivative test: f''(x) > 0 → minimum, f''(x) < 0 → maximum

### 3. Related Rates
When quantities are changing with respect to time and are related by an equation.

### Example: Optimization
A rectangular garden is to be enclosed with 100 meters of fencing. What dimensions maximize the area?

**Solution:**
Let length = x, width = y
Constraint: 2x + 2y = 100 → y = 50 - x
Area: A = xy = x(50 - x) = 50x - x²

To maximize: A'(x) = 50 - 2x = 0
Solving: x = 25, y = 25

**Answer:** A 25m × 25m square maximizes the area.

### Example: Related Rates
A balloon is being inflated. When the radius is 5 cm, it's increasing at 2 cm/s. How fast is the volume increasing?

**Given:** dr/dt = 2 cm/s when r = 5 cm
**Find:** dV/dt

**Solution:**
V = (4/3)πr³
dV/dt = 4πr² · dr/dt
When r = 5: dV/dt = 4π(25)(2) = 200π cm³/s
          `,
          examples: [
            {
              question: "A ladder 10m long leans against a wall. If the bottom slides away at 3 m/s, how fast is the top sliding down when the bottom is 6m from the wall?",
              solution: "The top is sliding down at 2.25 m/s",
              explanation: "Use Pythagorean theorem: x² + y² = 100. Differentiate: 2x(dx/dt) + 2y(dy/dt) = 0. When x=6, y=8, dx/dt=3, solve for dy/dt."
            }
          ]
        }
      ],
      practiceProblems: [
        {
          id: 1,
          question: "Find the derivative of f(x) = (2x - 1)³",
          options: ["6(2x - 1)²", "3(2x - 1)²", "6(2x - 1)", "3(2x - 1)"],
          correct: 0,
          explanation: "Using chain rule: outer derivative 3(2x-1)² times inner derivative 2 gives 6(2x-1)²"
        },
        {
          id: 2,
          question: "What is lim[x→1] (x�� - 1)/(x - 1)?",
          options: ["0", "1", "2", "undefined"],
          correct: 2,
          explanation: "Factor: (x-1)(x+1)/(x-1) = x+1. As x→1, this approaches 1+1 = 2"
        },
        {
          id: 3,
          question: "If f(x) = x³ - 3x² + 2, find the critical points",
          options: ["x = 0, 2", "x = 1, 2", "x = 0, 1", "x = 2, 3"],
          correct: 0,
          explanation: "f'(x) = 3x² - 6x = 3x(x-2) = 0, so x = 0 or x = 2"
        }
      ]
    }
  }
};

export default function TopicContent() {
  const { slug, topicId } = useParams();
  const [currentSection, setCurrentSection] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const subject = slug as string;
  const topic = topicContent[subject]?.[topicId as string];

  if (!topic) {
    return (
      <div className="min-h-screen bg-study-background flex items-center justify-center">
        <Card className="text-center border-sky-blue-200 max-w-md">
          <CardHeader>
            <CardTitle>Topic Not Found</CardTitle>
            <CardDescription>This topic content is not available yet.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={`/subjects/${slug}`}>
              <Button>Back to Subject</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handlePracticeAnswer = (questionId: number, answerIndex: number) => {
    setPracticeAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetPractice = () => {
    setPracticeAnswers({});
    setShowResults(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "concept": return <Lightbulb className="w-5 h-5" />;
      case "formula": return <Calculator className="w-5 h-5" />;
      case "application": return <Target className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const currentSectionData = topic.sections[currentSection];

  if (showPractice && topic.practiceProblems && topic.practiceProblems.length > 0) {
    const correctAnswers = topic.practiceProblems.filter((prob: any, index: number) =>
      practiceAnswers[prob.id] === prob.correct
    ).length;
    const score = Math.round((correctAnswers / topic.practiceProblems.length) * 100);

    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowPractice(false)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Content
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">{topic.title} - Practice Problems</h1>
          </div>

          {/* Practice Problems */}
          <div className="space-y-6">
            {topic.practiceProblems.map((problem: any, index: number) => (
              <Card key={problem.id} className="border-sky-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  <CardDescription className="text-base">{problem.question}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {problem.options.map((option: string, optionIndex: number) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          practiceAnswers[problem.id] === optionIndex
                            ? showResults
                              ? optionIndex === problem.correct
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-sky-blue-500 bg-sky-blue-50'
                            : showResults && optionIndex === problem.correct
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${problem.id}`}
                          checked={practiceAnswers[problem.id] === optionIndex}
                          onChange={() => handlePracticeAnswer(problem.id, optionIndex)}
                          className="mr-3"
                          disabled={showResults}
                        />
                        <span>{option}</span>
                        {showResults && optionIndex === problem.correct && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                      </label>
                    ))}
                  </div>
                  {showResults && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">Explanation:</p>
                      <p className="text-gray-700">{problem.explanation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            {!showResults ? (
              <Button
                onClick={checkAnswers}
                disabled={Object.keys(practiceAnswers).length !== topic.practiceProblems.length}
                className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
              >
                Check Answers
              </Button>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900">{score}%</div>
                  <div className="text-gray-600">{correctAnswers} out of {topic.practiceProblems.length} correct</div>
                </div>
                <div className="flex space-x-3">
                  <Button onClick={resetPractice} variant="outline">
                    Try Again
                  </Button>
                  <Button 
                    className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
                    onClick={() => setShowPractice(false)}
                  >
                    Continue Learning
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/subjects/${slug}`}>
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {slug?.charAt(0).toUpperCase() + slug?.slice(1)}
            </Button>
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {topic.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{topic.description}</p>
              <div className="flex gap-3">
                <Badge className={getDifficultyColor(topic.difficulty)}>
                  {topic.difficulty}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {topic.estimatedTime}
                </Badge>
              </div>
            </div>
            {topic.practiceProblems && topic.practiceProblems.length > 0 && (
              <Button
                onClick={() => setShowPractice(true)}
                className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
              >
                <PenTool className="w-4 h-4 mr-2" />
                Practice Problems
              </Button>
            )}
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8 border-sky-blue-200">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{topic.progress}% Complete</span>
            </div>
            <Progress value={topic.progress} className="h-2" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-sky-blue-200 sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {topic.sections.map((section: any, index: number) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-sky-blue-50 transition-colors ${
                        currentSection === index ? 'bg-sky-blue-50 border-r-2 border-sky-blue-500' : ''
                      }`}
                    >
                      <div className={`p-1 rounded ${
                        currentSection === index ? 'bg-sky-blue-100' : 'bg-gray-100'
                      }`}>
                        {getSectionIcon(section.type)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs text-gray-500 capitalize">{section.type}</div>
                      </div>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-sky-blue-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-sky-blue-100 rounded-lg">
                    {getSectionIcon(currentSectionData.type)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{currentSectionData.title}</CardTitle>
                    <Badge variant="outline" className="capitalize mt-1">
                      {currentSectionData.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: currentSectionData.content
                      .replace(/\n/g, '<br>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-4 text-gray-900">$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-3 text-gray-900">$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
                  }}
                />

                {/* Examples */}
                {currentSectionData.examples && currentSectionData.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Worked Examples</h3>
                    {currentSectionData.examples.map((example: any, index: number) => (
                      <Card key={index} className="bg-blue-50 border-blue-200">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <span className="font-medium text-blue-900">Question: </span>
                              <span className="text-blue-800">{example.question}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-900">Solution: </span>
                              <span className="text-blue-800 font-mono">{example.solution}</span>
                            </div>
                            <div>
                              <span className="font-medium text-blue-900">Explanation: </span>
                              <span className="text-blue-700">{example.explanation}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Subtopics Section */}
                {topic.subtopics && topic.subtopics.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Study This Topic By Subtopic</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {topic.subtopics.map((subtopic: any, index: number) => (
                        <Card key={index} className="border-sky-blue-200 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">{subtopic.title}</CardTitle>
                            <CardDescription className="text-sm">{subtopic.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <Link to={subtopic.links.flashcards}>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Brain className="w-4 h-4 mr-2" />
                                  Flashcards
                                </Button>
                              </Link>
                              <Link to={subtopic.links.quiz}>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <Trophy className="w-4 h-4 mr-2" />
                                  Quiz
                                </Button>
                              </Link>
                              <Link to={subtopic.links.notes}>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Study Notes
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    Previous Section
                  </Button>
                  
                  {currentSection < topic.sections.length - 1 ? (
                    <Button
                      onClick={() => setCurrentSection(currentSection + 1)}
                      className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
                    >
                      Next Section
                    </Button>
                  ) : topic.practiceProblems && topic.practiceProblems.length > 0 ? (
                    <Button
                      onClick={() => setShowPractice(true)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      Take Practice Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Topic Complete
                    </Button>
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
