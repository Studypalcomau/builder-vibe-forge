import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Check, 
  X,
  Star,
  Zap,
  Crown,
  Users,
  BookOpen,
  Brain,
  Trophy,
  Target,
  Clock,
  Download,
  Shield,
  Headphones
} from "lucide-react";

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started with your Queensland studies",
      price: { monthly: 0, yearly: 0 },
      popular: false,
      features: [
        { name: "3 subject access", included: true },
        { name: "50 flashcards per month", included: true },
        { name: "5 practice quizzes per month", included: true },
        { name: "2 study notes", included: true },
        { name: "Community support", included: true },
        { name: "Advanced analytics", included: false },
      ],
      cta: "Start Free",
      ctaVariant: "outline" as const
    },
    {
      name: "Student Pro",
      description: "Everything you need to excel in Queensland Year 11-12",
      price: { monthly: 19, yearly: 190 }, // yearly = 16/month
      popular: true,
      features: [
        { name: "All 6 subjects access", included: true },
        { name: "Unlimited flashcards", included: true },
        { name: "Unlimited practice quizzes", included: true },
        { name: "Comprehensive study notes", included: true },
        { name: "Advanced progress tracking", included: true },
        { name: "Mobile app access", included: true },
        { name: "AI-powered recommendations", included: true },
        { name: "Detailed analytics", included: true },
        { name: "Priority email support", included: true },
        { name: "Offline downloads", included: true },
        { name: "Custom study plans", included: true },
        { name: "Exam preparation tools", included: true },
        { name: "Performance insights", included: true },
        { name: "Study streak tracking", included: true },
        { name: "Achievement system", included: true }
      ],
      cta: "Start 7-Day Free Trial",
      ctaVariant: "default" as const
    },
    {
      name: "School License",
      description: "Perfect for schools and educational institutions",
      price: { monthly: 299, yearly: 2990 }, // yearly = 249/month
      popular: false,
      features: [
        { name: "Everything in Student Pro", included: true },
        { name: "Up to 500 student accounts", included: true },
        { name: "Teacher dashboard", included: true },
        { name: "Class progress monitoring", included: true },
        { name: "Bulk account management", included: true },
        { name: "Custom branding", included: true },
        { name: "Advanced reporting", included: true },
        { name: "API access", included: true },
        { name: "Single sign-on (SSO)", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Priority phone support", included: true },
        { name: "Training sessions", included: true },
        { name: "Custom integrations", included: true },
        { name: "White-label options", included: true },
        { name: "Advanced security features", included: true }
      ],
      cta: "Contact Sales",
      ctaVariant: "outline" as const
    }
  ];

  const faqs = [
    {
      question: "Can I switch between plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments."
    },
    {
      question: "What subjects are covered?",
      answer: "We cover all major Queensland Year 11-12 subjects including Mathematics, English, Biology, Chemistry, Physics, and Modern History, with more subjects being added regularly."
    },
    {
      question: "Is there a student discount?",
      answer: "Our pricing is already student-friendly! The Free plan gives you substantial access, and Student Pro is designed specifically for individual students at an affordable rate."
    },
    {
      question: "How does the 7-day free trial work?",
      answer: "You get full access to Student Pro features for 7 days. No credit card required to start. If you don't cancel, you'll be charged after the trial period ends."
    },
    {
      question: "Can I use this offline?",
      answer: "Student Pro and School License plans include offline downloads, so you can study even without an internet connection."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and for School Licenses, we can accommodate purchase orders and wire transfers."
    }
  ];

  const getMonthlyPrice = (plan: typeof plans[0]) => {
    if (billingPeriod === "yearly") {
      return Math.round(plan.price.yearly / 12);
    }
    return plan.price.monthly;
  };

  const getYearlySavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyPrice = plan.price.yearly;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="min-h-screen bg-study-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Study Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Start with our free plan or unlock your full potential with StudyMate Pro. 
            All plans include access to Queensland curriculum-aligned content.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm ${billingPeriod === "monthly" ? "font-medium text-gray-900" : "text-gray-600"}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "yearly" : "monthly")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                billingPeriod === "yearly" ? "bg-sky-blue-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingPeriod === "yearly" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${billingPeriod === "yearly" ? "font-medium text-gray-900" : "text-gray-600"}`}>
              Yearly
            </span>
            {billingPeriod === "yearly" && (
              <Badge className="bg-green-100 text-green-700">
                Save up to 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const monthlyPrice = getMonthlyPrice(plan);
            const savings = getYearlySavings(plan);
            
            return (
              <Card 
                key={index} 
                className={`relative border-2 ${
                  plan.popular 
                    ? "border-sky-blue-500 shadow-lg scale-105" 
                    : "border-sky-blue-200"
                } transition-all hover:shadow-md`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-sky-blue-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="mb-4">
                    {index === 0 && <Zap className="w-8 h-8 mx-auto text-gray-600" />}
                    {index === 1 && <Crown className="w-8 h-8 mx-auto text-sky-blue-500" />}
                    {index === 2 && <Users className="w-8 h-8 mx-auto text-purple-500" />}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">
                        ${monthlyPrice}
                      </span>
                      <span className="text-gray-600 ml-1">
                        {plan.price.monthly === 0 ? "" : "/month"}
                      </span>
                    </div>
                    
                    {billingPeriod === "yearly" && plan.price.yearly > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="line-through">${plan.price.monthly}/month</span>
                        <span className="ml-2 text-green-600 font-medium">
                          Save ${savings.amount}/year
                        </span>
                      </div>
                    )}
                    
                    {billingPeriod === "yearly" && plan.price.yearly > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        Billed annually (${plan.price.yearly}/year)
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <Button 
                    className={`w-full mb-6 ${
                      plan.popular 
                        ? "bg-sky-blue-500 hover:bg-sky-blue-600 text-white" 
                        : ""
                    }`}
                    variant={plan.ctaVariant}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 mr-3 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose StudyMate QLD?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-sky-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Queensland Aligned</h3>
              <p className="text-sm text-gray-600">
                Content specifically designed for Queensland Year 11-12 curriculum standards
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-sky-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Learning</h3>
              <p className="text-sm text-gray-600">
                Smart recommendations and spaced repetition to optimize your study time
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-sky-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-sm text-gray-600">
                94% success rate with over 15,000 active students across Queensland
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sky-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-sky-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
              <p className="text-sm text-gray-600">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-sky-blue-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-sky-blue-500 to-sky-blue-600 text-white">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Study Experience?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of Queensland students who are already achieving better results with StudyMate. 
              Start your free trial today - no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-sky-blue-600 hover:bg-gray-100">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Headphones className="w-5 h-5 mr-2" />
                Talk to Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
