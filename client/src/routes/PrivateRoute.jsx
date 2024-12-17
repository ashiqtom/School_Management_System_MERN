import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { role, accessToken } = useSelector((state) => state.auth);

  // If no access token, redirect to login page (or wherever you'd like)
  if (!accessToken) {
    return <Navigate to="/signin" replace />;
  }

  // If the user's role is not allowed, redirect to home or any other page
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
