"use client";

import { useState, useEffect } from 'react';
import { User, UserRole } from '@/lib/types';
import { users } from '@/lib/data';
import { toast } from 'sonner';

// Auth storage key
const AUTH_STORAGE_KEY = 'reejh-mann-di-user';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (!isLoading) {
      try {
        if (user) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Error saving user to localStorage:', error);
      }
    }
  }, [user, isLoading]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === 'password123') { // Mock password check
        const userWithUpdatedLogin = {
          ...foundUser,
          lastLogin: new Date().toISOString()
        };
        
        setUser(userWithUpdatedLogin);
        toast.success(`Welcome back, ${foundUser.name}!`);
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        toast.error('Email already registered');
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: UserRole.CUSTOMER,
        addresses: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // In real app, this would be sent to API
      users.push(newUser);
      
      setUser(newUser);
      toast.success(`Welcome to Reejh Mann Di, ${name}!`);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    try {
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) {
        toast.error('No user logged in');
        return false;
      }

      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        ...updates,
        id: user.id, // Ensure ID can't be changed
        role: user.role, // Ensure role can't be changed by user
        createdAt: user.createdAt, // Ensure createdAt can't be changed
        updatedAt: new Date().toISOString()
      };
      
      setUser(updatedUser);
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Profile update failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has specific role
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  // Check if user is admin
  const isAdmin = (): boolean => {
    return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return !!user;
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    hasRole,
    isAdmin,
    isAuthenticated
  };
}