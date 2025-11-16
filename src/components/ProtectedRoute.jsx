import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, status } = useSelector((state) => state.auth);

  // wait until redux checks localStorage (prevent blank flash)
  if (status === "checking") return null;

  if (!token) return <Navigate to="/login" replace />;

  return children;
}
