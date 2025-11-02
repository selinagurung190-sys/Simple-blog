import React, { useState, useEffect, useMemo } from 'react';
import type { Post, NewPost, User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import PostCard from './components/PostCard';
import PostView from './components/PostView';
import NewPostForm from './components/NewPostForm';
import SearchBar from './components/SearchBar';
import DailyMotivation from './components/DailyMotivation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<'home' | 'new' | 'view' | 'admin' | 'login' | 'signup'>('login');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedPosts = localStorage.getItem('journalPosts');
      if (storedPosts) setPosts(JSON.parse(storedPosts));
      
      const storedUsers = localStorage.getItem('journalUsers');
      if (storedUsers) setUsers(JSON.parse(storedUsers));

      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setCurrentPage('home');
      }
    } catch (error) {
      console.error("Failed to parse data from localStorage", error);
    }
  }, []);

  // Persist data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('journalPosts', JSON.stringify(posts));
      localStorage.setItem('journalUsers', JSON.stringify(users));
      if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('currentUser');
      }
    } catch (error) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [posts, users, currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleSignUp = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNewPost = () => {
    setCurrentPage('new');
    setSelectedPost(null);
  };

  const handleViewPost = (post: Post) => {
    setSelectedPost(post);
    setCurrentPage('view');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedPost(null);
  };
  
  const handleSavePost = (newPost: NewPost) => {
    if (!currentUser) return; // Should not happen if UI is correct
    const post: Post = {
      ...newPost,
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
      author: currentUser.username,
    };
    setPosts([post, ...posts]);
    handleBackToHome();
  };

  const handleDeletePost = (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const handleDeleteUser = (username: string) => {
     if (window.confirm(`Are you sure you want to delete user "${username}"? This will also delete all their posts.`)) {
      setUsers(users.filter(u => u.username !== username));
      setPosts(posts.filter(p => p.author !== username));
    }
  };

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      new Date(post.date).toLocaleDateString().includes(searchTerm)
    );
  }, [posts, searchTerm]);

  if (!currentUser) {
    if (currentPage === 'signup') {
      return <SignUp users={users} onSignUp={handleSignUp} onSwitchToLogin={() => setCurrentPage('login')} />;
    }
    return <Login users={users} onLogin={handleLogin} onSwitchToSignUp={() => setCurrentPage('signup')} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'new':
        return <NewPostForm onSave={handleSavePost} onCancel={handleBackToHome} />;
      case 'view':
        return selectedPost && <PostView post={selectedPost} onBack={handleBackToHome} />;
      case 'admin':
        return <AdminDashboard users={users} posts={posts} onDeletePost={handleDeletePost} onDeleteUser={handleDeleteUser} />;
      case 'home':
      default:
        return (
          <>
            <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
              <DailyMotivation />
              <SearchBar onSearch={setSearchTerm} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <PostCard key={post.id} post={post} onClick={() => handleViewPost(post)} />
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500 py-16">
                  <p className="text-xl">No thoughts penned down yet.</p>
                  <p>Why not write your first post?</p>
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-rose-50 text-gray-800">
      <Header
        user={currentUser}
        onNewPost={handleNewPost}
        onHome={handleBackToHome}
        onLogout={handleLogout}
        onAdmin={() => setCurrentPage('admin')}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;