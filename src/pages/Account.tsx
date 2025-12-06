import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { INDUSTRIES, LANGUAGES, Industry, Language } from '@/types';
import {
  User,
  Mail,
  Building2,
  Save,
  Loader2,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Account() {
  const { user, updateUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    businessName: user?.businessName || '',
    industry: (user?.industry as Industry) || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      updateUser({
        name: formData.name,
        businessName: formData.businessName,
        industry: formData.industry,
      });
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Account
          </h1>
          <p className="text-muted-foreground">
            Manage your personal and business information
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden">
          <div className="h-24 gradient-primary" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col items-center -mt-12 mb-6">
              <div className="h-24 w-24 rounded-full bg-card border-4 border-card flex items-center justify-center shadow-lg">
                <span className="text-3xl font-display font-bold text-primary">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">{user?.name}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {user?.email}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 p-4 bg-accent/30 rounded-lg">
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Business
                </p>
                <p className="font-medium flex items-center gap-1 justify-center sm:justify-start">
                  <Building2 className="h-4 w-4 text-primary" />
                  {user?.businessName || 'Not set'}
                </p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Member Since
                </p>
                <p className="font-medium flex items-center gap-1 justify-center sm:justify-start">
                  <Calendar className="h-4 w-4 text-primary" />
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal and business details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, industry: value as Industry }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry.value} value={industry.value}>
                        {industry.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
