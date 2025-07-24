// Simplified curriculum display for easier viewing
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BookOpen,
  Brain,
  Trophy,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink,
  Download,
  TrendingUp,
  Users
} from "lucide-react";

export default function SubjectSimplified() {
  const { slug } = useParams();

  // Sample curriculum data
  const curriculum = [
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
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-study-background">
      {/* Header */}
      <section className="bg-white border-b border-sky-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-start space-x-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Mathematical Methods
                </h1>
                <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                  Master calculus, functions, and statistical analysis for Year 11-12
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>24 hours studied</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>4.8 average score</span>
                  </span>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-700">
                      Level 2
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-50"
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-sky-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">68%</div>
              <Progress value={68} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">12 of 45 topics</p>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-1">24h</div>
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
        </div>
      </section>

      {/* Curriculum Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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
              {curriculum.map((unit) => {
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
                        {/* Unit column */}
                        {isFirstSubtopic && (
                          <TableCell rowSpan={unitRowSpan} className="border-r border-gray-200 bg-blue-50/30 align-top">
                            <div className="space-y-2 p-2">
                              <div className="font-semibold text-gray-900 text-sm">{unit.unitName}</div>
                              <div className="text-xs text-gray-600">
                                {unit.topics.length} topics
                              </div>
                              <Progress
                                value={unit.topics.length > 0 ? (unit.topics.filter(t => t.completed).length / unit.topics.length) * 100 : 0}
                                className="h-2"
                              />
                            </div>
                          </TableCell>
                        )}
                        
                        {/* Topic column */}
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
                              <div className="text-xs text-gray-600">
                                {topic.flashcards} cards • {topic.quizzes} quizzes
                              </div>
                            </div>
                          </TableCell>
                        )}
                        
                        {/* Subtopic column */}
                        <TableCell className="border-r border-gray-200 align-top">
                          <div className="p-2">
                            <div className="font-medium text-gray-900 text-sm">{subtopic.name}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {subtopic.flashcards} cards • {subtopic.quizzes} quizzes
                            </div>
                          </div>
                        </TableCell>
                        
                        {/* Progress column */}
                        <TableCell className="border-r border-gray-200 text-center align-top">
                          <div className="space-y-2 p-2">
                            <div className="text-sm font-medium text-gray-900">{subtopicProgress}%</div>
                            <Progress value={subtopicProgress} className="h-2" />
                          </div>
                        </TableCell>
                        
                        {/* Study Materials column */}
                        <TableCell className="border-r border-gray-200 align-top">
                          <div className="flex justify-center space-x-1 p-2">
                            <Link 
                              to={`/subjects/${slug}/flashcards`}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
                            >
                              <Brain className="w-3 h-3 mr-1" />
                              Cards
                            </Link>
                            <Link 
                              to={`/subjects/${slug}/quizzes`}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                            >
                              <Trophy className="w-3 h-3 mr-1" />
                              Quiz
                            </Link>
                            <Link 
                              to={`/subjects/${slug}/notes`}
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              Notes
                            </Link>
                          </div>
                        </TableCell>
                        
                        {/* Status column */}
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
    </div>
  );
}
