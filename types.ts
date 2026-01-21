
export enum MessageAuthor {
  USER = 'user',
  AI = 'ai',
}

export interface GroundingChunk {
  // Matches the structure from @google/genai search grounding response
  web?: {
    uri?: string;
    title?: string;
  };
}

export interface ChatMessage {
  author: MessageAuthor;
  text: string;
  sources?: GroundingChunk[];
}

export interface ConservationFact {
  topic: string;
  fact: string;
}

export interface Project {
  title: string;
  location: string;
  region: string;
  description: string;
  link: string;
  isPinned?: boolean;
}

export interface Comment {
  id: number;
  name: string;
  avatarSeed: string;
  timestamp: string;
  content: string;
  likes: number;
  replies: Comment[];
}

export const oceanCategories = [
  'General Discussion',
  'Conservation Efforts',
  'Marine Biology',
  'Diving & Exploration',
  'Photography & Art',
  'Q&A',
] as const;

export type OceanCategory = (typeof oceanCategories)[number];

export interface Post {
  id: number;
  name:string;
  avatarSeed: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: Comment[];
  category: OceanCategory;
}

export type Page = 'home' | 'explore' | 'facts' | 'about' | 'projects' | 'donate' | 'community' | 'profile';
