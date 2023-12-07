import { createContext, useState, useContext } from 'react';
import { Axios } from '../service/axios';

export interface IPost {
  id: string,
  title: string;
  summary: string;
  content: string;
  image: string;
  date: Date;
  authorID: string,
}

interface PostContextType {
  post: IPost[] | null;
  getPosts: () => void;
  selectedPost: IPost | null;
  getPostByID: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);

  async function getPosts() {
    const response = await Axios.get('/Posts');
    setPost(response.data);
    console.log(response.data)
  }

  async function getPostByID(ID: string) {
    try {
      const response = await Axios.get(`/Post/${ID}`);
      setSelectedPost(response.data);
      console.log("Received post:", response.data);
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      setSelectedPost(null);
    }
  }

  return (
    <PostContext.Provider
      value={{ post, getPosts, selectedPost, getPostByID }}>
      {children}
    </PostContext.Provider>
  )
}

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext deve ser usado dentro de um PostProvider');
  }
  return context;
};