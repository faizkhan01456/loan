import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const role = user?.role?.toUpperCase();

  // ✅ Allow SUPER_ADMIN + ADMIN
  if (!["ADMIN", "SUPER_ADMIN"].includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
