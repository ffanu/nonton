
export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  trailerUrl?: string;
  category: string;
  duration: string;
  year: number;
  rating: string;
  trending: boolean;
  featured: boolean;
}

export interface AdZone {
  id: string;
  name: string;
  enabled: boolean;
  code: string;
  position: 'top' | 'bottom' | 'video-overlay' | 'navbar-bottom';
}

export interface AdConfig {
  zones: AdZone[];
}

export interface Category {
  id: string;
  name: string;
  movieCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'Basic' | 'Standard' | 'Premium';
  status: 'Active' | 'Inactive';
  avatar: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'Active' | 'Unsubscribed';
}

export enum AppView {
  VIEWER = 'viewer',
  CMS = 'cms'
}

export enum CMSPage {
  DASHBOARD = 'dashboard',
  MOVIES = 'movies',
  SERIES = 'series',
  CATEGORIES = 'categories',
  USERS = 'users',
  MARKETING = 'marketing',
  SUBSCRIPTIONS = 'subscriptions',
  AD_MANAGER = 'ad_manager'
}
