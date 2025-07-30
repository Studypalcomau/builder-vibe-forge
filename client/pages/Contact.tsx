import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { 
  Mail, 
  CheckCircle,
  Send,
  Clock,
  HelpCircle
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have a question or need support? Send us a message and we'll get back to you.
        </p>
      </div>

      {/* Contact Form */}
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

      {/* Quick Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-sky-blue-200">
          <CardContent className="p-6 text-center">
            <Mail className="w-8 h-8 text-sky-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm">support@studypal.com.au</p>
          </CardContent>
        </Card>
        
        <Card className="border-sky-blue-200">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-sky-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm">Within 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Need Help Faster */}
      <div className="mt-8 bg-sky-blue-50 border border-sky-blue-200 rounded-lg p-6 text-center">
        <HelpCircle className="w-8 h-8 text-sky-blue-600 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-2">Need Help Faster?</h3>
        <p className="text-gray-600 mb-4">
          Check our Help Center for instant answers to common questions.
        </p>
        <Link to="/help">
          <Button variant="outline" className="border-sky-blue-300 text-sky-blue-700 hover:bg-sky-blue-100">
            Visit Help Center
          </Button>
        </Link>
      </div>
    </div>
  );
}
