import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RotateCcw, Eye, EyeOff } from "lucide-react";

export interface FlashcardData {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  subject: string;
  tags?: string[];
}

interface FlashcardProps {
  flashcard: FlashcardData;
  showAnswer?: boolean;
  onFlip?: () => void;
  className?: string;
}

export function Flashcard({ flashcard, showAnswer = false, onFlip, className = "" }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(showAnswer);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className={`flashcard-container ${className}`}>
      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of card */}
        <Card className="flashcard-side flashcard-front absolute inset-0 border-sky-blue-200 shadow-lg">
          <CardContent className="p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <Badge variant="secondary" className={getDifficultyColor(flashcard.difficulty)}>
                {flashcard.difficulty}
              </Badge>
              <Badge variant="outline" className="text-sky-blue-700 border-sky-blue-300">
                {flashcard.category}
              </Badge>
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Question</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {flashcard.front}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleFlip}
                variant="outline"
                className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-50"
              >
                <Eye className="w-4 h-4 mr-2" />
                Show Answer
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="flashcard-side flashcard-back absolute inset-0 border-sky-blue-200 shadow-lg">
          <CardContent className="p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <Badge variant="secondary" className={getDifficultyColor(flashcard.difficulty)}>
                {flashcard.difficulty}
              </Badge>
              <Badge variant="outline" className="text-sky-blue-700 border-sky-blue-300">
                {flashcard.category}
              </Badge>
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Answer</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {flashcard.back}
                </p>
                {flashcard.tags && flashcard.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {flashcard.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-sky-blue-100 text-sky-blue-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button 
                onClick={handleFlip}
                variant="outline"
                className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-50"
              >
                <EyeOff className="w-4 h-4 mr-2" />
                Show Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        .flashcard-container {
          perspective: 1000px;
          width: 100%;
          height: 400px;
        }

        .flashcard {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s ease-in-out;
        }

        .flashcard.flipped {
          transform: rotateY(180deg);
        }

        .flashcard-side {
          backface-visibility: hidden;
          border-radius: 0.75rem;
        }

        .flashcard-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

export function FlashcardStack({ flashcards, currentIndex = 0, onNext, onPrevious, onAnswerRevealed }: {
  flashcards: FlashcardData[];
  currentIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onAnswerRevealed?: () => void;
}) {
  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  if (!currentCard) return null;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Card {currentIndex + 1} of {flashcards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-sky-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard */}
      <Flashcard 
        flashcard={currentCard}
        onFlip={onAnswerRevealed}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          onClick={onPrevious}
          disabled={currentIndex === 0}
          variant="outline"
        >
          Previous
        </Button>

        <div className="text-sm text-gray-600">
          {flashcards.length} cards total
        </div>

        <Button 
          onClick={onNext}
          disabled={currentIndex === flashcards.length - 1}
          className="bg-sky-blue-500 hover:bg-sky-blue-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
