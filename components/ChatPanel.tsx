
import React, { useState, useRef, useEffect } from 'react';
import { askOceanQuestion } from '../services/geminiService';
import type { ChatMessage, GroundingChunk } from '../types';
import { MessageAuthor } from '../types';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { GlobeIcon } from './icons/GlobeIcon';

const AIMessage: React.FC<{ text: string; sources?: GroundingChunk[] }> = ({ text, sources }) => {
  return (
    <div className="col-start-1 col-end-12 p-3 rounded-lg">
      <div className="flex flex-row items-start">
         <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-500 flex-shrink-0 font-bold">
          AI
        </div>
        <div className="relative ml-3 text-sm bg-slate-700 py-2 px-4 shadow rounded-xl">
          <div className="prose prose-invert prose-sm max-w-none">{text}</div>
          {sources && sources.length > 0 && (
            <div className="mt-4 pt-2 border-t border-slate-600">
              <h4 className="text-xs font-semibold text-slate-400 mb-2">Sources:</h4>
              <ul className="list-none p-0 m-0 space-y-2">
                {sources.map((source, index) => (
                  // Use optional chaining (`?.`) to safely access `source.web.uri`
                  source.web?.uri && (
                    <li key={index} className="flex items-start gap-2">
                      <GlobeIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <a href={source.web.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-xs break-all leading-tight">
                        {source.web.title || source.web.uri}
                      </a>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const UserMessage: React.FC<{ text: string }> = ({ text }) => {
   return (
    <div className="col-start-2 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 font-bold">
          U
        </div>
        <div className="relative mr-3 text-sm bg-indigo-700 py-2 px-4 shadow rounded-xl">
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
};


export const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { author: MessageAuthor.USER, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const { text, sources } = await askOceanQuestion(input);
      const aiMessage: ChatMessage = { author: MessageAuthor.AI, text, sources };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl shadow-2xl flex flex-col h-[70vh]">
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="grid grid-cols-12 gap-y-2">
            {messages.length === 0 && !isLoading && (
                 <div className="col-span-12 text-center text-slate-400 p-8">
                    <p className="text-lg">Welcome to the Oceanica Explorer!</p>
                    <p>Ask anything, e.g., "What is the deepest part of the ocean?"</p>
                </div>
            )}
          {messages.map((msg, index) =>
            msg.author === MessageAuthor.USER ? (
              <UserMessage key={index} text={msg.text} />
            ) : (
              <AIMessage key={index} text={msg.text} sources={msg.sources} />
            )
          )}
           {isLoading && (
              <div className="col-start-1 col-end-12 p-3 rounded-lg">
                <div className="flex flex-row items-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-500 flex-shrink-0 font-bold">AI</div>
                  <div className="relative ml-3 text-sm bg-slate-700 py-2 px-4 shadow rounded-xl">
                    <div className="flex items-center space-x-2">
                      <SpinnerIcon className="w-5 h-5" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {error && <div className="col-span-12 text-center text-red-400 p-2">{error}</div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-slate-700">
        <form onSubmit={handleSubmit}>
          <div className="relative flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the ocean..."
              disabled={isLoading}
              className="w-full focus:outline-none focus:placeholder-slate-400 text-slate-200 placeholder-slate-500 pl-4 pr-12 bg-slate-700 rounded-full py-3 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full h-9 w-9 transition-colors duration-300 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
             {isLoading ? <SpinnerIcon className="w-5 h-5"/> : <SearchIcon className="w-5 h-5 text-white" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
