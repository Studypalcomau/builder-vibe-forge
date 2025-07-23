import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  Target, 
  Users, 
  Heart, 
  Award, 
  BookOpen, 
  TrendingUp,
  Globe,
  Shield,
  Lightbulb,
  Star,
  Quote,
  ArrowRight,
  GraduationCap,
  Zap,
  CheckCircle
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Students Helped", value: "15,000+", icon: Users },
    { label: "Study Sessions", value: "500K+", icon: BookOpen },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Subjects Covered", value: "6", icon: GraduationCap }
  ];

  const values = [
    {
      icon: Target,
      title: "Student Success",
      description: "Everything we do is focused on helping Queensland students achieve their academic goals and unlock their potential."
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Quality education should be accessible to everyone. We provide free access to essential study tools and affordable premium features."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously innovate with the latest educational technology to create engaging and effective learning experiences."
    },
    {
      icon: Shield,
      title: "Trust & Privacy",
      description: "We protect student data with the highest security standards and maintain complete transparency in our practices."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Executive Officer",
      bio: "Former Queensland education researcher with 15+ years experience in curriculum development and educational technology.",
      background: "PhD Education, University of Queensland"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Software engineering leader specializing in educational platforms and learning management systems.",
      background: "MSc Computer Science, QUT"
    },
    {
      name: "Emma Thompson",
      role: "Head of Curriculum",
      bio: "Experienced Queensland secondary teacher with expertise in Mathematics and Science curriculum design.",
      background: "MEd Curriculum Studies, Griffith University"
    },
    {
      name: "Dr. James Wilson",
      role: "Learning Experience Director",
      bio: "Educational psychologist focused on student engagement and effective learning methodologies.",
      background: "PhD Educational Psychology, UQ"
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Founded",
      description: "StudyMate QLD was founded by Queensland educators to address the gap in curriculum-specific study resources."
    },
    {
      year: "2022",
      title: "Beta Launch",
      description: "Launched beta version with Mathematics and English subjects, serving 500 initial students."
    },
    {
      year: "2023",
      title: "Full Platform",
      description: "Expanded to all major QLD subjects and launched comprehensive study tools including quizzes and progress tracking."
    },
    {
      year: "2024",
      title: "15K+ Students",
      description: "Reached 15,000+ active students across Queensland with 94% reporting improved academic performance."
    }
  ];

  const testimonials = [
    {
      quote: "StudyMate QLD completely transformed how I approach studying. The practice quizzes helped me identify my weak areas and the flashcards made memorization so much easier.",
      author: "Jessica M.",
      grade: "Year 12 Student",
      subject: "Mathematical Methods"
    },
    {
      quote: "As a teacher, I recommend StudyMate QLD to all my students. The content is perfectly aligned with our curriculum and helps students practice at their own pace.",
      author: "Mr. David Thompson",
      role: "Mathematics Teacher",
      school: "Brisbane State High School"
    },
    {
      quote: "The study planner feature helped me organize my revision schedule for all subjects. I improved my Physics grade from C to A in just one term!",
      author: "Alex K.",
      grade: "Year 11 Student",
      subject: "Physics & Engineering"
    }
  ];

  const features = [
    "Queensland curriculum aligned content",
    "Interactive flashcards with spaced repetition",
    "Comprehensive practice quizzes",
    "Personalized study planning",
    "Detailed progress analytics",
    "Mobile-responsive design"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About StudyMate QLD
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          We're on a mission to help every Queensland Year 11-12 student achieve their academic goals 
          through innovative, curriculum-aligned study tools and personalized learning experiences.
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="secondary" className="bg-sky-blue-100 text-sky-blue-700 px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            15,000+ Students
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700 px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            94% Success Rate
          </Badge>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-sky-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Story */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              StudyMate QLD was born from a simple observation: Queensland students needed study resources 
              that were specifically designed for their curriculum, not generic materials that didn't quite fit.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Founded by Queensland educators who understood the unique challenges students face, 
              we've built a platform that combines proven learning methodologies with modern technology 
              to create an engaging and effective study experience.
            </p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-sky-blue-50 to-sky-blue-100 rounded-lg p-8">
            <div className="text-center">
              <Zap className="w-16 h-16 text-sky-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Empowering Student Success</h3>
              <p className="text-gray-600 mb-6">
                We believe every student has the potential to excel when given the right tools and support. 
                Our platform adapts to individual learning styles and provides personalized guidance.
              </p>
              <Link to="/signup">
                <Button className="bg-study-primary hover:bg-study-primary/90">
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These core values guide everything we do and shape how we serve the Queensland student community.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center border-sky-blue-200 hover:border-sky-blue-300 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-sky-blue-600" />
                </div>
                <CardTitle className="text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a small idea to serving thousands of Queensland students across the state.
          </p>
        </div>
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-sky-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-sky-blue-600">{milestone.year}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team combines deep educational expertise with technological innovation to serve Queensland students.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="border-sky-blue-200">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-sky-blue-600" />
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription className="text-sky-blue-600 font-medium">{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                  {member.background}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students and teachers who use StudyMate QLD every day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-sky-blue-200">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-sky-blue-600 mb-4" />
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">
                    {testimonial.grade || testimonial.role}
                    {testimonial.subject && ` • ${testimonial.subject}`}
                    {testimonial.school && ` • ${testimonial.school}`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 rounded-lg text-white p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join the StudyMate QLD Community</h2>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Ready to transform your study experience? Join thousands of Queensland students 
          who are already achieving their academic goals with StudyMate QLD.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button size="lg" className="bg-white text-sky-blue-600 hover:bg-gray-100 px-8">
              Get Started Free
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
