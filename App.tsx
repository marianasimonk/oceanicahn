
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { FactsSection } from './components/FactsSection';
import type { Page, Post, Comment, OceanCategory } from './types';
import { ExplorePage } from './components/ExplorePage';
import { HomePage } from './components/HomePage';
import { ProjectsPage } from './components/ProjectsPage';
import { DonatePage } from './components/DonatePage';
import { CommunityPage } from './components/CommunityPage';
import { ProfilePage } from './components/ProfilePage';
import { initialPosts } from './data/posts';

// Helper for community feed state management
const oceanKeywords = [
  'coral', 'reef', 'fish', 'whale', 'dolphin', 'turtle', 'shark', 'ocean', 'wave', 'beach', 
  'coast', 'seaweed', 'jellyfish', 'octopus', 'starfish', 'anemone', 'seal', 'seabird', 
  'boat', 'underwater', 'diving', 'seascape', 'crab', 'clam', 'manta', 'ray'
];
const getRandomKeyword = () => oceanKeywords[Math.floor(Math.random() * oceanKeywords.length)];

// Recursive helpers for comments
const addReplyRecursively = (comments: Comment[], parentId: number, newReply: Comment): Comment[] => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newReply] };
    }
    if (comment.replies.length > 0) {
      return { ...comment, replies: addReplyRecursively(comment.replies, parentId, newReply) };
    }
    return comment;
  });
};

const toggleLikeCommentRecursively = (comments: Comment[], commentId: number): Comment[] => {
  return comments.map(comment => {
    if (comment.id === commentId) {
      return { ...comment, likes: comment.likes + 1 }; // Simple increment for demo
    }
    if (comment.replies.length > 0) {
      return { ...comment, replies: toggleLikeCommentRecursively(comment.replies, commentId) };
    }
    return comment;
  });
};

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [viewedUser, setViewedUser] = useState<{ name: string; avatarSeed: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Handlers for post interactions, lifted from CommunityFeed
  const handleAddPost = (name: string, content: string, category: OceanCategory) => {
    const newPost: Post = {
      id: Date.now(),
      name,
      content,
      category,
      avatarSeed: getRandomKeyword() + Date.now(),
      timestamp: 'Just now',
      likes: 0,
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleAddComment = (postId: number, name: string, content: string, parentCommentId?: number) => {
    const newComment: Comment = {
      id: Date.now(),
      name,
      content,
      avatarSeed: getRandomKeyword() + Date.now(),
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };

    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          if (parentCommentId) {
            return {
              ...post,
              comments: addReplyRecursively(post.comments, parentCommentId, newComment)
            };
          } else {
            return { ...post, comments: [...post.comments, newComment] };
          }
        }
        return post;
      })
    );
  };

  const handleLikePost = (postId: number) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === postId
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  const handleLikeComment = (postId: number, commentId: number) => {
    setPosts(currentPosts => 
      currentPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: toggleLikeCommentRecursively(post.comments, commentId)
          };
        }
        return post;
      })
    );
  };
  
  const handleViewProfile = (user: { name: string; avatarSeed: string }) => {
    setViewedUser(user);
    setPage('profile');
  };

  // Wrapper for setPage to clear viewedUser when leaving profile page
  const navigate = (targetPage: Page) => {
    if (page === 'profile') {
      setViewedUser(null);
    }
    setPage(targetPage);
  };

  const renderPage = () => {
    switch (page) {
      case 'explore':
        return <ExplorePage />;
      case 'facts':
        return <FactsSection />;
      case 'projects':
        return <ProjectsPage />;
      case 'about':
        return <About />;
      case 'donate':
        return <DonatePage />;
      case 'community':
        return <CommunityPage 
          posts={posts}
          onAddPost={handleAddPost}
          onAddComment={handleAddComment}
          onLikePost={handleLikePost}
          onLikeComment={handleLikeComment}
          onViewProfile={handleViewProfile}
        />;
      case 'profile':
        return viewedUser ? (
          <ProfilePage
            user={viewedUser}
            allPosts={posts}
            setPage={navigate}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
            onViewProfile={handleViewProfile}
          />
        ) : (
          <CommunityPage
            posts={posts}
            onAddPost={handleAddPost}
            onAddComment={handleAddComment}
            onLikePost={handleLikePost}
            onLikeComment={handleLikeComment}
            onViewProfile={handleViewProfile}
          />
        );
      case 'home':
      default:
        return <HomePage setPage={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-b from-slate-900 to-cyan-900 text-slate-200 flex flex-col">
      <Header setPage={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
