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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                Complete Exam Study Guide - {studyGuide.subject}
              </h1>
              <p className="text-gray-600 mt-2">
                Detailed exam preparation content with worked examples, formulas, and practice questions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? "Save Changes" : "Edit Content"}
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* Exam Format Information */}
        <Card className="mb-8 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              Exam Format & Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded border">
                <div className="font-medium text-indigo-900">Duration</div>
                <div className="text-indigo-700">{studyGuide.examFormat.duration}</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded border">
                <div className="font-medium text-indigo-900">Total Marks</div>
                <div className="text-indigo-700">{studyGuide.examFormat.totalMarks}</div>
              </div>
              <div className="bg-indigo-50 p-4 rounded border">
                <div className="font-medium text-indigo-900">Calculator</div>
                <div className="text-indigo-700">{studyGuide.examFormat.calculatorAllowed}</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded border">
              <div className="font-medium text-gray-900 mb-2">Exam Structure:</div>
              <div className="text-gray-700">{studyGuide.examFormat.structure}</div>
            </div>
          </CardContent>
        </Card>

        {/* Unit Content */}
        {studyGuide.units.map((unit) => (
          <Card key={unit.id} className="mb-8 border-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  {unit.title}
                </CardTitle>
                <Badge className="bg-blue-100 text-blue-800">Exam Weight: {unit.examWeight}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {unit.topics.map((topic) => (
                <div key={topic.id} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                    <Target className="w-4 h-4 mr-2 text-green-600" />
                    {topic.title}
                  </h3>

                  {/* Key Formulas */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-800">Key Formulas & Concepts</h4>
                      {isEditing && (
                        <Button
                          onClick={() => addFormula(unit.id, topic.id)}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Formula
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topic.content.keyFormulas.map((formula, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded border border-blue-200">
                          {isEditing ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={formula}
                                onChange={(e) => {
                                  const updatedFormulas = [...topic.content.keyFormulas];
                                  updatedFormulas[index] = e.target.value;
                                  updateSection(unit.id, topic.id, 'keyFormulas', updatedFormulas);
                                }}
                                className="font-mono text-sm"
                              />
                              <Button
                                onClick={() => removeFormula(unit.id, topic.id, index)}
                                size="sm"
                                variant="ghost"
                                className="text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          ) : (
                            <div className="font-mono text-blue-900 text-sm">{formula}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Worked Examples */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Worked Examples</h4>
                    {topic.content.workedExamples.map((example, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded border border-green-200 mb-4">
                        <div className="font-medium text-green-900 mb-2">Example {index + 1}:</div>
                        <div className="text-green-800 mb-3">{example.question}</div>
                        <div className="text-green-700 text-sm mb-3">
                          <div className="font-medium mb-1">Solution:</div>
                          <ol className="list-decimal list-inside space-y-1">
                            {example.solution.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        <div className="bg-green-100 p-2 rounded text-green-800 text-sm">
                          <strong>Exam Tip:</strong> {example.examTips}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Exam Questions */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-3">Practice Exam Questions</h4>
                    {topic.content.examQuestions.map((question, index) => (
                      <div key={index} className="bg-yellow-50 p-4 rounded border border-yellow-200 mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-yellow-100 text-yellow-800">{question.type}</Badge>
                          <Badge variant="outline">{question.marks} marks</Badge>
                        </div>
                        <div className="text-yellow-900 mb-3 font-medium">{question.question}</div>

                        {question.options && (
                          <div className="mb-3">
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {question.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className={`p-2 rounded border ${
                                    option === question.answer
                                      ? 'bg-green-100 border-green-300 text-green-800'
                                      : 'bg-white border-gray-200'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optionIndex)}. {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {question.solutionSteps && (
                          <div className="bg-yellow-100 p-3 rounded">
                            <div className="font-medium text-yellow-900 mb-2">Solution Steps:</div>
                            <ol className="list-decimal list-inside space-y-1 text-yellow-800 text-sm">
                              {question.solutionSteps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}


      </div>
    </div>
  );
}
