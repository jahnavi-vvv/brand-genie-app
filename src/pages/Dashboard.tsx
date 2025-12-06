import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Wand2,
  Package,
  FileText,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Languages,
  Lightbulb,
  Star,
} from 'lucide-react';

const quickActions = [
  {
    icon: Wand2,
    title: 'Generate Content',
    description: 'Create AI-powered marketing content',
    path: '/generate',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Package,
    title: 'Upload Products',
    description: 'Add new product images',
    path: '/products',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'View Content',
    description: 'Manage your generated content',
    path: '/content',
    color: 'from-purple-500 to-pink-500',
  },
];

const features = [
  {
    icon: Languages,
    title: 'Multi-language Support',
    description: 'Generate content in English, Kannada, Hindi, Tamil, and Telugu',
  },
  {
    icon: Lightbulb,
    title: 'Smart Suggestions',
    description: 'Get AI-powered branding and hashtag recommendations',
  },
  {
    icon: Star,
    title: 'Rate & Improve',
    description: 'Rate content to help AI learn your preferences',
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-8 text-primary-foreground">
          <div className="absolute right-0 top-0 w-64 h-64 translate-x-1/3 -translate-y-1/3">
            <div className="w-full h-full rounded-full bg-white/10 animate-pulse-soft" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-medium opacity-90">AI Marketing Assistant</span>
            </div>
            <h1 className="font-display text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-primary-foreground/80 max-w-xl">
              Ready to create amazing marketing content? Let's make your business shine today!
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-display text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.path} to={action.path}>
                <Card className="group cursor-pointer hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-semibold mb-1 group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats & Features */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Getting Started
              </CardTitle>
              <CardDescription>
                Complete these steps to unlock the full potential
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-accent/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/20 text-success text-sm font-medium">
                    ✓
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Create your account</p>
                    <p className="text-xs text-muted-foreground">You're all set!</p>
                  </div>
                </div>

                <Link to="/business-setup" className="block">
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-dashed hover:bg-accent/30 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">
                      2
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Set up your business info</p>
                      <p className="text-xs text-muted-foreground">Tell us about your business</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>

                <Link to="/generate" className="block">
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-dashed hover:bg-accent/30 transition-colors">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-medium">
                      3
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Generate your first content</p>
                      <p className="text-xs text-muted-foreground">Create amazing marketing</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Platform Features
              </CardTitle>
              <CardDescription>
                Discover what AI Marketing can do for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-accent to-secondary border-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
            <div>
              <h3 className="font-display font-semibold text-lg mb-1">
                Ready to create your first content?
              </h3>
              <p className="text-sm text-muted-foreground">
                Start generating AI-powered marketing content in seconds
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/generate">
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Content
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
