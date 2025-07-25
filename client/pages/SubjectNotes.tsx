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
  Calculator,
  Lightbulb
} from "lucide-react";

// Notes curriculum mapping
interface NotesCurriculumInfo {
  unit: string;
  topic: string;
  subtopic?: string;
}

// Subject-level curriculum mapping for "Currently studying" section
const subjectNotesCurriculumMapping: Record<string, NotesCurriculumInfo> = {
  "mathematical-methods": {
    unit: "Unit 2: Calculus",
    topic: "Differential Calculus",
    subtopic: "Derivatives and Limits"
  },
  "physics": {
    unit: "Unit 1: Motion and Forces",
    topic: "Mechanics",
    subtopic: "Forces and Motion"
  },
  "biology": {
    unit: "Unit 3: Genetics and Evolution",
    topic: "Genetics and Heredity",
    subtopic: "DNA and Inheritance"
  },
  "english": {
    unit: "Unit 1: Language and Literature",
    topic: "Literary Analysis",
    subtopic: "Literary Devices"
  },
  "chemistry": {
    unit: "Unit 2: Chemical Bonding",
    topic: "Atomic Structure",
    subtopic: "Electron Configuration"
  }
};

// Helper functions to generate IDs for curriculum sections
const getUnitNumber = (unitName: string): string => {
  const match = unitName.match(/Unit (\d+)/);
  return match ? match[1] : '1';
};

