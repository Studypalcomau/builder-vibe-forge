import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { 
  ArrowLeft,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  BookOpen,
  FileText,
  Calendar,
  Grid3X3,
  Users,
  Target,
  BarChart3
} from "lucide-react";

interface GeneratedNote {
  id: string;
  title: string;
  unit: string;
  topic: string;
  subtopic: string;
  unitIndex: number;
  topicIndex: number;
  subtopicIndex: number;
  content: {
    overview: string;
    keyDefinitions: string[];
    formulas: string[];
    workedExamples: {
      title: string;
      problem: string;
      solution: string[];
    }[];
    practiceExercises: {
      question: string;
      answer: string;
    }[];
    visualAids: string[];
  };
  dateGenerated: string;
}

// Mock generated notes data for demonstration
const generateMockNotes = (): GeneratedNote[] => {
  const notes: GeneratedNote[] = [];
  const units = [
    {
      name: "Unit 1: Algebra and Functions",
      topics: [
        {
          name: "Functions and Relations",
          subtopics: ["Domain and Range", "Function Types", "Transformations"]
        },
        {
          name: "Polynomial Functions", 
          subtopics: ["Linear Functions", "Quadratic Functions", "Cubic Functions"]
        }
      ]
    },
    {
      name: "Unit 2: Calculus",
      topics: [
        {
          name: "Differential Calculus",
          subtopics: ["Limits", "Derivatives", "Chain Rule"]
        },
        {
          name: "Integral Calculus",
          subtopics: ["Antiderivatives", "Definite Integrals", "Applications"]
        }
      ]
    }
  ];

  units.forEach((unit, unitIndex) => {
    unit.topics.forEach((topic, topicIndex) => {
      topic.subtopics.forEach((subtopic, subtopicIndex) => {
        const note: GeneratedNote = {
          id: `note-${unitIndex}-${topicIndex}-${subtopicIndex}`,
          title: `${subtopic} - Study Notes`,
          unit: unit.name,
          topic: topic.name,
          subtopic: subtopic,
          unitIndex,
          topicIndex,
          subtopicIndex,
          content: {
            overview: `Comprehensive overview of ${subtopic} within the context of ${topic.name}. This section covers fundamental concepts, applications, and theoretical foundations essential for understanding ${subtopic} in mathematical contexts.`,
            keyDefinitions: [
              `${subtopic}: Core mathematical concept relating to ${topic.name}`,
              `Definition 2: Extended principle connecting ${subtopic} to broader mathematical frameworks`,
              `Definition 3: Applied methodology for implementing ${subtopic} in problem-solving contexts`,
              `Definition 4: Theoretical foundation underlying ${subtopic} applications`
            ],
            formulas: [
              `Formula 1: ${subtopic} = f(x) where x represents the input variable`,
              `Formula 2: d/dx[${subtopic}] = derivative expression for ${subtopic}`,
              `Formula 3: ∫${subtopic} dx = integral form of ${subtopic}`,
              `Formula 4: ${subtopic}(a,b) = parametric form with variables a and b`
            ],
            workedExamples: [
              {
                title: `Basic ${subtopic} Example`,
                problem: `Solve the following problem involving ${subtopic}: Given the conditions related to ${topic.name}, find the solution.`,
                solution: [
                  `Step 1: Identify the key elements of ${subtopic} in the problem`,
                  `Step 2: Apply the fundamental principles of ${subtopic}`,
                  `Step 3: Use appropriate formulas and techniques`,
                  `Step 4: Calculate the numerical result`,
                  `Step 5: Verify the solution and interpret the result`
                ]
              },
              {
                title: `Advanced ${subtopic} Application`,
                problem: `Complex scenario requiring deep understanding of ${subtopic} principles in real-world applications.`,
                solution: [
                  `Step 1: Analyze the complex problem structure`,
                  `Step 2: Break down into manageable components`,
                  `Step 3: Apply advanced ${subtopic} techniques`,
                  `Step 4: Integrate multiple solution approaches`,
                  `Step 5: Synthesize final comprehensive solution`
                ]
              }
            ],
            practiceExercises: [
              {
                question: `Practice Question 1: Calculate the ${subtopic} for the given scenario involving ${topic.name}.`,
                answer: `Solution involves applying core ${subtopic} principles with systematic approach yielding the final result.`
              },
              {
                question: `Practice Question 2: Demonstrate how ${subtopic} connects to other concepts in ${unit.name}.`,
                answer: `Analysis shows interconnections through mathematical relationships and theoretical frameworks.`
              },
              {
                question: `Practice Question 3: Solve the optimization problem using ${subtopic} methodology.`,
                answer: `Optimization achieved through calculus-based approach with ${subtopic} as the primary tool.`
              }
            ],
            visualAids: [
              `Diagram 1: Conceptual representation of ${subtopic} relationships`,
              `Graph 1: Visual plot showing ${subtopic} behavior over different domains`,
              `Chart 1: Comparison table of ${subtopic} properties and characteristics`,
              `Flowchart 1: Problem-solving process for ${subtopic} applications`
            ]
          },
          dateGenerated: new Date().toISOString().split('T')[0]
        };
        notes.push(note);
      });
    });
  });

  return notes;
};

