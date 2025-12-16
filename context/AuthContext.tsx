import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  loginSSO: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Start null to show Login screen
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string) => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUser({
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      email: email || 'user@mof.gov.il',
      name: (email || 'User').split('@')[0].toUpperCase(),
      role: 'ADMIN',
      department: 'Strategy'
    });
    setIsLoading(false);
  };

  const loginSSO = async () => {
    setIsLoading(true);
    // Simulate redirect to Government IDP (Azure AD / Merkava)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUser({
      id: 'sso_user_123',
      email: 'israel.israeli@mof.gov.il',
      name: 'ישראל ישראלי',
      role: 'ANALYST',
      department: 'ניהול החוב'
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, loginSSO, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};