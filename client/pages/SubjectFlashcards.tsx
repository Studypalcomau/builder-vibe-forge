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

// English flashcards for Queensland curriculum
const englishFlashcards: FlashcardData[] = [
  {
    id: "eng-1",
    front: "What is a metaphor?",
    back: "A metaphor is a figure of speech that directly compares two unrelated things without using 'like' or 'as'. Example: 'Time is money' or 'Her voice is music to my ears.'",
    category: "Literary Devices",
    difficulty: "Easy",
    subject: "English",
    tags: ["metaphor", "figurative language", "comparison", "poetry"]
  },
  {
    id: "eng-2",
    front: "Explain the difference between theme and plot.",
    back: "Plot is the sequence of events in a story (what happens), while theme is the central message or meaning of the work (what it's about). Plot is concrete; theme is abstract.",
    category: "Literary Analysis",
    difficulty: "Medium",
    subject: "English",
    tags: ["theme", "plot", "literary analysis", "story structure"]
  },
  {
    id: "eng-3",
    front: "What is dramatic irony?",
    back: "Dramatic irony occurs when the audience knows something that the characters don't. This creates tension and can be used for humor or suspense. Example: In Romeo and Juliet, we know Juliet isn't really dead.",
    category: "Literary Devices",
    difficulty: "Medium",
    subject: "English",
    tags: ["irony", "dramatic irony", "audience", "tension"]
  },
  {
    id: "eng-4",
    front: "Define characterization and its two main types.",
    back: "Characterization is how an author reveals character traits. Direct characterization tells us explicitly what a character is like. Indirect characterization shows us through actions, dialogue, thoughts, and other characters' reactions.",
    category: "Character Analysis",
    difficulty: "Medium",
    subject: "English",
    tags: ["characterization", "direct", "indirect", "character development"]
  },
  {
    id: "eng-5",
    front: "What is personification?",
    back: "Personification gives human characteristics to non-human things. Example: 'The wind whispered through the trees' or 'Time marched on relentlessly.'",
    category: "Literary Devices",
    difficulty: "Easy",
    subject: "English",
    tags: ["personification", "figurative language", "human qualities"]
  },
  {
    id: "eng-6",
    front: "Explain the difference between connotation and denotation.",
    back: "Denotation is the literal, dictionary definition of a word. Connotation is the emotional or cultural associations a word carries. Example: 'snake' denotes a reptile but connotes danger or deceit.",
    category: "Language Analysis",
    difficulty: "Hard",
    subject: "English",
    tags: ["connotation", "denotation", "word meaning", "language analysis"]
  },
  {
    id: "eng-7",
    front: "What is alliteration and give an example.",
    back: "Alliteration is the repetition of initial consonant sounds in consecutive words. Example: 'Peter Piper picked a peck of pickled peppers' or 'wild and windy'.",
    category: "Literary Devices",
    difficulty: "Easy",
    subject: "English",
    tags: ["alliteration", "sound devices", "consonant", "repetition"]
  },
  {
    id: "eng-8",
    front: "What are the elements of a persuasive argument?",
    back: "Key elements include: a clear thesis/claim, credible evidence (facts, statistics, expert opinions), logical reasoning, acknowledgment of counterarguments, and a strong conclusion that reinforces the main point.",
    category: "Persuasive Writing",
    difficulty: "Hard",
    subject: "English",
    tags: ["persuasion", "argument", "thesis", "evidence", "writing"]
  },
  {
    id: "eng-9",
    front: "Define tone and mood. How are they different?",
    back: "Tone is the author's attitude toward the subject (formal, sarcastic, serious). Mood is the emotional atmosphere felt by the reader (suspenseful, melancholy, joyful). Tone creates mood.",
    category: "Literary Analysis",
    difficulty: "Medium",
    subject: "English",
    tags: ["tone", "mood", "atmosphere", "author attitude"]
  },
  {
    id: "eng-10",
    front: "What is symbolism in literature?",
    back: "Symbolism uses objects, colors, characters, or actions to represent larger ideas or concepts. Example: A dove symbolizes peace, a red rose symbolizes love, darkness may symbolize evil or the unknown.",
    category: "Literary Devices",
    difficulty: "Hard",
    subject: "English",
    tags: ["symbolism", "symbols", "representation", "deeper meaning"]
  }
];

