import { createContext, useState, useContext } from 'react';
import { Axios } from '../service/axios';
import { useNavigate } from 'react-router-dom';

export interface IPost {
  id: string,
  title: string;
  summary: string;
  content: string;
  image: string;
  date: Date;
  author: string;
  authorID: string,
}

interface PostContextType {
  post: IPost[] | null;
  getPosts: () => void;
  selectedPost: IPost | null;
  getPostByID: (id: string) => void;
  isLoading: boolean;
  deletePost: (id: string) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function getPosts() {
    setIsLoading(true);
    try {
      const response = await Axios.get('/Posts');
      setPost(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

  async function getPostByID(ID: string) {
    setIsLoading(true);
    try {
      const response = await Axios.get(`/Post/${ID}`);
      setSelectedPost(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      setSelectedPost(null);
      setIsLoading(false);
    }
  }

  async function deletePost(id: string) {
    try {
      const response = await Axios.delete(`/Delete/${id}`);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.log('Error delete post', error)
    }
  }

  return (
    <PostContext.Provider
      value={{ post, getPosts, selectedPost, getPostByID, isLoading, deletePost }}>
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