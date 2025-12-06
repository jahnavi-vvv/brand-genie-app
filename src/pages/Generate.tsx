import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Language, LANGUAGES, ContentGenerationRequest, MarketingContent } from '@/types';
import {
  Wand2,
  Copy,
  Check,
  Loader2,
  Sparkles,
  Hash,
  MessageSquare,
  Image,
  Lightbulb,
  IndianRupee,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const contentTypes = [
  {
    id: 'caption',
    icon: MessageSquare,
    title: 'Social Caption',
    description: 'Engaging social media captions',
  },
  {
    id: 'description',
    icon: Lightbulb,
    title: 'Product Description',
    description: 'Compelling product descriptions',
  },
  {
    id: 'hashtags',
    icon: Hash,
    title: 'Hashtags',
    description: 'Trending hashtag suggestions',
  },
  {
    id: 'poster',
    icon: Image,
    title: 'Poster Text',
    description: 'Eye-catching poster content',
  },
] as const;

// Mock AI generation (will be replaced with actual AI integration)
const generateContent = async (request: ContentGenerationRequest): Promise<string> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const languageNames: Record<Language, string> = {
    en: 'English',
    kn: 'Kannada',
    hi: 'Hindi',
    ta: 'Tamil',
    te: 'Telugu',
  };

  const priceText = request.price ? ` at just ₹${request.price}` : '';

  const templates: Record<string, Record<Language, string>> = {
    caption: {
      en: `✨ Introducing ${request.productName}${priceText}!\n\n${request.businessDescription}\n\n🛍️ Perfect for those who appreciate quality and style. Don't miss out on this amazing offer!\n\n#SmallBusiness #ShopLocal #${request.productName.replace(/\s+/g, '')}`,
      kn: `✨ ${request.productName} ಪರಿಚಯಿಸುತ್ತಿದ್ದೇವೆ${priceText ? ` ಕೇವಲ ₹${request.price}ಕ್ಕೆ` : ''}!\n\n${request.businessDescription}\n\n🛍️ ಗುಣಮಟ್ಟ ಮತ್ತು ಶೈಲಿಯನ್ನು ಮೆಚ್ಚುವವರಿಗೆ ಪರಿಪೂರ್ಣ. ಈ ಅದ್ಭುತ ಆಫರ್ ತಪ್ಪಿಸಿಕೊಳ್ಳಬೇಡಿ!`,
      hi: `✨ पेश है ${request.productName}${priceText ? ` सिर्फ ₹${request.price} में` : ''}!\n\n${request.businessDescription}\n\n🛍️ उन लोगों के लिए जो गुणवत्ता और स्टाइल की कद्र करते हैं। यह अद्भुत ऑफर न चूकें!`,
      ta: `✨ ${request.productName} அறிமுகம்${priceText ? ` வெறும் ₹${request.price}க்கு` : ''}!\n\n${request.businessDescription}\n\n🛍️ தரம் மற்றும் பாணியை பாராட்டுபவர்களுக்கு சரியானது. இந்த அற்புதமான சலுகையை தவறவிடாதீர்கள்!`,
      te: `✨ ${request.productName} పరిచయం${priceText ? ` కేవలం ₹${request.price}కి` : ''}!\n\n${request.businessDescription}\n\n🛍️ నాణ్యత మరియు శైలిని అభినందించే వారికి పర్ఫెక్ట్. ఈ అద్భుతమైన ఆఫర్ మిస్ అవ్వకండి!`,
    },
    description: {
      en: `Discover ${request.productName} - where quality meets excellence${priceText}.\n\n${request.businessDescription}\n\nKey Features:\n• Premium quality materials\n• Crafted with attention to detail\n• Perfect for everyday use\n• Exceptional value for money\n\nOrder now and experience the difference!`,
      kn: `${request.productName} ಅನ್ನು ಅನ್ವೇಷಿಸಿ - ಅಲ್ಲಿ ಗುಣಮಟ್ಟವು ಶ್ರೇಷ್ಠತೆಯನ್ನು ಭೇಟಿಯಾಗುತ್ತದೆ${priceText ? ` ಕೇವಲ ₹${request.price}` : ''}.\n\n${request.businessDescription}\n\nಪ್ರಮುಖ ವೈಶಿಷ್ಟ್ಯಗಳು:\n• ಪ್ರೀಮಿಯಂ ಗುಣಮಟ್ಟದ ಸಾಮಗ್ರಿಗಳು\n• ವಿವರಗಳಿಗೆ ಗಮನ ಕೊಟ್ಟು ರಚಿಸಲಾಗಿದೆ`,
      hi: `${request.productName} की खोज करें - जहाँ गुणवत्ता उत्कृष्टता से मिलती है${priceText ? ` सिर्फ ₹${request.price} में` : ''}.\n\n${request.businessDescription}\n\nमुख्य विशेषताएं:\n• प्रीमियम गुणवत्ता वाली सामग्री\n• विस्तार पर ध्यान देकर बनाया गया`,
      ta: `${request.productName} கண்டறியுங்கள் - தரம் சிறப்பை சந்திக்கும் இடம்${priceText ? ` வெறும் ₹${request.price}க்கு` : ''}.\n\n${request.businessDescription}\n\nமுக்கிய அம்சங்கள்:\n• பிரீமியம் தர பொருட்கள்\n• விவரங்களுக்கு கவனம் செலுத்தி வடிவமைக்கப்பட்டது`,
      te: `${request.productName} కనుగొనండి - నాణ్యత శ్రేష్ఠతను కలుసుకునే చోటు${priceText ? ` కేవలం ₹${request.price}కి` : ''}.\n\n${request.businessDescription}\n\nప్రధాన లక్షణాలు:\n• ప్రీమియం నాణ్యత పదార్థాలు\n• వివరాలకు శ్రద్ధతో రూపొందించబడింది`,
    },
    hashtags: {
      en: `#${request.productName.replace(/\s+/g, '')} #SmallBusiness #ShopLocal #SupportSmall #QualityProducts #HandmadeWithLove #ShopSmall #LocalBusiness #Entrepreneur #BusinessOwner #IndianBusiness #MadeInIndia #ShopIndian`,
      kn: `#${request.productName.replace(/\s+/g, '')} #ಸಣ್ಣವ್ಯಾಪಾರ #ಸ್ಥಳೀಯಖರೀದಿ #ಭಾರತೀಯ #ಗುಣಮಟ್ಟ #ಕನ್ನಡ`,
      hi: `#${request.productName.replace(/\s+/g, '')} #छोटाव्यवसाय #स्थानीयखरीदें #भारतीय #गुणवत्ता #हिंदी #भारतमेंनिर्मित`,
      ta: `#${request.productName.replace(/\s+/g, '')} #சிறுவணிகம் #உள்ளூர்கடை #இந்தியன் #தரமான #தமிழ்`,
      te: `#${request.productName.replace(/\s+/g, '')} #చిన్నవ్యాపారం #స్థానికఖరీదు #భారతీయ #నాణ్యత #తెలుగు`,
    },
    poster: {
      en: `🌟 ${request.productName.toUpperCase()} 🌟\n\n${priceText ? `SPECIAL PRICE: ₹${request.price}` : 'BEST QUALITY'}\n\n✓ Premium Quality\n✓ Fast Delivery\n✓ Customer Satisfaction\n\n📞 Contact us today!\n\n${request.businessDescription}`,
      kn: `🌟 ${request.productName.toUpperCase()} 🌟\n\n${priceText ? `ವಿಶೇಷ ಬೆಲೆ: ₹${request.price}` : 'ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟ'}\n\n✓ ಪ್ರೀಮಿಯಂ ಗುಣಮಟ್ಟ\n✓ ವೇಗದ ವಿತರಣೆ\n\n📞 ಇಂದೇ ಸಂಪರ್ಕಿಸಿ!`,
      hi: `🌟 ${request.productName.toUpperCase()} 🌟\n\n${priceText ? `विशेष मूल्य: ₹${request.price}` : 'सर्वोत्तम गुणवत्ता'}\n\n✓ प्रीमियम गुणवत्ता\n✓ तेज़ डिलीवरी\n\n📞 आज ही संपर्क करें!`,
      ta: `🌟 ${request.productName.toUpperCase()} 🌟\n\n${priceText ? `சிறப்பு விலை: ₹${request.price}` : 'சிறந்த தரம்'}\n\n✓ பிரீமியம் தரம்\n✓ விரைவான டெலிவரி\n\n📞 இன்றே தொடர்பு கொள்ளுங்கள்!`,
      te: `🌟 ${request.productName.toUpperCase()} 🌟\n\n${priceText ? `ప్రత్యేక ధర: ₹${request.price}` : 'అత్యుత్తమ నాణ్యత'}\n\n✓ ప్రీమియం నాణ్యత\n✓ వేగవంతమైన డెలివరీ\n\n📞 ఈరోజే సంప్రదించండి!`,
    },
  };

  return templates[request.contentType]?.[request.language] || templates[request.contentType]?.en || '';
};

