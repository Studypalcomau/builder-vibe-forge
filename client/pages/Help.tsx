import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  Search, 
  BookOpen, 
  HelpCircle, 
  MessageCircle, 
  Video, 
  Download,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { useState } from "react";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner or on the homepage. Fill in your details, verify your email, and you're ready to start studying!"
        },
        {
          question: "Which subjects are available?",
          answer: "We offer comprehensive study materials for Mathematical Methods, Specialist Mathematics, Physics, Engineering, Economics, and English - all aligned with the Queensland curriculum."
        },
        {
          question: "Is StudyPal QLD really free?",
          answer: "Yes! Our basic plan includes access to flashcards, practice quizzes, and study notes. Premium features like advanced analytics and unlimited practice tests are available with paid plans."
        },
        {
          question: "How do I navigate the platform?",
          answer: "Use the main navigation menu to access subjects, your dashboard, flashcards, and quizzes. Each subject page contains all related study materials organized by topics."
        }
      ]
    },
    {
      title: "Study Features",
      icon: HelpCircle,
      color: "bg-green-100 text-green-600",
      faqs: [
        {
          question: "How do the flashcards work?",
          answer: "Our flashcards use spaced repetition to help you memorize key concepts. Click on a card to flip it, then rate your confidence. The system will show you cards you're struggling with more frequently."
        },
        {
          question: "Can I track my progress?",
          answer: "Yes! Your dashboard shows detailed progress analytics, including topics completed, time spent studying, quiz scores, and areas that need improvement."
        },
        {
          question: "How are the quizzes structured?",
          answer: "Quizzes include multiple choice, short answer, and problem-solving questions. They're aligned with Queensland assessment standards and provide instant feedback with detailed explanations."
        },

      ]
    },
    {
      title: "Technical Support",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-600",
      faqs: [
        {
          question: "The website isn't loading properly",
          answer: "Try refreshing your browser, clearing your cache, or using an incognito/private window. If issues persist, please contact our support team."
        },
        {
          question: "I forgot my password",
          answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a reset link within a few minutes."
        },
        {
          question: "My progress isn't saving",
          answer: "Ensure you're logged in and have a stable internet connection. Progress is automatically saved every few seconds when you're connected."
        },
        {
          question: "Can I use StudyPal on my phone?",
          answer: "Yes! Our website is fully responsive and works great on mobile devices. We recommend using the latest version of your mobile browser for the best experience."
        }
      ]
    },
    {
      title: "Account & Billing",
      icon: Info,
      color: "bg-purple-100 text-purple-600",
      faqs: [
        {
          question: "How do I upgrade my account?",
          answer: "Visit the Pricing page and select your preferred plan. You can upgrade or downgrade anytime from your account settings."
        },
        {
          question: "Can I cancel my subscription?",
          answer: "Yes, you can cancel anytime from your account settings. You'll continue to have access to premium features until the end of your billing period."
        },
        {
          question: "Do you offer student discounts?",
          answer: "Yes! We offer special pricing for verified students. Contact our support team with your student ID for discount codes."
        },
        {
          question: "How do I update my payment information?",
          answer: "Go to Account Settings > Billing to update your payment method, billing address, or download invoices."
        }
      ]
    }
  ];

  const supportOptions = [
    {
      title: "Email Support",
      description: "Get help via email within 24 hours",
      icon: Mail,
      action: "Send Email",
      link: "/contact",
      availability: "24/7"
    },
    {
      title: "Live Chat",
      description: "Chat with our support team",
      icon: MessageCircle,
      action: "Start Chat",
      link: "#",
      availability: "Mon-Fri 9AM-6PM"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: Video,
      action: "Watch Videos",
      link: "#",
      availability: "Always Available"
    },
    {
      title: "Download Guides",
      description: "PDF guides and resources",
      icon: Download,
      action: "Download",
      link: "#",
      availability: "Always Available"
    }
  ];

  const quickLinks = [
    { title: "Study Tips & Strategies", link: "#" },
    { title: "Exam Preparation Guide", link: "#" },
    { title: "Queensland Curriculum Info", link: "#" },
    { title: "System Requirements", link: "#" },
    { title: "Accessibility Features", link: "#" },
    { title: "Privacy & Security", link: "/privacy" }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Find answers to common questions and get the support you need to succeed with StudyPal QLD
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3"
          />
        </div>
      </div>

      {/* Quick Help Options */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow border-sky-blue-200">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <option.icon className="w-6 h-6 text-sky-blue-600" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Badge variant="secondary" className="mb-4 bg-gray-100 text-gray-600">
                  <Clock className="w-3 h-3 mr-1" />
                  {option.availability}
                </Badge>
                <Link to={option.link}>
                  <Button className="w-full bg-study-primary hover:bg-study-primary/90">
                    {option.action}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredFAQs.reduce((total, category) => total + category.faqs.length, 0)} results for "{searchQuery}"
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(searchQuery ? filteredFAQs : faqCategories).map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>
              
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <Card key={faqIndex} className="border-gray-200 hover:border-sky-blue-300 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-base font-medium text-gray-900 flex items-center justify-between">
                        {faq.question}
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {searchQuery && filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">
              Try searching with different keywords or browse our categories above.
            </p>
            <Link to="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        )}
      </section>

      {/* Quick Links */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <Link key={index} to={link.link}>
              <Card className="hover:shadow-md transition-shadow border-sky-blue-200 hover:border-sky-blue-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{link.title}</span>
                    <ChevronRight className="w-4 h-4 text-sky-blue-600" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 rounded-lg text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
        <p className="text-lg mb-6 opacity-90">
          Can't find what you're looking for? Our support team is here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button size="lg" className="bg-white text-sky-blue-600 hover:bg-gray-100">
              Contact Support
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            Schedule a Call
          </Button>
        </div>
      </section>
    </div>
  );
}
