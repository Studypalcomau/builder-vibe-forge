import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  ArrowLeft,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  CheckCircle,
  BookOpen,
  Target,
  GraduationCap,
  Users,
  Calendar,
  BarChart3,
  Grid3X3,
} from "lucide-react";

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

// Mock generated questions data for demonstration
const generateMockQuestions = (): GeneratedQuestion[] => {
  const questions: GeneratedQuestion[] = [];
  const units = [
    {
      name: "Unit 1: Algebra and Functions",
      topics: [
        {
          name: "Functions and Relations",
          subtopics: ["Domain and Range", "Function Types", "Transformations"],
        },
        {
          name: "Polynomial Functions",
          subtopics: [
            "Linear Functions",
            "Quadratic Functions",
            "Cubic Functions",
          ],
        },
      ],
    },
    {
      name: "Unit 2: Calculus",
      topics: [
        {
          name: "Differential Calculus",
          subtopics: ["Limits", "Derivatives", "Chain Rule"],
        },
        {
          name: "Integral Calculus",
          subtopics: ["Antiderivatives", "Definite Integrals", "Applications"],
        },
      ],
    },
  ];

  units.forEach((unit, unitIndex) => {
    unit.topics.forEach((topic, topicIndex) => {
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
        // Generate 10 sample questions per subtopic for demo (instead of 250)
        for (let i = 0; i < 10; i++) {
          const question: GeneratedQuestion = {
            id: `q-${unitIndex}-${topicIndex}-${subtopicIndex}-${i}`,
            question: `${subtopic} - Question ${i + 1}: What is the fundamental principle of ${subtopic} when applied to ${topic.name}?`,
            options: [
              `${subtopic} involves the systematic analysis of mathematical relationships`,
              `${subtopic} focuses on computational techniques and algorithms`,
              `${subtopic} emphasizes theoretical foundations and proofs`,
              `${subtopic} deals with practical applications in real-world scenarios`,
              `${subtopic} combines multiple mathematical concepts for problem-solving`,
            ],
            correctAnswer: `${subtopic} involves the systematic analysis of mathematical relationships`,
            explanation: `This question tests understanding of ${subtopic} within the context of ${topic.name}. The correct answer demonstrates comprehension of fundamental principles and their mathematical significance in the broader curriculum framework.`,
            workingSteps: [
              `Step 1: Identify the core mathematical concept in ${subtopic}`,
              `Step 2: Analyze the relationship to ${topic.name}`,
              `Step 3: Apply relevant mathematical principles and formulas`,
              `Step 4: Validate the solution using established methods`,
              `Step 5: Confirm alignment with curriculum learning objectives`,
            ],
            unit: unit.name,
            topic: topic.name,
            subtopic: subtopic,
            unitIndex,
            topicIndex,
            subtopicIndex,
            difficulty: ["Easy", "Medium", "Hard"][i % 3] as
              | "Easy"
              | "Medium"
              | "Hard",
            category: `${unit.name} - ${topic.name}`,
            dateGenerated: new Date().toISOString().split("T")[0],
          };
          questions.push(question);
        }
      });
    });
  });

  return questions;
};

