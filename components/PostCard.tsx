
import React, { useState, useMemo } from 'react';
import type { Post } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { ChatBubbleIcon } from './icons/ChatBubbleIcon';
import { CommentCard } from './CommentCard';
import { CommentForm } from './CommentForm';
import { LinkifiedText } from './LinkifiedText';

interface PostCardProps {
  post: Post;
  onLikePost: (postId: number) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  onAddComment: (postId: number, name: string, content: string, parentCommentId?: number) => void;
  onViewProfile: (user: { name: string; avatarSeed: string }) => void;
}

type CommentSort = 'newest' | 'top';

export const PostCard: React.FC<PostCardProps> = ({ post, onLikePost, onLikeComment, onAddComment, onViewProfile }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [commentSort, setCommentSort] = useState<CommentSort>('newest');

  // Helper to count total comments recursively
  const countComments = (comments: typeof post.comments): number => {
    return comments.reduce((acc, comment) => acc + 1 + countComments(comment.replies), 0);
  };
  
  const totalComments = useMemo(() => countComments(post.comments), [post.comments]);

  const sortedComments = useMemo(() => {
    const comments = [...post.comments];
    if (commentSort === 'newest') {
      return comments.sort((a, b) => b.id - a.id);
    } else {
      return comments.sort((a, b) => b.likes - a.likes);
    }
  }, [post.comments, commentSort]);

  return (
    <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex gap-4">
        <div 
          className="flex-shrink-0 cursor-pointer"
          onClick={() => onViewProfile({ name: post.name, avatarSeed: post.avatarSeed })}
          aria-label={`View profile for ${post.name}`}
        >
          <img
            src={`https://picsum.photos/seed/${post.avatarSeed}/56/56`}
            alt={`${post.name}'s avatar`}
            className="w-14 h-14 rounded-full object-cover ring-2 ring-slate-700 hover:ring-cyan-500 transition-all"
          />
        </div>
        <div className="flex-grow">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
            <div>
              <button
                onClick={() => onViewProfile({ name: post.name, avatarSeed: post.avatarSeed })}
                className="font-bold text-white text-lg hover:text-cyan-400 transition-colors"
              >
                {post.name}
              </button>
              <p className="text-xs text-slate-400">{post.timestamp}</p>
            </div>
            <span className="mt-2 sm:mt-0 text-xs font-bold uppercase tracking-wide bg-slate-700/50 text-cyan-400 px-3 py-1 rounded-full border border-slate-600/50">{post.category}</span>
          </div>
          <LinkifiedText text={post.content} pClassName="text-slate-200 text-base leading-relaxed whitespace-pre-wrap" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-700/50">
        <button 
          onClick={() => onLikePost(post.id)}
          className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors group px-2 py-1 rounded-md hover:bg-slate-700/30"
          aria-label={`Like post, current count: ${post.likes}`}
        >
          <HeartIcon className={`w-6 h-6 transition-transform group-hover:scale-110 ${post.likes > 0 ? 'text-red-500 fill-red-500/10' : ''}`} />
          <span className="font-semibold">{post.likes}</span>
        </button>
        <button 
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className={`flex items-center gap-2 transition-colors group px-2 py-1 rounded-md hover:bg-slate-700/30 ${isCommentsOpen ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'}`}
          aria-expanded={isCommentsOpen}
        >
          <ChatBubbleIcon className="w-6 h-6 transition-transform group-hover:scale-110" />
          <span className="font-semibold">{totalComments}</span>
        </button>
      </div>

      {/* Comments Section */}
      {isCommentsOpen && (
        <div className="mt-6 pt-4 bg-slate-900/30 -mx-5 px-5 pb-5 rounded-b-2xl border-t border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-sm font-semibold text-white">Comments</h5>
            <div className="flex gap-2 text-xs">
              <button 
                onClick={() => setCommentSort('newest')} 
                className={`px-2 py-1 rounded ${commentSort === 'newest' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Newest
              </button>
              <button 
                onClick={() => setCommentSort('top')} 
                className={`px-2 py-1 rounded ${commentSort === 'top' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Top
              </button>
            </div>
          </div>

          <div className="mb-6">
             <CommentForm 
                postId={post.id} 
                onAddComment={onAddComment}
                autoFocus={true}
              />
          </div>

          {post.comments.length > 0 ? (
            <div className="space-y-4">
              {sortedComments.map(comment => (
                <CommentCard 
                  key={comment.id} 
                  comment={comment} 
                  postId={post.id}
                  onViewProfile={onViewProfile}
                  onLikeComment={onLikeComment}
                  onAddComment={onAddComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-slate-500 italic">No comments yet. Start the conversation!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
