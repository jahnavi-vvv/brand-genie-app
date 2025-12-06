import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { INDUSTRIES, LANGUAGES, Industry, Language } from '@/types';
import { Building2, ArrowRight, ArrowLeft, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function BusinessSetup() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    industry: (user?.industry as Industry) || '',
    description: '',
    languagePreference: user?.languagePreference || 'en',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.industry) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      updateUser({
        businessName: formData.businessName,
        industry: formData.industry,
        languagePreference: formData.languagePreference as Language,
      });
      
      toast.success('Business setup complete!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${
                s <= step ? 'gradient-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Card className="animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-soft">
              <Building2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-display">
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Choose your industry'}
              {step === 3 && 'Set your preferences'}
            </CardTitle>
            <CardDescription>
              {step === 1 && "This helps us create content that's perfect for your brand"}
              {step === 2 && "We'll tailor our AI suggestions to your industry"}
              {step === 3 && 'Customize your experience'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="e.g., Sunrise Bakery"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Brief Description
                      <span className="text-muted-foreground font-normal"> (optional)</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Tell us what makes your business special..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label>Select Your Industry *</Label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {INDUSTRIES.map((industry) => (
                        <button
                          key={industry.value}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, industry: industry.value }))
                          }
                          className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary/50 ${
                            formData.industry === industry.value
                              ? 'border-primary bg-accent shadow-sm'
                              : 'border-border'
                          }`}
                        >
                          {formData.industry === industry.value && (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          )}
                          <span className="text-sm font-medium">{industry.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <Label>Preferred Language for Content</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      This will be your default language for AI-generated content
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, languagePreference: lang.code }))
                          }
                          className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary/50 ${
                            formData.languagePreference === lang.code
                              ? 'border-primary bg-accent shadow-sm'
                              : 'border-border'
                          }`}
                        >
                          {formData.languagePreference === lang.code && (
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                          )}
                          <div>
                            <span className="font-medium">{lang.name}</span>
                            <span className="text-muted-foreground ml-2">{lang.nativeName}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="rounded-lg bg-accent/50 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Setup Summary</span>
                    </div>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Business</dt>
                        <dd className="font-medium">{formData.businessName || '-'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Industry</dt>
                        <dd className="font-medium">
                          {INDUSTRIES.find((i) => i.value === formData.industry)?.label || '-'}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Language</dt>
                        <dd className="font-medium">
                          {LANGUAGES.find((l) => l.code === formData.languagePreference)?.name}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (step === 1 && !formData.businessName) {
                        toast.error('Please enter your business name');
                        return;
                      }
                      if (step === 2 && !formData.industry) {
                        toast.error('Please select your industry');
                        return;
                      }
                      setStep(step + 1);
                    }}
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Complete Setup
                        <CheckCircle2 className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