export default function QuestionBank() {
  const { subjectId } = useParams();
  const [questions] = useState<GeneratedQuestion[]>(generateMockQuestions());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedQuestion, setSelectedQuestion] =
    useState<GeneratedQuestion | null>(null);

  // Get unique values for filters
  const units = useMemo(() => {
    const uniqueUnits = Array.from(new Set(questions.map((q) => q.unit)));
    return uniqueUnits.map((unit, index) => ({ name: unit, index }));
  }, [questions]);

  const topics = useMemo(() => {
    if (selectedUnit === "all") return [];
    const unitQuestions = questions.filter((q) => q.unit === selectedUnit);
    return Array.from(new Set(unitQuestions.map((q) => q.topic)));
  }, [questions, selectedUnit]);

  const subtopics = useMemo(() => {
    if (selectedUnit === "all" || selectedTopic === "all") return [];
    const topicQuestions = questions.filter(
      (q) => q.unit === selectedUnit && q.topic === selectedTopic,
    );
    return Array.from(new Set(topicQuestions.map((q) => q.subtopic)));
  }, [questions, selectedUnit, selectedTopic]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        searchTerm === "" ||
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.subtopic.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesUnit =
        selectedUnit === "all" || question.unit === selectedUnit;
      const matchesTopic =
        selectedTopic === "all" || question.topic === selectedTopic;
      const matchesSubtopic =
        selectedSubtopic === "all" || question.subtopic === selectedSubtopic;
      const matchesDifficulty =
        selectedDifficulty === "all" ||
        question.difficulty === selectedDifficulty;

      return (
        matchesSearch &&
        matchesUnit &&
        matchesTopic &&
        matchesSubtopic &&
        matchesDifficulty
      );
    });
  }, [
    questions,
    searchTerm,
    selectedUnit,
    selectedTopic,
    selectedSubtopic,
    selectedDifficulty,
  ]);

  const stats = useMemo(() => {
    const totalSubtopics = new Set(
      questions.map((q) => `${q.unit}-${q.topic}-${q.subtopic}`),
    ).size;
    const avgQuestionsPerSubtopic = Math.round(
      questions.length / totalSubtopics,
    );
    const difficultyDistribution = {
      Easy: questions.filter((q) => q.difficulty === "Easy").length,
      Medium: questions.filter((q) => q.difficulty === "Medium").length,
      Hard: questions.filter((q) => q.difficulty === "Hard").length,
    };

    return {
      totalQuestions: questions.length,
      totalSubtopics,
      avgQuestionsPerSubtopic,
      difficultyDistribution,
    };
  }, [questions]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedUnit("all");
    setSelectedTopic("all");
    setSelectedSubtopic("all");
    setSelectedDifficulty("all");
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
                <Grid3X3 className="w-8 h-8 mr-3 text-study-primary" />
                Question Bank - Mathematical Methods
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive collection of AI-generated questions with detailed
                solutions
              </p>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={() => {
                  const data = JSON.stringify(filteredQuestions, null, 2);
                  const blob = new Blob([data], { type: "application/json" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `question-bank-mathematical-methods.json`;
                  a.click();
                }}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Questions
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {stats.totalQuestions}
              </div>
              <div className="text-sm text-blue-700">Total Questions</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900">
                {stats.totalSubtopics}
              </div>
              <div className="text-sm text-green-700">Subtopics Covered</div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {stats.avgQuestionsPerSubtopic}
              </div>
              <div className="text-sm text-purple-700">Avg per Subtopic</div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-900">5</div>
              <div className="text-sm text-orange-700">
                Options per Question
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-study-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
            <CardDescription>
              Filter questions by criteria to find what you need
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={selectedUnit}
                onChange={(e) => {
                  setSelectedUnit(e.target.value);
                  setSelectedTopic("all");
                  setSelectedSubtopic("all");
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-study-primary focus:border-transparent"
              >
                <option value="all">All Units</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setSelectedSubtopic("all");
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-study-primary focus:border-transparent"
                disabled={selectedUnit === "all"}
              >
                <option value="all">All Topics</option>
                {topics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>

              <select
                value={selectedSubtopic}
                onChange={(e) => setSelectedSubtopic(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-study-primary focus:border-transparent"
                disabled={selectedTopic === "all"}
              >
                <option value="all">All Subtopics</option>
                {subtopics.map((subtopic, index) => (
                  <option key={index} value={subtopic}>
                    {subtopic}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-study-primary focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>

              <Button onClick={resetFilters} variant="outline" className="h-10">
                Reset Filters
              </Button>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
              <span>
                Showing {filteredQuestions.length} of {questions.length}{" "}
                questions
              </span>
              <div className="flex items-center space-x-4">
                <span>Difficulty Distribution:</span>
                <Badge className="bg-green-100 text-green-800">
                  Easy: {stats.difficultyDistribution.Easy}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Medium: {stats.difficultyDistribution.Medium}
                </Badge>
                <Badge className="bg-red-100 text-red-800">
                  Hard: {stats.difficultyDistribution.Hard}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Grid */}
        <div className="space-y-6">
          {filteredQuestions.map((question, index) => (
            <Card
              key={question.id}
              className="border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge
                        variant="outline"
                        className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {question.unit}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-50 text-green-700 border-green-200"
                      >
                        {question.topic}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {question.subtopic}
                      </Badge>
                      <Badge
                        className={`text-xs ${
                          question.difficulty === "Easy"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : question.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                              : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {question.difficulty}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4 leading-relaxed">
                      {question.question}
                    </h3>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => setSelectedQuestion(question)}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Options Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {question.options.slice(0, 4).map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-lg border text-sm transition-colors ${
                        option === question.correctAnswer
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium text-gray-700">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>{" "}
                      {option}
                      {option === question.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                      )}
                    </div>
                  ))}
                  {question.options.length > 4 && (
                    <div className="p-3 rounded-lg border bg-gray-50 border-gray-200 text-sm text-gray-600 flex items-center">
                      <span>
                        + {question.options.length - 4} more option
                        {question.options.length - 4 > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                  <span>ID: {question.id}</span>
                  <span>Generated: {question.dateGenerated}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredQuestions.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No questions found
                </h3>
                <p className="text-gray-600 mb-4">
                  {questions.length === 0
                    ? "No questions have been generated yet."
                    : "Try adjusting your search filters to find questions."}
                </p>
                {questions.length > 0 && (
                  <Button onClick={resetFilters} variant="outline">
                    Reset All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Question Details
                </h2>
                <Button
                  onClick={() => setSelectedQuestion(null)}
                  variant="outline"
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700"
                  >
                    {selectedQuestion.unit}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-green-50 text-green-700"
                  >
                    {selectedQuestion.topic}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-xs bg-purple-50 text-purple-700"
                  >
                    {selectedQuestion.subtopic}
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      selectedQuestion.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : selectedQuestion.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedQuestion.difficulty}
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {selectedQuestion.question}
                </h3>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Answer Options:
                </Label>
                <div className="space-y-2">
                  {selectedQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border text-sm ${
                        option === selectedQuestion.correctAnswer
                          ? "bg-green-50 border-green-200 text-green-800"
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}.
                      </span>{" "}
                      {option}
                      {option === selectedQuestion.correctAnswer && (
                        <CheckCircle className="w-4 h-4 text-green-600 inline ml-2" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Explanation:
                </Label>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    {selectedQuestion.explanation}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Step-by-Step Solution:
                </Label>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <ol className="text-sm text-yellow-900 space-y-2">
                    {selectedQuestion.workingSteps.map((step, index) => (
                      <li key={index} className="flex">
                        <span className="font-medium text-yellow-800 mr-3 flex-shrink-0">
                          {index + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