export default function StudyNotesManagement() {
  const { subjectId } = useParams();
  const [notes] = useState<GeneratedNote[]>(generateMockNotes());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("all");
  const [selectedNote, setSelectedNote] = useState<GeneratedNote | null>(null);

  // Get unique values for filters
  const units = useMemo(() => {
    const uniqueUnits = Array.from(new Set(notes.map(n => n.unit)));
    return uniqueUnits.map((unit, index) => ({ name: unit, index }));
  }, [notes]);

  const topics = useMemo(() => {
    if (selectedUnit === "all") return [];
    const unitNotes = notes.filter(n => n.unit === selectedUnit);
    return Array.from(new Set(unitNotes.map(n => n.topic)));
  }, [notes, selectedUnit]);

  const subtopics = useMemo(() => {
    if (selectedUnit === "all" || selectedTopic === "all") return [];
    const topicNotes = notes.filter(n => n.unit === selectedUnit && n.topic === selectedTopic);
    return Array.from(new Set(topicNotes.map(n => n.subtopic)));
  }, [notes, selectedUnit, selectedTopic]);

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      const matchesSearch = searchTerm === "" || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subtopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.overview.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesUnit = selectedUnit === "all" || note.unit === selectedUnit;
      const matchesTopic = selectedTopic === "all" || note.topic === selectedTopic;
      const matchesSubtopic = selectedSubtopic === "all" || note.subtopic === selectedSubtopic;
      
      return matchesSearch && matchesUnit && matchesTopic && matchesSubtopic;
    });
  }, [notes, searchTerm, selectedUnit, selectedTopic, selectedSubtopic]);

  const stats = useMemo(() => {
    const totalSubtopics = new Set(notes.map(n => `${n.unit}-${n.topic}-${n.subtopic}`)).size;
    const avgContentItems = notes.reduce((acc, note) => 
      acc + note.content.keyDefinitions.length + note.content.formulas.length + 
      note.content.workedExamples.length + note.content.practiceExercises.length, 0) / notes.length;
    
    return {
      totalNotes: notes.length,
      totalSubtopics,
      avgContentItems: Math.round(avgContentItems)
    };
  }, [notes]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedUnit("all");
    setSelectedTopic("all");
    setSelectedSubtopic("all");
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to={`/admin/subjects/${subjectId}/edit`}>
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Subject Editor
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
                Study Notes Management - Mathematical Methods
              </h1>
              <p className="text-gray-600 mt-2">
                Comprehensive collection of AI-generated study notes for all subtopics
              </p>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={() => {
                  const data = JSON.stringify(filteredNotes, null, 2);
                  const blob = new Blob([data], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `study-notes-mathematical-methods.json`;
                  a.click();
                }}
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Notes
              </Button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-900">{stats.totalNotes}</div>
              <div className="text-sm text-purple-700">Total Study Notes</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">{stats.totalSubtopics}</div>
              <div className="text-sm text-blue-700">Subtopics Covered</div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900">{stats.avgContentItems}</div>
              <div className="text-sm text-green-700">Avg Content Items</div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-900">Latest</div>
              <div className="text-sm text-orange-700">Generated Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters & Search
            </CardTitle>
            <CardDescription>Filter study notes by criteria to find what you need</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <select
                value={selectedUnit}
                onChange={(e) => {
                  setSelectedUnit(e.target.value);
                  setSelectedTopic("all");
                  setSelectedSubtopic("all");
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Units</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit.name}>
                    {unit.name}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setSelectedSubtopic("all");
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={selectedUnit === "all"}
              >
                <option value="all">All Topics</option>
                {topics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedSubtopic}
                onChange={(e) => setSelectedSubtopic(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={selectedTopic === "all"}
              >
                <option value="all">All Subtopics</option>
                {subtopics.map((subtopic, index) => (
                  <option key={index} value={subtopic}>
                    {subtopic}
                  </option>
                ))}
              </select>
              
              <Button onClick={resetFilters} variant="outline" className="h-10">
                Reset Filters
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
              <span>Showing {filteredNotes.length} of {notes.length} study notes</span>
            </div>
          </CardContent>
        </Card>

        {/* Notes Table */}
        <div className="space-y-4">
          {filteredNotes.map((note, index) => (
            <Card key={note.id} className="border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        {note.unit}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {note.topic}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        {note.subtopic}
                      </Badge>
                      <span className="text-xs text-gray-500">#{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {note.content.overview}
                    </p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      onClick={() => setSelectedNote(note)}
                      variant="outline"
                      size="sm"
                      className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Content Preview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-xs">
                  <div className="bg-blue-50 p-3 rounded border">
                    <div className="font-medium text-blue-800 mb-1">Definitions</div>
                    <div className="text-blue-600">{note.content.keyDefinitions.length} items</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded border">
                    <div className="font-medium text-green-800 mb-1">Formulas</div>
                    <div className="text-green-600">{note.content.formulas.length} items</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded border">
                    <div className="font-medium text-yellow-800 mb-1">Examples</div>
                    <div className="text-yellow-600">{note.content.workedExamples.length} items</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded border">
                    <div className="font-medium text-purple-800 mb-1">Exercises</div>
                    <div className="text-purple-600">{note.content.practiceExercises.length} items</div>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
                  <span>ID: {note.id}</span>
                  <span>Generated: {note.dateGenerated}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredNotes.length === 0 && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No study notes found</h3>
                <p className="text-gray-600 mb-4">
                  {notes.length === 0 
                    ? "No study notes have been generated yet."
                    : "Try adjusting your search filters to find notes."
                  }
                </p>
                {notes.length > 0 && (
                  <Button onClick={resetFilters} variant="outline">
                    Reset All Filters
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{selectedNote.title}</h2>
                <Button onClick={() => setSelectedNote(null)} variant="outline">
                  Close
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {selectedNote.unit}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {selectedNote.topic}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {selectedNote.subtopic}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Overview</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded border">{selectedNote.content.overview}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Definitions</h3>
                <div className="space-y-2">
                  {selectedNote.content.keyDefinitions.map((def, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded border border-blue-200">
                      <p className="text-blue-900 text-sm">{def}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Formulas</h3>
                <div className="space-y-2">
                  {selectedNote.content.formulas.map((formula, index) => (
                    <div key={index} className="bg-green-50 p-3 rounded border border-green-200">
                      <p className="text-green-900 text-sm font-mono">{formula}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Worked Examples</h3>
                <div className="space-y-4">
                  {selectedNote.content.workedExamples.map((example, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded border border-yellow-200">
                      <h4 className="font-medium text-yellow-900 mb-2">{example.title}</h4>
                      <p className="text-yellow-800 mb-3 text-sm">{example.problem}</p>
                      <div className="space-y-1">
                        {example.solution.map((step, stepIndex) => (
                          <p key={stepIndex} className="text-yellow-700 text-sm">{step}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Practice Exercises</h3>
                <div className="space-y-3">
                  {selectedNote.content.practiceExercises.map((exercise, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded border border-purple-200">
                      <p className="text-purple-900 font-medium mb-2 text-sm">{exercise.question}</p>
                      <p className="text-purple-700 text-sm">{exercise.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Visual Aids</h3>
                <div className="space-y-2">
                  {selectedNote.content.visualAids.map((aid, index) => (
                    <div key={index} className="bg-indigo-50 p-3 rounded border border-indigo-200">
                      <p className="text-indigo-900 text-sm">{aid}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
