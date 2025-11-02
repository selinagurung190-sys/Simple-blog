import React, { useState } from 'react';
import type { Post } from '../types';
import { generateReflection } from '../services/geminiService';

interface PostViewProps {
  post: Post;
  onBack: () => void;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack }) => {
  const [reflection, setReflection] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReflectClick = async () => {
    setIsLoading(true);
    setReflection('');
    const result = await generateReflection(post.content);
    setReflection(result);
    setIsLoading(false);
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-10">
      <button onClick={onBack} className="text-fuchsia-500 hover:text-fuchsia-700 font-semibold mb-6">
        &larr; Back to Journal
      </button>
      
      <article>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <div className="flex justify-between items-baseline mb-6">
            <p className="text-md text-gray-500">{formattedDate}</p>
            <p className="text-md text-purple-600 font-semibold">by {post.author}</p>
        </div>
        
        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-contain rounded-xl mb-6" />
        )}
        
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
          {post.content}
        </div>
      </article>

      <div className="mt-10 pt-6 border-t border-rose-100">
        <button
          onClick={handleReflectClick}
          disabled={isLoading}
          className="bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Thinking...' : 'Reflect with AI ✨'}
        </button>
        {reflection && !isLoading && (
          <div className="mt-4 bg-purple-50 border-l-4 border-purple-400 text-purple-800 p-4 rounded-r-lg">
            <p className="font-semibold italic">"{reflection}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostView;