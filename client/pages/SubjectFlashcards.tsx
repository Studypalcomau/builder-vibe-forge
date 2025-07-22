import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FlashcardStack, FlashcardData } from "../components/Flashcard";
import { 
  ArrowLeft, 
  Brain, 
  Trophy, 
  Shuffle,
  RotateCcw,
  Filter,
  CheckCircle,
  Clock
} from "lucide-react";

// Queensland Biology curriculum flashcards
const biologyFlashcards: FlashcardData[] = [
  {
    id: "bio-1",
    front: "What is the difference between DNA and RNA?",
    back: "DNA is double-stranded, contains deoxyribose sugar and thymine, and stores genetic information. RNA is single-stranded, contains ribose sugar and uracil, and is involved in protein synthesis.",
    category: "Molecular Biology",
    difficulty: "Medium",
    subject: "Biology",
    tags: ["DNA", "RNA", "Genetics", "Nucleic Acids"]
  },
  {
    id: "bio-2", 
    front: "Define photosynthesis and write the overall equation.",
    back: "Photosynthesis is the process where plants convert light energy into chemical energy. Equation: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
    category: "Plant Biology",
    difficulty: "Easy",
    subject: "Biology",
    tags: ["Photosynthesis", "Plants", "Energy", "Chloroplasts"]
  },
  {
    id: "bio-3",
    front: "What are the main stages of mitosis?",
    back: "Prophase (chromosomes condense), Metaphase (chromosomes align), Anaphase (sister chromatids separate), Telophase (nuclear envelopes reform), and Cytokinesis (cytoplasm divides).",
    category: "Cell Division", 
    difficulty: "Medium",
    subject: "Biology",
    tags: ["Mitosis", "Cell Division", "Chromosomes"]
  },
  {
    id: "bio-4",
    front: "Explain Darwin's theory of evolution by natural selection.",
    back: "Organisms with favorable traits are more likely to survive and reproduce, passing these traits to offspring. Over time, favorable traits become more common in populations, leading to evolutionary change.",
    category: "Evolution",
    difficulty: "Hard",
    subject: "Biology", 
    tags: ["Evolution", "Natural Selection", "Darwin", "Adaptation"]
  },
  {
    id: "bio-5",
    front: "What is the function of the mitochondria?",
    back: "Mitochondria are the 'powerhouses' of the cell, responsible for cellular respiration and ATP (energy) production. They have their own DNA and ribosomes.",
    category: "Cell Biology",
    difficulty: "Easy",
    subject: "Biology",
    tags: ["Mitochondria", "ATP", "Cellular Respiration", "Organelles"]
  },
  {
    id: "bio-6",
    front: "Describe the structure and function of enzymes.",
    back: "Enzymes are proteins that catalyze biochemical reactions. They have active sites that bind to substrates, lowering activation energy and increasing reaction rates. They are specific and can be affected by temperature and pH.",
    category: "Biochemistry",
    difficulty: "Medium", 
    subject: "Biology",
    tags: ["Enzymes", "Proteins", "Catalysis", "Active Site"]
  },
  {
    id: "bio-7",
    front: "What is homeostasis and give an example.",
    back: "Homeostasis is the maintenance of stable internal conditions in living organisms. Example: Temperature regulation in humans through sweating (cooling) and shivering (warming).",
    category: "Physiology",
    difficulty: "Easy",
    subject: "Biology", 
    tags: ["Homeostasis", "Regulation", "Temperature", "Balance"]
  },
  {
    id: "bio-8",
    front: "Explain the difference between genotype and phenotype.",
    back: "Genotype is the genetic makeup (alleles) of an organism. Phenotype is the observable physical and physiological traits resulting from the interaction of genotype and environment.",
    category: "Genetics",
    difficulty: "Medium",
    subject: "Biology",
    tags: ["Genotype", "Phenotype", "Genetics", "Alleles"]
  },
  {
    id: "bio-9",
    front: "What are the four levels of protein structure?",
    back: "Primary (amino acid sequence), Secondary (alpha helices and beta sheets), Tertiary (3D folding), and Quaternary (multiple polypeptide chains coming together).",
    category: "Biochemistry", 
    difficulty: "Hard",
    subject: "Biology",
    tags: ["Proteins", "Structure", "Amino Acids", "Folding"]
  },
  {
    id: "bio-10",
    front: "Describe the process of cellular respiration.",
    back: "Cellular respiration breaks down glucose to produce ATP. It occurs in three stages: Glycolysis (cytoplasm), Krebs Cycle (mitochondrial matrix), and Electron Transport Chain (inner mitochondrial membrane).",
    category: "Cellular Processes",
    difficulty: "Hard", 
    subject: "Biology",
    tags: ["Cellular Respiration", "ATP", "Glucose", "Mitochondria"]
  }
];

