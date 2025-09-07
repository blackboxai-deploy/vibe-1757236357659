// Authentication utility functions for Reejh Mann Di Shopping App

import { User, UserRole, LoginForm, RegisterForm } from './types';
import { users } from './data';

// Local storage keys
const AUTH_TOKEN_KEY = 'reejh-mann-di-auth-token';
const CURRENT_USER_KEY = 'reejh-mann-di-current-user';

// Mock JWT token generation (in real app, this would be handled by backend)
const generateMockToken = (userId: string): string => {
  const payload = {
    userId,
    timestamp: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  // In real app, this would be a proper JWT token
  return btoa(JSON.stringify(payload));
};

// Parse mock token
const parseMockToken = (token: string): { userId: string; exp: number } | null => {
  try {
    const payload = JSON.parse(atob(token));
    return payload;
  } catch {
    return null;
  }
};

// Check if token is valid and not expired
const isTokenValid = (token: string): boolean => {
  const payload = parseMockToken(token);
  if (!payload) return false;
  
  return payload.exp > Date.now();
};

// Get stored authentication token
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && isTokenValid(token)) {
      return token;
    }
    
    // Remove invalid token
    if (token) {
      removeAuthData();
    }
  } catch (error) {
    console.error('Error retrieving auth token:', error);
  }
  
  return null;
};

// Store authentication data
const storeAuthData = (user: User, token: string): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

// Remove authentication data
export const removeAuthData = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error removing auth data:', error);
  }
};

// Get current user from storage
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = getAuthToken();
    if (!token) return null;
    
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    if (userJson) {
      return JSON.parse(userJson);
    }
  } catch (error) {
    console.error('Error retrieving current user:', error);
  }
  
  return null;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Check if user has admin role
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === UserRole.ADMIN || user?.role === UserRole.SUPER_ADMIN;
};

// Login function
export const loginUser = async (credentials: LoginForm): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    // In real app, password would be hashed and verified properly
    // For demo, we'll accept any password for existing users
    const isPasswordValid = credentials.password.length >= 6;
    
    if (!isPasswordValid) {
      return { success: false, error: 'Invalid password' };
    }
    
    // Generate token and store auth data
    const token = generateMockToken(user.id);
    const updatedUser = {
      ...user,
      lastLogin: new Date().toISOString()
    };
    
    storeAuthData(updatedUser, token);
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed. Please try again.' };
  }
};

// Register function
export const registerUser = async (userData: RegisterForm): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }
    
    // Validate password confirmation
    if (userData.password !== userData.confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }
    
    // Validate password strength
    if (userData.password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      name: userData.name,
      role: UserRole.CUSTOMER,
      addresses: [],
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    
    // In real app, user would be saved to database
    // For demo, we'll just add to our mock data
    users.push(newUser);
    
    // Generate token and store auth data
    const token = generateMockToken(newUser.id);
    storeAuthData(newUser, token);
    
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Registration failed. Please try again.' };
  }
};

// Logout function
export const logoutUser = (): void => {
  removeAuthData();
  
  // In real app, you might want to invalidate the token on the server
  // For demo, just removing from localStorage is sufficient
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<{ success: boolean; user?: User; error?: string }> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }
    
    // Update user data
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      id: userId, // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    
    // Update stored user data if it's the current user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      const token = getAuthToken();
      if (token) {
        storeAuthData(updatedUser, token);
      }
    }
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false, error: 'Profile update failed. Please try again.' };
  }
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (password.length > 50) {
    errors.push('Password must be less than 50 characters');
  }
  
  if (!/[a-zA-Z]/.test(password)) {
    errors.push('Password must contain at least one letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Generate user avatar URL based on name
export const generateAvatarUrl = (name: string): string => {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
  
  return `https://placehold.co/100x100?text=${initials}+User+Profile+Avatar`;
};

// Format user display name
export const formatUserName = (user: User): string => {
  return user.name || 'User';
};

// Check if user can access admin features
export const canAccessAdmin = (user: User | null): boolean => {
  if (!user) return false;
  return user.role === UserRole.ADMIN || user.role === UserRole.SUPER_ADMIN;
};