import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage (will be replaced with Supabase)
const USERS_KEY = 'ai_marketing_users';
const CURRENT_USER_KEY = 'ai_marketing_current_user';

const getStoredUsers = (): Record<string, { user: User; passwordHash: string }> => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users: Record<string, { user: User; passwordHash: string }>) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Simple hash function for demo (in production, use bcrypt on backend)
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'salt_for_demo');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = getStoredUsers();
      const userRecord = users[email.toLowerCase()];

      if (!userRecord) {
        toast.error('Account not found. Please sign up first.');
        return false;
      }

      const isValidPassword = await comparePassword(password, userRecord.passwordHash);
      
      if (!isValidPassword) {
        toast.error('Invalid password. Please try again.');
        return false;
      }

      setUser(userRecord.user);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userRecord.user));
      toast.success(`Welcome back, ${userRecord.user.name}!`);
      return true;
    } catch (error) {
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const users = getStoredUsers();
      const emailLower = email.toLowerCase();

      if (users[emailLower]) {
        toast.error('An account with this email already exists.');
        return false;
      }

      const passwordHash = await hashPassword(password);
      
      const newUser: User = {
        id: crypto.randomUUID(),
        email: emailLower,
        name,
        languagePreference: 'en',
        createdAt: new Date().toISOString(),
      };

      users[emailLower] = { user: newUser, passwordHash };
      saveUsers(users);
      
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      toast.success('Account created successfully! Welcome aboard!');
      return true;
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));

    // Update in users storage too
    const users = getStoredUsers();
    if (users[user.email]) {
      users[user.email].user = updatedUser;
      saveUsers(users);
    }
    
    toast.success('Profile updated successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