export default function Generate() {
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedType, setSelectedType] = useState<typeof contentTypes[number]['id']>('caption');
  
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    businessDescription: user?.businessName ? `${user.businessName} - Your trusted partner for quality products.` : '',
    language: (user?.languagePreference || 'en') as Language,
  });

  const [generatedContent, setGeneratedContent] = useState<string>('');

  const handleGenerate = async () => {
    if (!formData.productName) {
      toast.error('Please enter a product name');
      return;
    }

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const content = await generateContent({
        productName: formData.productName,
        price: formData.price ? parseFloat(formData.price) : undefined,
        businessDescription: formData.businessDescription,
        language: formData.language,
        contentType: selectedType,
      });

      setGeneratedContent(content);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            Generate Content
          </h1>
          <p className="text-muted-foreground">
            Create AI-powered marketing content in your preferred language
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Content Details</CardTitle>
              <CardDescription>Fill in the details to generate your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Type Selection */}
              <div className="space-y-3">
                <Label>Content Type</Label>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        "flex flex-col items-start gap-2 rounded-lg border p-4 text-left transition-all",
                        selectedType === type.id
                          ? "border-primary bg-accent shadow-sm"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <type.icon
                        className={cn(
                          "h-5 w-5",
                          selectedType === type.id ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                      <div>
                        <p className="font-medium text-sm">{type.title}</p>
                        <p className="text-xs text-muted-foreground">{type.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name *</Label>
                <Input
                  id="productName"
                  placeholder="e.g., Handmade Silk Saree"
                  value={formData.productName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, productName: e.target.value }))
                  }
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (₹)
                  <span className="text-muted-foreground font-normal"> (optional)</span>
                </Label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="1999"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, price: e.target.value }))
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Business Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell us about your business..."
                  value={formData.businessDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, businessDescription: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              {/* Language Selector */}
              <LanguageSelector
                value={formData.language}
                onChange={(lang) => setFormData((prev) => ({ ...prev, language: lang }))}
              />

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !formData.productName}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output */}
          <Card className="lg:sticky lg:top-6 h-fit">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Generated Content
                {generatedContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    className="gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-success" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                {generatedContent
                  ? `Generated in ${LANGUAGES.find((l) => l.code === formData.language)?.name}`
                  : 'Your AI-generated content will appear here'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full gradient-primary animate-pulse-soft" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="mt-4 text-muted-foreground">Creating magic...</p>
                </div>
              ) : generatedContent ? (
                <div className="rounded-lg bg-accent/50 p-4">
                  <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <Wand2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Fill in the details and click generate
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
