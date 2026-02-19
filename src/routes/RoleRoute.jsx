import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleRoute({ roles, children }) {
  const { user } = useSelector((state) => state.auth);

  if (!roles.includes(user?.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
