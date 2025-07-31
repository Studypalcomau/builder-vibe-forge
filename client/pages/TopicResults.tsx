import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Target,
  Brain,
  FileText,
  BarChart3,
  Calendar,
  Award,
  Zap,
} from "lucide-react";

export default function TopicResults() {
  const { slug } = useParams();

  const subjectNames: Record<string, string> = {
    "mathematical-methods": "Mathematical Methods",
    "specialist-mathematics": "Specialist Mathematics",
    physics: "Physics",
    biology: "Biology",
    chemistry: "Chemistry",
    english: "English",
    engineering: "Engineering",
    economics: "Economics",
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  // Comprehensive mock data for all topics and subtopics
  const topicResults = [
    {
      unit: "Unit 1: Algebra and Functions",
      unitProgress: 85,
      topics: [
        {
          topic: "Functions and Relations",
          topicProgress: 90,
          subtopics: [
            {
              subtopic: "Domain and Range",
              attempts: 3,
              bestScore: 95,
              latestScore: 95,
              averageScore: 88,
              lastAttempt: "2024-12-10",
              timeSpent: 36, // total minutes across all attempts
              status: "mastered",
              weaknesses: [],
              strengths: [
                "Function notation",
                "Interval notation",
                "Graphical analysis",
              ],
              unitIndex: 0,
              topicIndex: 0,
              subtopicIndex: 0,
            },
            {
              subtopic: "Function Types",
              attempts: 2,
              bestScore: 78,
              latestScore: 78,
              averageScore: 72,
              lastAttempt: "2024-12-01",
              timeSpent: 24,
              status: "good",
              weaknesses: ["Quadratic vertex form", "Inverse functions"],
              strengths: ["Linear functions", "Basic graphing"],
              unitIndex: 0,
              topicIndex: 0,
              subtopicIndex: 1,
            },
            {
              subtopic: "Transformations",
              attempts: 2,
              bestScore: 65,
              latestScore: 65,
              averageScore: 58,
              lastAttempt: "2024-11-28",
              timeSpent: 32,
              status: "needs_work",
              weaknesses: [
                "Horizontal shifts",
                "Vertical scaling",
                "Combined transformations",
              ],
              strengths: ["Basic vertical shifts"],
              unitIndex: 0,
              topicIndex: 0,
              subtopicIndex: 2,
            },
          ],
        },
        {
          topic: "Polynomial Functions",
          topicProgress: 70,
          subtopics: [
            {
              subtopic: "Linear Functions",
              attempts: 1,
              bestScore: 82,
              latestScore: 82,
              averageScore: 82,
              lastAttempt: "2024-11-25",
              timeSpent: 15,
              status: "good",
              weaknesses: ["Point-slope form"],
              strengths: ["Slope-intercept form", "Graphing"],
              unitIndex: 0,
              topicIndex: 1,
              subtopicIndex: 0,
            },
            {
              subtopic: "Quadratic Functions",
              attempts: 1,
              bestScore: 68,
              latestScore: 68,
              averageScore: 68,
              lastAttempt: "2024-11-20",
              timeSpent: 18,
              status: "needs_work",
              weaknesses: [
                "Vertex form",
                "Completing the square",
                "Discriminant",
              ],
              strengths: ["Basic factoring"],
              unitIndex: 0,
              topicIndex: 1,
              subtopicIndex: 1,
            },
            {
              subtopic: "Cubic Functions",
              attempts: 0,
              bestScore: 0,
              latestScore: 0,
              averageScore: 0,
              lastAttempt: null,
              timeSpent: 0,
              status: "not_started",
              weaknesses: ["Not attempted"],
              strengths: [],
              unitIndex: 0,
              topicIndex: 1,
              subtopicIndex: 2,
            },
          ],
        },
      ],
    },
    {
      unit: "Unit 2: Calculus",
      unitProgress: 55,
      topics: [
        {
          topic: "Differential Calculus",
          topicProgress: 58,
          subtopics: [
            {
              subtopic: "Limits",
              attempts: 1,
              bestScore: 45,
              latestScore: 45,
              averageScore: 45,
              lastAttempt: "2024-11-15",
              timeSpent: 25,
              status: "needs_work",
              weaknesses: ["One-sided limits", "Continuity", "Limit laws"],
              strengths: ["Basic limit concept"],
              unitIndex: 1,
              topicIndex: 0,
              subtopicIndex: 0,
            },
            {
              subtopic: "Derivatives",
              attempts: 3,
              bestScore: 72,
              latestScore: 72,
              averageScore: 65,
              lastAttempt: "2024-12-05",
              timeSpent: 45,
              status: "good",
              weaknesses: ["Chain rule", "Implicit differentiation"],
              strengths: ["Power rule", "Product rule"],
              unitIndex: 1,
              topicIndex: 0,
              subtopicIndex: 1,
            },
            {
              subtopic: "Chain Rule",
              attempts: 1,
              bestScore: 58,
              latestScore: 58,
              averageScore: 58,
              lastAttempt: "2024-11-30",
              timeSpent: 20,
              status: "needs_work",
              weaknesses: ["Complex compositions", "Trigonometric functions"],
              strengths: ["Simple compositions"],
              unitIndex: 1,
              topicIndex: 0,
              subtopicIndex: 2,
            },
          ],
        },
        {
          topic: "Integral Calculus",
          topicProgress: 30,
          subtopics: [
            {
              subtopic: "Antiderivatives",
              attempts: 0,
              bestScore: 0,
              latestScore: 0,
              averageScore: 0,
              lastAttempt: null,
              timeSpent: 0,
              status: "not_started",
              weaknesses: ["Not attempted"],
              strengths: [],
              unitIndex: 1,
              topicIndex: 1,
              subtopicIndex: 0,
            },
            {
              subtopic: "Definite Integrals",
              attempts: 0,
              bestScore: 0,
              latestScore: 0,
              averageScore: 0,
              lastAttempt: null,
              timeSpent: 0,
              status: "not_started",
              weaknesses: ["Not attempted"],
              strengths: [],
              unitIndex: 1,
              topicIndex: 1,
              subtopicIndex: 1,
            },
            {
              subtopic: "Applications",
              attempts: 0,
              bestScore: 0,
              latestScore: 0,
              averageScore: 0,
              lastAttempt: null,
              timeSpent: 0,
              status: "not_started",
              weaknesses: ["Not attempted"],
              strengths: [],
              unitIndex: 1,
              topicIndex: 1,
              subtopicIndex: 2,
            },
          ],
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "mastered":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "needs_work":
        return "bg-red-100 text-red-700 border-red-200";
      case "not_started":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "mastered":
        return <CheckCircle className="w-4 h-4" />;
      case "good":
        return <TrendingUp className="w-4 h-4" />;
      case "needs_work":
        return <AlertCircle className="w-4 h-4" />;
      case "not_started":
        return <Target className="w-4 h-4" />;
      default:
        return <Target className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "mastered":
        return "Mastered";
      case "good":
        return "Good Progress";
      case "needs_work":
        return "Needs Work";
      case "not_started":
        return "Not Started";
      default:
        return "Unknown";
    }
  };

  // Calculate overall statistics
  const allSubtopics = topicResults.flatMap((unit) =>
    unit.topics.flatMap((topic) => topic.subtopics),
  );

  const completedSubtopics = allSubtopics.filter((s) => s.attempts > 0);
  const masteredCount = allSubtopics.filter(
    (s) => s.status === "mastered",
  ).length;
  const needsWorkCount = allSubtopics.filter(
    (s) => s.status === "needs_work",
  ).length;
  const notStartedCount = allSubtopics.filter(
    (s) => s.status === "not_started",
  ).length;
  const totalAttempts = allSubtopics.reduce((sum, s) => sum + s.attempts, 0);
  const totalTimeSpent = allSubtopics.reduce((sum, s) => sum + s.timeSpent, 0);
  const overallAverage =
    completedSubtopics.length > 0
      ? Math.round(
          completedSubtopics.reduce((sum, s) => sum + s.bestScore, 0) /
            completedSubtopics.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link to={`/subjects/${slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              All Topic Results
            </h1>
            <p className="text-gray-600">
              Comprehensive performance overview across all topics and subtopics
            </p>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {allSubtopics.length}
              </div>
              <div className="text-xs text-gray-600">Total Topics</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {masteredCount}
              </div>
              <div className="text-xs text-gray-600">Mastered</div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {needsWorkCount}
              </div>
              <div className="text-xs text-gray-600">Needs Work</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">
                {notStartedCount}
              </div>
              <div className="text-xs text-gray-600">Not Started</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {overallAverage}%
              </div>
              <div className="text-xs text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(totalTimeSpent / 60)}h
              </div>
              <div className="text-xs text-gray-600">Study Time</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results by Unit */}
        <div className="space-y-8">
          {topicResults.map((unit, unitIndex) => (
            <Card key={unitIndex} className="border-sky-blue-200">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">{unit.unit}</CardTitle>
                    <CardDescription>
                      Unit progress: {unit.unitProgress}%
                    </CardDescription>
                  </div>
                  <div className="w-32">
                    <Progress value={unit.unitProgress} className="h-3" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {unit.topics.map((topic, topicIndex) => (
                    <div
                      key={topicIndex}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {topic.topic}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            {topic.topicProgress}%
                          </span>
                          <div className="w-24">
                            <Progress
                              value={topic.topicProgress}
                              className="h-2"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Subtopics Table */}
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">
                                Subtopic
                              </TableHead>
                              <TableHead className="w-[100px] text-center">
                                Status
                              </TableHead>
                              <TableHead className="w-[80px] text-center">
                                Attempts
                              </TableHead>
                              <TableHead className="w-[100px] text-center">
                                Best Score
                              </TableHead>
                              <TableHead className="w-[100px] text-center">
                                Latest Score
                              </TableHead>
                              <TableHead className="w-[120px] text-center">
                                Last Attempt
                              </TableHead>
                              <TableHead className="w-[100px] text-center">
                                Time Spent
                              </TableHead>
                              <TableHead className="w-[200px] text-center">
                                Actions
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {topic.subtopics.map((subtopic, subtopicIndex) => (
                              <TableRow
                                key={subtopicIndex}
                                className="hover:bg-gray-50"
                              >
                                <TableCell className="font-medium">
                                  {subtopic.subtopic}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Badge
                                    className={getStatusColor(subtopic.status)}
                                  >
                                    {getStatusIcon(subtopic.status)}
                                    <span className="ml-1 text-xs">
                                      {getStatusText(subtopic.status)}
                                    </span>
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <Trophy className="w-3 h-3 text-gray-400" />
                                    {subtopic.attempts}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span
                                    className={`font-semibold ${
                                      subtopic.bestScore >= 85
                                        ? "text-green-600"
                                        : subtopic.bestScore >= 70
                                          ? "text-yellow-600"
                                          : subtopic.bestScore > 0
                                            ? "text-red-600"
                                            : "text-gray-400"
                                    }`}
                                  >
                                    {subtopic.bestScore > 0
                                      ? `${subtopic.bestScore}%`
                                      : "-"}
                                  </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <span
                                    className={`font-medium ${
                                      subtopic.latestScore >= 85
                                        ? "text-green-600"
                                        : subtopic.latestScore >= 70
                                          ? "text-yellow-600"
                                          : subtopic.latestScore > 0
                                            ? "text-red-600"
                                            : "text-gray-400"
                                    }`}
                                  >
                                    {subtopic.latestScore > 0
                                      ? `${subtopic.latestScore}%`
                                      : "-"}
                                  </span>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                    <Calendar className="w-3 h-3" />
                                    {subtopic.lastAttempt
                                      ? new Date(
                                          subtopic.lastAttempt,
                                        ).toLocaleDateString()
                                      : "-"}
                                  </div>
                                </TableCell>
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                                    <Clock className="w-3 h-3" />
                                    {subtopic.timeSpent > 0
                                      ? `${subtopic.timeSpent}m`
                                      : "-"}
                                  </div>
                                </TableCell>

                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    <Link
                                      to={`/subjects/${slug}/quiz/${subtopic.unitIndex}-${subtopic.topicIndex}-${subtopic.subtopicIndex}`}
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <Trophy className="w-3 h-3 mr-1" />
                                        {subtopic.attempts > 0
                                          ? "Retake"
                                          : "Start"}
                                      </Button>
                                    </Link>
                                    <Link
                                      to={`/subjects/${slug}/notes/${subtopic.unitIndex}-${subtopic.topicIndex}-${subtopic.subtopicIndex}`}
                                    >
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        <FileText className="w-3 h-3 mr-1" />
                                        Notes
                                      </Button>
                                    </Link>
                                    {subtopic.attempts > 0 && (
                                      <Link
                                        to={`/subjects/${slug}/quiz/${subtopic.unitIndex}-${subtopic.topicIndex}-${subtopic.subtopicIndex}/history`}
                                      >
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          <BarChart3 className="w-3 h-3 mr-1" />
                                          History
                                        </Button>
                                      </Link>
                                    )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="border-sky-blue-200 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to={`/subjects/${slug}/test`}>
                <Button className="w-full">
                  <Award className="w-4 h-4 mr-2" />
                  Take Comprehensive Test
                </Button>
              </Link>
              <Link to={`/subjects/${slug}/recommendations`}>
                <Button variant="outline" className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Get Study Recommendations
                </Button>
              </Link>
              <Link to={`/subjects/${slug}/test/history`}>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Test History
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
