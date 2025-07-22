import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Plus,
  BookOpen,
  Brain,
  Trophy,
  Zap,
  Edit
} from "lucide-react";

export default function StudyPlanner() {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const upcomingExams = [
    {
      subject: "Mathematics",
      exam: "Calculus Assessment",
      date: "November 15, 2024",
      daysLeft: 8,
      priority: "high",
      preparation: 75
    },
    {
      subject: "Biology",
      exam: "Evolution Essay",
      date: "November 20, 2024",
      daysLeft: 13,
      priority: "medium",
      preparation: 45
    },
    {
      subject: "Chemistry",
      exam: "Lab Report Due",
      date: "November 25, 2024",
      daysLeft: 18,
      priority: "low",
      preparation: 60
    },
    {
      subject: "Physics",
      exam: "Mechanics Test",
      date: "December 2, 2024",
      daysLeft: 25,
      priority: "medium",
      preparation: 30
    }
  ];

  const todaySchedule = [
    {
      time: "9:00 AM",
      subject: "Mathematics",
      activity: "Differential Calculus Review",
      duration: "45 min",
      type: "review",
      completed: true
    },
    {
      time: "10:00 AM",
      subject: "Biology",
      activity: "Genetics Flashcards",
      duration: "30 min",
      type: "flashcards",
      completed: true
    },
    {
      time: "2:00 PM",
      subject: "Mathematics",
      activity: "Integration Practice Quiz",
      duration: "25 min",
      type: "quiz",
      completed: false
    },
    {
      time: "3:30 PM",
      subject: "Chemistry",
      activity: "Atomic Structure Notes",
      duration: "40 min",
      type: "notes",
      completed: false
    },
    {
      time: "7:00 PM",
      subject: "Biology",
      activity: "Evolution Essay Planning",
      duration: "35 min",
      type: "writing",
      completed: false
    }
  ];

  const weeklyGoals = [
    {
      subject: "Mathematics",
      goal: "Complete Integration chapter",
      progress: 75,
      target: "5 topics",
      completed: "3.75 topics"
    },
    {
      subject: "Biology",
      goal: "Prepare evolution essay outline",
      progress: 60,
      target: "Full outline",
      completed: "Research + structure"
    },
    {
      subject: "Chemistry",
      goal: "Review atomic theory",
      progress: 40,
      target: "3 chapters",
      completed: "1.2 chapters"
    }
  ];

  const studyStats = {
    todayCompleted: 2,
    todayTotal: 5,
    weekCompleted: 12,
    weekTotal: 18,
    streakDays: 12,
    averageDaily: 2.5
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "review": return <BookOpen className="w-4 h-4" />;
      case "flashcards": return <Brain className="w-4 h-4" />;
      case "quiz": return <Trophy className="w-4 h-4" />;
      case "notes": return <Edit className="w-4 h-4" />;
      case "writing": return <Edit className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Study Planner
            </h1>
            <p className="text-lg text-gray-600">
              Organize your study schedule and track progress towards your academic goals.
            </p>
          </div>
          <Button className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Study Session
          </Button>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {studyStats.todayCompleted}/{studyStats.todayTotal}
              </div>
              <div className="text-sm text-gray-600">Today's Tasks</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{studyStats.streakDays}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {studyStats.weekCompleted}/{studyStats.weekTotal}
              </div>
              <div className="text-sm text-gray-600">Week Progress</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{studyStats.averageDaily}h</div>
              <div className="text-sm text-gray-600">Daily Average</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Today's Schedule */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((session, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-3 rounded-lg border ${
                      session.completed ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        {session.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                        )}
                        <div className={`p-2 rounded-lg ${session.completed ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {getActivityIcon(session.type)}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{session.activity}</h4>
                          <span className="text-sm text-gray-500">{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-gray-600">{session.subject}</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {session.duration}
                          </span>
                        </div>
                      </div>

                      {!session.completed && (
                        <Button size="sm" className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white">
                          Start
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  This Week's Goals
                </CardTitle>
                <CardDescription>Track your progress towards weekly study objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                          <p className="text-sm text-gray-600">{goal.subject}</p>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-sky-blue-500 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Completed: {goal.completed}</span>
                        <span>Target: {goal.target}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Exams */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Upcoming Exams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingExams.map((exam, index) => (
                    <div key={index} className={`p-3 border rounded-lg ${getPriorityColor(exam.priority)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{exam.exam}</h4>
                        <Badge variant="outline" className="text-xs">
                          {exam.daysLeft} days
                        </Badge>
                      </div>
                      <p className="text-xs mb-2">{exam.subject}</p>
                      <p className="text-xs opacity-75 mb-2">{exam.date}</p>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Preparation</span>
                          <span>{exam.preparation}%</span>
                        </div>
                        <div className="w-full bg-white bg-opacity-50 rounded-full h-1">
                          <div
                            className="bg-current h-1 rounded-full opacity-75"
                            style={{ width: `${exam.preparation}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Study
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link to="/flashcards">
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="w-4 h-4 mr-2" />
                      Quick Flashcard Review
                    </Button>
                  </Link>
                  <Link to="/quizzes">
                    <Button variant="outline" className="w-full justify-start">
                      <Trophy className="w-4 h-4 mr-2" />
                      Take a Practice Quiz
                    </Button>
                  </Link>
                  <Link to="/subjects">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Continue Last Topic
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Study Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card className="border-sky-blue-200 bg-sky-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Study Tip of the Day</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Pomodoro Technique:</strong> Study for 25 minutes, then take a 5-minute break.
                  This helps maintain focus and prevents burnout.
                </p>
                <Button size="sm" variant="outline" className="text-sky-blue-700 border-sky-blue-300">
                  Learn More Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
