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
  ChevronRight
} from "lucide-react";

export default function Subject() {
  const { slug } = useParams();
  
  // Mock data - in a real app this would come from an API
  const subjectData = {
    mathematics: {
      name: "Mathematics",
      description: "Master algebraic concepts, calculus, and statistical analysis for Year 11-12",
      icon: "📊",
      color: "bg-blue-500",
      totalTopics: 45,
      completedTopics: 12,
      studyTime: "24 hours",
      nextExam: "November 15, 2024"
    },
    english: {
      name: "English", 
      description: "Develop critical analysis, writing skills, and literary understanding",
      icon: "📚",
      color: "bg-green-500",
      totalTopics: 38,
      completedTopics: 8,
      studyTime: "18 hours",
      nextExam: "November 20, 2024"
    },
    chemistry: {
      name: "Chemistry",
      description: "Explore organic, inorganic, and physical chemistry concepts",
      icon: "⚗️", 
      color: "bg-purple-500",
      totalTopics: 42,
      completedTopics: 15,
      studyTime: "30 hours",
      nextExam: "November 25, 2024"
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
    biology: {
      name: "Biology",
      description: "Study ecology, genetics, evolution, and biological systems",
      icon: "🧬",
      color: "bg-emerald-500",
      totalTopics: 41,
      completedTopics: 6,
      studyTime: "16 hours",
      nextExam: "December 5, 2024"
    },
    "modern-history": {
      name: "Modern History",
      description: "Analyze world wars, cold war politics, and modern global events",
      icon: "🏛️",
      color: "bg-amber-500", 
      totalTopics: 36,
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

  const progressPercentage = Math.round((subject.completedTopics / subject.totalTopics) * 100);

  const topics = [
    { 
      id: 1, 
      title: "Introduction to Calculus", 
      difficulty: "Beginner",
      duration: "45 min",
      completed: true,
      flashcards: 24,
      quizzes: 3
    },
    { 
      id: 2, 
      title: "Differential Equations", 
      difficulty: "Intermediate",
      duration: "1.2 hours", 
      completed: true,
      flashcards: 32,
      quizzes: 4
    },
    { 
      id: 3, 
      title: "Integration Techniques", 
      difficulty: "Intermediate",
      duration: "1 hour",
      completed: false,
      flashcards: 28,
      quizzes: 3
    },
    { 
      id: 4, 
      title: "Applications of Calculus", 
      difficulty: "Advanced",
      duration: "1.5 hours",
      completed: false,
      flashcards: 35,
      quizzes: 5
    },
    { 
      id: 5, 
      title: "Statistical Analysis", 
      difficulty: "Intermediate",
      duration: "1.1 hours",
      completed: false,
      flashcards: 26,
      quizzes: 4
    }
  ];

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
                    {subject.totalTopics} Topics
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
                {subject.completedTopics} of {subject.totalTopics} topics
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
              <CardTitle className="text-sm font-medium text-gray-600">Next Exam</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-gray-900 mb-1">{subject.nextExam}</div>
              <p className="text-sm text-gray-600">Mark your calendar</p>
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

      {/* Study Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link to={`/subjects/${slug}/flashcards`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>
                  Interactive flashcards with spaced repetition for better retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">145 cards available</span>
                  <ArrowRight className="w-4 h-4 text-sky-blue-600" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={`/subjects/${slug}/quizzes`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Practice Quizzes</CardTitle>
                <CardDescription>
                  Test your knowledge with curriculum-aligned practice questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">19 quizzes available</span>
                  <ArrowRight className="w-4 h-4 text-sky-blue-600" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to={`/subjects/${slug}/notes`}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-sky-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Study Notes</CardTitle>
                <CardDescription>
                  Comprehensive notes covering all key concepts and formulas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">32 note sets</span>
                  <ArrowRight className="w-4 h-4 text-sky-blue-600" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Topics List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Topics</h2>
        
        <div className="space-y-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="border-sky-blue-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      topic.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {topic.completed ? (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                      <div className="flex items-center space-x-4 mt-1">
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
                        <span className="text-sm text-gray-600 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {topic.duration}
                        </span>
                        <span className="text-sm text-gray-600">
                          {topic.flashcards} flashcards
                        </span>
                        <span className="text-sm text-gray-600">
                          {topic.quizzes} quizzes
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-sky-blue-600 hover:text-sky-blue-700">
                    {topic.completed ? 'Review' : 'Start'}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
