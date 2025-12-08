import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import PageLoader from "../loader/page-loader";

const Protected = () => {
  // auth context'den kullanıcı verilerini al
  const { loading, user } = useAuth();

  // yüklenme devam ediyorsa ekrana loader bas
  if (loading) return <PageLoader />;

  // user yoksa anasayfaya yönlendir
  if (!user) return <Navigate to="/" />;

  // alt route'un içeriğini ekrana bas
  return <Outlet />;
};

export default Protected;
