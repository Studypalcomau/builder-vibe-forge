import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  Download,
  Eye,
  BarChart3,
  MapPin,
  Lightbulb,
  Award,
  Edit,
  Save,
  Plus,
  Trash2
} from "lucide-react";

export default function ComprehensiveStudyGuide() {
  const { subjectId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  const [studyGuide, setStudyGuide] = useState({
    subject: "Mathematical Methods",
    examFormat: {
      duration: "3 hours",
      sections: 2,
      totalMarks: 100,
      calculatorAllowed: "CAS calculator permitted",
      structure: "Section A: Multiple choice (20 marks), Section B: Extended response (80 marks)"
    },
    units: [
      {
        id: "unit1",
        title: "Unit 1: Algebra and Functions",
        examWeight: "25%",
        topics: [
          {
            id: "functions",
            title: "Functions and Relations",
            content: {
              keyFormulas: [
                "f(x) = mx + b (Linear function)",
                "f(x) = ax² + bx + c (Quadratic function)",
                "f(x) = a(x - h)² + k (Vertex form)",
                "Domain: {x ∈ R : conditions}",
                "Range: {y ∈ R : conditions}"
              ],
              workedExamples: [
                {
                  question: "Find the domain and range of f(x) = √(x - 3) + 2",
                  solution: [
                    "For √(x - 3) to be real: x - 3 ≥ 0",
                    "Therefore: x ≥ 3",
                    "Domain: [3, ∞)",
                    "Since √(x - 3) ≥ 0, then √(x - 3) + 2 ≥ 2",
                    "Range: [2, ∞)"
                  ],
                  examTips: "Always check for square roots, fractions, and logarithms when finding domain"
                }
              ],
              examQuestions: [
                {
                  type: "Multiple Choice",
                  question: "The domain of f(x) = 1/(x² - 4) is:",
                  options: ["R \\ {±2}", "R \\ {2}", "R \\ {-2}", "R"],
                  answer: "R \\ {±2}",
                  marks: 2
                },
                {
                  type: "Extended Response",
                  question: "A parabola has vertex at (-2, 5) and passes through (0, 1). Find the equation in the form f(x) = ax² + bx + c",
                  solutionSteps: [
                    "Use vertex form: f(x) = a(x + 2)² + 5",
                    "Substitute point (0, 1): 1 = a(0 + 2)² + 5",
                    "1 = 4a + 5, so 4a = -4, therefore a = -1",
                    "f(x) = -(x + 2)² + 5",
                    "Expand: f(x) = -(x² + 4x + 4) + 5",
                    "f(x) = -x² - 4x - 4 + 5",
                    "f(x) = -x² - 4x + 1"
                  ],
                  marks: 6
                }
              ]
            }
          },
          {
            id: "transformations",
            title: "Function Transformations",
            content: {
              keyFormulas: [
                "f(x) + k: vertical translation by k units",
                "f(x + h): horizontal translation by -h units",
                "af(x): vertical scaling by factor a",
                "f(bx): horizontal scaling by factor 1/b",
                "-f(x): reflection in x-axis",
                "f(-x): reflection in y-axis"
              ],
              workedExamples: [
                {
                  question: "Describe the transformations that map f(x) = x² to g(x) = -2(x - 3)² + 1",
                  solution: [
                    "Compare g(x) = -2(x - 3)² + 1 with f(x) = x²",
                    "Horizontal translation: 3 units right (x → x - 3)",
                    "Vertical scaling: factor of 2 (coefficient 2)",
                    "Reflection in x-axis (negative sign)",
                    "Vertical translation: 1 unit up (+ 1)",
                    "Order: translate right 3, scale by 2, reflect in x-axis, translate up 1"
                  ],
                  examTips: "Always state transformations in the correct order of operations"
                }
              ],
              examQuestions: [
                {
                  type: "Extended Response",
                  question: "The graph of y = f(x) is transformed to y = 3f(2x - 4) + 1. Describe the sequence of transformations.",
                  solutionSteps: [
                    "Rewrite as y = 3f(2(x - 2)) + 1",
                    "1. Horizontal translation 2 units right: f(x) → f(x - 2)",
                    "2. Horizontal scaling by factor 1/2: f(x - 2) → f(2(x - 2))",
                    "3. Vertical scaling by factor 3: f(2(x - 2)) → 3f(2(x - 2))",
                    "4. Vertical translation 1 unit up: 3f(2(x - 2)) → 3f(2(x - 2)) + 1"
                  ],
                  marks: 5
                }
              ]
            }
          }
        ]
      },
      {
        id: "unit2",
        title: "Unit 2: Calculus",
        examWeight: "35%",
        topics: [
          {
            id: "derivatives",
            title: "Differentiation",
            content: {
              keyFormulas: [
                "d/dx[x^n] = nx^(n-1) (Power rule)",
                "d/dx[sin x] = cos x",
                "d/dx[cos x] = -sin x",
                "d/dx[e^x] = e^x",
                "d/dx[ln x] = 1/x",
                "d/dx[f(g(x))] = f'(g(x)) × g'(x) (Chain rule)",
                "d/dx[f(x)g(x)] = f'(x)g(x) + f(x)g'(x) (Product rule)"
              ],
              workedExamples: [
                {
                  question: "Find dy/dx for y = (3x² - 1)⁵",
                  solution: [
                    "Use chain rule: dy/dx = dy/du × du/dx",
                    "Let u = 3x² - 1, then y = u⁵",
                    "dy/du = 5u⁴ = 5(3x² - 1)⁴",
                    "du/dx = 6x",
                    "dy/dx = 5(3x² - 1)⁴ × 6x",
                    "dy/dx = 30x(3x² - 1)⁴"
                  ],
                  examTips: "Always identify the inner and outer functions clearly when using chain rule"
                }
              ],
              examQuestions: [
                {
                  type: "Extended Response",
                  question: "A particle moves along a straight line. Its displacement from the origin at time t seconds is given by s(t) = 2t³ - 9t² + 12t + 1. Find when the particle is momentarily at rest.",
                  solutionSteps: [
                    "Velocity v(t) = ds/dt = d/dt[2t³ - 9t² + 12t + 1]",
                    "v(t) = 6t² - 18t + 12",
                    "For particle at rest: v(t) = 0",
                    "6t² - 18t + 12 = 0",
                    "Divide by 6: t² - 3t + 2 = 0",
                    "Factor: (t - 1)(t - 2) = 0",
                    "Therefore t = 1 or t = 2",
                    "The particle is at rest at t = 1s and t = 2s"
                  ],
                  marks: 7
                }
              ]
            }
          },
          {
            id: "integration",
            title: "Integration",
            content: {
              keyFormulas: [
                "∫x^n dx = x^(n+1)/(n+1) + C, n ≠ -1",
                "∫1/x dx = ln|x| + C",
                "∫e^x dx = e^x + C",
                "∫sin x dx = -cos x + C",
                "∫cos x dx = sin x + C",
                "∫f'(x)/f(x) dx = ln|f(x)| + C",
                "∫[a to b] f(x) dx = F(b) - F(a) where F'(x) = f(x)"
              ],
              workedExamples: [
                {
                  question: "Evaluate ∫[1 to 2] (3x² - 2x + 1) dx",
                  solution: [
                    "Find antiderivative: ∫(3x² - 2x + 1) dx = x³ - x² + x + C",
                    "Apply fundamental theorem: [x³ - x² + x]₁²",
                    "Substitute upper limit: (2)³ - (2)² + (2) = 8 - 4 + 2 = 6",
                    "Substitute lower limit: (1)³ - (1)² + (1) = 1 - 1 + 1 = 1",
                    "Result: 6 - 1 = 5",
                    "∫[1 to 2] (3x² - 2x + 1) dx = 5"
                  ],
                  examTips: "Always show the antiderivative before substituting limits"
                }
              ],
              examQuestions: [
                {
                  type: "Extended Response",
                  question: "The region bounded by y = x², y = 0, x = 1, and x = 3 is rotated about the x-axis. Find the volume of the solid formed.",
                  solutionSteps: [
                    "Volume of revolution: V = π∫[a to b] [f(x)]² dx",
                    "Here f(x) = x², a = 1, b = 3",
                    "V = π∫[1 to 3] (x²)² dx = π∫[1 to 3] x⁴ dx",
                    "Antiderivative: ∫x⁴ dx = x⁵/5",
                    "V = π[x⁵/5]₁³ = π[(3⁵/5) - (1⁵/5)]",
                    "V = π[(243/5) - (1/5)] = π(242/5)",
                    "V = 242π/5 cubic units"
                  ],
                  marks: 6
                }
              ]
            }
          }
        ]
      }
    ],
    examTechniques: [
      {
        id: "time-management",
        title: "Time Management Strategies",
        content: "Allocate 1.8 minutes per mark. Read all questions first, attempt easier questions to build confidence, leave difficult questions for last review."
      },
      {
        id: "working-out",
        title: "Showing Working",
        content: "Always show clear working steps. Even if final answer is wrong, partial marks awarded for correct method. Use proper mathematical notation."
      },
      {
        id: "checking",
        title: "Answer Checking",
        content: "Substitute answers back into original equations where possible. Check units and reasonableness of answers. Use estimation to verify calculations."
      }
    ],
    pastExamQuestions: [
      {
        year: "2023",
        question: "A ball is thrown vertically upward from ground level with initial velocity 20 m/s. Its height h(t) = -5t² + 20t. When does it return to ground level?",
        solution: "Set h(t) = 0: -5t² + 20t = 0, t(-5t + 20) = 0, so t = 0 or t = 4. Returns to ground at t = 4 seconds.",
        marks: 3
      },
      {
        year: "2022",
        question: "Find the equation of the tangent to y = x³ - 3x² + 2x at the point where x = 1.",
        solution: "y'(x) = 3x² - 6x + 2. At x = 1: y'(1) = 3 - 6 + 2 = -1. Point: (1, 1 - 3 + 2) = (1, 0). Tangent: y - 0 = -1(x - 1), so y = -x + 1.",
        marks: 4
      }
    ]
  });

  const updateSection = (unitId: string, topicId: string, field: string, value: any) => {
    setStudyGuide(prev => ({
      ...prev,
      units: prev.units.map(unit =>
        unit.id === unitId
          ? {
              ...unit,
              topics: unit.topics.map(topic =>
                topic.id === topicId
                  ? { ...topic, content: { ...topic.content, [field]: value } }
                  : topic
              )
            }
          : unit
      )
    }));
  };

  const addFormula = (unitId: string, topicId: string) => {
    const newFormula = "New formula";
    const unit = studyGuide.units.find(u => u.id === unitId);
    const topic = unit?.topics.find(t => t.id === topicId);
    if (topic) {
      const updatedFormulas = [...topic.content.keyFormulas, newFormula];
      updateSection(unitId, topicId, 'keyFormulas', updatedFormulas);
    }
  };

  const removeFormula = (unitId: string, topicId: string, index: number) => {
    const unit = studyGuide.units.find(u => u.id === unitId);
    const topic = unit?.topics.find(t => t.id === topicId);
    if (topic) {
      const updatedFormulas = topic.content.keyFormulas.filter((_, i) => i !== index);
      updateSection(unitId, topicId, 'keyFormulas', updatedFormulas);
    }
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/admin/subjects/${subjectId}/edit`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subject Editor
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-indigo-600" />
                Comprehensive Study Guide - {studyGuide.subject}
              </h1>
              <p className="text-gray-600 mt-2">
                Complete learning companion with interconnected concepts and strategic guidance
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export as PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-indigo-600" />
              Subject Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{studyGuide.overview}</p>
          </CardContent>
        </Card>

        {/* Learning Pathway */}
        <Card className="mb-8 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Progressive Learning Pathway
            </CardTitle>
            <CardDescription>Structured approach to mastering the subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {studyGuide.learningPathway.map((phase, index) => (
                <div key={index} className="border-l-4 border-blue-400 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-400 rounded-full"></div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-blue-900">{phase.phase}</h3>
                      <Badge className="bg-blue-100 text-blue-800">{phase.duration}</Badge>
                    </div>
                    <p className="text-blue-700 mb-3">{phase.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Focus Units:</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          {phase.units.map((unit, unitIndex) => (
                            <li key={unitIndex}>• {unit}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-800 mb-2">Key Milestones:</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          {phase.keyMilestones.map((milestone, milestoneIndex) => (
                            <li key={milestoneIndex} className="flex items-center">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Concept Connections */}
        <Card className="mb-8 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-green-600" />
              Cross-Topic Concept Connections
            </CardTitle>
            <CardDescription>How mathematical concepts build upon each other</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studyGuide.conceptConnections.map((connection, index) => (
                <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-medium text-green-900 mb-2">{connection.concept}</h3>
                  <p className="text-green-700 text-sm">{connection.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Exam Preparation Strategies */}
        <Card className="mb-8 border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-600" />
              Exam Preparation Strategies
            </CardTitle>
            <CardDescription>Proven methods for exam success</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyGuide.examStrategies.map((strategy, index) => (
                <div key={index} className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-medium text-orange-900 mb-2">{strategy.strategy}</h3>
                  <p className="text-orange-700 mb-3 text-sm">{strategy.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <Badge key={tipIndex} variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                        {tip}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Reference */}
        <Card className="mb-8 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-600" />
              Quick Reference Guide
            </CardTitle>
            <CardDescription>Essential formulas, common mistakes, and study tips</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Formulas */}
              <div>
                <h3 className="font-medium text-purple-900 mb-3">Key Formulas</h3>
                <div className="space-y-3">
                  {studyGuide.quickReference.keyFormulas.map((formula, index) => (
                    <div key={index} className="bg-purple-50 p-3 rounded border border-purple-200">
                      <div className="font-medium text-purple-800 text-sm">{formula.category}</div>
                      <div className="font-mono text-purple-900 text-sm my-1">{formula.formula}</div>
                      <div className="text-purple-700 text-xs">{formula.application}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div>
                <h3 className="font-medium text-red-900 mb-3">Common Mistakes</h3>
                <div className="space-y-2">
                  {studyGuide.quickReference.commonMistakes.map((mistake, index) => (
                    <div key={index} className="bg-red-50 p-3 rounded border border-red-200">
                      <div className="text-red-800 text-sm">{mistake}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Tips */}
              <div>
                <h3 className="font-medium text-green-900 mb-3">Study Tips</h3>
                <div className="space-y-2">
                  {studyGuide.quickReference.studyTips.map((tip, index) => (
                    <div key={index} className="bg-green-50 p-3 rounded border border-green-200">
                      <div className="text-green-800 text-sm">{tip}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Criteria */}
        <Card className="mb-8 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Assessment Criteria & Rubrics
            </CardTitle>
            <CardDescription>Understanding how your work will be evaluated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-50 border-b border-yellow-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-yellow-900">Criterion</th>
                    <th className="text-left py-3 px-4 font-medium text-yellow-900">Weight</th>
                    <th className="text-left py-3 px-4 font-medium text-yellow-900">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studyGuide.assessmentCriteria.map((criterion, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{criterion.criterion}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-yellow-100 text-yellow-800">{criterion.weight}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-700 text-sm">{criterion.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
