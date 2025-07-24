import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
  ArrowLeft,
  Brain,
  Trophy,
  FileText,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Save
} from "lucide-react";

interface Question {
  id: number;
  type: string;
  title: string;
  answer: string;
  workings: string;
  difficulty: string;
  status: string;
}

export default function QuestionsManagement() {
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Mock data for questions organized by curriculum structure
  const questionsData = [
    {
      unitId: 1,
      unitName: "Unit 1: Algebra and Functions",
      topics: [
        {
          topicId: 1,
          topicName: "Functions and Relations",
          subtopics: [
            {
              subtopicId: 1,
              subtopicName: "Domain and Range",
              questions: [
                { id: 1, type: "flashcard", title: "What is the domain of f(x) = 1/x?", answer: "All real numbers except x = 0", workings: "The function is undefined when the denominator equals zero, so x ≠ 0. Domain: (-∞, 0) ∪ (0, ∞)", difficulty: "Easy", status: "Published" },
                { id: 2, type: "quiz", title: "Find the range of y = x² + 1", answer: "y ≥ 1 or [1, ∞)", workings: "Since x² ≥ 0 for all real x, we have x² + 1 ≥ 1. The minimum value is 1 when x = 0.", difficulty: "Intermediate", status: "Published" },
                { id: 3, type: "flashcard", title: "Define function domain", answer: "The set of all possible input values (x-values) for which the function is defined", workings: "Domain includes all x-values that don't make the function undefined (e.g., division by zero, negative square roots for real functions)", difficulty: "Easy", status: "Draft" }
              ]
            },
            {
              subtopicId: 2,
              subtopicName: "Function Types",
              questions: [
                { id: 4, type: "quiz", title: "Identify linear vs quadratic functions", answer: "Linear: f(x) = mx + b (degree 1), Quadratic: f(x) = ax² + bx + c (degree 2)", workings: "Linear functions have constant rate of change, graph as straight lines. Quadratic functions have variable rate of change, graph as parabolas.", difficulty: "Intermediate", status: "Published" },
                { id: 5, type: "flashcard", title: "What is a polynomial function?", answer: "A function of the form f(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀", workings: "Polynomial functions are sums of terms with non-negative integer exponents. Examples: f(x) = 3x² + 2x - 1", difficulty: "Easy", status: "Published" }
              ]
            }
          ]
        },
        {
          topicId: 2,
          topicName: "Polynomial Functions",
          subtopics: [
            {
              subtopicId: 3,
              subtopicName: "Linear Functions",
              questions: [
                { id: 6, type: "quiz", title: "Solve linear equation ax + b = 0", answer: "x = -b/a (where a ≠ 0)", workings: "ax + b = 0 → ax = -b → x = -b/a. If a = 0 and b ≠ 0, no solution. If a = 0 and b = 0, infinitely many solutions.", difficulty: "Easy", status: "Published" },
                { id: 7, type: "flashcard", title: "What is the slope-intercept form?", answer: "y = mx + b, where m is slope and b is y-intercept", workings: "This form immediately shows the slope (m) and where the line crosses the y-axis (b). Example: y = 3x + 2 has slope 3 and y-intercept 2.", difficulty: "Easy", status: "Published" }
              ]
            },
            {
              subtopicId: 4,
              subtopicName: "Quadratic Functions",
              questions: [
                { id: 8, type: "quiz", title: "Complete the square for x² + 4x + 3", answer: "(x + 2)² - 1", workings: "x² + 4x + 3 = x² + 4x + 4 - 4 + 3 = (x + 2)² - 1. Take half of coefficient of x: 4/2 = 2, then square it: 2² = 4.", difficulty: "Intermediate", status: "Published" },
                { id: 9, type: "flashcard", title: "What is the vertex form of a parabola?", answer: "y = a(x - h)² + k, where (h,k) is the vertex", workings: "This form shows the vertex (h,k) directly. The value 'a' determines if parabola opens up (a > 0) or down (a < 0) and how wide/narrow it is.", difficulty: "Intermediate", status: "Draft" },
                { id: 10, type: "quiz", title: "Find roots using quadratic formula", answer: "x = (-b ± √(b² - 4ac)) / 2a", workings: "For ax² + bx + c = 0, discriminant Δ = b² - 4ac. If Δ > 0: two real roots, Δ = 0: one root, Δ < 0: no real roots.", difficulty: "Advanced", status: "Published" }
              ]
            }
          ]
        }
      ]
    },
    {
      unitId: 2,
      unitName: "Unit 2: Calculus",
      topics: [
        {
          topicId: 3,
          topicName: "Differential Calculus",
          subtopics: [
            {
              subtopicId: 5,
              subtopicName: "Limits",
              questions: [
                { id: 11, type: "quiz", title: "Evaluate limit as x approaches 0", difficulty: "Advanced", status: "Published" },
                { id: 12, type: "flashcard", title: "Define continuity", difficulty: "Intermediate", status: "Published" }
              ]
            },
            {
              subtopicId: 6,
              subtopicName: "Derivatives",
              questions: [
                { id: 13, type: "quiz", title: "Find derivative of x³ + 2x", difficulty: "Intermediate", status: "Published" },
                { id: 14, type: "flashcard", title: "What is the power rule?", difficulty: "Easy", status: "Published" },
                { id: 15, type: "quiz", title: "Apply chain rule to composite functions", difficulty: "Advanced", status: "Draft" }
              ]
            }
          ]
        }
      ]
    }
  ];

  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Calculate totals
  const totalQuestions = questionsData.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) =>
      topicAcc + topic.subtopics.reduce((subtopicAcc, subtopic) =>
        subtopicAcc + subtopic.questions.length, 0), 0), 0
  );

  const totalFlashcards = questionsData.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) =>
      topicAcc + topic.subtopics.reduce((subtopicAcc, subtopic) =>
        subtopicAcc + subtopic.questions.filter(q => q.type === "flashcard").length, 0), 0), 0
  );

  const totalQuizzes = questionsData.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) =>
      topicAcc + topic.subtopics.reduce((subtopicAcc, subtopic) =>
        subtopicAcc + subtopic.questions.filter(q => q.type === "quiz").length, 0), 0), 0
  );

  const publishedQuestions = questionsData.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) =>
      topicAcc + topic.subtopics.reduce((subtopicAcc, subtopic) =>
        subtopicAcc + subtopic.questions.filter(q => q.status === "Published").length, 0), 0), 0
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-700";
      case "Draft": return "bg-yellow-100 text-yellow-700";
      case "Archived": return "bg-gray-100 text-gray-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flashcard": return <Brain className="w-4 h-4 text-blue-500" />;
      case "quiz": return <Trophy className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Admin
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Questions Management</h1>
                <p className="text-gray-600">Manage all questions by curriculum structure</p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Questions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Flashcards</p>
                  <p className="text-2xl font-bold text-gray-900">{totalFlashcards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Quiz Questions</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{publishedQuestions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                >
                  <option value="all">All Units</option>
                  <option value="1">Unit 1: Algebra and Functions</option>
                  <option value="2">Unit 2: Calculus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="flashcard">Flashcards</option>
                  <option value="quiz">Quiz Questions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Questions by Curriculum Structure</CardTitle>
            <CardDescription>
              Questions organized by Unit → Topic → Subtopic structure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Unit</TableHead>
                    <TableHead className="w-[180px]">Topic</TableHead>
                    <TableHead className="w-[180px]">Subtopic</TableHead>
                    <TableHead className="w-[60px]">Type</TableHead>
                    <TableHead className="w-[300px]">Question Title</TableHead>
                    <TableHead className="w-[100px]">Difficulty</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questionsData.map((unit) => {
                    const unitRowSpan = unit.topics.reduce((acc, topic) => 
                      acc + topic.subtopics.reduce((subAcc, subtopic) => 
                        subAcc + subtopic.questions.length, 0), 0);
                    let firstUnit = true;

                    return unit.topics.map((topic) => {
                      const topicRowSpan = topic.subtopics.reduce((acc, subtopic) => 
                        acc + subtopic.questions.length, 0);
                      let firstTopic = true;

                      return topic.subtopics.map((subtopic) => {
                        const subtopicRowSpan = subtopic.questions.length;
                        let firstSubtopic = true;

                        return subtopic.questions.map((question, questionIndex) => {
                          const isFirstQuestion = firstUnit && firstTopic && firstSubtopic && questionIndex === 0;
                          const isFirstTopicQuestion = firstTopic && firstSubtopic && questionIndex === 0;
                          const isFirstSubtopicQuestion = firstSubtopic && questionIndex === 0;

                          const row = (
                            <TableRow key={question.id} className="hover:bg-gray-50">
                              {isFirstQuestion && (
                                <TableCell rowSpan={unitRowSpan} className="border-r border-gray-200 bg-blue-50/30 align-top">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {unit.unitName}
                                  </div>
                                </TableCell>
                              )}

                              {isFirstTopicQuestion && (
                                <TableCell rowSpan={topicRowSpan} className="border-r border-gray-200 bg-green-50/30 align-top">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {topic.topicName}
                                  </div>
                                </TableCell>
                              )}

                              {isFirstSubtopicQuestion && (
                                <TableCell rowSpan={subtopicRowSpan} className="border-r border-gray-200 bg-purple-50/30 align-top">
                                  <div className="font-medium text-gray-900 text-sm">
                                    {subtopic.subtopicName}
                                  </div>
                                </TableCell>
                              )}

                              <TableCell className="border-r border-gray-200">
                                <div className="flex justify-center">
                                  {getTypeIcon(question.type)}
                                </div>
                              </TableCell>

                              <TableCell className="border-r border-gray-200">
                                <div className="font-medium text-gray-900 text-sm">
                                  {question.title}
                                </div>
                              </TableCell>

                              <TableCell className="border-r border-gray-200">
                                <Badge className={getDifficultyColor(question.difficulty)}>
                                  {question.difficulty}
                                </Badge>
                              </TableCell>

                              <TableCell className="border-r border-gray-200">
                                <Badge className={getStatusColor(question.status)}>
                                  {question.status}
                                </Badge>
                              </TableCell>

                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );

                          if (firstSubtopic) firstSubtopic = false;
                          if (firstTopic) firstTopic = false;
                          if (firstUnit) firstUnit = false;

                          return row;
                        });
                      }).flat();
                    }).flat();
                  }).flat()}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