// Physics flashcards
const physicsFlashcards: FlashcardData[] = [
  {
    id: "phys-1",
    front: "State Newton's First Law of Motion.",
    back: "An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced external force. Also known as the Law of Inertia.",
    category: "Mechanics",
    difficulty: "Easy",
    subject: "Physics",
    tags: ["Newton's laws", "inertia", "motion", "force"]
  },
  {
    id: "phys-2",
    front: "What is the formula for kinetic energy?",
    back: "KE = ½mv², where m is mass (kg) and v is velocity (m/s). Kinetic energy is measured in joules (J).",
    category: "Energy",
    difficulty: "Easy",
    subject: "Physics",
    tags: ["kinetic energy", "formula", "mass", "velocity"]
  },
  {
    id: "phys-3",
    front: "Explain the difference between AC and DC current.",
    back: "DC (Direct Current) flows in one direction only, like from a battery. AC (Alternating Current) changes direction periodically, like household electricity. AC is easier to transform to different voltages.",
    category: "Electricity",
    difficulty: "Medium",
    subject: "Physics",
    tags: ["current", "AC", "DC", "electricity"]
  }
];

const subjectFlashcards: Record<string, FlashcardData[]> = {
  biology: biologyFlashcards,
  mathematics: mathFlashcards,
  "mathematical-methods": mathFlashcards,
  "specialist-mathematics": mathFlashcards,
  physics: physicsFlashcards,
  english: englishFlashcards,
  chemistry: [],
  engineering: [],
  economics: []
};

export default function SubjectFlashcards() {
  const { slug, subtopicId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyMode, setStudyMode] = useState<"sequential" | "random">("sequential");
  const [showStats, setShowStats] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [startTime] = useState(Date.now());

  // Handle subtopic-specific flashcards
  const subtopicFlashcards: Record<string, FlashcardData[]> = {
    "1-0": [ // Domain and Range
      {
        id: "dom-1",
        front: "What is the domain of a function?",
        back: "The domain is the set of all possible input values (x-values) for which the function is defined.",
        category: "Functions",
        difficulty: "Medium",
        subject: "Mathematical Methods",
        tags: ["domain", "function", "input"]
      },
      {
        id: "dom-2",
        front: "What is the range of a function?",
        back: "The range is the set of all possible output values (y-values) that the function can produce.",
        category: "Functions",
        difficulty: "Medium",
        subject: "Mathematical Methods",
        tags: ["range", "function", "output"]
      }
    ],
    "1-1": [ // Function Types
      {
        id: "func-1",
        front: "What is a linear function?",
        back: "A linear function has the form f(x) = mx + b, where m is the slope and b is the y-intercept. Its graph is a straight line.",
        category: "Functions",
        difficulty: "Easy",
        subject: "Mathematical Methods",
        tags: ["linear", "function", "slope"]
      }
    ]
  };

  const flashcards = subtopicId
    ? (subtopicFlashcards[subtopicId] || [])
    : (subjectFlashcards[slug as string] || []);
  const hasFlashcards = flashcards.length > 0;

  const subjectNames: Record<string, string> = {
    biology: "Biology",
    mathematics: "Mathematics",
    "mathematical-methods": "Mathematical Methods",
    "specialist-mathematics": "Specialist Mathematics",
    physics: "Physics",
    english: "English",
    chemistry: "Chemistry",
    engineering: "Engineering",
    economics: "Economics"
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  // Get subtopic name from ID
  const subtopicNames: Record<string, string> = {
    "1-0": "Domain and Range",
    "1-1": "Function Types",
    "1-2": "Transformations"
  };

  const subtopicName = subtopicId ? subtopicNames[subtopicId] : null;

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
              <h1 className="text-3xl font-bold text-gray-900">
                {subtopicName ? `${subtopicName} Flashcards` : `${subjectName} Flashcards`}
              </h1>
              <p className="text-gray-600">
                {subtopicName ? `${subjectName} • ${subtopicName}` : 'Interactive study cards with spaced repetition'}
              </p>
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
              <h1 className="text-3xl font-bold text-gray-900">
                {subtopicName ? `${subtopicName} Flashcards` : `${subjectName} Flashcards`}
              </h1>
              <p className="text-gray-600">
                {subtopicName ? `${subjectName} • ${subtopicName}` : 'Interactive study cards with spaced repetition'}
              </p>
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
