import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
  backText?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink = "/", 
  backText = "Back to Home" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-study-background flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center border-sky-blue-200">
          <CardHeader className="pb-6">
            <div className="w-16 h-16 bg-sky-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Construction className="w-8 h-8 text-sky-blue-600" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-gray-900 mb-2">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-sky-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Coming Soon!</h3>
              <p className="text-gray-600 text-sm">
                This feature is currently under development. Check back soon for updates, 
                or continue prompting to help build out this page's content.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to={backLink}>
                <Button className="w-full sm:w-auto" variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {backText}
                </Button>
              </Link>
              <Link to="/subjects">
                <Button className="w-full sm:w-auto bg-study-primary hover:bg-study-primary/90 text-white">
                  Browse Subjects
                </Button>
              </Link>
            </div>

            <div className="text-sm text-gray-500 mt-8">
              <p>
                <strong>For the developer:</strong> Continue prompting to implement this page's functionality!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
