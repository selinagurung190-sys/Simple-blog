export interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  author: string;
}

export interface User {
  username: string;
  // In a real app, passwords should be hashed. Storing plain text is for demo purposes only.
  password: string; 
  role: 'user' | 'admin';
}

export type NewPost = Omit<Post, 'id' | 'date' | 'author'>;