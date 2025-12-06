import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MarketingContent, LANGUAGES } from '@/types';
import { Link } from 'react-router-dom';
import {
  FileText,
  Trash2,
  Copy,
  Check,
  Star,
  MessageSquare,
  Hash,
  Image,
  Lightbulb,
  Wand2,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock content storage
const CONTENT_KEY = 'ai_marketing_content';

const getStoredContent = (): MarketingContent[] => {
  const stored = localStorage.getItem(CONTENT_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveContent = (content: MarketingContent[]) => {
  localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
};

const contentTypeIcons = {
  caption: MessageSquare,
  description: Lightbulb,
  hashtags: Hash,
  poster: Image,
  engagement: Star,
};

export default function Content() {
  const [contents, setContents] = useState<MarketingContent[]>(getStoredContent);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const updated = contents.filter((c) => c.id !== id);
    setContents(updated);
    saveContent(updated);
    toast.success('Content deleted');
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRate = (id: string, rating: number) => {
    const updated = contents.map((c) =>
      c.id === id ? { ...c, rating } : c
    );
    setContents(updated);
    saveContent(updated);
    toast.success(`Rated ${rating} stars`);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              My Content
            </h1>
            <p className="text-muted-foreground">
              View and manage your generated marketing content
            </p>
          </div>
          <Button asChild>
            <Link to="/generate">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Link>
          </Button>
        </div>

        {/* Content List */}
        {contents.length > 0 ? (
          <div className="space-y-4">
            {contents.map((content) => {
              const Icon = contentTypeIcons[content.contentType] || FileText;
              const langName = LANGUAGES.find((l) => l.code === content.selectedLanguage)?.name;

              return (
                <Card key={content.id} className="group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium capitalize">
                              {content.contentType.replace('_', ' ')}
                            </h3>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                              {langName}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            {content.productName}
                            {content.price && (
                              <span className="text-muted-foreground ml-2">
                                ₹{content.price.toLocaleString()}
                              </span>
                            )}
                          </p>
                          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-sans line-clamp-3">
                            {content.generatedText}
                          </pre>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopy(content.generatedText, content.id)}
                        >
                          {copiedId === content.id ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(content.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <span className="text-sm text-muted-foreground">Rate this content</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRate(content.id, star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`h-5 w-5 ${
                                (content.rating || 0) >= star
                                  ? 'fill-warning text-warning'
                                  : 'text-muted-foreground/30'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Wand2 className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-1">No content yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start generating AI-powered marketing content
              </p>
              <Button asChild>
                <Link to="/generate">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Content
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
