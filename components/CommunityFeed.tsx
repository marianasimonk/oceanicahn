
import React, { useState, useMemo } from 'react';
import type { Post, OceanCategory } from '../types';
import { PostCard } from './PostCard';
import { PostForm } from './PostForm';
import { oceanCategories } from '../types';

const categoryFilters = ['All', ...oceanCategories] as const;
type CategoryFilter = (typeof categoryFilters)[number];
type SortOption = 'newest' | 'likes' | 'comments';

interface CommunityFeedProps {
  posts: Post[];
  onAddPost: (name: string, content: string, category: OceanCategory) => void;
  onAddComment: (postId: number, name: string, content: string, parentCommentId?: number) => void;
  onLikePost: (postId: number) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  onViewProfile: (user: { name: string; avatarSeed: string }) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ posts, onAddPost, onAddComment, onLikePost, onLikeComment, onViewProfile }) => {
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  const sortedPosts = useMemo(() => {
    const filtered = selectedCategory === 'All'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const sorted = [...filtered]; // Create a copy to avoid mutating state directly
    switch (sortBy) {
        case 'likes':
            return sorted.sort((a, b) => b.likes - a.likes);
        case 'comments':
            return sorted.sort((a, b) => b.comments.length - a.comments.length);
        case 'newest':
        default:
            return sorted.sort((a, b) => b.id - a.id); // Higher ID is newer
    }
  }, [posts, sortBy, selectedCategory]);


  return (
    <div className="max-w-4xl mx-auto">
      <PostForm onAddPost={onAddPost} />
      
      {/* Category Filters */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categoryFilters.map(category => (
            <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${selectedCategory === category ? 'bg-cyan-600 text-white font-semibold shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
            >
                {category}
            </button>
          ))}
        </div>
      </div>


      {/* Sorting Controls */}
      <div className="flex justify-end items-center mb-4 gap-2">
        <span className="text-sm text-slate-400">Sort by:</span>
        {(['newest', 'likes', 'comments'] as SortOption[]).map(option => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-1 text-sm rounded-full transition-colors capitalize ${
              sortBy === option
                ? 'bg-cyan-600 text-white font-semibold'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {option === 'likes' ? 'Most Liked' : option === 'comments' ? 'Most Commented' : 'Newest'}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {sortedPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post}
            onLikePost={onLikePost}
            onLikeComment={onLikeComment}
            onAddComment={onAddComment}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>
    </div>
  );
};
