import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  BookOpen,
  Settings,
  Shield,
  Trash2,
  Plus,
  Edit,
  Save,
  X,
  Check,
  Eye,
  EyeOff,
  Calendar,
  Download,
  AlertTriangle
} from "lucide-react";

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: "Jessica",
    lastName: "Chen",
    email: "jessica.chen@email.com",
    phone: "+61 400 123 456",
    dateOfBirth: "2006-05-15",
    school: "Brisbane State High School",
    grade: "Year 12",
    address: "123 Main Street",
    city: "Brisbane",
    state: "Queensland",
    postcode: "4000"
  });

  // Subject preferences
  const [enrolledSubjects, setEnrolledSubjects] = useState([
    { id: "math-methods", name: "Mathematical Methods", progress: 75, status: "active" },
    { id: "specialist-math", name: "Specialist Mathematics", progress: 60, status: "active" },
    { id: "physics", name: "Physics", progress: 85, status: "active" },
    { id: "english", name: "English", progress: 70, status: "active" }
  ]);

  const availableSubjects = [
    { id: "economics", name: "Economics", description: "Microeconomics, Macroeconomics, Markets" },
    { id: "engineering", name: "Engineering", description: "Design Thinking, Systems, Problem Solving" }
  ];

  // Payment data
  const [paymentData, setPaymentData] = useState({
    plan: "Premium",
    status: "Active",
    nextBilling: "2024-02-15",
    cardNumber: "**** **** **** 4532",
    cardExpiry: "12/27",
    cardHolder: "Jessica Chen"
  });



  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    shareProgress: false,
    allowDataAnalytics: true,
    twoFactorAuth: false
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "subjects", label: "My Subjects", icon: BookOpen },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield }
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would save to backend
  };

  const addSubject = (subjectId: string) => {
    const subject = availableSubjects.find(s => s.id === subjectId);
    if (subject) {
      setEnrolledSubjects(prev => [...prev, {
        id: subject.id,
        name: subject.name,
        progress: 0,
        status: "active"
      }]);
    }
  };

  // Filter available subjects to exclude already enrolled ones
  const filteredAvailableSubjects = availableSubjects.filter(
    subject => !enrolledSubjects.some(enrolled => enrolled.id === subject.id)
  );

  const removeSubject = (subjectId: string) => {
    setEnrolledSubjects(prev => prev.filter(s => s.id !== subjectId));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handlePrivacyChange = (setting: string, value: boolean | string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
          <p className="text-gray-600">Update your personal details and contact information</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSaveProfile} className="bg-study-primary hover:bg-study-primary/90">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={profileData.firstName}
            onChange={(e) => handleProfileChange("firstName", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={profileData.lastName}
            onChange={(e) => handleProfileChange("lastName", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profileData.phone}
            onChange={(e) => handleProfileChange("phone", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={profileData.dateOfBirth}
            onChange={(e) => handleProfileChange("dateOfBirth", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="school">School</Label>
          <Input
            id="school"
            value={profileData.school}
            onChange={(e) => handleProfileChange("school", e.target.value)}
            disabled={!isEditing}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="grade">Grade Level</Label>
          <select
            id="grade"
            value={profileData.grade}
            onChange={(e) => handleProfileChange("grade", e.target.value)}
            disabled={!isEditing}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-blue-500 focus:border-sky-blue-500 disabled:bg-gray-50"
          >
            <option value="Year 11">Year 11</option>
            <option value="Year 12">Year 12</option>
          </select>
        </div>
      </div>

      <div className="border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Address</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input
              id="address"
              value={profileData.address}
              onChange={(e) => handleProfileChange("address", e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={profileData.city}
              onChange={(e) => handleProfileChange("city", e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={profileData.state}
              onChange={(e) => handleProfileChange("state", e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="postcode">Postcode</Label>
            <Input
              id="postcode"
              value={profileData.postcode}
              onChange={(e) => handleProfileChange("postcode", e.target.value)}
              disabled={!isEditing}
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubjectsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">My Subjects</h3>
        <p className="text-gray-600">Manage your enrolled subjects and track your progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {enrolledSubjects.map((subject) => (
          <Card key={`enrolled-${subject.id}`} className="border-sky-blue-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{subject.name}</CardTitle>
                <Button
                  onClick={() => removeSubject(subject.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-sky-blue-500 h-2 rounded-full" 
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {subject.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAvailableSubjects.length > 0 && (
        <div className="border-t pt-6">
          <h4 className="font-medium text-gray-900 mb-4">Available Subjects</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAvailableSubjects.map((subject) => (
              <Card key={`available-${subject.id}`} className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{subject.name}</CardTitle>
                      <CardDescription className="text-sm">{subject.description}</CardDescription>
                    </div>
                    <Button
                      onClick={() => addSubject(subject.id)}
                      size="sm"
                      className="bg-study-primary hover:bg-study-primary/90"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Billing & Subscription</h3>
        <p className="text-gray-600">Manage your subscription and payment methods</p>
      </div>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Current Plan</span>
            <Badge className="bg-green-100 text-green-700">{paymentData.status}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Plan Type</span>
              <span className="font-medium">{paymentData.plan}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Next Billing Date</span>
              <span className="font-medium">{paymentData.nextBilling}</span>
            </div>
            <div className="flex space-x-2">
              <Link to="/pricing">
                <Button variant="outline">Change Plan</Button>
              </Link>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Cancel Subscription
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
              <div className="flex-1">
                <p className="font-medium">{paymentData.cardNumber}</p>
                <p className="text-sm text-gray-600">Expires {paymentData.cardExpiry} • {paymentData.cardHolder}</p>
              </div>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Update
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "Jan 15, 2024", amount: "$19.99", status: "Paid" },
              { date: "Dec 15, 2023", amount: "$19.99", status: "Paid" },
              { date: "Nov 15, 2023", amount: "$19.99", status: "Paid" }
            ].map((invoice, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-gray-600">{invoice.amount}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {invoice.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Notification Preferences</h3>
        <p className="text-gray-600">Choose how you want to receive updates and reminders</p>
      </div>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries({
              emailUpdates: "Product updates and announcements",
              studyReminders: "Study session reminders",
              quizNotifications: "New quiz and flashcard notifications", 
              progressReports: "Weekly progress reports",
              marketingEmails: "Marketing and promotional emails"
            }).map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{label}</p>
                </div>
                <Switch
                  checked={notifications[key as keyof typeof notifications]}
                  onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>SMS Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS study reminders</p>
              <p className="text-sm text-gray-600">Receive text message reminders for study sessions</p>
            </div>
            <Switch
              checked={notifications.smsNotifications}
              onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy & Security</h3>
        <p className="text-gray-600">Manage your privacy settings and account security</p>
      </div>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share progress with teachers</p>
                <p className="text-sm text-gray-600">Allow your teachers to view your study progress</p>
              </div>
              <Switch
                checked={privacySettings.shareProgress}
                onCheckedChange={(checked) => handlePrivacyChange("shareProgress", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Analytics data collection</p>
                <p className="text-sm text-gray-600">Help us improve by sharing anonymous usage data</p>
              </div>
              <Switch
                checked={privacySettings.allowDataAnalytics}
                onCheckedChange={(checked) => handlePrivacyChange("allowDataAnalytics", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-sky-blue-200">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={privacySettings.twoFactorAuth}
                onCheckedChange={(checked) => handlePrivacyChange("twoFactorAuth", checked)}
              />
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" className="mr-3">
                Change Password
              </Button>
              <Button variant="outline">
                Download My Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-red-800">Delete Account</p>
              <p className="text-sm text-red-600 mb-3">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-sky-blue-100 text-sky-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="border-sky-blue-200">
            <CardContent className="p-6">
              {activeTab === "profile" && renderProfileTab()}
              {activeTab === "subjects" && renderSubjectsTab()}
              {activeTab === "billing" && renderBillingTab()}
              {activeTab === "notifications" && renderNotificationsTab()}
              {activeTab === "privacy" && renderPrivacyTab()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
