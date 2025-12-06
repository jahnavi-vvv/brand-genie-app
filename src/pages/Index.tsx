import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  ArrowRight,
  Languages,
  Wand2,
  Package,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'AI-Powered Content',
    description: 'Generate captions, descriptions, and posters with one click',
  },
  {
    icon: Languages,
    title: 'Multi-Language Support',
    description: 'Create content in English, Kannada, Hindi, Tamil, and Telugu',
  },
  {
    icon: Package,
    title: 'Product Management',
    description: 'Upload and manage your product images with ease',
  },
  {
    icon: BarChart3,
    title: 'Smart Insights',
    description: 'Get AI-powered branding and hashtag suggestions',
  },
];

const steps = [
  'Create your free account',
  'Set up your business profile',
  'Generate AI-powered marketing content',
  'Share and grow your business',
];

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-warning/5" />
        <div className="container relative mx-auto px-6 py-12">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-soft">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">AI Marketing</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/auth">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center py-16 lg:py-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Marketing for Small Business
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up leading-tight">
              Create Stunning Marketing Content in{' '}
              <span className="text-gradient">Multiple Languages</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Generate captions, descriptions, posters, and more. Perfect for small 
              businesses looking to grow their presence in English, Hindi, Kannada, 
              Tamil, and Telugu markets.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Button asChild size="xl" variant="hero">
                <Link to="/auth">
                  Start Free Today
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful AI tools designed specifically for small business owners
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-2xl border bg-card hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple steps to transform your marketing
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 mb-4 rounded-xl bg-card shadow-card"
              >
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold">{index + 1}</span>
                </div>
                <p className="font-medium">{step}</p>
                <CheckCircle2 className="h-5 w-5 text-success ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center p-12 rounded-3xl gradient-primary shadow-glow">
            <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Marketing?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of small business owners already using AI to grow their business.
            </p>
            <Button asChild size="xl" variant="glass">
              <Link to="/auth">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold">AI Marketing Assistant</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Made with ❤️ for small businesses
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
