import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trophy,
  Brain,
  Target,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Eye,
  ArrowLeft
} from "lucide-react";

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "numerical" | "text";
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  workingSteps?: string[]; // Step-by-step working
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  points: number;
  timeLimit?: number; // in seconds
}

export interface QuizResult {
  questionId: string;
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
  points: number;
  maxPoints: number;
}

export interface DetailedQuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  results: QuizResult[];
  timeTaken?: number;
}

export interface QuizAttempt {
  attemptNumber: number;
  score: number;
  passed: boolean;
  completedAt: Date;
  timeTaken?: number;
  detailedResults?: DetailedQuizResult;
  questionsAsked?: QuizQuestion[]; // Store the actual questions for this attempt
  userAnswers?: Record<string, any>; // Store user's answers for review
}

export interface QuizProgress {
  quizId: string;
  attempts: QuizAttempt[];
  bestScore: number;
  hasPassed: boolean;
  lastAttemptDate: Date;
}

export interface QuizData {
  id: string;
  title: string;
  description: string;
  subject: string;
  questions: QuizQuestion[];
  totalTime: number; // in minutes
  passingScore: number; // percentage
}

interface CurriculumInfo {
  unitName: string;
  topicName: string;
  subtopicName: string;
}

interface QuizComponentProps {
  quiz: QuizData;
  onComplete: (score: number, answers: Record<string, any>, detailedResults?: DetailedQuizResult, attempt?: QuizAttempt) => void;
  className?: string;
  returnPath?: string;
  previousAttempts?: QuizAttempt[];
  allowRetakes?: boolean;
  requirePassingGrade?: boolean;
  questionPool?: QuizQuestion[]; // Larger pool of questions to select from
  questionsPerAttempt?: number; // Number of questions to show per attempt
  curriculumInfo?: CurriculumInfo; // Unit, topic, subtopic information
}

