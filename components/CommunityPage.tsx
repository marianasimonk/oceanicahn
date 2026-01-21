
import React from 'react';
import { CommunityFeed } from './CommunityFeed';
import type { Post, Comment, OceanCategory } from '../types';

interface CommunityPageProps {
  posts: Post[];
  onAddPost: (name: string, content: string, category: OceanCategory) => void;
  onAddComment: (postId: number, name: string, content: string, parentCommentId?: number) => void;
  onLikePost: (postId: number) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  onViewProfile: (user: { name: string; avatarSeed: string }) => void;
}


export const CommunityPage: React.FC<CommunityPageProps> = (props) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-cyan-300 mb-4">Community Hub</h2>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            Connect with fellow ocean enthusiasts, share your stories, and ask questions.
          </p>
        </div>
        <CommunityFeed {...props} />
      </div>
    </section>
  );
};