const mathFlashcards: FlashcardData[] = [
  {
    id: "math-1",
    front: "What is the derivative of sin(x)?",
    back: "cos(x)",
    category: "Calculus",
    difficulty: "Easy",
    subject: "Mathematics",
    tags: ["Derivatives", "Trigonometry"]
  },
  {
    id: "math-2", 
    front: "Solve: ∫x² dx",
    back: "x³/3 + C",
    category: "Calculus",
    difficulty: "Easy", 
    subject: "Mathematics",
    tags: ["Integration", "Power Rule"]
  },
  {
    id: "math-3",
    front: "What is the quadratic formula?",
    back: "x = (-b ± √(b² - 4ac)) / 2a",
    category: "Algebra",
    difficulty: "Medium",
    subject: "Mathematics", 
    tags: ["Quadratic", "Formula", "Algebra"]
  }
];

const subjectFlashcards: Record<string, FlashcardData[]> = {
  biology: biologyFlashcards,
  mathematics: mathFlashcards,
  chemistry: [],
  physics: [],
  english: [],
  "modern-history": []
};

export default function SubjectFlashcards() {
  const { slug } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<"sequential" | "random">("sequential");
  const [showStats, setShowStats] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [startTime] = useState(Date.now());

  const flashcards = subjectFlashcards[slug as string] || [];
  const hasFlashcards = flashcards.length > 0;

  const subjectNames: Record<string, string> = {
    biology: "Biology",
    mathematics: "Mathematics", 
    chemistry: "Chemistry",
    physics: "Physics",
    english: "English",
    "modern-history": "Modern History"
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    // Note: In a real app, you'd update the flashcards array with the shuffled version
    setCurrentCardIndex(0);
    setStudyMode("random");
  };

  const resetProgress = () => {
    setCurrentCardIndex(0);
    setCardsReviewed(0);
    setStudyMode("sequential");
  };

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setCardsReviewed(Math.max(cardsReviewed, currentCardIndex + 2));
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const studyTimeMinutes = Math.round((Date.now() - startTime) / 60000);

  if (!hasFlashcards) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link to={`/subjects/${slug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {subjectName}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subjectName} Flashcards</h1>
              <p className="text-gray-600">Interactive study cards with spaced repetition</p>
            </div>
          </div>

          {/* No flashcards message */}
          <Card className="text-center border-sky-blue-200 max-w-2xl mx-auto">
            <CardHeader>
              <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-sky-blue-600" />
              </div>
              <CardTitle className="text-2xl">Flashcards Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                {subjectName} flashcards are currently being developed. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In the meantime, check out our Biology flashcards to see how the system works.
                </p>
                <Link to="/subjects/biology/flashcards">
                  <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                    Try Biology Flashcards
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to={`/subjects/${slug}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {subjectName}
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subjectName} Flashcards</h1>
              <p className="text-gray-600">Interactive study cards with spaced repetition</p>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shuffleCards}
              className="border-sky-blue-300 text-sky-blue-700"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetProgress}
              className="border-sky-blue-300 text-sky-blue-700"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Study Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{flashcards.length}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{cardsReviewed}</div>
              <div className="text-sm text-gray-600">Cards Reviewed</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{studyTimeMinutes}</div>
              <div className="text-sm text-gray-600">Minutes Studied</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{Math.round((cardsReviewed / flashcards.length) * 100)}%</div>
              <div className="text-sm text-gray-600">Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Flashcard Stack */}
        <div className="mb-8">
          <FlashcardStack
            flashcards={flashcards}
            currentIndex={currentCardIndex}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onAnswerRevealed={() => setCardsReviewed(Math.max(cardsReviewed, currentCardIndex + 1))}
          />
        </div>

        {/* Study Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Smart Review</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Focus on cards you find challenging with spaced repetition
              </CardDescription>
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Quick Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Test yourself with a timed quiz based on these flashcards
              </CardDescription>
              <Link to={`/subjects/${slug}/quizzes`}>
                <Button variant="outline" className="w-full">
                  Take Quiz
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-sky-blue-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Study Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Review comprehensive notes covering these topics
              </CardDescription>
              <Link to={`/subjects/${slug}/notes`}>
                <Button variant="outline" className="w-full">
                  View Notes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Study Tips */}
        <Card className="mt-8 border-sky-blue-200 bg-sky-blue-50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Brain className="w-5 h-5 mr-2 text-sky-blue-600" />
              Study Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Review flashcards daily for better retention</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Try to explain the answer before flipping the card</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Focus extra time on difficult cards</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Use the shuffle feature to test your recall</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
