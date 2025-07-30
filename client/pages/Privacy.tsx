import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  FileText, 
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Globe,
  Database,
  Settings
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "January 15, 2024";
  
  const quickLinks = [
    { title: "Information We Collect", anchor: "#information-collection" },
    { title: "How We Use Your Data", anchor: "#data-usage" },
    { title: "Data Sharing", anchor: "#data-sharing" },
    { title: "Your Rights", anchor: "#your-rights" },
    { title: "Data Security", anchor: "#data-security" },
    { title: "Contact Us", anchor: "#contact" }
  ];

  const dataTypes = [
    {
      icon: Users,
      title: "Account Information",
      description: "Name, email address, grade level, and account preferences"
    },
    {
      icon: FileText,
      title: "Study Activity",
      description: "Progress data, quiz results, study time, and learning preferences"
    },
    {
      icon: Globe,
      title: "Technical Data",
      description: "IP address, browser type, device information, and usage analytics"
    },
    {
      icon: Settings,
      title: "Preferences",
      description: "Notification settings, study reminders, and customization choices"
    }
  ];

  const securityMeasures = [
    {
      icon: Lock,
      title: "Encryption",
      description: "All data is encrypted in transit and at rest using industry-standard protocols"
    },
    {
      icon: Shield,
      title: "Access Controls",
      description: "Strict access controls and regular security audits protect your information"
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Data stored in secure, Australian-based servers with regular backups"
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "Privacy protection built into every feature from the ground up"
    }
  ];

  const userRights = [
    "Access your personal data",
    "Correct inaccurate information",
    "Delete your account and data",
    "Export your data",
    "Opt out of marketing communications",
    "Withdraw consent for data processing"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600 mb-4">
          Your privacy is important to us. This policy explains how we collect, use, and protect your information.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <Card className="mb-8 border-sky-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-sky-blue-600" />
            Quick Navigation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickLinks.map((link, index) => (
              <a
                key={index}
                href={link.anchor}
                className="flex items-center text-sky-blue-600 hover:text-sky-blue-700 transition-colors"
              >
                <CheckCircle className="w-3 h-3 mr-2" />
                {link.title}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            StudyPal QLD ("we," "our," or "us") is committed to protecting your privacy and ensuring you have a positive experience 
            on our platform. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you 
            use our educational platform and services.
          </p>
          <p className="text-gray-600 mb-4">
            We operate under Australian Privacy Principles (APPs) and comply with the Privacy Act 1988 (Cth) and other applicable 
            privacy laws. As an educational platform serving Queensland students, we take extra care to protect student privacy 
            and maintain transparency about our data practices.
          </p>
        </div>
      </section>

      {/* Information Collection */}
      <section id="information-collection" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {dataTypes.map((type, index) => (
            <Card key={index} className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <type.icon className="w-5 h-5 mr-3 text-sky-blue-600" />
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-blue-600" />
            Information We Don't Collect
          </h3>
          <ul className="text-gray-600 space-y-1">
            <li>• We never collect sensitive personal information like medical records or financial data</li>
            <li>• We don't track you across other websites</li>
            <li>• We don't sell your personal information to third parties</li>
            <li>• We don't collect information from children under 13 without parental consent</li>
          </ul>
        </div>
      </section>

      {/* Data Usage */}
      <section id="data-usage" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Data</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Uses</h3>
            <ul className="space-y-3">
              {[
                "Provide and improve our educational services",
                "Track your learning progress and achievements",
                "Personalize your study experience",
                "Send important account and service updates",
                "Provide customer support when needed",
                "Ensure platform security and prevent fraud"
              ].map((use, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{use}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Uses</h3>
            <ul className="space-y-3">
              {[
                "Send study tips and educational content (with consent)",
                "Notify you about new features and updates",
                "Conduct educational research (anonymized data only)",
                "Improve our algorithms and recommendations"
              ].map((use, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-sky-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{use}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mt-4">
              You can opt out of optional communications at any time through your account settings.
            </p>
          </div>
        </div>
      </section>

      {/* Data Sharing */}
      <section id="data-sharing" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sharing and Disclosure</h2>
        
        <div className="space-y-6">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                We Never Sell Your Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                We never sell, rent, or trade your personal information to third parties for marketing or any other purposes.
              </p>
            </CardContent>
          </Card>

          <div className="prose prose-gray max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Limited Sharing Scenarios</h3>
            <p className="text-gray-600 mb-4">We may share your information only in these specific circumstances:</p>
            
            <ul className="space-y-3 text-gray-600">
              <li><strong>Service Providers:</strong> Trusted third-party services that help us operate our platform (e.g., hosting, analytics, email delivery) - all bound by strict confidentiality agreements</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Safety & Security:</strong> To protect the safety of our users or investigate potential fraud or security threats</li>
              <li><strong>Business Transfers:</strong> In the event of a merger or acquisition (with the same privacy protections)</li>
              <li><strong>With Consent:</strong> Any other sharing only with your explicit consent</li>
            </ul>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section id="your-rights" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Rights Include:</h3>
            <ul className="space-y-3">
              {userRights.map((right, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-sky-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{right}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <Card className="border-sky-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-sky-blue-600" />
                How to Exercise Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p><strong>Account Settings:</strong> Access and update most information directly in your account</p>
                <p><strong>Contact Us:</strong> Email privacy@studypal.com.au for data requests</p>
                <p><strong>Response Time:</strong> We respond to requests within 30 days</p>
                <p><strong>Verification:</strong> We may need to verify your identity for security</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Security */}
      <section id="data-security" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {securityMeasures.map((measure, index) => (
            <Card key={index} className="border-sky-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <measure.icon className="w-5 h-5 mr-3 text-sky-blue-600" />
                  {measure.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{measure.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
            Your Role in Security
          </h3>
          <p className="text-gray-600 mb-3">
            While we implement strong security measures, you can help protect your account by:
          </p>
          <ul className="text-gray-600 space-y-1">
            <li>• Using a strong, unique password</li>
            <li>• Keeping your login credentials confidential</li>
            <li>• Logging out from shared devices</li>
            <li>• Reporting any suspicious activity immediately</li>
          </ul>
        </div>
      </section>

      {/* Cookies and Tracking */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            We use cookies and similar technologies to improve your experience on our platform. These include:
          </p>
          <ul className="text-gray-600 space-y-2 mb-4">
            <li><strong>Essential Cookies:</strong> Required for the platform to function (e.g., keeping you logged in)</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform to improve it</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and customizations</li>
          </ul>
          <p className="text-gray-600">
            You can manage cookie preferences in your browser settings, though some features may not work properly if you disable essential cookies.
          </p>
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            As an educational platform primarily serving students aged 16-18, we take special care to protect younger users:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Users under 13 require parental consent before creating an account</li>
            <li>• We collect only necessary information for educational purposes</li>
            <li>• Parents can request access to or deletion of their child's information</li>
            <li>• We never show behavioral advertising to users under 18</li>
          </ul>
        </div>
      </section>

      {/* Updates to Policy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. 
            When we make changes:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• We'll update the "Last Updated" date at the top of this policy</li>
            <li>• For significant changes, we'll notify you via email or platform notification</li>
            <li>• Continued use of our services constitutes acceptance of the updated policy</li>
          </ul>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-12">
        <Card className="border-sky-blue-200 bg-sky-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-sky-blue-800">
              <Mail className="w-5 h-5 mr-2" />
              Questions About Privacy?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sky-blue-700 mb-4">
              If you have questions about this Privacy Policy or how we handle your information, we're here to help.
            </p>
            <div className="space-y-2 text-sky-blue-700 mb-6">
              <p><strong>Email:</strong> privacy@studypal.com.au</p>
              <p><strong>Mail:</strong> Privacy Officer, StudyPal QLD, Level 15, 123 Queen Street, Brisbane QLD 4000</p>
              <p><strong>Response Time:</strong> We respond to privacy inquiries within 5 business days</p>
            </div>
            <Link to="/contact">
              <Button className="bg-study-primary hover:bg-study-primary/90">
                Contact Us
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-8">
        <p>
          This Privacy Policy is effective as of {lastUpdated} and applies to all users of the StudyPal QLD platform.
        </p>
      </div>
    </div>
  );
}
