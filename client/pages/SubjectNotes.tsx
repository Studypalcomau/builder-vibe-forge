import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  BookOpen, 
  Search,
  Download,
  Eye,
  Clock,
  User,
  ChevronRight,
  FileText,
  Formula,
  Lightbulb
} from "lucide-react";

interface StudyNote {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  readTime: number; // in minutes
  lastUpdated: string;
  tags: string[];
  type: "concept" | "formula" | "example" | "summary";
}

// Queensland Mathematics study notes
const mathematicsNotes: StudyNote[] = [
  {
    id: "math-derivatives",
    title: "Introduction to Derivatives",
    description: "Fundamental concepts of derivatives including definition, notation, and basic rules",
    content: `# Introduction to Derivatives

## What is a Derivative?

The derivative of a function represents the **instantaneous rate of change** of that function at any given point. Geometrically, it represents the slope of the tangent line to the function's graph.

### Definition
The derivative of f(x) at point x is defined as:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

### Basic Notation
- $f'(x)$ - Lagrange notation
- $\\frac{df}{dx}$ - Leibniz notation  
- $D_x f$ - Operator notation

## Fundamental Rules

### Power Rule
If $f(x) = x^n$, then $f'(x) = nx^{n-1}$

**Examples:**
- $\\frac{d}{dx}(x^3) = 3x^2$
- $\\frac{d}{dx}(x^{1/2}) = \\frac{1}{2}x^{-1/2} = \\frac{1}{2\\sqrt{x}}$

### Constant Rule
If $f(x) = c$ (constant), then $f'(x) = 0$

### Sum/Difference Rule
$\\frac{d}{dx}[f(x) ± g(x)] = f'(x) ± g'(x)$

### Product Rule
$\\frac{d}{dx}[f(x) \\cdot g(x)] = f'(x)g(x) + f(x)g'(x)$

### Quotient Rule
$\\frac{d}{dx}\\left[\\frac{f(x)}{g(x)}\\right] = \\frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}$

## Trigonometric Derivatives
- $\\frac{d}{dx}(\\sin x) = \\cos x$
- $\\frac{d}{dx}(\\cos x) = -\\sin x$
- $\\frac{d}{dx}(\\tan x) = \\sec^2 x$

## Chain Rule
For composite functions: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$

**Example:** $\\frac{d}{dx}(\\sin(2x)) = \\cos(2x) \\cdot 2 = 2\\cos(2x)$

## Applications
1. **Finding slopes of tangent lines**
2. **Velocity and acceleration** in physics
3. **Optimization problems**
4. **Related rates**

## Practice Problems
Try differentiating these functions:
1. $f(x) = 3x^4 - 2x^2 + 5x - 1$
2. $g(x) = \\sin(x^2)$
3. $h(x) = \\frac{x^2 + 1}{x - 1}$`,
    category: "Calculus",
    difficulty: "Medium",
    readTime: 12,
    lastUpdated: "2024-01-15",
    tags: ["derivatives", "calculus", "rates of change", "differentiation"],
    type: "concept"
  },
  {
    id: "math-integration",
    title: "Integration Fundamentals",
    description: "Understanding antiderivatives, indefinite integrals, and basic integration techniques",
    content: `# Integration Fundamentals

## What is Integration?

Integration is the **reverse process of differentiation**. It's used to find the original function when given its derivative, or to calculate areas under curves.

### Indefinite Integrals
The indefinite integral of f(x) is written as:
$$\\int f(x) \\, dx = F(x) + C$$

Where F(x) is the antiderivative of f(x) and C is the constant of integration.

## Basic Integration Rules

### Power Rule for Integration
$$\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\quad (n ≠ -1)$$

**Examples:**
- $\\int x^3 \\, dx = \\frac{x^4}{4} + C$
- $\\int x^{-2} \\, dx = \\frac{x^{-1}}{-1} + C = -\\frac{1}{x} + C$

### Constant Multiple Rule
$$\\int k \\cdot f(x) \\, dx = k \\int f(x) \\, dx$$

### Sum/Difference Rule  
$$\\int [f(x) ± g(x)] \\, dx = \\int f(x) \\, dx ± \\int g(x) \\, dx$$

## Common Integrals

### Trigonometric Functions
- $\\int \\sin x \\, dx = -\\cos x + C$
- $\\int \\cos x \\, dx = \\sin x + C$
- $\\int \\sec^2 x \\, dx = \\tan x + C$

### Exponential Functions
- $\\int e^x \\, dx = e^x + C$
- $\\int a^x \\, dx = \\frac{a^x}{\\ln a} + C$

### Rational Functions
- $\\int \\frac{1}{x} \\, dx = \\ln|x| + C$

## Definite Integrals
$$\\int_a^b f(x) \\, dx = F(b) - F(a)$$

This represents the **net area** between the curve y = f(x) and the x-axis from x = a to x = b.

### Fundamental Theorem of Calculus
If F(x) is an antiderivative of f(x), then:
$$\\int_a^b f(x) \\, dx = F(b) - F(a)$$

## Integration Techniques

### Substitution Method
When the integrand contains a function and its derivative:
1. Let u = g(x)
2. Find du = g'(x)dx
3. Substitute to get an integral in terms of u
4. Integrate and substitute back

**Example:** $\\int 2x(x^2 + 1)^3 \\, dx$
Let u = x² + 1, then du = 2x dx
$= \\int u^3 \\, du = \\frac{u^4}{4} + C = \\frac{(x^2 + 1)^4}{4} + C$

## Applications
1. **Finding areas under curves**
2. **Calculating volumes** using disk/washer methods
3. **Work and energy** problems in physics
4. **Probability** (continuous distributions)

## Practice Problems
Evaluate these integrals:
1. $\\int (3x^2 - 2x + 1) \\, dx$
2. $\\int_0^1 x^2 \\, dx$
3. $\\int \\sin(2x) \\, dx$`,
    category: "Calculus",
    difficulty: "Medium", 
    readTime: 15,
    lastUpdated: "2024-01-14",
    tags: ["integration", "antiderivatives", "definite integrals", "calculus"],
    type: "concept"
  },
  {
    id: "math-quadratic-formula",
    title: "Quadratic Formula and Applications",
    description: "Complete guide to solving quadratic equations using the quadratic formula",
    content: `# The Quadratic Formula

## Standard Form
A quadratic equation in standard form is:
$$ax^2 + bx + c = 0$$
where a ≠ 0.

## The Quadratic Formula
$$x = \\frac{-b ± \\sqrt{b^2 - 4ac}}{2a}$$

## The Discriminant
The discriminant is $\\Delta = b^2 - 4ac$

### Nature of Roots
- If $\\Delta > 0$: Two distinct real roots
- If $\\Delta = 0$: One repeated real root
- If $\\Delta < 0$: Two complex conjugate roots

## Step-by-Step Solution Process

### Example: Solve $2x^2 - 5x - 3 = 0$

1. **Identify coefficients:**
   - a = 2, b = -5, c = -3

2. **Calculate discriminant:**
   - $\\Delta = (-5)^2 - 4(2)(-3) = 25 + 24 = 49$

3. **Apply formula:**
   - $x = \\frac{-(-5) ± \\sqrt{49}}{2(2)} = \\frac{5 ± 7}{4}$

4. **Find both solutions:**
   - $x_1 = \\frac{5 + 7}{4} = 3$
   - $x_2 = \\frac{5 - 7}{4} = -\\frac{1}{2}$

## Applications

### Projectile Motion
Height equation: $h(t) = -4.9t^2 + v_0t + h_0$

### Optimization Problems
Finding maximum/minimum values of quadratic functions.

### Economics
Cost, revenue, and profit functions are often quadratic.

## Alternative Methods
1. **Factoring** (when possible)
2. **Completing the square**
3. **Graphing**

Remember: Always check your solutions by substituting back into the original equation!`,
    category: "Algebra",
    difficulty: "Easy",
    readTime: 8,
    lastUpdated: "2024-01-13",
    tags: ["quadratic formula", "algebra", "equations", "discriminant"],
    type: "formula"
  }
];

