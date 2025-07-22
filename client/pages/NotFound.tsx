import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Home, BookOpen } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-study-background flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="text-center border-sky-blue-200">
          <CardHeader className="pb-6">
            <div className="text-6xl mb-4">📚</div>
            <CardTitle className="text-3xl text-gray-900 mb-2">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Sorry, we couldn't find the study material you're looking for.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-sky-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">
                The page <code className="bg-gray-200 px-2 py-1 rounded text-xs">{location.pathname}</code> doesn't exist or may have been moved.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="w-full sm:w-auto bg-study-primary hover:bg-study-primary/90 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link to="/subjects">
                <Button className="w-full sm:w-auto" variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Subjects
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
