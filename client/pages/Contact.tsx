import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  HelpCircle,
  Bug,
  Lightbulb,
  CheckCircle,
  Send
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      details: "support@studymateqld.com",
      availability: "24/7 - Response within 24 hours",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      details: "Available on website",
      availability: "Mon-Fri 9AM-6PM AEST",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with support",
      details: "1800 STUDY QLD",
      availability: "Mon-Fri 9AM-5PM AEST",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const inquiryTypes = [
    {
      icon: HelpCircle,
      title: "General Support",
      description: "Questions about using the platform"
    },
    {
      icon: Bug,
      title: "Technical Issue",
      description: "Report bugs or technical problems"
    },
    {
      icon: Lightbulb,
      title: "Feature Request",
      description: "Suggest new features or improvements"
    },
    {
      icon: Mail,
      title: "Account & Billing",
      description: "Account settings and subscription queries"
    }
  ];

  const officeInfo = {
    address: "Level 15, 123 Queen Street, Brisbane QLD 4000",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM AEST",
    timezone: "Australian Eastern Standard Time"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for contacting us. We've received your message and will get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setIsSubmitted(false)} className="bg-study-primary hover:bg-study-primary/90">
              Send Another Message
            </Button>
            <Link to="/help">
              <Button variant="outline">Visit Help Center</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question or need support? We're here to help you succeed with StudyMate QLD.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Methods */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          
          <div className="space-y-6 mb-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-sky-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${method.color}`}>
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                      <p className="font-medium text-gray-900 mb-1">{method.details}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {method.availability}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Office Information */}
          <Card className="border-sky-blue-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-sky-blue-600" />
                Our Office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">{officeInfo.address}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Office Hours</p>
                  <p className="text-gray-600">{officeInfo.hours}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Timezone</p>
                  <p className="text-gray-600">{officeInfo.timezone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-sky-blue-600 hover:text-sky-blue-700">
                → Help Center & FAQ
              </Link>
              <Link to="/about" className="block text-sky-blue-600 hover:text-sky-blue-700">
                → About StudyMate QLD
              </Link>
              <Link to="/privacy" className="block text-sky-blue-600 hover:text-sky-blue-700">
                → Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border-sky-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category">Inquiry Type *</Label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500"
                  >
                    <option value="">Select inquiry type</option>
                    <option value="general">General Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="feature">Feature Request</option>
                    <option value="billing">Account & Billing</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    * Required fields
                  </p>
                  <Button type="submit" className="bg-study-primary hover:bg-study-primary/90 px-8">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Inquiry Types */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Common Inquiries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inquiryTypes.map((type, index) => (
                <Card key={index} className="border-gray-200 hover:border-sky-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-5 h-5 text-sky-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{type.title}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Notice */}
      <div className="mt-12 bg-sky-blue-50 border border-sky-blue-200 rounded-lg p-6 text-center">
        <Clock className="w-8 h-8 text-sky-blue-600 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">Response Times</h3>
        <p className="text-gray-600">
          We typically respond to all inquiries within 24 hours during business days. 
          For urgent technical issues, please use our live chat for faster assistance.
        </p>
      </div>
    </div>
  );
}
