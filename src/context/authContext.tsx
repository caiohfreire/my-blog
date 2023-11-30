import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../service/axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface AuthContextType {
  Login: (email: string, password: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function Login(email: string, password: string) {
    try {
      const response = await Axios.post('/Login', { email, password });

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token, { expires: 1 })
        setIsAuthenticated(true);
        router('/')
      }

    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      throw new Error();
    }
  }

  // Verifing if token is valid
  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ Login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }
  return context;
};