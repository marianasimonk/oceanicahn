
import React, { useState, useEffect, useRef } from 'react';

interface CommentFormProps {
  postId: number;
  onAddComment: (postId: number, name: string, content: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const CommentForm: React.FC<CommentFormProps> = ({ 
  postId, 
  onAddComment, 
  onCancel, 
  placeholder = "Write a comment...", 
  autoFocus = false 
}) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
        textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    onAddComment(postId, name, content);
    setName('');
    setContent('');
  };

  return (
    <div className="flex gap-3 items-start">
       {/* Placeholder Avatar for current user (static for now) */}
       <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
       </div>

        <form onSubmit={handleSubmit} className="flex-grow flex flex-col gap-2">
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full focus:outline-none text-sm text-slate-200 placeholder-slate-500 px-3 bg-slate-800 rounded-lg py-2 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            maxLength={50}
            aria-label="Your Name for comment"
        />
        <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            rows={2}
            className="w-full focus:outline-none text-sm text-slate-200 placeholder-slate-500 px-3 bg-slate-800 rounded-lg py-2 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none transition-all"
            maxLength={300}
            aria-label="Your comment"
        ></textarea>
        <div className="flex justify-end gap-2">
            {onCancel && (
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-slate-400 hover:text-white text-xs font-semibold py-1.5 px-3 rounded-md transition-colors"
                >
                    Cancel
                </button>
            )}
            <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs py-1.5 px-4 rounded-full transition-colors disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed shadow-md"
            disabled={!name.trim() || !content.trim()}
            >
            Reply
            </button>
        </div>
        </form>
    </div>
  );
};
