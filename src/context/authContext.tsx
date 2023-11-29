import { createContext, useContext } from "react";
import { Axios } from "../service/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  Login: (email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useNavigate();

  async function Login(email: string, password: string) {
    try {
      const response = await Axios.post('/Login', { email, password });

      if (response.status === 200) {
        router('/')
      }

    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }

  return (
    <AuthContext.Provider
      value={{ Login }}>
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