import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import {
  BookOpen,
  Brain,
  Trophy,
  Clock,
  Star,
  ArrowRight,
  Play,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  ExternalLink
} from "lucide-react";
import { useState } from "react";

export default function Subject() {
  const { slug } = useParams();
  const [expandedUnits, setExpandedUnits] = useState<Set<number>>(new Set([1])); // Expand first unit by default
  
  // Mock data - in a real app this would come from an API
  const subjectData = {
    "mathematical-methods": {
      name: "Mathematical Methods",
      description: "Master calculus, functions, and statistical analysis for Year 11-12",
      icon: "📊",
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
              { name: "Domain and Range", completed: true, flashcards: 5, quizzes: 1 },
              { name: "Function Types", completed: true, flashcards: 5, quizzes: 1 },
              { name: "Transformations", completed: true, flashcards: 5, quizzes: 0 }
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
              { name: "Linear Functions", completed: false, flashcards: 4, quizzes: 0 },
              { name: "Quadratic Functions", completed: false, flashcards: 4, quizzes: 1 },
              { name: "Cubic Functions", completed: false, flashcards: 4, quizzes: 0 }
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
              { name: "Limits", completed: false, flashcards: 6, quizzes: 1 },
              { name: "Derivatives", completed: false, flashcards: 6, quizzes: 1 },
              { name: "Chain Rule", completed: false, flashcards: 6, quizzes: 0 }
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
              { name: "Antiderivatives", completed: false, flashcards: 5, quizzes: 1 },
              { name: "Definite Integrals", completed: false, flashcards: 5, quizzes: 1 },
              { name: "Applications", completed: false, flashcards: 5, quizzes: 0 }
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
              { name: "Normal Distribution", completed: false, flashcards: 4, quizzes: 0 },
              { name: "Binomial Distribution", completed: false, flashcards: 4, quizzes: 1 },
              { name: "Continuous Distributions", completed: false, flashcards: 4, quizzes: 0 }
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

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(prev => {
      const newSet = new Set(prev);
      if (newSet.has(unitId)) {
        newSet.delete(unitId);
      } else {
        newSet.add(unitId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-study-background">
      {/* Subject Header */}
      <section className="bg-white border-b border-sky-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex items-start space-x-4">
              <div className="text-5xl">{subject.icon}</div>
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
              <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                <Play className="w-4 h-4 mr-2" />
                Continue Studying
              </Button>
              <Button variant="outline" className="border-sky-blue-300 text-sky-blue-700">
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
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <p className="text-sm text-gray-600">Excellent work!</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Curriculum Structure</h2>

        <div className="space-y-6">
          {curriculum.map((unit) => (
            <Card key={unit.unitId} className="border-sky-blue-200">
              <CardHeader className="bg-sky-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <CardTitle className="text-lg text-gray-900">{unit.unitName}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1 mb-2">
                      {unit.topics.length} topics • {unit.topics.filter(t => t.completed).length} completed
                    </p>
                    <Progress
                      value={unit.topics.length > 0 ? (unit.topics.filter(t => t.completed).length / unit.topics.length) * 100 : 0}
                      className="h-2"
                    />
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    unit.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {unit.completed ? (
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {unit.topics.map((topic, topicIndex) => (
                    <div key={topic.topicId} className={`p-6 ${topicIndex < unit.topics.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                            topic.completed ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {topic.completed ? (
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                              </div>
                            ) : (
                              <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-2">{topic.topicName}</h4>

                            <div className="flex items-center space-x-4 mb-3">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  topic.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                                  topic.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}
                              >
                                {topic.difficulty}
                              </Badge>
                              <span className="text-sm text-gray-600">
                                {topic.flashcards} flashcards
                              </span>
                              <span className="text-sm text-gray-600">
                                {topic.quizzes} quizzes
                              </span>
                              <span className="text-sm text-gray-600">
                                {topic.studyNotes} study notes
                              </span>
                            </div>

                            {/* Topic Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-xs text-gray-600 mb-1">
                                <span>Subtopic Progress</span>
                                <span>{topic.subtopics.filter(s => s.completed).length}/{topic.subtopics.length}</span>
                              </div>
                              <Progress
                                value={topic.subtopics.length > 0 ? (topic.subtopics.filter(s => s.completed).length / topic.subtopics.length) * 100 : 0}
                                className="h-1.5"
                              />
                            </div>

                            {/* Subtopics with Study Material Links */}
                            <div className="space-y-3">
                              {topic.subtopics.map((subtopic, subtopicIndex) => (
                                <div key={subtopicIndex} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                        subtopic.completed ? 'bg-green-500' : 'bg-gray-300'
                                      }`}>
                                        {subtopic.completed && (
                                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        )}
                                      </div>
                                      <h5 className="font-medium text-gray-900">{subtopic.name}</h5>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      subtopic.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                    }`}>
                                      {subtopic.completed ? 'Completed' : 'In Progress'}
                                    </div>
                                  </div>

                                  {/* Subtopic Study Material Progress */}
                                  <div className="mb-3">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                      <span>Study Material Progress</span>
                                      <span>{subtopic.completed ? '3/3' : '1/3'}</span>
                                    </div>
                                    <Progress
                                      value={subtopic.completed ? 100 : 33}
                                      className="h-1"
                                    />
                                  </div>

                                  <div className="grid grid-cols-3 gap-2">
                                    {/* Flashcards Link */}
                                    <Link to={`/subjects/${slug}/subtopics/${topic.topicId}-${subtopicIndex}/flashcards`}>
                                      <div className="flex flex-col items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group cursor-pointer">
                                        <Brain className="w-5 h-5 text-blue-600 mb-1" />
                                        <span className="text-xs font-medium text-blue-700">Flashcards</span>
                                        <span className="text-xs text-blue-600">{subtopic.flashcards} cards</span>
                                      </div>
                                    </Link>

                                    {/* Quiz Link */}
                                    <Link to={`/subjects/${slug}/subtopics/${topic.topicId}-${subtopicIndex}/quiz`}>
                                      <div className="flex flex-col items-center p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group cursor-pointer">
                                        <Trophy className="w-5 h-5 text-green-600 mb-1" />
                                        <span className="text-xs font-medium text-green-700">Quiz</span>
                                        <span className="text-xs text-green-600">{subtopic.quizzes || 1} quiz</span>
                                      </div>
                                    </Link>

                                    {/* Study Notes Link */}
                                    <Link to={`/subjects/${slug}/subtopics/${topic.topicId}-${subtopicIndex}/notes`}>
                                      <div className="flex flex-col items-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group cursor-pointer">
                                        <FileText className="w-5 h-5 text-purple-600 mb-1" />
                                        <span className="text-xs font-medium text-purple-700">Notes</span>
                                        <span className="text-xs text-purple-600">Study guide</span>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Link to={`/subjects/${slug}/topics/${topic.topicId}`}>
                          <Button variant="ghost" size="sm" className="text-sky-blue-600 hover:text-sky-blue-700 ml-4">
                            {topic.completed ? 'Review' : 'Start'}
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