const biologyNotes: StudyNote[] = [
  {
    id: "bio-photosynthesis",
    title: "Photosynthesis: Light-Dependent and Independent Reactions",
    description: "Comprehensive overview of photosynthesis including the Calvin cycle and electron transport chain",
    content: `# Photosynthesis

## Overview
Photosynthesis is the process by which plants convert light energy into chemical energy (glucose), releasing oxygen as a byproduct.

**Overall Equation:**
$$6CO_2 + 6H_2O + \\text{light energy} → C_6H_{12}O_6 + 6O_2$$

## Structure: Chloroplasts
- **Outer membrane**: Permeable to small molecules
- **Inner membrane**: Selective permeability
- **Stroma**: Fluid-filled space containing enzymes for Calvin cycle
- **Thylakoids**: Membrane-bound sacs containing chlorophyll
- **Granum**: Stack of thylakoids

## Stage 1: Light-Dependent Reactions (Thylakoids)

### Photosystem II (PSII)
1. **Light absorption** by chlorophyll excites electrons
2. **Water splitting**: 2H₂O → 4H⁺ + 4e⁻ + O₂
3. **Electron transport** through cytochrome complex
4. **ATP synthesis** via chemiosmosis

### Photosystem I (PSI)
1. **Re-energizes electrons** with light
2. **NADP⁺ reduction**: NADP⁺ + H⁺ + 2e⁻ → NADPH

### Products of Light Reactions:
- **ATP** (energy currency)
- **NADPH** (reducing power)
- **O₂** (byproduct)

## Stage 2: Light-Independent Reactions (Calvin Cycle)

### Location: Stroma

### Three Phases:

#### 1. Carbon Fixation
- **CO₂** combines with **RuBP** (5-carbon)
- Catalyzed by **RuBisCO** enzyme
- Forms unstable 6-carbon compound
- Immediately splits into two **3-PGA** molecules

#### 2. Reduction
- **3-PGA** phosphorylated by **ATP**
- **NADPH** reduces **1,3-BPG** to **G3P**
- Some **G3P** exits cycle to form glucose

#### 3. Regeneration
- Remaining **G3P** rearranged to regenerate **RuBP**
- Requires **ATP**
- Cycle can continue

### Net Equation (3 turns):
$$3CO_2 + 6NADPH + 9ATP → G3P + 6NADP^+ + 9ADP + 8P_i$$

## Factors Affecting Photosynthesis

### Limiting Factors:
1. **Light intensity**
2. **CO₂ concentration**  
3. **Temperature**
4. **Water availability**

### C4 and CAM Plants
- **C4 plants**: Separate CO₂ fixation spatially
- **CAM plants**: Separate CO₂ fixation temporally
- Both adaptations reduce photorespiration

## Importance
- **Primary production** in ecosystems
- **Oxygen production** for respiration
- **Food source** for all life
- **Carbon fixation** from atmosphere

This process is fundamental to life on Earth and forms the base of most food chains!`,
    category: "Plant Biology",
    difficulty: "Hard",
    readTime: 18,
    lastUpdated: "2024-01-16",
    tags: ["photosynthesis", "Calvin cycle", "chloroplasts", "plant biology"],
    type: "concept"
  }
];

