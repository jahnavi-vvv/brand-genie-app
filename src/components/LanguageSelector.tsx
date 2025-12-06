import { LANGUAGES, Language } from '@/types';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  value: Language;
  onChange: (language: Language) => void;
  className?: string;
}

export function LanguageSelector({ value, onChange, className }: LanguageSelectorProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span>Output Language</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => onChange(lang.code)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
              value === lang.code
                ? "gradient-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {lang.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
}
