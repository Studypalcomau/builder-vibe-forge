import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  Brain,
  Trophy,
  FileText,
  Download,
  TrendingUp,
  Users
} from "lucide-react";
import { useState } from "react";

export default function Subject() {
  const { slug } = useParams();


  // Generate comprehensive study guide
  const generateStudyGuide = () => {
    const curriculum = subjectCurriculum[slug as string];
    const subject = subjectData[slug as string];

    if (!curriculum || !subject) {
      alert('Study guide not available for this subject');
      return;
    }

    let studyGuideContent = `${subject.name} - Complete Study Guide\n`;
    studyGuideContent += `${'='.repeat(50)}\n\n`;
    studyGuideContent += `Description: ${subject.description}\n`;
    studyGuideContent += `Total Topics: ${subject.totalTopics}\n`;
    studyGuideContent += `Completed: ${subject.completedTopics}\n`;
    studyGuideContent += `Generated: ${new Date().toLocaleDateString()}\n\n`;

    curriculum.forEach((unit: any) => {
      studyGuideContent += `UNIT ${unit.unitId}: ${unit.unitName.toUpperCase()}\n`;
      studyGuideContent += `${'-'.repeat(40)}\n`;
      studyGuideContent += `Status: ${unit.completed ? '✅ Completed' : '⏳ In Progress'}\n\n`;

      unit.topics.forEach((topic: any, topicIndex: number) => {
        studyGuideContent += `  ${topicIndex + 1}. ${topic.topicName}\n`;
        studyGuideContent += `     Difficulty: ${topic.difficulty}\n`;
        studyGuideContent += `     Status: ${topic.completed ? '✅ Completed' : '⏳ In Progress'}\n`;
        studyGuideContent += `     Resources: ${topic.flashcards} flashcards, ${topic.quizzes} quizzes, ${topic.studyNotes} study notes\n\n`;

        if (topic.subtopics && topic.subtopics.length > 0) {
          studyGuideContent += `     Subtopics:\n`;
          topic.subtopics.forEach((subtopic: any) => {
            studyGuideContent += `       • ${subtopic.name} ${subtopic.completed ? '��' : '���'}\n`;
            studyGuideContent += `         Resources: ${subtopic.flashcards} flashcards, ${subtopic.quizzes} quizzes\n`;
          });
          studyGuideContent += `\n`;
        }
      });
      studyGuideContent += `\n`;
    });

    // Add summary section
    studyGuideContent += `SUMMARY\n`;
    studyGuideContent += `${'='.repeat(50)}\n`;

    let totalFlashcards = 0;
    let totalQuizzes = 0;
    let totalStudyNotes = 0;
    let completedTopicCount = 0;

    curriculum.forEach((unit: any) => {
      unit.topics.forEach((topic: any) => {
        totalFlashcards += topic.flashcards || 0;
        totalQuizzes += topic.quizzes || 0;
        totalStudyNotes += topic.studyNotes || 0;
        if (topic.completed) completedTopicCount++;
      });
    });

    studyGuideContent += `Total Units: ${curriculum.length}\n`;
    studyGuideContent += `Total Topics: ${curriculum.reduce((acc: number, unit: any) => acc + unit.topics.length, 0)}\n`;
    studyGuideContent += `Completed Topics: ${completedTopicCount}\n`;
    studyGuideContent += `Total Flashcards: ${totalFlashcards}\n`;
    studyGuideContent += `Total Quizzes: ${totalQuizzes}\n`;
    studyGuideContent += `Total Study Notes: ${totalStudyNotes}\n\n`;

    studyGuideContent += `This study guide provides a comprehensive overview of all units, topics, and subtopics in ${subject.name}. Use it to track your progress and plan your study sessions effectively.\n`;

    // Create and download the file
    const blob = new Blob([studyGuideContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${subject.name.replace(/\s+/g, '_')}_Study_Guide.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  
  // Mock data - in a real app this would come from an API
  const subjectData = {
    "mathematical-methods": {
      name: "Mathematical Methods",
      description: "Master calculus, functions, and statistical analysis for Year 11-12",
      icon: "���",
      color: "bg-blue-500",
      totalTopics: 45,
      completedTopics: 12,
      studyTime: "24 hours",
      nextExam: "November 15, 2024"
    },
    "specialist-mathematics": {
      name: "Specialist Mathematics",
      description: "Advanced mathematics including complex numbers, vectors, and further calculus",
      icon: "����",
      color: "bg-indigo-500",
      totalTopics: 42,
      completedTopics: 8,
      studyTime: "18 hours",
      nextExam: "November 20, 2024"
    },
    physics: {
      name: "Physics",
      description: "Understanding mechanics, waves, electricity, and modern physics",
      icon: "⚡",
      color: "bg-red-500",
      totalTopics: 39,
      completedTopics: 10,
      studyTime: "22 hours",
      nextExam: "December 2, 2024"
    },
    engineering: {
      name: "Engineering",
      description: "Design thinking, problem-solving, and engineering systems",
      icon: "⚙️",
      color: "bg-orange-500",
      totalTopics: 38,
      completedTopics: 15,
      studyTime: "30 hours",
      nextExam: "November 25, 2024"
    },
    economics: {
      name: "Economics",
      description: "Microeconomics, macroeconomics, and market analysis",
      icon: "💰",
      color: "bg-green-500",
      totalTopics: 35,
      completedTopics: 6,
      studyTime: "16 hours",
      nextExam: "December 5, 2024"
    },
    english: {
      name: "English",
      description: "Literature analysis, language skills, and written communication",
      icon: "📚",
      color: "bg-purple-500",
      totalTopics: 40,
      completedTopics: 9,
      studyTime: "20 hours",
      nextExam: "December 8, 2024"
    }
  };

  const subject = subjectData[slug as keyof typeof subjectData];
  
  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Subject Not Found</h1>
          <Link to="/subjects">
            <Button>Browse All Subjects</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Subject curriculum structure mirroring admin curriculum (Units → Topics → Subtopics)
  const subjectCurriculum: Record<string, any[]> = {
    "mathematical-methods": [
      {
        unitId: 1,
        unitName: "Unit 1: Algebra and Functions",
        completed: true,
        topics: [
          {
            topicId: 1,
            topicName: "Functions and Relations",
            difficulty: "Intermediate",
            completed: true,
            flashcards: 15,
            quizzes: 2,
            studyNotes: 1,
            subtopics: [
              { name: "Domain and Range", completed: true, flashcards: 5, quizzes: 3 },
              { name: "Function Types", completed: true, flashcards: 5, quizzes: 3 },
              { name: "Transformations", completed: true, flashcards: 5, quizzes: 2 }
            ]
          },
          {
            topicId: 2,
            topicName: "Polynomial Functions",
            difficulty: "Intermediate",
            completed: false,
            flashcards: 12,
            quizzes: 1,
            studyNotes: 1,
            subtopics: [
              { name: "Linear Functions", completed: false, flashcards: 4, quizzes: 2 },
              { name: "Quadratic Functions", completed: false, flashcards: 4, quizzes: 3 },
              { name: "Cubic Functions", completed: false, flashcards: 4, quizzes: 2 }
            ]
          }
        ]
      },
      {
        unitId: 2,
        unitName: "Unit 2: Calculus",
        completed: false,
        topics: [
          {
            topicId: 3,
            topicName: "Differential Calculus",
            difficulty: "Advanced",
            completed: false,
            flashcards: 18,
            quizzes: 2,
            studyNotes: 1,
            subtopics: [
              { name: "Limits", completed: false, flashcards: 6, quizzes: 3 },
              { name: "Derivatives", completed: false, flashcards: 6, quizzes: 4 },
              { name: "Chain Rule", completed: false, flashcards: 6, quizzes: 2 }
            ]
          },
          {
            topicId: 4,
            topicName: "Integral Calculus",
            difficulty: "Advanced",
            completed: false,
            flashcards: 15,
            quizzes: 2,
            studyNotes: 1,
            subtopics: [
              { name: "Antiderivatives", completed: false, flashcards: 5, quizzes: 3 },
              { name: "Definite Integrals", completed: false, flashcards: 5, quizzes: 4 },
              { name: "Applications", completed: false, flashcards: 5, quizzes: 3 }
            ]
          }
        ]
      },
      {
        unitId: 3,
        unitName: "Unit 3: Probability and Statistics",
        completed: false,
        topics: [
          {
            topicId: 5,
            topicName: "Probability Distributions",
            difficulty: "Intermediate",
            completed: false,
            flashcards: 12,
            quizzes: 1,
            studyNotes: 1,
            subtopics: [
              { name: "Normal Distribution", completed: false, flashcards: 4, quizzes: 3 },
              { name: "Binomial Distribution", completed: false, flashcards: 4, quizzes: 4 },
              { name: "Continuous Distributions", completed: false, flashcards: 4, quizzes: 2 }
            ]
          }
        ]
      }
    ]
  };

  const curriculum = subjectCurriculum[slug as string] || [];

  // Calculate totals from curriculum structure
  const totalTopics = curriculum.reduce((acc, unit) => acc + unit.topics.length, 0);
  const completedTopics = curriculum.reduce((acc, unit) =>
    acc + unit.topics.filter(topic => topic.completed).length, 0
  );
  const totalFlashcards = curriculum.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) => topicAcc + topic.flashcards, 0), 0
  );
  const totalQuizzes = curriculum.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) => topicAcc + topic.quizzes, 0), 0
  );
  const totalStudyNotes = curriculum.reduce((acc, unit) =>
    acc + unit.topics.reduce((topicAcc, topic) => topicAcc + (topic.studyNotes || 0), 0), 0
  );

  const progressPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;





  return (
    <div className="min-h-screen bg-study-background">
      {/* Subject Header */}
      <section className="bg-white border-b border-sky-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-start space-x-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {subject.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                  {subject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-sky-blue-100 text-sky-blue-700">
                    Year 11-12
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {totalTopics} Topics
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Queensland Curriculum
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to={`/subjects/${slug}/test`}>
                <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                  <Trophy className="w-4 h-4 mr-2" />
                  Take Full Test
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-50"
                onClick={generateStudyGuide}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Study Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-sky-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">{progressPercentage}%</div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                {completedTopics} of {totalTopics} topics
              </p>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">{subject.studyTime}</div>
              <p className="text-sm text-gray-600">Total time invested</p>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-purple-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Top 15%</div>
              <div className="text-sm text-gray-600">Class Rank</div>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">Full Test</div>
              <div className="text-xs text-gray-600 mb-3">All Topics</div>
              <Link to={`/subjects/${slug}/test`}>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1">
                  Start Test
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Curriculum Structure</h2>

        <div className="bg-white rounded-lg border border-sky-blue-200 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-sky-blue-50 hover:bg-sky-blue-50">
                <TableHead className="w-[200px] font-semibold text-gray-900">Unit</TableHead>
                <TableHead className="w-[200px] font-semibold text-gray-900">Topic</TableHead>
                <TableHead className="w-[200px] font-semibold text-gray-900">Subtopic</TableHead>
                <TableHead className="w-[120px] font-semibold text-gray-900 text-center">Progress</TableHead>
                <TableHead className="w-[200px] font-semibold text-gray-900 text-center">Study Materials</TableHead>
                <TableHead className="w-[80px] font-semibold text-gray-900 text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {curriculum.map((unit, unitIndex) => {
                const unitRowSpan = unit.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0);
                let firstUnit = true;

                return unit.topics.map((topic, topicIndex) => {
                  const topicRowSpan = topic.subtopics.length;
                  let firstTopic = true;

                  return topic.subtopics.map((subtopic, subtopicIndex) => {
                    const isFirstSubtopic = firstUnit && firstTopic && subtopicIndex === 0;
                    const isFirstTopicSubtopic = firstTopic && subtopicIndex === 0;

                    const subtopicProgress = subtopic.completed ? 100 : Math.floor(Math.random() * 60) + 20;

                    const row = (
                      <TableRow key={`${unit.unitId}-${topic.topicId}-${subtopicIndex}`} className="hover:bg-gray-50/50">
                        {isFirstSubtopic && (
                          <TableCell rowSpan={unitRowSpan} className="border-r border-gray-200 bg-blue-50/30 align-top">
                            <div className="space-y-2 p-2">
                              <div className="font-semibold text-gray-900 text-sm">{unit.unitName}</div>
                              <Progress
                                value={unit.topics.length > 0 ? (unit.topics.filter(t => t.completed).length / unit.topics.length) * 100 : 0}
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                        )}

                        {isFirstTopicSubtopic && (
                          <TableCell rowSpan={topicRowSpan} className="border-r border-gray-200 bg-green-50/30 align-top">
                            <div className="space-y-2 p-2">
                              <div className="font-medium text-gray-900 text-sm">{topic.topicName}</div>
                              <Badge className={`text-xs ${
                                topic.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {topic.difficulty}
                              </Badge>
                            </div>
                          </TableCell>
                        )}

                        <TableCell className="border-r border-gray-200 align-top">
                          <div className="p-2">
                            <div className="font-medium text-gray-900 text-sm">{subtopic.name}</div>
                          </div>
                        </TableCell>

                        <TableCell className="border-r border-gray-200 text-center align-top">
                          <div className="space-y-2 p-2">
                            <div className="text-sm font-medium text-gray-900">{subtopicProgress}%</div>
                            <Progress value={subtopicProgress} className="h-2" />
                          </div>
                        </TableCell>

                        <TableCell className="border-r border-gray-200 align-top">
                          <div className="flex space-x-1 p-2">
                            <Link
                              to={`/subjects/${slug}/flashcards`}
                              className="inline-flex items-center px-1.5 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                            >
                              <Brain className="w-3 h-3 mr-1" />
                              <span>Cards</span>
                            </Link>
                            <Link
                              to={`/subjects/${slug}/quiz/${unitIndex}-${topicIndex}-${subtopicIndex}`}
                              className="inline-flex items-center px-1.5 py-1 text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              <span>Start Quiz</span>
                            </Link>
                            <Link
                              to={`/subjects/${slug}/notes/${unitIndex}-${topicIndex}-${subtopicIndex}`}
                              className="inline-flex items-center px-1.5 py-1 text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              <span>Notes</span>
                            </Link>
                          </div>
                        </TableCell>

                        <TableCell className="text-center align-top">
                          <div className="p-2">
                            <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                              subtopic.completed ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                              {subtopic.completed ? (
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              ) : (
                                <div className="w-3 h-3 border border-gray-300 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );

                    if (firstTopic) firstTopic = false;
                    if (firstUnit) firstUnit = false;

                    return row;
                  });
                });
              }).flat(2)}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Test History & Progress Review */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Test History & Progress Review</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Comprehensive Test History */}
          <Card className="border-sky-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-orange-500" />
                Comprehensive Tests
              </CardTitle>
              <CardDescription>
                Full subject assessments covering all topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">December 15, 2024</div>
                    <div className="text-xs text-gray-600">45 questions • 85% score</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">Passed</Badge>
                    <Link to={`/subjects/${slug}/test/history/latest`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">November 28, 2024</div>
                    <div className="text-xs text-gray-600">42 questions • 67% score</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-700">Needs Work</Badge>
                    <Link to={`/subjects/${slug}/test/history/attempt-2`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        Review
                      </Button>
                    </Link>
                  </div>
                </div>
                <Link to={`/subjects/${slug}/test/history`}>
                  <Button variant="outline" className="w-full mt-3">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Comprehensive Tests
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Topic-Level Progress */}
          <Card className="border-sky-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Topic Performance
              </CardTitle>
              <CardDescription>
                Individual topic and subtopic test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Domain and Range</div>
                    <div className="text-xs text-gray-600">Latest: 95% • 3 attempts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">Mastered</Badge>
                    <Link to={`/subjects/${slug}/quiz/0-0-0/history`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        History
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Function Types</div>
                    <div className="text-xs text-gray-600">Latest: 78% • 2 attempts</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-700">Good</Badge>
                    <Link to={`/subjects/${slug}/quiz/0-0-1/history`}>
                      <Button size="sm" variant="outline" className="text-xs">
                        History
                      </Button>
                    </Link>
                  </div>
                </div>
                <Link to={`/subjects/${slug}/progress`}>
                  <Button variant="outline" className="w-full mt-3">
                    <FileText className="w-4 h-4 mr-2" />
                    View All Topic Results
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <Card className="border-sky-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Performance Trends
            </CardTitle>
            <CardDescription>
              Your progress over time across all test types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">8</div>
                <div className="text-sm text-gray-600">Tests Taken</div>
                <div className="text-xs text-gray-500">This month</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">82%</div>
                <div className="text-sm text-gray-600">Average Score</div>
                <div className="text-xs text-green-600">↑ 12% from last month</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">6</div>
                <div className="text-sm text-gray-600">Topics Mastered</div>
                <div className="text-xs text-gray-500">Score &gt; 85%</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-sm text-gray-600">Areas to Improve</div>
                <div className="text-xs text-gray-500">Score &lt; 70%</div>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <Link to={`/subjects/${slug}/analytics`}>
                <Button variant="outline" className="flex-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Detailed Analytics
                </Button>
              </Link>
              <Link to={`/subjects/${slug}/recommendations`}>
                <Button variant="outline" className="flex-1">
                  <Brain className="w-4 h-4 mr-2" />
                  Study Recommendations
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

    </div>
  );
}
