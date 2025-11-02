import React from 'react';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const previewContent = post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content;
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden transform hover:-translate-y-1 flex flex-col"
    >
      {post.imageUrl && (
        <img src={post.imageUrl} alt={post.title} className="w-full h-40 object-cover" />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-gray-500 mb-1">{formattedDate}</p>
          <p className="text-sm text-purple-600 font-medium">by {post.author}</p>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">{post.title}</h2>
        <p className="text-gray-600 flex-grow">{previewContent}</p>
      </div>
    </div>
  );
};

export default PostCard;