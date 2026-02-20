import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { loggedIn, user } = useAuth();

  // if the user is not logged in, they will be redirected to the login page.
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // If the route is AdminOnly and the user is not an admin, it will redirect to the main page.
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;