
import React, { useState } from 'react';
import type { Comment } from '../types';
import { LinkifiedText } from './LinkifiedText';
import { CommentForm } from './CommentForm';
import { HeartIcon } from './icons/HeartIcon';

interface CommentCardProps {
  comment: Comment;
  postId: number;
  onViewProfile: (user: { name: string; avatarSeed: string }) => void;
  onLikeComment: (postId: number, commentId: number) => void;
  onAddComment: (postId: number, name: string, content: string, parentCommentId?: number) => void;
  isReply?: boolean;
}

export const CommentCard: React.FC<CommentCardProps> = ({ 
  comment, 
  postId, 
  onViewProfile, 
  onLikeComment, 
  onAddComment,
  isReply = false
}) => {
  const [isReplying, setIsReplying] = useState(false);

  const handleReplySubmit = (pid: number, name: string, content: string) => {
    onAddComment(pid, name, content, comment.id); // Pass comment.id as parent
    setIsReplying(false);
  };

  return (
    <div className={`flex gap-3 ${isReply ? 'mt-3 relative' : ''}`}>
      {/* Visual thread line for replies */}
      {isReply && (
         <div className="absolute -left-6 top-[-20px] bottom-6 w-4 border-l-2 border-b-2 border-slate-700 rounded-bl-xl pointer-events-none"></div>
      )}

      <div
        className="flex-shrink-0 cursor-pointer z-10"
        onClick={() => onViewProfile({ name: comment.name, avatarSeed: comment.avatarSeed })}
      >
        <img
          src={`https://picsum.photos/seed/${comment.avatarSeed}/32/32`}
          alt={`${comment.name}'s avatar`}
          className={`rounded-full object-cover border border-slate-600 ${isReply ? 'w-8 h-8' : 'w-10 h-10'}`}
        />
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="bg-slate-700/40 rounded-2xl px-4 py-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
          <div className="flex justify-between items-start mb-1">
             <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onViewProfile({ name: comment.name, avatarSeed: comment.avatarSeed })}
                className="font-bold text-cyan-400 text-sm hover:underline"
              >
                {comment.name}
              </button>
              <span className="text-xs text-slate-500">{comment.timestamp}</span>
            </div>
          </div>
          <LinkifiedText text={comment.content} pClassName="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed" />
        </div>

        {/* Action Row */}
        <div className="flex items-center gap-4 mt-1 ml-2">
            <button 
                onClick={() => onLikeComment(postId, comment.id)}
                className="text-xs font-semibold text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
            >
                <HeartIcon className={`w-3.5 h-3.5 ${comment.likes > 0 ? 'fill-current text-red-500' : ''}`} />
                {comment.likes > 0 ? comment.likes : 'Like'}
            </button>
            <button 
                onClick={() => setIsReplying(!isReplying)}
                className="text-xs font-semibold text-slate-500 hover:text-cyan-400 transition-colors"
            >
                Reply
            </button>
        </div>

        {/* Reply Form */}
        {isReplying && (
            <div className="mt-3 ml-2">
                <CommentForm 
                    postId={postId} 
                    onAddComment={handleReplySubmit} 
                    onCancel={() => setIsReplying(false)}
                    placeholder={`Reply to ${comment.name}...`}
                    autoFocus
                />
            </div>
        )}

        {/* Recursive Replies */}
        {comment.replies && comment.replies.length > 0 && (
            <div className="pl-6 sm:pl-8 mt-2 border-l-2 border-slate-800 space-y-3">
                {comment.replies.map(reply => (
                    <CommentCard 
                        key={reply.id} 
                        comment={reply} 
                        postId={postId}
                        onViewProfile={onViewProfile}
                        onLikeComment={onLikeComment}
                        onAddComment={onAddComment}
                        isReply={true}
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