const subjectNotes: Record<string, StudyNote[]> = {
  mathematics: mathematicsNotes,
  biology: biologyNotes,
  chemistry: [],
  physics: [],
  english: [],
  "modern-history": []
};

export default function SubjectNotes() {
  const { slug } = useParams();
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const notes = subjectNotes[slug as string] || [];
  const hasNotes = notes.length > 0;

  const subjectNames: Record<string, string> = {
    biology: "Biology",
    mathematics: "Mathematics", 
    chemistry: "Chemistry",
    physics: "Physics",
    english: "English",
    "modern-history": "Modern History"
  };

  const subjectName = subjectNames[slug as string] || "Subject";

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "concept": return <Lightbulb className="w-4 h-4" />;
      case "formula": return <Formula className="w-4 h-4" />;
      case "example": return <Eye className="w-4 h-4" />;
      case "summary": return <FileText className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "concept": return "bg-blue-100 text-blue-700";
      case "formula": return "bg-purple-100 text-purple-700";
      case "example": return "bg-green-100 text-green-700";
      case "summary": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  // Show selected note
  if (selectedNote) {
    return (
      <div className="min-h-screen bg-study-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedNote(null)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Button>
          </div>
          
          <Card className="border-sky-blue-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(selectedNote.difficulty)}>
                    {selectedNote.difficulty}
                  </Badge>
                  <Badge className={getTypeColor(selectedNote.type)}>
                    {getTypeIcon(selectedNote.type)}
                    <span className="ml-1 capitalize">{selectedNote.type}</span>
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {selectedNote.readTime} min read
                </div>
              </div>
              <CardTitle className="text-2xl">{selectedNote.title}</CardTitle>
              <CardDescription className="text-lg">{selectedNote.description}</CardDescription>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedNote.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: selectedNote.content
                    .replace(/\$\$(.*?)\$\$/g, '<div class="math-block">$1</div>')
                    .replace(/\$(.*?)\$/g, '<span class="math-inline">$1</span>')
                    .replace(/\n/g, '<br>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                }}
              />
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Last updated: {selectedNote.lastUpdated}</span>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!hasNotes) {
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
              <h1 className="text-3xl font-bold text-gray-900">{subjectName} Study Notes</h1>
              <p className="text-gray-600">Comprehensive notes covering all key concepts</p>
            </div>
          </div>

          {/* No notes message */}
          <Card className="text-center border-sky-blue-200 max-w-2xl mx-auto">
            <CardHeader>
              <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-sky-blue-600" />
              </div>
              <CardTitle className="text-2xl">Study Notes Coming Soon</CardTitle>
              <CardDescription className="text-lg">
                {subjectName} study notes are currently being developed. Check back soon!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  In the meantime, try our Mathematics and Biology notes to see how comprehensive they are.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/subjects/mathematics/notes">
                    <Button className="bg-study-primary hover:bg-study-primary/90 text-white">
                      Math Notes
                    </Button>
                  </Link>
                  <Link to="/subjects/biology/notes">
                    <Button variant="outline">
                      Biology Notes
                    </Button>
                  </Link>
                </div>
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
        <div className="flex items-center space-x-4 mb-8">
          <Link to={`/subjects/${slug}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {subjectName}
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{subjectName} Study Notes</h1>
            <p className="text-gray-600">Comprehensive notes covering all key concepts</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-sky-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Notes Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">{notes.length}</div>
              <div className="text-sm text-gray-600">Study Notes</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {notes.reduce((total, note) => total + note.readTime, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Minutes</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {[...new Set(notes.map(note => note.category))].length}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card className="border-sky-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900">
                {[...new Set(notes.flatMap(note => note.tags))].length}
              </div>
              <div className="text-sm text-gray-600">Topics</div>
            </CardContent>
          </Card>
        </div>

        {/* Notes List */}
        <div className="space-y-6">
          {filteredNotes.length === 0 ? (
            <Card className="text-center border-sky-blue-200 p-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
              <p className="text-gray-600">Try adjusting your search terms.</p>
            </Card>
          ) : (
            filteredNotes.map((note) => (
              <Card key={note.id} className="border-sky-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedNote(note)}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(note.difficulty)}>
                        {note.difficulty}
                      </Badge>
                      <Badge className={getTypeColor(note.type)}>
                        {getTypeIcon(note.type)}
                        <span className="ml-1 capitalize">{note.type}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {note.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.title}</h3>
                  <p className="text-gray-600 mb-4">{note.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {note.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{note.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sky-blue-600">
                      <span className="text-sm mr-2">Read Note</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
