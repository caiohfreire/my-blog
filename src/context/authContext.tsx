import { createContext, useContext, useEffect, useState } from "react";
import { Axios } from "../service/axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  Login: (email: string, password: string) => void;
  isAuthenticated: boolean;
  user: IUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState<IUser | null>(() => {
    const token = Cookies.get('token');

    function parseJwt(token: string | null) {
      if (!token) {
        return {};
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    if (token) {
      const jwtData = parseJwt(token);

      const userID = jwtData.id;
      const userName = jwtData.name;
      const userEmail = jwtData.email;

      return {
        id: userID,
        name: userName,
        email: userEmail,
      };
    }

    return null;
  });

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
      value={{ Login, isAuthenticated, user }}>
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