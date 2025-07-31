import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
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
  Award
} from "lucide-react";

export default function ComprehensiveStudyGuide() {
  const { subjectId } = useParams();

  const studyGuide = {
    subject: "Mathematical Methods",
    overview: "This comprehensive study guide provides a complete learning pathway for Mathematical Methods, integrating all units and topics to show how concepts connect across the subject. It's designed to support progressive learning from foundational concepts to advanced applications.",
    learningPathway: [
      {
        phase: "Foundation Phase",
        description: "Build core mathematical foundations",
        units: ["Algebra and Functions"],
        duration: "4-6 weeks",
        keyMilestones: ["Master function types", "Understand transformations", "Apply basic calculus"]
      },
      {
        phase: "Development Phase", 
        description: "Develop analytical and problem-solving skills",
        units: ["Differential Calculus", "Integral Calculus"],
        duration: "8-10 weeks",
        keyMilestones: ["Apply differentiation rules", "Solve optimization problems", "Master integration techniques"]
      },
      {
        phase: "Mastery Phase",
        description: "Integrate concepts and apply to complex problems",
        units: ["Statistics and Probability", "Applications"],
        duration: "6-8 weeks",
        keyMilestones: ["Analyze statistical data", "Apply calculus to real-world problems", "Synthesize all concepts"]
      }
    ],
    conceptConnections: [
      {
        concept: "Functions → Derivatives",
        description: "Understanding function behavior leads naturally to rate of change analysis through derivatives"
      },
      {
        concept: "Derivatives → Optimization",
        description: "Derivative concepts enable finding maximum and minimum values in practical applications"
      },
      {
        concept: "Integration → Area/Volume",
        description: "Integral calculus provides tools for calculating areas, volumes, and accumulated quantities"
      },
      {
        concept: "Statistics → Decision Making",
        description: "Statistical analysis supports evidence-based decision making in various contexts"
      }
    ],
    examStrategies: [
      {
        strategy: "Progressive Practice",
        description: "Start with basic problems and gradually increase complexity",
        tips: ["Master fundamentals first", "Build problem-solving confidence", "Practice time management"]
      },
      {
        strategy: "Concept Mapping",
        description: "Create visual connections between mathematical concepts",
        tips: ["Draw relationship diagrams", "Identify formula families", "Connect theory to applications"]
      },
      {
        strategy: "Error Analysis",
        description: "Learn from mistakes to strengthen understanding",
        tips: ["Keep error logs", "Identify common mistake patterns", "Practice problem-prone areas"]
      }
    ],
    quickReference: {
      keyFormulas: [
        { category: "Derivatives", formula: "d/dx[x^n] = nx^(n-1)", application: "Power rule for differentiation" },
        { category: "Integration", formula: "∫x^n dx = x^(n+1)/(n+1) + C", application: "Power rule for integration" },
        { category: "Chain Rule", formula: "d/dx[f(g(x))] = f'(g(x)) × g'(x)", application: "Composite function differentiation" },
        { category: "Statistics", formula: "μ = Σx/n", application: "Population mean calculation" }
      ],
      commonMistakes: [
        "Forgetting the constant of integration",
        "Misapplying the chain rule",
        "Confusing correlation with causation",
        "Not checking domain restrictions"
      ],
      studyTips: [
        "Practice consistently rather than cramming",
        "Understand concepts before memorizing formulas",
        "Work through problems step-by-step",
        "Seek help when concepts are unclear"
      ]
    },
    assessmentCriteria: [
      {
        criterion: "Mathematical Knowledge",
        weight: "30%",
        description: "Demonstrate understanding of mathematical concepts, formulas, and principles"
      },
      {
        criterion: "Problem Solving",
        weight: "40%",
        description: "Apply mathematical methods to solve problems and analyze situations"
      },
      {
        criterion: "Communication",
        weight: "20%",
        description: "Clearly explain mathematical reasoning and present solutions coherently"
      },
      {
        criterion: "Mathematical Reasoning",
        weight: "10%",
        description: "Make connections between concepts and justify mathematical decisions"
      }
    ]
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