const getTopicId = (topicName: string): string => {
  // Convert topic name to a slug-like ID
  return topicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

const getSubtopicId = (subtopicName: string): string => {
  // Convert subtopic name to a slug-like ID
  return subtopicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

const notesCurriculumMapping: Record<string, NotesCurriculumInfo> = {
  "mathematical-methods": {
    unit: "Unit 1: Algebra and Functions",
    topic: "Functions and Relations",
    subtopic: "Domain and Range"
  },
  "biology": {
    unit: "Unit 3: Genetics and Evolution",
    topic: "Molecular Biology",
    subtopic: "DNA and RNA Structure"
  },
  "physics": {
    unit: "Unit 1: Motion and Forces",
    topic: "Mechanics",
    subtopic: "Forces and Energy"
  },
  "chemistry": {
    unit: "Unit 2: Chemical Bonding",
    topic: "Atomic Structure",
    subtopic: "Electron Configuration"
  }
};

// Helper functions to generate IDs for curriculum sections
const getUnitNumber = (unitName: string): string => {
  const match = unitName.match(/Unit (\d+)/);
  return match ? match[1] : '1';
};

const getTopicId = (topicName: string): string => {
  return topicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

const getSubtopicId = (subtopicName: string): string => {
  return subtopicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
};

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

// English study notes for Queensland curriculum
const englishNotes: StudyNote[] = [
  {
    id: "eng-essay-writing",
    title: "Essay Writing: Structure and Techniques",
    description: "Complete guide to writing effective essays including structure, thesis statements, and persuasive techniques",
    content: `# Essay Writing: Structure and Techniques

## The Five-Paragraph Essay Structure

### Introduction Paragraph
- **Hook**: Grab the reader's attention (quote, question, statistic, anecdote)
- **Background**: Provide context for your topic
- **Thesis Statement**: Your main argument or claim (usually the last sentence)

### Body Paragraphs (3 paragraphs)
Each body paragraph should follow the **PEEL** structure:
- **P**oint: Topic sentence stating your main idea
- **E**vidence: Support your point with quotes, examples, statistics
- **E**xplain: Analyze how your evidence supports your point
- **L**ink: Connect back to your thesis

### Conclusion Paragraph
- **Restate thesis**: Rephrase your main argument
- **Summarize key points**: Briefly review your main arguments
- **Broader significance**: Why does your argument matter?

## Thesis Statement Guidelines

### What makes a strong thesis?
1. **Specific**: Clear and focused, not vague
2. **Arguable**: Takes a position that can be debated
3. **Supportable**: Can be backed up with evidence
4. **Significant**: Addresses an important issue

### Examples:
**Weak**: "Bullying is bad."
**Strong**: "Schools should implement comprehensive anti-bullying programs because they reduce incidents by 40%, improve academic performance, and create safer learning environments."

## Persuasive Writing Techniques

### Ethos (Credibility)
- Use credible sources and expert opinions
- Demonstrate your knowledge of the topic
- Present yourself as trustworthy and fair

### Pathos (Emotional Appeal)
- Use vivid language and imagery
- Include personal anecdotes or case studies
- Appeal to values your audience shares

### Logos (Logical Appeal)
- Present clear, logical arguments
- Use statistics and factual evidence
- Address counterarguments fairly

## Transition Words and Phrases

### For adding information:
- Furthermore, Moreover, Additionally, In addition

### For contrasting:
- However, Nevertheless, On the other hand, Conversely

### For showing cause and effect:
- Therefore, Consequently, As a result, Thus

### For concluding:
- In conclusion, Finally, To summarize, Ultimately

## Common Essay Types

### Persuasive Essay
- Goal: Convince the reader to accept your viewpoint
- Focus on strong arguments and evidence
- Address counterarguments

### Analytical Essay
- Goal: Break down and examine a text or topic
- Focus on "how" and "why" questions
- Use textual evidence and analysis

### Compare and Contrast Essay
- Goal: Examine similarities and differences
- Use point-by-point or block structure
- Draw meaningful conclusions

## Revision Checklist
- [ ] Does your thesis clearly state your main argument?
- [ ] Does each paragraph have a clear topic sentence?
- [ ] Have you included sufficient evidence?
- [ ] Are your ideas logically organized?
- [ ] Have you addressed counterarguments?
- [ ] Is your conclusion effective?

## Common Mistakes to Avoid
1. **Weak thesis statements**
2. **Lack of evidence** to support claims
3. **Poor paragraph structure**
4. **Ignoring counterarguments**
5. **Weak conclusions** that just repeat the introduction`,
    category: "Writing",
    difficulty: "Medium",
    readTime: 20,
    lastUpdated: "2024-01-16",
    tags: ["essay writing", "structure", "thesis", "persuasion", "academic writing"],
    type: "concept"
  },
  {
    id: "eng-literary-analysis",
    title: "Literary Analysis: Techniques and Approaches",
    description: "Guide to analyzing literature including character, theme, symbolism, and literary devices",
    content: `# Literary Analysis: Techniques and Approaches

## What is Literary Analysis?

Literary analysis involves examining and interpreting a text to understand its deeper meanings, techniques, and effects. It goes beyond plot summary to explore **how** and **why** authors create meaning.

## Key Elements to Analyze

### Character Analysis
**Types of Characters:**
- **Protagonist**: Main character
- **Antagonist**: Character in conflict with protagonist
- **Static**: Unchanged throughout the story
- **Dynamic**: Undergoes significant change
- **Round**: Complex, multi-dimensional
- **Flat**: Simple, one-dimensional

**Characterization Methods:**
- **Direct**: Author explicitly tells us about the character
- **Indirect**: Revealed through actions, dialogue, thoughts, appearance, others' reactions

### Theme Analysis
**What is theme?**
Theme is the central message, lesson, or insight about life that the author conveys.

**How to identify themes:**
- Look for recurring ideas or concepts
- Consider the main conflict and its resolution
- Examine character growth and change
- Notice symbols and their meanings

**Common themes:**
- Coming of age
- Good vs. evil
- Love and sacrifice
- Power and corruption
- Individual vs. society

### Setting Analysis
**Elements of setting:**
- **Time**: Historical period, season, time of day
- **Place**: Geographic location, social environment
- **Atmosphere**: Mood created by the setting

**How setting affects the story:**
- Influences character behavior
- Creates mood and atmosphere
- Reflects or contrasts with themes
- Can be symbolic

## Literary Devices and Their Effects

### Figurative Language
**Metaphor**: Direct comparison without "like" or "as"
- Effect: Creates vivid imagery, emphasizes similarities

**Simile**: Comparison using "like" or "as"
- Effect: Helps readers visualize, creates connections

**Personification**: Giving human qualities to non-human things
- Effect: Makes abstract concepts relatable, creates emotional connection

**Symbolism**: Objects representing larger ideas
- Effect: Adds deeper meaning, creates layers of interpretation

### Sound Devices
**Alliteration**: Repetition of initial consonant sounds
- Effect: Creates rhythm, emphasizes words

**Assonance**: Repetition of vowel sounds
- Effect: Creates musical quality, mood

**Onomatopoeia**: Words that imitate sounds
- Effect: Creates sensory experience, adds realism

### Irony
**Verbal**: Saying opposite of what you mean
**Situational**: Opposite of what's expected happens
**Dramatic**: Audience knows more than characters
- Effect: Creates humor, emphasizes themes, builds tension

## Writing a Literary Analysis Essay

### Structure:
1. **Introduction**: Hook, context, thesis
2. **Body Paragraphs**: Topic sentence, evidence, analysis, conclusion
3. **Conclusion**: Restate thesis, broader significance

### Using Textual Evidence:
- Always support claims with quotes from the text
- Explain how evidence supports your argument
- Use proper citation format

### Sample Thesis Statements:
**Weak**: "The author uses symbolism in the story."
**Strong**: "Through the recurring symbol of the caged bird, Maya Angelou illustrates the struggle for freedom and the power of the human spirit to overcome oppression."

## Analysis vs. Summary

### Summary (What happens):
"Romeo and Juliet meet at a party and fall in love."

### Analysis (How and why):
"Shakespeare uses the balcony scene to emphasize the theme of love transcending social barriers, as Romeo and Juliet's elevated language and celestial imagery suggest their love lifts them above earthly concerns."

## Tips for Effective Analysis
1. **Ask "How?" and "Why?" questions**
2. **Look for patterns** in language, imagery, structure
3. **Consider author's choices** - why this word, image, or structure?
4. **Connect to themes** - how do literary devices support the message?
5. **Use present tense** when discussing literature
6. **Avoid plot summary** - assume your reader knows the story

## Practice Questions
When analyzing literature, consider:
- How does the author develop characters?
- What literary devices create mood or atmosphere?
- How does setting influence the story?
- What symbols appear and what do they represent?
- How does the author's style contribute to meaning?`,
    category: "Literary Analysis",
    difficulty: "Hard",
    readTime: 25,
    lastUpdated: "2024-01-15",
    tags: ["literary analysis", "character", "theme", "symbolism", "literary devices"],
    type: "concept"
  },
  {
    id: "eng-poetry-analysis",
    title: "Poetry Analysis: Form, Structure, and Meaning",
    description: "Understanding poetic devices, forms, and techniques for analyzing poetry effectively",
    content: `# Poetry Analysis: Form, Structure, and Meaning

## Elements of Poetry

### Form and Structure
**Stanza**: Groups of lines, like paragraphs in prose
- **Couplet**: 2 lines
- **Tercet**: 3 lines
- **Quatrain**: 4 lines

**Meter**: Pattern of stressed and unstressed syllables
- **Iambic**: Unstressed-stressed (da-DUM)
- **Trochaic**: Stressed-unstressed (DUM-da)
- **Pentameter**: 5 metrical feet per line

**Rhyme Scheme**: Pattern of rhyming words
- **ABAB**: Alternating rhyme
- **AABB**: Couplet rhyme
- **ABCB**: Ballad rhyme

### Sound Devices
**Rhyme**: Words with similar ending sounds
- **Perfect rhyme**: Exact sound match (cat/bat)
- **Slant rhyme**: Near rhyme (love/remove)
- **Internal rhyme**: Rhyme within a line

**Rhythm**: Beat or pattern of stressed syllables
**Alliteration**: Repetition of initial consonant sounds
**Assonance**: Repetition of vowel sounds
**Consonance**: Repetition of consonant sounds

### Figurative Language in Poetry
**Imagery**: Vivid sensory language
- Visual, auditory, tactile, olfactory, gustatory

**Metaphor and Simile**: Comparisons that create new understanding
**Symbolism**: Objects representing abstract ideas
**Personification**: Human qualities given to non-human things

## Poetic Forms

### Sonnet
- **14 lines** of iambic pentameter
- **Shakespearean**: ABAB CDCD EFEF GG
- **Petrarchan**: ABBAABBA CDECDE (or CDCDCD)

### Haiku
- **3 lines**: 5-7-5 syllables
- Focuses on nature and seasons
- Creates a moment of insight

### Ballad
- Tells a story in song-like form
- Usually ABCB rhyme scheme
- Often about love, tragedy, or adventure

### Free Verse
- No regular rhyme scheme or meter
- Relies on natural speech patterns
- Focuses on imagery and meaning

## Analyzing Poetry: The TPCASTT Method

### **T**itle
- What does the title suggest about the poem?
- How does it relate to the content?

### **P**araphrase
- What is the poem saying in your own words?
- Don't analyze yet, just understand literally

### **C**onnotation
- What deeper meanings do words carry?
- What literary devices are used?

### **A**ttitude/Tone
- What is the speaker's attitude?
- What mood does the poem create?

### **S**hifts
- Where does the poem change direction?
- Look for transition words, punctuation, stanza breaks

### **T**itle (revisited)
- How has your understanding changed?
- What new meaning does the title have?

### **T**heme
- What is the poem's central message?
- What insight about life does it offer?

## Common Poetic Themes
- **Love and loss**
- **Nature and seasons**
- **Time and mortality**
- **Identity and self-discovery**
- **Social justice and inequality**
- **Beauty and art**

## Speaker vs. Poet
**Important distinction:**
- **Speaker**: The voice in the poem (may be a character)
- **Poet**: The actual author

Never assume the speaker IS the poet unless you have evidence.

## Analyzing Tone and Mood
**Tone**: Poet's attitude (serious, playful, angry, nostalgic)
**Mood**: Feeling created in the reader (melancholy, joyful, tense)

**Tone words:**
- Admiring, bitter, contemplative, defiant
- Ironic, nostalgic, optimistic, reverent
- Satirical, solemn, whimsical

## Writing About Poetry

### Key Guidelines:
1. **Use present tense** when discussing the poem
2. **Quote accurately** and use line numbers
3. **Analyze, don't just identify** devices
4. **Connect devices to meaning**
5. **Consider the poem as a whole**

### Sample Analysis:
**Instead of**: "The poet uses alliteration in line 3."
**Write**: "The alliteration in 'wild and windy' (line 3) creates a sense of nature's untamed power, reinforcing the poem's theme of humanity's smallness against natural forces."

## Practice Approach
When analyzing a poem:
1. **Read multiple times** - for understanding, then for devices
2. **Mark up the text** - highlight imagery, devices, patterns
3. **Consider structure** - how does form relate to content?
4. **Look for patterns** - repeated words, images, sounds
5. **Ask questions** - Why this word choice? What's the effect?

Remember: Poetry is meant to be **felt** as well as understood. Trust your emotional response while also analyzing technique.`,
    category: "Poetry",
    difficulty: "Hard",
    readTime: 22,
    lastUpdated: "2024-01-14",
    tags: ["poetry", "analysis", "form", "structure", "TPCASTT", "literary devices"],
    type: "concept"
  }
];

// Physics study notes
const physicsNotes: StudyNote[] = [
  {
    id: "phys-motion",
    title: "Motion and Forces: Newton's Laws",
    description: "Comprehensive guide to understanding motion, forces, and Newton's three laws of motion",
    content: `# Motion and Forces: Newton's Laws

## Introduction to Motion

**Motion** is the change in position of an object over time. To describe motion, we need to understand several key concepts:

### Key Terms
- **Displacement**: Change in position (vector quantity)
- **Velocity**: Rate of change of displacement (vector)
- **Acceleration**: Rate of change of velocity (vector)
- **Speed**: Magnitude of velocity (scalar)

### Equations of Motion
For constant acceleration:
- **v = u + at** (final velocity)
- **s = ut + ½at²** (displacement)
- **v² = u² + 2as** (without time)

Where: u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement

## Newton's Laws of Motion

### First Law (Law of Inertia)
**Statement**: An object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced external force.

**Key Points:**
- **Inertia**: Tendency of objects to resist changes in motion
- Mass is a measure of inertia
- Net force = 0 → constant velocity (including zero)

**Examples:**
- Passengers thrown forward when a car brakes suddenly
- Objects sliding across ice continue moving due to low friction

### Second Law (F = ma)
**Statement**: The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.

**Mathematical Form**: **F_net = ma**
- F_net = net force (Newtons)
- m = mass (kilograms)
- a = acceleration (m/s²)

**Key Points:**
- Force and acceleration are vectors (same direction)
- Larger force → larger acceleration
- Larger mass → smaller acceleration (for same force)

**Problem-Solving Steps:**
1. Identify all forces acting on the object
2. Calculate net force (vector sum)
3. Apply F = ma to find acceleration
4. Use kinematic equations if needed

### Third Law (Action-Reaction)
**Statement**: For every action force, there is an equal and opposite reaction force.

**Key Points:**
- Forces always occur in pairs
- Action and reaction forces act on **different objects**
- Forces are equal in magnitude, opposite in direction
- Forces occur simultaneously

**Examples:**
- Walking: You push back on ground, ground pushes forward on you
- Rocket propulsion: Rocket pushes gas down, gas pushes rocket up
- Swimming: You push water back, water pushes you forward

## Types of Forces

### Contact Forces
**Normal Force (N)**: Perpendicular force from a surface
**Friction (f)**: Parallel force opposing motion
- Static friction: Prevents motion from starting
- Kinetic friction: Opposes motion in progress
- f = μN (μ = coefficient of friction)

**Applied Force**: Force applied by external agent
**Tension**: Force in ropes, strings, cables

### Non-Contact Forces
**Gravitational Force**: F = mg (near Earth's surface)
- g = 9.8 m/s² (acceleration due to gravity)
- Always points toward Earth's center

**Electromagnetic Forces**: Forces between charged objects

## Free Body Diagrams

**Purpose**: Visual representation of all forces acting on an object

**Steps to Draw:**
1. Draw object as a dot or simple shape
2. Draw arrows representing all forces
3. Label each force with its name and magnitude
4. Choose coordinate system
5. Resolve forces into components if needed

**Common Mistakes:**
- Including forces the object exerts on other things
- Forgetting to include all forces (especially normal and friction)
- Drawing forces on wrong object

## Applications and Problem Solving

### Equilibrium Problems
When net force = 0:
- Object at rest OR moving at constant velocity
- ΣF_x = 0 and ΣF_y = 0

### Acceleration Problems
When net force ≠ 0:
- Calculate net force in each direction
- Use F = ma to find acceleration
- Apply kinematic equations for motion

### Example Problem:
A 10 kg box slides down a 30° incline with μ_k = 0.2. Find acceleration.

**Solution:**
1. Draw free body diagram
2. Identify forces: mg, N, f_k
3. Resolve weight: mg_parallel = mg sin(30°), mg_perpendicular = mg cos(30°)
4. Find normal force: N = mg cos(30°)
5. Find friction: f_k = μ_k N = μ_k mg cos(30°)
6. Net force down incline: F_net = mg sin(30°) - f_k
7. Apply F = ma: a = g(sin(30°) - μ_k cos(30°))

## Real-World Applications
- **Vehicle safety**: Seat belts, airbags (First Law)
- **Sports**: Running, jumping, throwing (all three laws)
- **Engineering**: Building design, machine operation
- **Space exploration**: Rocket propulsion (Third Law)

Understanding Newton's laws is fundamental to all of mechanics and forms the basis for more advanced topics in physics!`,
    category: "Mechanics",
    difficulty: "Medium",
    readTime: 18,
    lastUpdated: "2024-01-16",
    tags: ["Newton's laws", "motion", "forces", "mechanics", "physics"],
    type: "concept"
  }
];

const subjectNotes: Record<string, StudyNote[]> = {
  mathematics: mathematicsNotes,
  "mathematical-methods": mathematicsNotes,
  "specialist-mathematics": mathematicsNotes,
  biology: biologyNotes,
  physics: physicsNotes,
  english: englishNotes,
  chemistry: [],
  engineering: [],
  economics: []
};

export default function SubjectNotes() {
  const { slug, subtopicId } = useParams();
  const [selectedNote, setSelectedNote] = useState<StudyNote | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle subtopic-specific notes
  const subtopicNotes: Record<string, StudyNote[]> = {
    "1-0": [ // Domain and Range
      {
        id: "dom-note-1",
        title: "Domain and Range Guide",
        description: "Complete guide to understanding function domains and ranges",
        content: "## Domain and Range\n\n**Domain**: The set of all possible input values (x-values) for a function.\n\n**Range**: The set of all possible output values (y-values) from a function.\n\n### Finding Domain\n1. Look for restrictions (division by zero, square roots of negatives)\n2. Consider the context of the problem\n\n### Finding Range\n1. Analyze the function's behavior\n2. Consider transformations applied",
        category: "Functions",
        difficulty: "Medium",
        readTime: 5,
        lastUpdated: "2024-01-15",
        tags: ["domain", "range", "functions"],
        type: "concept"
      }
    ],
    "1-1": [ // Function Types
      {
        id: "func-note-1",
        title: "Types of Functions",
        description: "Overview of different function types and their properties",
        content: "## Function Types\n\n### Linear Functions\n- Form: f(x) = mx + b\n- Graph: Straight line\n- Properties: Constant rate of change\n\n### Quadratic Functions\n- Form: f(x) = ax² + bx + c\n- Graph: Parabola\n- Properties: Has vertex, axis of symmetry",
        category: "Functions",
        difficulty: "Easy",
        readTime: 7,
        lastUpdated: "2024-01-15",
        tags: ["linear", "quadratic", "functions"],
        type: "concept"
      }
    ]
  };

  const notes = subtopicId
    ? (subtopicNotes[subtopicId] || [])
    : (subjectNotes[slug as string] || []);
  const hasNotes = notes.length > 0;

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
      case "formula": return <Calculator className="w-4 h-4" />;
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
                Back
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
