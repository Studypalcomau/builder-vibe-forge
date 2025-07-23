import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Brain,
  ArrowRight,
  Clock,
  Star,
  TrendingUp,
  Play,
  RotateCcw,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";

export default function Flashcards() {
  const [selectedSubject, setSelectedSubject] = useState("all");

  const subjects = [
    {
      name: "Mathematical Methods",
      slug: "mathematical-methods",
      icon: "📊",
      flashcards: 145,
      completed: 68,
      accuracy: 92,
      lastStudied: "2 hours ago",
      available: true
    },
    {
      name: "Specialist Mathematics",
      slug: "specialist-mathematics",
      icon: "🔢",
      flashcards: 120,
      completed: 45,
      accuracy: 85,
      lastStudied: "1 day ago",
      available: true
    },
    {
      name: "Physics",
      slug: "physics",
      icon: "⚡",
      flashcards: 112,
      completed: 15,
      accuracy: 81,
      lastStudied: "3 days ago",
      available: false
    },
    {
      name: "Engineering",
      slug: "engineering",
      icon: "⚙️",
      flashcards: 98,
      completed: 23,
      accuracy: 78,
      lastStudied: "5 days ago",
      available: false
    },
    {
      name: "Economics",
      slug: "economics",
      icon: "💰",
      flashcards: 89,
      completed: 32,
      accuracy: 87,
      lastStudied: "4 days ago",
      available: false
    },
    {
      name: "English",
      slug: "english",
      icon: "📚",
      flashcards: 76,
      completed: 18,
      accuracy: 83,
      lastStudied: "1 week ago",
      available: false
    }
  ];

  const studyModes = [
    {
      title: "Quick Review",
      description: "Review recently studied cards for quick reinforcement",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-700",
      time: "5-10 min",
      cards: "10-15 cards"
    },
    {
      title: "Spaced Repetition",
      description: "AI-powered review of cards due for optimal retention",
      icon: Brain,
      color: "bg-blue-100 text-blue-700",
      time: "15-30 min",
      cards: "20-40 cards"
    },
    {
      title: "Challenge Mode",
      description: "Focus on your most difficult cards for intensive practice",
      icon: Target,
      color: "bg-red-100 text-red-700",
      time: "10-20 min",
      cards: "15-25 cards"
    },
    {
      title: "Complete Review",
      description: "Go through all cards in a subject systematically",
      icon: RotateCcw,
      color: "bg-green-100 text-green-700",
      time: "30-60 min",
      cards: "All cards"
    }
  ];

  const totalStats = {
    totalCards: subjects.reduce((sum, subject) => sum + subject.flashcards, 0),
    completedCards: subjects.reduce((sum, subject) => sum + subject.completed, 0),
    averageAccuracy: Math.round(subjects.reduce((sum, subject) => sum + subject.accuracy, 0) / subjects.length),
    studyStreak: 12
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Smart Flashcards
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Master Queensland curriculum with our AI-powered spaced repetition system.
            Review flashcards tailored to your learning pace for maximum retention.
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.totalCards}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.completedCards}</div>
              <div className="text-sm text-gray-600">Cards Mastered</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.averageAccuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </CardContent>
          </Card>
          <Card className="text-center border-sky-blue-200">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-gray-900 mb-2">{totalStats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Study Modes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Study Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studyModes.map((mode, index) => (
              <Card key={index} className="border-sky-blue-200 hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${mode.color}`}>
                    <mode.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{mode.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {mode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 space-y-1 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {mode.time}
                    </div>
                    <div className="flex items-center">
                      <Brain className="w-3 h-3 mr-1" />
                      {mode.cards}
                    </div>
                  </div>
                  <Button className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white" size="sm">
                    Start Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subject Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study by Subject</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.slug} className={`border-sky-blue-200 ${!subject.available ? 'opacity-60' : 'hover:shadow-md transition-shadow'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{subject.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{subject.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {subject.flashcards} flashcards available
                        </CardDescription>
                      </div>
                    </div>
                    {subject.available && (
                      <Badge className="bg-green-100 text-green-700">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{Math.round((subject.completed / subject.flashcards) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-sky-blue-500 h-2 rounded-full"
                          style={{ width: `${(subject.completed / subject.flashcards) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Accuracy</div>
                        <div className="font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {subject.accuracy}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Last Studied</div>
                        <div className="font-medium">{subject.lastStudied}</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    {subject.available ? (
                      <Link to={`/subjects/${subject.slug}/flashcards`}>
                        <Button className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                          <Play className="w-4 h-4 mr-2" />
                          Study Cards
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full" variant="outline" disabled>
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <Card className="border-sky-blue-200 bg-sky-blue-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Brain className="w-5 h-5 mr-2 text-sky-blue-600" />
              Maximize Your Flashcard Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Best Practices</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Study cards daily for 15-30 minutes for best retention</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use spaced repetition to review cards at optimal intervals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Focus extra time on cards you find challenging</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Study Strategies</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Try to recall the answer before flipping the card</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Create mental connections between related concepts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Review before exams to reinforce your memory</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