// Function to randomize and select questions from a larger pool
const selectRandomQuestions = (questionPool: QuizQuestion[], count: number): QuizQuestion[] => {
  if (questionPool.length <= count) {
    return [...questionPool]; // Return all questions if pool is smaller than requested count
  }

  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export function Quiz({
  quiz,
  onComplete,
  className = "",
  returnPath,
  previousAttempts = [],
  allowRetakes = true,
  requirePassingGrade = false,
  questionPool,
  questionsPerAttempt = 5
}: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.totalTime * 60);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDetailedReview, setShowDetailedReview] = useState(false);
  const [detailedResults, setDetailedResults] = useState<DetailedQuizResult | null>(null);
  const [showAttemptHistory, setShowAttemptHistory] = useState(false);
  const [showTestHistory, setShowTestHistory] = useState(false);
  const [selectedHistoryAttempt, setSelectedHistoryAttempt] = useState<QuizAttempt | null>(null);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<QuizQuestion[]>([]);

  // Initialize quiz questions (randomized if question pool provided)
  useEffect(() => {
    if (questionPool && questionPool.length > 0) {
      const selectedQuestions = selectRandomQuestions(questionPool, questionsPerAttempt);
      setCurrentQuizQuestions(selectedQuestions);
    } else {
      setCurrentQuizQuestions(quiz.questions);
    }
  }, [questionPool, questionsPerAttempt, quiz.questions]);

  const currentQuestion = currentQuizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuizQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentQuizQuestions.length - 1;
  const hasAnsweredCurrent = currentQuestion && answers[currentQuestion?.id] !== undefined;

  const calculateScore = () => {
    let correct = 0;
    let totalPoints = 0;

    currentQuizQuestions.forEach(question => {
      totalPoints += question.points;
      const userAnswer = answers[question.id];

      if (question.type === "numerical") {
        if (Math.abs(Number(userAnswer) - Number(question.correctAnswer)) < 0.001) {
          correct += question.points;
        }
      } else if (String(userAnswer).toLowerCase() === String(question.correctAnswer).toLowerCase()) {
        correct += question.points;
      }
    });

    return Math.round((correct / totalPoints) * 100);
  };

  const calculateDetailedResults = (): DetailedQuizResult => {
    const results: QuizResult[] = [];
    let correctCount = 0;
    let totalPointsEarned = 0;
    let totalPointsPossible = 0;

    currentQuizQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      let isCorrect = false;

      if (question.type === "numerical") {
        isCorrect = Math.abs(Number(userAnswer) - Number(question.correctAnswer)) < 0.001;
      } else {
        isCorrect = String(userAnswer).toLowerCase() === String(question.correctAnswer).toLowerCase();
      }

      if (isCorrect) {
        correctCount++;
        totalPointsEarned += question.points;
      }
      totalPointsPossible += question.points;

      results.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
        maxPoints: question.points
      });
    });

    const score = Math.round((totalPointsEarned / totalPointsPossible) * 100);

    return {
      score,
      totalQuestions: currentQuizQuestions.length,
      correctAnswers: correctCount,
      results
    };
  };

  const handleAnswer = (answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = calculateScore();
      const detailed = calculateDetailedResults();
      const timeTaken = quizStartTime ? (Date.now() - quizStartTime.getTime()) / 1000 : undefined;

      const attempt: QuizAttempt = {
        attemptNumber: previousAttempts.length + 1,
        score: finalScore,
        passed: finalScore >= quiz.passingScore,
        completedAt: new Date(),
        timeTaken,
        detailedResults: detailed,
        questionsAsked: currentQuizQuestions,
        userAnswers: answers
      };

      setDetailedResults(detailed);
      setShowResult(true);
      onComplete(finalScore, answers, detailed, attempt);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(quiz.totalTime * 60);
    setShowResult(false);
    setQuizStarted(false);
    setShowDetailedReview(false);
    setDetailedResults(null);
    setShowAttemptHistory(false);
    setShowTestHistory(false);
    setSelectedHistoryAttempt(null);
    setQuizStartTime(null);

    // Generate new randomized questions for the next attempt
    if (questionPool && questionPool.length > 0) {
      const newQuestions = selectRandomQuestions(questionPool, questionsPerAttempt);
      setCurrentQuizQuestions(newQuestions);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Quiz start screen
  if (!quizStarted) {
    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <Card className="border-sky-blue-200">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-sky-blue-600" />
            </div>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <p className="text-gray-600">{quiz.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">{currentQuizQuestions.length}</div>
                <div className="text-sm text-gray-600">Questions</div>
              </div>
              <div className="text-center p-4 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-2xl text-gray-900">{quiz.totalTime} min</div>
                <div className="text-sm text-gray-600">Time Limit</div>
              </div>
            </div>
            
            <div className="text-center p-4 bg-sky-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Passing Score</div>
              <div className="text-2xl font-bold text-gray-900">{quiz.passingScore}%</div>
            </div>

            {/* Previous Attempts Summary */}
            {previousAttempts.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Previous Attempts</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAttemptHistory(!showAttemptHistory)}
                    className="text-sky-blue-600 hover:text-sky-blue-700"
                  >
                    {showAttemptHistory ? 'Hide' : 'Show'} History
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-900">{previousAttempts.length}</div>
                    <div className="text-gray-600">Attempts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-gray-900">
                      {Math.max(...previousAttempts.map(a => a.score))}%
                    </div>
                    <div className="text-gray-600">Best Score</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-lg ${
                      previousAttempts.some(a => a.passed) ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {previousAttempts.some(a => a.passed) ? 'PASSED' : 'NOT PASSED'}
                    </div>
                    <div className="text-gray-600">Status</div>
                  </div>
                </div>

                {showAttemptHistory && (
                  <div className="mt-4 space-y-2">
                    {previousAttempts.slice(-3).reverse().map((attempt, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 bg-white rounded border">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Attempt {attempt.attemptNumber}</span>
                          <Badge className={attempt.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                            {attempt.score}%
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {attempt.completedAt.toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Start Quiz Button */}
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setQuizStarted(true);
                  setQuizStartTime(new Date());
                }}
                className="w-full bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
                size="lg"
              >
                {previousAttempts.length > 0 ?
                  `Start Attempt ${previousAttempts.length + 1}` :
                  'Start Quiz'
                }
              </Button>

              {/* Retake Instructions */}
              {previousAttempts.length > 0 && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    {previousAttempts.some(a => a.passed) ? (
                      requirePassingGrade ?
                        "You've already passed this quiz. Retaking is optional for practice." :
                        "Retake to improve your score or for additional practice."
                    ) : (
                      requirePassingGrade ?
                        `You need ${quiz.passingScore}% to pass. Keep trying!` :
                        "Retake to improve your understanding and score."
                    )}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Detailed answer review screen
  if (showDetailedReview) {
    const reviewResults = detailedResults || calculateDetailedResults();
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetailedReview(false)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Answer Review</h2>
            <p className="text-gray-600">Complete solutions with step-by-step workings for each question</p>
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="border-sky-blue-200 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{reviewResults.correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {reviewResults.totalQuestions - reviewResults.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{reviewResults.score}%</div>
                <div className="text-sm text-gray-600">Final Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question by Question Review */}
        <div className="space-y-6">
          {currentQuizQuestions.map((question, index) => {
            const result = reviewResults.results.find(r => r.questionId === question.id);
            if (!result) return null;

            return (
              <Card key={question.id} className={`border-2 ${result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        result.isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {result.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {result.points}/{result.maxPoints} points
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{question.question}</h4>
                  </div>

                  {/* Multiple Choice / True-False Options */}
                  {(question.type === "multiple-choice" || question.type === "true-false") && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = result.userAnswer === option;
                        const isCorrectAnswer = question.correctAnswer === option;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 border rounded-lg ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-100'
                                : isUserAnswer && !isCorrectAnswer
                                ? 'border-red-500 bg-red-100'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && (
                                  <Badge className="bg-green-100 text-green-700">Correct Answer</Badge>
                                )}
                                {isUserAnswer && (
                                  <Badge variant="outline">Your Answer</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Numerical / Text Answer */}
                  {(question.type === "numerical" || question.type === "text") && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Your Answer:</div>
                          <div className={`font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {result.userAnswer || 'No answer provided'}
                          </div>
                        </div>
                        <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Correct Answer:</div>
                          <div className="font-medium text-green-600">
                            {question.correctAnswer}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Solution */}
                  <div className="space-y-4">
                    {/* Working Steps */}
                    {question.workingSteps && question.workingSteps.length > 0 && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-yellow-900 mb-3">Step-by-Step Solution</h5>
                            <div className="space-y-2">
                              {question.workingSteps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-yellow-800">{stepIndex + 1}</span>
                                  </div>
                                  <div className="text-yellow-800 leading-relaxed">{step}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Final Explanation */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-medium text-blue-900 mb-2">Explanation</h5>
                          <div className="text-blue-800 leading-relaxed">
                            {question.explanation.split('. ').map((sentence, index, array) => (
                              <div key={index} className={index < array.length - 1 ? 'mb-2' : ''}>
                                {sentence}{index < array.length - 1 ? '.' : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Concepts */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-medium text-purple-900 mb-2">Key Concepts</h5>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-100 text-purple-700">{question.category}</Badge>
                            <Badge className="bg-purple-100 text-purple-700">{question.difficulty} Level</Badge>
                            <Badge className="bg-purple-100 text-purple-700">{question.points} Points</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {allowRetakes && (
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="flex-1"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          )}
          <Button
            className={`${allowRetakes ? 'flex-1' : 'w-full'} bg-sky-blue-500 hover:bg-sky-blue-600 text-white`}
            onClick={() => {
              if (returnPath) {
                window.location.href = returnPath;
              } else {
                window.history.back();
              }
            }}
          >
            Continue Studying
          </Button>
        </div>
      </div>
    );
  }

  // Test History screen
  if (showTestHistory) {
    return (
      <div className={`max-w-5xl mx-auto ${className}`}>
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowTestHistory(false)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Results
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Test History</h2>
            <p className="text-gray-600">Review all your past attempts and progress over time</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{previousAttempts.length}</div>
              <div className="text-sm text-gray-600">Total Attempts</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...previousAttempts.map(a => a.score))}%
              </div>
              <div className="text-sm text-gray-600">Best Score</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(previousAttempts.reduce((sum, a) => sum + a.score, 0) / previousAttempts.length)}%
              </div>
              <div className="text-sm text-gray-600">Average Score</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {previousAttempts.filter(a => a.passed).length}
              </div>
              <div className="text-sm text-gray-600">Passed Attempts</div>
            </CardContent>
          </Card>
        </div>

        {/* Test History Table */}
        <Card className="border-sky-blue-200">
          <CardHeader>
            <CardTitle>Attempt History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Attempt</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Score</th>
                    <th className="text-left py-3 px-4">Result</th>
                    <th className="text-left py-3 px-4">Time Taken</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {previousAttempts.slice().reverse().map((attempt, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">#{attempt.attemptNumber}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {attempt.completedAt.toLocaleDateString()} {attempt.completedAt.toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${
                          attempt.score >= 90 ? 'text-green-600' :
                          attempt.score >= 70 ? 'text-blue-600' : 'text-red-600'
                        }`}>
                          {attempt.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={attempt.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                          {attempt.passed ? 'PASSED' : 'FAILED'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {attempt.timeTaken ? `${Math.round(attempt.timeTaken / 60)} min` : 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // Set the historical attempt data and show detailed review
                            if (attempt.detailedResults) {
                              setDetailedResults(attempt.detailedResults);
                            }
                            if (attempt.userAnswers) {
                              setAnswers(attempt.userAnswers);
                            }
                            setShowTestHistory(false);
                            setShowDetailedReview(true);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Historical Attempt Review screen
  if (selectedHistoryAttempt) {
    const historyResults = selectedHistoryAttempt.detailedResults || calculateDetailedResults();
    const historyQuestions = selectedHistoryAttempt.questionsAsked || currentQuizQuestions;

    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <div className="mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedHistoryAttempt(null)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Test History
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Attempt #{selectedHistoryAttempt.attemptNumber} Review
            </h2>
            <p className="text-gray-600">
              Completed on {selectedHistoryAttempt.completedAt.toLocaleDateString()} at {selectedHistoryAttempt.completedAt.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <Card className="border-sky-blue-200 mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{historyResults.correctAnswers}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {historyResults.totalQuestions - historyResults.correctAnswers}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{historyResults.score}%</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {selectedHistoryAttempt.timeTaken ? `${Math.round(selectedHistoryAttempt.timeTaken / 60)}m` : 'N/A'}
                </div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question by Question Review */}
        <div className="space-y-6">
          {historyQuestions.map((question, index) => {
            const result = historyResults.results.find(r => r.questionId === question.id);
            if (!result) return null;

            return (
              <Card key={question.id} className={`border-2 ${result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        result.isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {result.isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Question {index + 1}</h3>
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {result.points}/{result.maxPoints} points
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{question.question}</h4>
                  </div>

                  {/* Multiple Choice / True-False Options */}
                  {(question.type === "multiple-choice" || question.type === "true-false") && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = selectedHistoryAttempt.userAnswers?.[question.id] === option;
                        const isCorrectAnswer = question.correctAnswer === option;

                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 border rounded-lg ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-100'
                                : isUserAnswer && !isCorrectAnswer
                                ? 'border-red-500 bg-red-100'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && (
                                  <Badge className="bg-green-100 text-green-700">Correct Answer</Badge>
                                )}
                                {isUserAnswer && (
                                  <Badge variant="outline">Your Answer</Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Numerical / Text Answer */}
                  {(question.type === "numerical" || question.type === "text") && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border border-gray-200 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Your Answer:</div>
                          <div className={`font-medium ${result.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedHistoryAttempt.userAnswers?.[question.id] || 'No answer provided'}
                          </div>
                        </div>
                        <div className="p-3 border border-green-200 bg-green-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">Correct Answer:</div>
                          <div className="font-medium text-green-600">
                            {question.correctAnswer}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Detailed Solution */}
                  <div className="space-y-4">
                    {/* Working Steps */}
                    {question.workingSteps && question.workingSteps.length > 0 && (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-yellow-900 mb-3">Step-by-Step Solution</h5>
                            <div className="space-y-2">
                              {question.workingSteps.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-xs font-bold text-yellow-800">{stepIndex + 1}</span>
                                  </div>
                                  <div className="text-yellow-800 leading-relaxed">{step}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Final Explanation */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-medium text-blue-900 mb-2">Explanation</h5>
                          <div className="text-blue-800 leading-relaxed">
                            {question.explanation.split('. ').map((sentence, index, array) => (
                              <div key={index} className={index < array.length - 1 ? 'mb-2' : ''}>
                                {sentence}{index < array.length - 1 ? '.' : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Concepts */}
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Brain className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h5 className="font-medium text-purple-900 mb-2">Key Concepts</h5>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-100 text-purple-700">{question.category}</Badge>
                            <Badge className="bg-purple-100 text-purple-700">{question.difficulty} Level</Badge>
                            <Badge className="bg-purple-100 text-purple-700">{question.points} Points</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Quiz results screen
  if (showResult) {
    const score = calculateScore();
    const passed = score >= quiz.passingScore;

    return (
      <div className={`max-w-2xl mx-auto ${className}`}>
        <Card className="border-sky-blue-200">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Congratulations!' : 'Keep Studying!'}
            </CardTitle>
            <p className="text-gray-600">
              {passed ? (
                requirePassingGrade ?
                  'Congratulations! You\'ve met the passing requirement.' :
                  'Great job! You passed the quiz.'
              ) : (
                requirePassingGrade ?
                  `You need ${quiz.passingScore}% to pass. You can retake this quiz.` :
                  'You can retake this quiz anytime to improve your score.'
              )}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
              <Badge className={passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}
              </Badge>
            </div>

            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-lg">{previousAttempts.length + 1}</div>
                <div className="text-sm text-gray-600">Attempt #</div>
              </div>
              <div className="p-3 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-lg">{Object.keys(answers).length}</div>
                <div className="text-sm text-gray-600">Answered</div>
              </div>
              <div className="p-3 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-lg">{currentQuizQuestions.length}</div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="p-3 bg-sky-blue-50 rounded-lg">
                <div className="font-bold text-lg">{quiz.passingScore}%</div>
                <div className="text-sm text-gray-600">Passing Score</div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => setShowDetailedReview(true)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Review Answers
              </Button>
              {previousAttempts.length > 0 && (
                <Button
                  onClick={() => {
                    setSelectedHistoryAttempt(null);
                    setShowTestHistory(true);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  View Test History ({previousAttempts.length} attempts)
                </Button>
              )}
              <div className="flex gap-3">
                {(allowRetakes && (!requirePassingGrade || !passed)) && (
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                )}
                {(allowRetakes && passed && !requirePassingGrade) && (
                  <Button
                    onClick={resetQuiz}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Practice Again
                  </Button>
                )}
                <Button
                  className={`${allowRetakes && (!requirePassingGrade || !passed) ? 'flex-1' : 'w-full'} bg-sky-blue-500 hover:bg-sky-blue-600 text-white`}
                  onClick={() => {
                    if (returnPath) {
                      window.location.href = returnPath;
                    } else {
                      window.history.back();
                    }
                  }}
                >
                  {passed ? 'Continue Studying' : 'Back to Lessons'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className={`max-w-2xl mx-auto ${className}`}>
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {currentQuizQuestions.length}
          </span>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-sky-blue-200 mb-6">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="outline">
              {currentQuestion.points} {currentQuestion.points === 1 ? 'point' : 'points'}
            </Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Multiple Choice */}
          {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === option
                      ? 'border-sky-blue-500 bg-sky-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {/* True/False */}
          {currentQuestion.type === "true-false" && (
            <div className="space-y-3">
              {["True", "False"].map((option) => (
                <label
                  key={option}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                    answers[currentQuestion.id] === option
                      ? 'border-sky-blue-500 bg-sky-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option}
                    checked={answers[currentQuestion.id] === option}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="mr-3"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}

          {/* Numerical */}
          {currentQuestion.type === "numerical" && (
            <div>
              <input
                type="number"
                step="any"
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-sky-blue-500 focus:outline-none"
                placeholder="Enter your numerical answer"
              />
            </div>
          )}

          {/* Text */}
          {currentQuestion.type === "text" && (
            <div>
              <textarea
                value={answers[currentQuestion.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-sky-blue-500 focus:outline-none resize-none"
                rows={4}
                placeholder="Enter your answer"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
