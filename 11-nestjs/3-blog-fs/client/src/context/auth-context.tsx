import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import type { LoginValues, RegisterValues, User } from "../types";
import { useNavigate, type Register } from "react-router-dom";
import authService from "../services/auth-service";
import { toast } from "react-toastify";

// Context Type
interface IAuthContext {
  loading: boolean;
  user: User | null | undefined;
  register: (data: RegisterValues) => Promise<void>;
  login: (data: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
}

// Context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Provider
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const navigate = useNavigate();

  // sayfa her yüklendiğinde giriş yapılmışsa api'dan kullanıcı bilgilerini al
  useEffect(() => {
    // kullanıcı daha önce giriş yaptı mı kontrol
    if (localStorage.getItem("isLoggedIn") !== "true") return;

    const getUser = async () => {
      setLoading(true);

      try {
        const res = await authService.getProfile();
        setUser(res.data);
      } catch (error) {
        setUser(null);
        localStorage.removeItem("isLoggedIn");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // kayıt ol
  const register = async (data: RegisterValues) => {
    setLoading(true);

    try {
      await authService.register(data);
      toast.success("Kullanıcı başarıyla oluşturuldu");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Bir hata oluştu");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // giriş yap
  const login = async (data: LoginValues) => {
    setLoading(true);

    try {
      const res = await authService.login(data);
      setUser(res.data);
      navigate("/");
      toast.success("Giriş başarılı");
      localStorage.setItem("isLoggedIn", "true");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  // çıkış yap
  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("isLoggedIn");
      setUser(null);
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Bir hata oluştu");
    }
  };

  return (
    <AuthContext.Provider value={{ loading, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook: context yapısına abonbe olmak için
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth AuthProvider içinde kullanılmalıdır");
  }

  return context;
};

export default AuthProvider;
