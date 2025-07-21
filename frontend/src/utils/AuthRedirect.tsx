import { Navigate, Outlet } from "react-router-dom";

interface AuthRedirectProps {
  isAuthenticated: boolean;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/chat" replace /> : <Outlet />;
};

export default AuthRedirect;
