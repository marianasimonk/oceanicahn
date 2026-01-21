
import React from 'react';
import type { Post, Page } from '../types';
import { PostCard } from './PostCard';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface ProfilePageProps {
  user: { name: string; avatarSeed: string };
  allPosts: Post[];
  setPage: (page: Page) => void;
  onLikePost: (postId: number) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  onAddComment: (postId: number, name: string, content: string, parentCommentId?: number) => void;
  onViewProfile: (user: { name: string; avatarSeed: string }) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  allPosts,
  setPage,
  onLikePost,
  onLikeComment,
  onAddComment,
  onViewProfile,
}) => {
  const userPosts = allPosts.filter(post => post.name === user.name)
                            .sort((a, b) => b.id - a.id); // Sort by newest

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black bg-opacity-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => setPage('community')}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 font-semibold"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Community Feed
        </button>

        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-12">
          <img
            src={`https://picsum.photos/seed/${user.avatarSeed}/128/128`}
            alt={`${user.name}'s avatar`}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-cyan-500/50"
          />
          <div>
            <h2 className="text-4xl font-bold text-white text-center sm:text-left">{user.name}</h2>
            <p className="text-lg text-slate-400 mt-1 text-center sm:text-left">{userPosts.length} post{userPosts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>

        {/* User's Posts */}
        <h3 className="text-2xl font-bold text-cyan-300 mb-6">Posts by {user.name}</h3>
        <div className="space-y-6">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onLikePost={onLikePost}
                onLikeComment={onLikeComment}
                onAddComment={onAddComment}
                onViewProfile={onViewProfile}
              />
            ))
          ) : (
            <div className="text-center text-slate-400 bg-slate-800 p-8 rounded-lg">
              <p>{user.name} hasn't posted anything yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
