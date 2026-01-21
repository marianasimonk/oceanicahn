import React, { useState } from 'react';
import { oceanCategories, type OceanCategory } from '../types';

interface PostFormProps {
  onAddPost: (name: string, content: string, category: OceanCategory) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<OceanCategory>(oceanCategories[0]);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      setError('Name and message cannot be empty.');
      return;
    }
    onAddPost(name, content, category);
    setName('');
    setContent('');
    setError('');
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-8 border border-slate-700 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Share something with the community</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full focus:outline-none focus:placeholder-slate-400 text-slate-200 placeholder-slate-500 px-4 bg-slate-700 rounded-md py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-shadow"
            maxLength={50}
          />
        </div>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            className="w-full focus:outline-none focus:placeholder-slate-400 text-slate-200 placeholder-slate-500 px-4 bg-slate-700 rounded-md py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-shadow resize-none"
            maxLength={500}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="category-select" className="block text-sm font-medium text-slate-400 mb-1">Category</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value as OceanCategory)}
            className="w-full focus:outline-none text-slate-200 bg-slate-700 rounded-md py-2 px-3 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-shadow"
          >
            {oceanCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={!name.trim() || !content.trim()}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};