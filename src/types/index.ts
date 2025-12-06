export interface User {
  id: string;
  email: string;
  name: string;
  businessName?: string;
  industry?: string;
  languagePreference: Language;
  avatarUrl?: string;
  createdAt: string;
}

export type Language = 'en' | 'kn' | 'hi' | 'ta' | 'te';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

export interface MarketingContent {
  id: string;
  ownerId: string;
  businessDescription: string;
  productName: string;
  price?: number;
  selectedLanguage: Language;
  contentType: 'caption' | 'description' | 'poster' | 'hashtags' | 'engagement';
  generatedText: string;
  generatedImage?: string;
  keywords: string[];
  rating?: number;
  feedback?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  ownerId: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  createdAt: string;
}

export interface ContentGenerationRequest {
  businessDescription: string;
  productName: string;
  price?: number;
  language: Language;
  contentType: MarketingContent['contentType'];
  keywords?: string[];
}

export type Industry = 
  | 'retail'
  | 'food_beverage'
  | 'fashion'
  | 'beauty'
  | 'healthcare'
  | 'education'
  | 'technology'
  | 'home_services'
  | 'automotive'
  | 'real_estate'
  | 'fitness'
  | 'photography'
  | 'crafts'
  | 'other';

export const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: 'retail', label: 'Retail & Shopping' },
  { value: 'food_beverage', label: 'Food & Beverage' },
  { value: 'fashion', label: 'Fashion & Apparel' },
  { value: 'beauty', label: 'Beauty & Wellness' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education & Training' },
  { value: 'technology', label: 'Technology' },
  { value: 'home_services', label: 'Home Services' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'fitness', label: 'Fitness & Sports' },
  { value: 'photography', label: 'Photography & Media' },
  { value: 'crafts', label: 'Arts & Crafts' },
  { value: 'other', label: 'Other' },
];
